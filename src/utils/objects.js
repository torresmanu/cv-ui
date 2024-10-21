export function setProperty(obj, path, value) {
  let schema = obj;
  const pList = path.split('.');
  const len = pList.length;
  for(let i = 0; i < len-1; i++) {
    const elem = pList[i];
    if( !schema[elem] ) schema[elem] = {}
    schema = schema[elem];
  }

  schema[pList[len-1]] = value;
}

export function getProperty(obj, path) {
  let schema = obj;
  const pList = path.split('.');
  const len = pList.length;
  for(let i = 0; i < len; i++) {
    const elem = pList[i];
    if(schema === undefined) return null;
    schema = schema[elem];
  }

  return schema;
}

// const obj = {
//   'someProp.0.nestedProp1': "",
//   'someProp.0.nestedProp2': "",
//   'someProp.1.nestedProp1': "",
// }
//
// deletePath(obj, 'someProp.0')
//
// expected obj = {
//   'someProp.1.nestedProp1': "",
// }
export function deleteKeysWithStart(obj, startsWith) {
  Object.keys(obj).forEach(key => {
    if(key.startsWith(startsWith)){
      delete obj[key];
    }
  })
}

export const removeNotIncluded = (object, allowedKeys) => {
  const objectKeys = Object.keys(object);
  objectKeys.forEach(
    key => {
      if(!(allowedKeys.includes(key))){
        delete object[key];
      }
    }
  )
  return object;
};


const isAValue = ([key, value]) => {
  if(key === 'custom_fields'){
    return value.some(customField => customField.value)
  }

  if(value === false || value === 0) {
    return true; //  false and 0 are values.
  }

  if(!value) {
    return false;  //  value is null or undefined
  }

  if(value.constructor === Object) {
    return Object.entries(value).length > 0
  }

  if(value.constructor === Array) {
    if(value.length > 0) {
      return value.some(hasSomeValue)
    } else {
      return false
    }
  }

  return true;  // value is string, number, timestamp, etc
};

const hasSomeValue = obj => {
  const objectEntries = Object.entries(obj);

  if(objectEntries.length === 0) return false;

  return objectEntries.some(isAValue);
}

// params: array of objects { key: value }
// return a new array, without the empty values objects like { a: '' , b: ''}
// example: 
//   param = [{a: 1}, {b: ''}, {c: '', d: 'hola'}]
//   clearEmptyHashOfArray(param)
// result = [{a: 1}, {c: '', d: 'hola'}]
export const clearEmptyHashOfArray = (array) => {
  return array.filter(hasSomeValue)
}

export const toPlainObject = draft => (
  JSON.parse(JSON.stringify(draft))
)

export const objectValuesAreNotEmpty = object => {
  return Object.values(object).every(value => Boolean(value))
}