import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box, Avatar, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTopGainers } from '../../../redux/store/topGainersSlice';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#1E2329',
    color: 'white',
    borderRadius: 12,
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  coinRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
  },
  coinInfo: {
    display: 'flex',
    alignItems: 'center',
    flex: 2,
  },
  coinLogo: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(2),
  },
  coinName: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  priceColumn: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 600,
  },
  changeColumn: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 600,
  },
}));

const TopGainersCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Retrieve top gainers data and status from the Redux store
  const { data: topGainers, status, error } = useSelector((state) => state.topGainers);

  // Dispatch fetchTopGainers thunk on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopGainers());
    }
  }, [dispatch, status]);

  return (
    <Card className="customCard">
      <CardContent>
        <Box className={classes.header}>
          <Typography variant="h6">Top Gainers</Typography>
        </Box>

        {status === 'loading' && (
          <Box>
            <Typography variant="body2">Loading top gainers...</Typography>
            <LinearProgress />
          </Box>
        )}

        {status === 'failed' && (
          <Typography variant="body2" style={{ color: 'red' }}>
            {error || 'Failed to load top gainers data'}
          </Typography>
        )}

        {status === 'succeeded' &&
          topGainers.map((coin) => (
            <Box key={coin.id} className={classes.coinRow}>
              <Box className={classes.coinInfo}>
                <Avatar src={coin.image} alt={coin.symbol} className={classes.coinLogo} />
                <Typography className={classes.coinName}>
                  {coin.symbol.toUpperCase()}
                </Typography>
              </Box>
              <Typography className={classes.priceColumn}>
                ${coin.price.toLocaleString()}
              </Typography>
              <Typography
                className={classes.changeColumn}
                style={{ color: parseFloat(coin.change) >= 0 ? '#2AAE6F' : '#FF3333' }}
              >
                {parseFloat(coin.change) >= 0 ? '+' : ''}
                {parseFloat(coin.change).toFixed(2)}%
              </Typography>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

export default TopGainersCard;