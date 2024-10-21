import React from 'react';

import {Grid} from "@material-ui/core/index";

import { Checkbox, FormControlLabel } from '@material-ui/core';
import BootstrapInput from "../../../components/BootstrapInput";
import CardContainer from '../../../components/CardContainer';
import ButtonWithStyles from '../../../components/ButtonWithStyles';


const CreateEvaluation = ({ 
  setEnEvaluationName,
  enEvaluationName,
  esEvaluationName,
  setEsEvaluationName,
  handleCreateEvaluation,
  handleCancelCreate,
  selectedTasks,
  handleTaskCheck,
  tasks,
  onEdit  }) => {
  
    const handleInputChange = (event, setter) => {
    const inputValue = event.target.value;
    // Regular expression to allow only alphanumeric characters and spaces
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(inputValue) || inputValue === '') {
      // Update state only if the input is valid or empty
      setter(inputValue);
    }
  };
    
  return (
    <CardContainer title={onEdit ? "Update Evaluation" : "Create Evaluation" } >
      <Grid container spacing={2} style={{marginTop: 15}}>
        <Grid item xs={4}>
          <BootstrapInput
            id={'EnEvaluationName'}
            value={enEvaluationName || ''}
            placeholder="English Evaluation Name"
            onChange={(event) => handleInputChange(event, setEnEvaluationName)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <BootstrapInput
            id={'EsEvaluationName'}
            value={esEvaluationName || ''}
            placeholder="Spanish Evaluation Name"
            onChange={(event) => handleInputChange(event, setEsEvaluationName)}
            fullWidth
          />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          {Object.keys(tasks).map((task, index) => (
            <Grid item xs={4}>
              <FormControlLabel
                key={index}
                control={<Checkbox checked={selectedTasks.includes(task)} onChange={() => handleTaskCheck(task)} />}
                label={tasks[task]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <ButtonWithStyles 
              className={"create"}
              variant="contained"
              color="primary"
              onClick={handleCreateEvaluation}
              disabled={enEvaluationName === '' || esEvaluationName === '' || Object.keys(selectedTasks).length === 0}
            >
             {onEdit ? "Update Evaluation" : "Create" } 
            </ButtonWithStyles>
            <ButtonWithStyles 
              className={"create"}
              variant="contained"
              color="primary"
              onClick={handleCancelCreate}
              disabled={enEvaluationName === '' || esEvaluationName === '' || Object.keys(selectedTasks).length === 0}
            >
             {"Cancel"} 
            </ButtonWithStyles>
          </Grid>
        </Grid>
    </CardContainer>
  );
};

export default CreateEvaluation;