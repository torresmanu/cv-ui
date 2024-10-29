import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Box, LinearProgress, Tooltip } from '@material-ui/core';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup'; // Import CountUp for animation
import emoticonHappyOutline from '@iconify/icons-mdi/emoticon-happy-outline';
import sadFaceIcon from '@iconify-icons/mdi/emoticon-sad-outline';
import { Card, CardContent } from '@material-ui/core';

const FearGreedIndicator = ({ value }) => {
  // Define the current state: "Fear" (0-50) or "Greed" (51-100)
  const isFear = value <= 50;
  
  return (
    <Card className="customCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
        Fear & Greed Index
        </Typography>
        <Typography variant="body2" gutterBottom style={{marginBottom: 30}}>
          Powered by CryptoVoice classification model
        </Typography>
          <Grid container spacing={5}>
                <Grid item  xs={12}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Icon
                        icon={isFear ? sadFaceIcon : emoticonHappyOutline}
                        style={{ width: 58, height: 58, marginRight: 10, color: isFear ? '#FF3333' : '#2AAE6F' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Greed Mood</Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: isFear ? '#FF3333' : '#2AAE6F',
                            fontWeight: 500,
                            fontSize: '0.85rem', // Slightly smaller text size
                          }}
                        >
                          {value}%
                        </Typography>
                    </Grid>
                  </Grid>
                </Grid>
          </Grid>
      </CardContent>
    </Card>
  );
};

export default FearGreedIndicator;