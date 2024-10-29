// DataCard.js

import React from 'react';
import { Card, CardContent, Typography, Grid, Button, List, ListItem, ListItemIcon } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

function DataCard({ title, dataCount, dataType, data, handleCSVDownload, handleDownload }) {
  return (
    <Card className="customCard">
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              {dataType === 'evaluations' ? <AssignmentOutlinedIcon /> : <PeopleAltOutlinedIcon />}
            </ListItemIcon>
            <Typography>
              Retrieved {title}: {dataCount}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleDownload(data, dataType)}
              disabled={dataCount === 0}
            >
              Download JSON
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleCSVDownload(data, dataType)}
              disabled={dataCount === 0}
            >
              Download CSV
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DataCard;