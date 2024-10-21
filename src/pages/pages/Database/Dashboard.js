import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import CurrentPricesCard from './CurrentPricesCard';
import ChartsContainer from './ChartsContainer';
import TokenToolbar from './TokenToolbar';  // Import the new TokenToolbar component
import FearGreedIndicator from './FearGreedIndicator';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  customCard: {
    margin: theme.spacing(1),
  },
}));

const Dashboard = ({ evaluations, subjects }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState('BTC');  // State for selected token
  const [favoriteTokens, setFavoriteTokens] = useState(['BTC', 'ETH']);   // Array of favorite tokens


  // Market Cap data (hardcoded for this example, you would fetch this from an API)
  const marketCapData = [
    { token: 'BTC', marketCap: 800000000000 },
    { token: 'ETH', marketCap: 400000000000 },
    { token: 'ADA', marketCap: 50000000000 },
    { token: 'BNB', marketCap: 70000000000 },
    { token: 'SOL', marketCap: 30000000000 },
  ];

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={8}>
        {/* Token Selection Toolbar */}
        <TokenToolbar 
          selectedToken={selectedToken} 
          onTokenChange={setSelectedToken} 
          favoriteTokens={favoriteTokens} 
          setFavoriteTokens={setFavoriteTokens}  // Pass favorite tokens state handler
        />
      </Grid>

      {/* Chart and Current Prices */}
      <Grid item xs={12} md={8}>
        <ChartsContainer 
          selectedToken={selectedToken}  // Pass selected token to ChartsContainer
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CurrentPricesCard favoriteTokens={favoriteTokens} />  {/* Pass favorite tokens to CurrentPricesCard */}
        <FearGreedIndicator value={65} />
      </Grid>

    </Grid>
  );
};

export default Dashboard;