import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ethImage from '../../../images/eth.png';

const coins = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67759.94,
    change: 0.8,
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', 
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2492.0,
    change: 0.15,
    logo: ethImage,
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 586.6,
    change: -0.36,
    logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 176.97,
    change: 2.64,
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
];

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#1E2329',
    color: 'white',
    borderRadius: 12,
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
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
  changePositive: {
    color: '#0DCB81',
  },
  changeNegative: {
    color: '#FF3333',
  },
  blurOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    width: '100%',
    height: '60%',
    background: 'linear-gradient(to bottom, rgba(30, 35, 41, 0) 0%, rgba(30, 35, 41, 0.1) 30%, rgba(30, 35, 41, 0.8) 100%)',
    backdropFilter: 'blur(9px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    }
}));

const TopGainersCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box className={classes.header}>
          <Typography variant="h6">Top Gainers</Typography>
        </Box>
        {coins.map((coin, index) => (
          <Box key={coin.symbol} className={classes.coinRow} style={index > 0 ? { opacity: 0.4 } : {}}>
            <Box className={classes.coinInfo}>
              <Avatar src={coin.logo} alt={coin.symbol} className={classes.coinLogo} />
              <Typography className={classes.coinName}>{coin.symbol}</Typography>
            </Box>
            <Typography className={classes.priceColumn}>${coin.price.toLocaleString()}</Typography>
            <Typography
              className={classes.changeColumn}
              style={{ color: coin.change >= 0 ? '#2AAE6F' : '#FF3333' }}
            >
              {coin.change >= 0 ? '+' : ''}
              {coin.change.toFixed(2)}%
            </Typography>
          </Box>
        ))}
      </CardContent>
      <Box className={classes.blurOverlay}>
        <Button className="premiumButton" style={{ width: "50%" }}>Go Premium</Button>
      </Box>
    </Card>
  );
};

export default TopGainersCard;