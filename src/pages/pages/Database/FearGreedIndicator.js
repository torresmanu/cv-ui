import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Box, LinearProgress, Tooltip } from '@material-ui/core';
import { Icon } from '@iconify/react';
import emoticonHappyOutline from '@iconify/icons-mdi/emoticon-happy-outline';
import sadFaceIcon from '@iconify-icons/mdi/emoticon-sad-outline';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill'; // Bearish Icon
import trendingUpFill from '@iconify/icons-eva/trending-up-fill'; // Bullish Icon

const Container = styled.div`
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3); /* Add transparency */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  color: white;
`;

const LinearProgressWithLabel = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" style={{ color: '#fff' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const FearGreedIndicator = ({ value }) => {
  // Define the current state: "Fear" (0-50) or "Greed" (51-100)
  const isFear = value <= 50;
  
  return (
    <Container style={{ marginTop: '1em' }}>
      {/* Title with Tooltip for explanation */}
      <Tooltip title="Our classification model calculates this index from news and social media data" arrow>
        <Typography variant="h5" gutterBottom>
          Fear & Greed Index
        </Typography>
      </Tooltip>

      {/* Subtitle explaining the model */}
      <Typography variant="body2" style={{ marginBottom: '1em', fontStyle: 'italic' }}>
        This index is calculated using news and social media data.
      </Typography>

      <Box mb={3}>
        <Tooltip title={isFear ? "Fear" : "Greed"} arrow>
          <Icon
            icon={isFear ? sadFaceIcon : emoticonHappyOutline}
            width="64"
            height="64"
            style={{ color: isFear ? 'red' : 'green' }}
          />
        </Tooltip>
        <Typography variant="h6">
          {isFear ? "Fear" : "Greed"} Mode
        </Typography>
      </Box>

      {/* Progress bar for Fear & Greed */}
      <LinearProgressWithLabel value={value} style={{ backgroundColor: '#eee' }} />

      {/* Market Sentiment */}
      <Grid container justify="center" spacing={2} style={{ marginTop: '1em' }}>
        <Grid item>
        <Box display="flex" alignItems="center">
          <Icon
            icon={trendingDownFill}
            width="40"
            height="40"
            style={{ color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.2)', borderRadius: '50%', padding: '5px', marginRight: '8px' }}
          />
          <Typography variant="caption">Bearish</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <Icon
              icon={trendingUpFill}
              width="40"
              height="40"
              style={{ color: 'green', backgroundColor: 'rgba(0, 255, 0, 0.2)', borderRadius: '50%', padding: '5px', marginRight: '8px' }} // Added marginRight for spacing
            />
            <Typography variant="caption">Bullish</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FearGreedIndicator;