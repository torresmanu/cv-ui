import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import btcImage from '../../../images/btc.png';
import ethImage from '../../../images/eth.png';
import adaImage from '../../../images/ada.png';
import linkImage from '../../../images/link.png';
import ltcImage from '../../../images/ltc.png';
import bnbImage from '../../../images/bnb.png';
import maticImage from '../../../images/matic.png';
import solImage from '../../../images/sol.png';

// Sample token images
const tokenImages = {
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  ETH: ethImage,
  ADA: adaImage,
  LINK: linkImage,
  LTC: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
  BNB: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  MATIC: maticImage,
  SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
};

const TokenToolbar = ({ selectedToken, onTokenChange }) => {
  const availableTokens = Object.keys(tokenImages);

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '20px', marginTop: '20px' }}>
        {availableTokens.map((token) => (
          <Grid item key={token}>
            <Button
              onClick={() => onTokenChange(token)}
              className={selectedToken === token ? 'selectedToken' : ''}
            >
              <img
                src={tokenImages[token]} // Use the token image for each button
                alt={token}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%', // Keep the image circular
                }}
              />
              <Typography variant="caption" align="center" style={{ marginLeft: '10px', marginRight: '10px' }}>
                {token}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TokenToolbar;