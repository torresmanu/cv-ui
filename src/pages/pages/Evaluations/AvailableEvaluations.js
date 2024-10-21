import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import EvaluationCard from './EvaluationCard';
import CardContainer from '../../../components/CardContainer';
import document from '../../../images/docuemnts.png';
import { Logo } from '../../components/Logo';

const AvailableEvaluations = ({ institutionEvaluations,
                                existingEvaluations,
                                handleDeleteEvaluation }) => {
  return (
    <CardContainer title="Enabled Evaluations">
      <Grid container spacing={5}>
        {institutionEvaluations.length === 0 ?
          <Grid item xs={ 12 }>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
              <Grid item>
                <Logo logo={document}  width={'150px'} />
                <Typography variant="h6" gutterBottom align="center">
                  No Evaluations Enabled
                </Typography>
              </Grid>
            </Grid>
           </Grid>
        :
        institutionEvaluations?.map((evaluation, index) => {
          return (
          <Grid item xs={3} key={index}>
            <EvaluationCard 
              evaluation={existingEvaluations[evaluation]}
              id={evaluation}
              onDelete={handleDeleteEvaluation}
            />
          </Grid>
        )})}
      </Grid>
    </CardContainer>
  );
};

export default AvailableEvaluations;
