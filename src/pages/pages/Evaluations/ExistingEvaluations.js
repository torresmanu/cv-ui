import React from 'react';

import {Grid} from "@material-ui/core/index";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardContainer from '../../../components/CardContainer';
import ButtonWithStyles from '../../../components/ButtonWithStyles';

const ExistingEvaluations = ({ selectedEvaluation,
                               existingEvaluations,
                               handleSelectChange,
                               handleAddEvaluation,
                               institutionEvaluations,
                               onEdit,
                               label,
                               selectWidth
                             }) => {
  return (
    <CardContainer title="Existing Evaluations">
      <Grid container spacing={2} style={{marginTop: 15}}>
        <Grid item xs={selectWidth}>
          <Select
            value={selectedEvaluation}
            onChange={(e)=>handleSelectChange(e.target.value)}
            displayEmpty
            fullWidth
            disabled={onEdit}
          >
            <MenuItem value="" disabled>
              Select an Evaluation
            </MenuItem>
            {Object.keys(existingEvaluations)
              .filter(key => existingEvaluations[key].hide === 0)
              .map((evaluationKey, index) => {
                const evaluation = existingEvaluations[evaluationKey];
                if (institutionEvaluations.includes(evaluationKey)) return null;
                else {
                  return (
                    <MenuItem key={index} value={evaluationKey}>
                      {evaluation.name.en}
                    </MenuItem>
                  );
                }
              })
            }
          </Select>
        </Grid>
        <Grid item xs={12-selectWidth}>
          <ButtonWithStyles 
            className={"add"}
            variant="contained"
            color="primary"
            onClick={handleAddEvaluation}
            disabled={selectedEvaluation === "" || onEdit}
          >
            {label}
          </ButtonWithStyles>
        </Grid>
      </Grid>
    </CardContainer>
  );
};

export default ExistingEvaluations;