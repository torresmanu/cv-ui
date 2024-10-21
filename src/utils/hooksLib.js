import { useState, useReducer, useMemo } from "react";
import {deleteKeysWithStart, getProperty, setProperty} from "./objects";
import store from "../redux/store";
import {setFormStatus} from "../redux/actions/formsActions";
import {produce} from 'immer';
import {trimChar} from "./strings";


export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    //  handleFieldChange
    function(event) {
      const newFields = {...fields};

      const path = event.key || event.target.id || event.target.name;
      const value = event.target ? event.target.value : event.value;
      setProperty(newFields, path, value);

      setValues({
        ...newFields
      });
    },
    //  reset
    function() {
      setValues(initialState);
    }
  ];
}
function findValidator(fieldName, validators) {
  const properties = fieldName.split('.');
  let validator = null;
  const indexes = [];
  const isRootField = properties.length === 1;
  properties.forEach(
    property => {
      if(!isNaN(property)){
        indexes.push(parseInt(property));
      }
      if (validator) {
        const subValidator = validator[property];
        if (subValidator) {
          validator = subValidator;
        }
        return
      }

      const rootValidator = validators[property];
      const isFunction = rootValidator instanceof Function;
      //  Avoid assign root validator to nested fields
      if(!isFunction || (isFunction && isRootField)){
        validator = validators[property];
      }
    }
  );
  return {validator, indexes};
}

function validate(fieldName, fields, validators, fieldValue=undefined, extraArgs={}, initialState) {
  const {validator, indexes} = findValidator(fieldName, validators);
  let error;
  if (validator && validator instanceof Function) {
    const valueIndex = indexes[indexes.length - 1];
    let value;
    if(fieldValue === undefined) {
      value = getProperty(fields, fieldName);
    } else {
      value = fieldValue;
    }
    const initialValue = getProperty(initialState, fieldName);
    const validatorArgs = {value, fields, valueIndex, indexes, initialValue, ...extraArgs};
    error = validator(validatorArgs);
  }
  if (error) {
    fields.errors[fieldName] = error;
  } else {
    delete fields.errors[fieldName];
  }
}
const formReducer = ({validators, initialState, emptyInitialState}) => function (draft, action) {
  function runValidators(fields, previousKey="") {
    for (let key in fields) {
      if(key === "errors") continue;

      const value = fields[key];

      if (value instanceof Object){ // Also applies for Arrays
        runValidators(value, `${previousKey}.${key}`)
      } else {
        const fieldName = `${previousKey}.${key}`;
        validate(trimChar(fieldName, "."), draft, validators, undefined, action.extraArgs, initialState);
      }
    }
  }
  switch (action.type) {
    case 'FIELD_CHANGE': {
      validate(action.fieldName, draft, validators, action.fieldValue, {}, initialState);
      setProperty(draft, action.fieldName, action.fieldValue);
      if(action.callback) action.callback(draft);
      if(!draft.dirty && action.fieldValue?.length>0) {
        store.dispatch(setFormStatus({model: draft.formModel, dirty: true}));
        draft.dirty = true;
      }
      return;
    }
    case 'ADD_EMPTY_FIELD': {
      const path = action.path;
      let sample;
      if (action.sample){
        sample = action.sample;
      } else {
        sample = getProperty(emptyInitialState || initialState, path)[0];
      }
      getProperty(draft, path).push({...sample});
      return;
    }
    case 'REMOVE_FIELD': {
      const { path, index } = action;
      getProperty(draft, path).splice(index, 1);
      deleteKeysWithStart(draft.errors, `${path}.${index}`);
      return;
    }

    case 'SUBMIT':
      if (action.preValidator){
        const {fieldName, fieldValue} = action.preValidator(draft)
        setProperty(draft, fieldName, fieldValue);
      }
      runValidators(draft);

      if(Object.keys(draft.errors).length === 0){
        action.handleSubmit(draft);
        store.dispatch(setFormStatus({model: draft.formModel, dirty: false}));
        draft.dirty = false;
      }
      return;
    default:
  }
}

export function useFormReducer({initialState, emptyInitialState, validators = {}}){
  const memoizedInitialState = useMemo(
    () => ({
      ...initialState,
      errors: {}
    }),
    []
  );

  const curriedFormReducer = useMemo(
    () => {
      return produce(formReducer({validators, initialState: memoizedInitialState, emptyInitialState}))
    },
    [memoizedInitialState]
  );
  const [state, dispatch] = useReducer(curriedFormReducer, memoizedInitialState);

  const handleFieldChange = (e) => {
    let fieldName, fieldValue;
    const {target, key, value, callback, initialValue} = e;
    if(target){
      fieldName = e.target.name || e.target.id;
      fieldValue = e.target.value;
    } else {
      fieldName = key;
      fieldValue = value;
    }

    dispatch({
      type: 'FIELD_CHANGE',
      fieldName,
      fieldValue,
      callback,
      initialValue
    })
  };

  const addEmptyItem = (path, sample=null) => {
    dispatch({
      type: 'ADD_EMPTY_FIELD',
      path,
      sample
    })
  };

  const removeItem = (path, index) => {
    dispatch({
      type: 'REMOVE_FIELD',
      path,
      index
    })
  };

  const submit = (handleSubmit, preValidator=null, extraArgs) => {
    dispatch({
      type: 'SUBMIT',
      handleSubmit,
      preValidator,
      extraArgs
    })
  };

  const hasErrors = Object.keys(state.errors).length > 0;

  return {fields: state, dispatch, hasErrors, submit, handleFieldChange, addEmptyItem, removeItem};
}