import React from "react";
import styled from "styled-components";
import {Icon} from '@iconify/react';
import {
  CardContent,
  Grid,
  Card as MuiCard,
  Typography, Box
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import {fPercent} from "../../utils/formatNumber";
import Skeleton from '@material-ui/lab/Skeleton';

const Card = styled(MuiCard)(spacing);

function SimpleCard({title,percent, number, isLoading}) {
  const iconColor = percent >= 0 ? 'rgba(45, 177, 23, 1)' : 'rgba(231, 48, 81, 1)';
  const iconBackgroundColor = percent >= 0 ? 'rgba(213, 239, 209, 1)' : 'rgba(253, 229, 233, 1)';
  return (
    <Card mb={6} style={{borderRadius: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <CardContent>
        <Typography component="h1" style={{marginBottom: 15}}>
          {title}
        </Typography>
          <React.Fragment>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                {!isLoading ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="50%"
                    width={32}
                    height={32}
                    style={{ backgroundColor: iconBackgroundColor }}
                  >
                    <Icon
                      width={16}
                      height={16}
                      icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                      style={{ color: iconColor }}
                    />
                  </Box>
                ) : (
                  <Skeleton variant="circle" width={32} height={32} />
                )}
              </Grid>
              <Grid item>
                {!isLoading ? (
                  <Typography component="span" variant="subtitle2">
                    {percent > 0 && '+ '}
                    {fPercent(percent)}
                  </Typography>
                ) : (
                  <Skeleton variant="text" animation="wave" width={50}/>
                )}
              </Grid>
            </Grid>
            {!isLoading ? (
              <Typography variant="h3" style={{marginTop: 15}}>
                {number}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={32}/>
            )}
          </React.Fragment>
      </CardContent>
    </Card>
  );
}

function Cards({
                 totalEvaluations,
                 amountOfInstitutions,
                 evaluationsWithinLast30Days,
                 qcApprovalLast30Days,
                 qcApprovalsPreviousMonth,
                 evaluationsWithinThePreviousMonth,
                 previousAmountOfEvaluations,
                 previousAmountOfInstitutions,
                 isLoading
}) {
  const percentOfQC = qcApprovalLast30Days*100/evaluationsWithinLast30Days;
  const percentOfQCPreviousMonth = qcApprovalsPreviousMonth*100/evaluationsWithinThePreviousMonth;
  const differenceInEvaluations = (evaluationsWithinLast30Days - evaluationsWithinThePreviousMonth)*100/evaluationsWithinThePreviousMonth;
  const differenceInQC = percentOfQC - percentOfQCPreviousMonth;
  const differenceInInstitutions = (amountOfInstitutions - previousAmountOfInstitutions)*100/previousAmountOfInstitutions;
  const differenceInTotalEvaluations = ((totalEvaluations)*100/previousAmountOfEvaluations)-100;
  return (
    <React.Fragment>
      <Grid container spacing={8}>
        <Grid item xs={6} md={3}>
          <SimpleCard
            title={'Total Tasks'}
            percent={differenceInTotalEvaluations}
            number={totalEvaluations}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SimpleCard
            title={'Total Institutions'}
            percent={differenceInInstitutions}
            number={amountOfInstitutions}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SimpleCard
            title={'Tasks Last 30 Days'}
            percent={differenceInEvaluations}
            number={evaluationsWithinLast30Days}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SimpleCard
            title={'QC Approval Last 30 Days'}
            percent={differenceInQC}
            number={fPercent(percentOfQC)}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Cards;
