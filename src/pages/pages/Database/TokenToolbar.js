import React from 'react';
import { Grid, IconButton, Typography, Box } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons'; // Star icons for favorite
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
  BTC: btcImage,
  ETH: ethImage,
  ADA: adaImage,
  LINK: linkImage,
  LTC: ltcImage,
  BNB: bnbImage,
  MATIC: maticImage,
  SOL: solImage,
};

const TokenToolbar = ({ selectedToken, onTokenChange, favoriteTokens, setFavoriteTokens }) => {
  const availableTokens = Object.keys(tokenImages);


  return (
    <div>
      {/* Token Selection as icons */}
      <Grid container spacing={2} style={{ marginBottom: '20px', marginTop: '20px' }}>
        {availableTokens.map((token) => (
          <Grid item key={token}>
            <IconButton onClick={() => onTokenChange(token)}>
              <img
                src={tokenImages[token]} // Use the token image for each button
                alt={token}
                style={{
                  width: 40,
                  height: 40,
                  border: selectedToken === token ? '2px solid #1976d2' : 'none', // Highlight selected token
                  borderRadius: '50%', // Make it circular
                }}
              />
            </IconButton>
            <Typography variant="caption" align="center">{token}</Typography> {/* Label below each icon */}
          </Grid>
        ))}

      </Grid>
    </div>
  );
};

export default TokenToolbar;