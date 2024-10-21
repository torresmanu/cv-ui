import React from "react";
import styled from "styled-components";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Grid,
  Typography as MuiTypography,
  IconButton,
  Tooltip,
} from "@material-ui/core/index";
import Divider from '../../components/Divider';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { spacing } from "@material-ui/system/index";

const Card = styled(MuiCard)`
  border-radius: 10px;
`;

const CardContent = styled(MuiCardContent)`
  border-radius: 10px;
  min-height: 195px;
  display: flex;
  flex-direction: column;
  position: relative; /* Added */
`;

const Typography = styled(MuiTypography)(spacing);

const Text = styled(MuiTypography)``;

const DeleteIconButton = styled(IconButton)`
  color: ${props => props.theme.palette.delete.main};
`;

export default function EvaluationCard({ evaluation, id, onDelete }) {
  return (
    <Card mb={6}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <Text gutterBottom variant="h6" component="h2">
              {evaluation.name.en}
            </Text>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Delete">
              <DeleteIconButton aria-label="delete" onClick={()=>onDelete(id)}>
                <DeleteOutlineIcon fontSize="small" />
              </DeleteIconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={11}>
            {evaluation.list.map((item, index) => (
              <Typography key={index} variant="body2" gutterBottom style={{ paddingLeft: 4 }}>
                {index + 1}. {item}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
