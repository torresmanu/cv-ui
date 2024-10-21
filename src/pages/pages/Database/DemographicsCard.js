import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const DemographicsCard = ({ demographicsData }) => {
  const {
    sexDistribution,
    maritalStatusDistribution,
    residentialAreaDistribution,
  } = demographicsData;

  return (
    <Card className='customCard'>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Demographic Statistics
        </Typography>

        {/* Sex Distribution */}
        <Typography variant="subtitle1" style={{ marginTop: '1em' }}>
          Sex Distribution:
        </Typography>
        <List dense>
          {sexDistribution !== undefined ? Object.entries(sexDistribution)?.map(([sex, percentage]) => (
            <ListItem key={sex}>
              <ListItemText primary={`${sex}: ${percentage}%`} />
            </ListItem>
          ))
        :
          <ListItem>
            <ListItemText primary="No data available" />
          </ListItem>
        }
        </List>

        {/* Marital Status Distribution */}
        <Typography variant="subtitle1" style={{ marginTop: '1em' }}>
          Marital Status Distribution:
        </Typography>
        <List dense>
          {sexDistribution !== undefined ? Object.entries(maritalStatusDistribution)?.map(
            ([status, percentage]) => (
              <ListItem key={status}>
                <ListItemText primary={`${status}: ${percentage}%`} />
              </ListItem>
            )
          ) :
            <ListItem>
              <ListItemText primary="No data available" />
            </ListItem>
          }
        </List>

        {/* Residential Area Distribution */}
        <Typography variant="subtitle1" style={{ marginTop: '1em' }}>
          Residential Area Distribution:
        </Typography>
        <List dense>
          {sexDistribution !== undefined ? Object.entries(residentialAreaDistribution)?.map(
            ([area, percentage]) => (
              <ListItem key={area}>
                <ListItemText primary={`${area}: ${percentage}%`} />
              </ListItem>
            )
          ) : 
            <ListItem>
              <ListItemText primary="No data available" />
            </ListItem>
          }
        </List>
      </CardContent>
    </Card>
  );
};

export default DemographicsCard;