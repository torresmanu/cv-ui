import React from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import btcImage from '../../../images/btc.png';
import ethImage from '../../../images/eth.png';
import adaImage from '../../../images/ada.png';
import linkImage from '../../../images/link.png';
import ltcImage from '../../../images/ltc.png';
import bnbImage from '../../../images/bnb.png';
import maticImage from '../../../images/matic.png';
import solImage from '../../../images/sol.png';
import { useHistory } from 'react-router-dom';  // Import useHistory  

// Sample token images
const tokenImages = {
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  ETH: ethImage,
  ADA: adaImage,
  LINK: linkImage,
  LTC: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
  BNB: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
};
const TokenToolbar = ({ selectedToken, onTokenChange }) => {
  const history = useHistory();  // Initialize useHistory for navigation

  const availableTokens = Object.keys(tokenImages);

  const handleClick = () => {
    history.push('/auth/sign-in');  // Redirect to dashboard
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: '20px', marginTop: '20px' }}>
        {availableTokens.map((token) => (
          <Grid item key={token} style={{ position: 'relative' }}>
            <Button
              onClick={() => onTokenChange(token)}
              className={selectedToken === token ? 'selectedToken' : ''}
              style={{
                filter: token !== 'BTC' ? 'blur(5px)' : 'none', // Apply blur to all except BTC
                pointerEvents: token === 'BTC' ? 'auto' : 'none', // Disable clicks on blurred tokens
                position: 'relative',
              }}
            >
              <img
                src={tokenImages[token]}
                alt={token}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="caption" align="center" style={{ marginLeft: '10px', marginRight: '10px' }}>
                {token}
              </Typography>
            </Button>

          </Grid>
        ))}
        <Grid item xs={12} md={3} style={{marginLeft: 'auto'}}>
        <Button className="premiumButton" fullWidth onClick={handleClick} >Go Premium</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TokenToolbar;