import React from 'react';
import { Box, Avatar, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '100px', // Adjust height as needed
    backgroundColor: '#1E2329',
  },
  coinCard: {
    display: 'inline-block',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: '#2C2F36',
    borderRadius: '50%',
    width: '60px', // Adjust size as needed
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
}));

const coinData = [
  { id: 1, src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', name: 'BTC' },
  { id: 2, src: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', name: 'ETH' },
  { id: 3, src: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png', name: 'BNB' },
  { id: 4, src: 'https://cryptologos.cc/logos/cardano-ada-logo.png', name: 'ADA' },
  { id: 5, src: 'https://cryptologos.cc/logos/solana-sol-logo.png', name: 'SOL' },
  // Add more coins as needed
];

const FramerCoinCarousel = () => {
  const classes = useStyles();

  return (
    <Box className={classes.carouselContainer}>
      <motion.div
        style={{ display: 'flex' }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'linear',
        }}
      >
        {[...coinData, ...coinData].map((coin) => (
          <Box key={coin.id + Math.random()} className={classes.coinCard}>
            <Avatar src={coin.src} alt={coin.name} className={classes.avatar} />
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default FramerCoinCarousel;