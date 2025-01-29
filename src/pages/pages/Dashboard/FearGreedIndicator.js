import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, LinearProgress, Card, CardContent } from '@material-ui/core';
import { Icon } from '@iconify/react';
import emoticonHappyOutline from '@iconify/icons-mdi/emoticon-happy-outline';
import sadFaceIcon from '@iconify-icons/mdi/emoticon-sad-outline';
import { fetchSentimentData } from '../../../redux/store/sentimentSlice';

const FearGreedIndicator = () => {
  const dispatch = useDispatch();
  const { data: sentimentData, status, error } = useSelector((state) => state.sentiment);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSentimentData());
    }
  }, [dispatch, status]);

  const latestData = sentimentData.length > 0 ? sentimentData[0] : null;

  return (
    <Card className="customCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fear & Greed Index
        </Typography>
        <Typography variant="body2" gutterBottom style={{ marginBottom: 30 }}>
          Powered by Alternative.me API
        </Typography>

        {status === 'loading' ? (
          <Box>
            <Typography variant="body2">Loading sentiment data...</Typography>
            <LinearProgress />
          </Box>
        ) : status === 'failed' ? (
          <Typography variant="body2" style={{ color: 'red' }}>
            {error || 'Failed to load sentiment data'}
          </Typography>
        ) : latestData ? (
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Icon
                icon={latestData.value <= 50 ? sadFaceIcon : emoticonHappyOutline}
                style={{
                  width: 58,
                  height: 58,
                  marginRight: 10,
                  color: latestData.value <= 50 ? '#FF3333' : '#2AAE6F',
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {latestData.value <= 50 ? 'Fear Mood' : 'Greed Mood'}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: latestData.value <= 50 ? '#FF3333' : '#2AAE6F',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                {latestData.value}% - {latestData.classification}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">No data available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FearGreedIndicator;