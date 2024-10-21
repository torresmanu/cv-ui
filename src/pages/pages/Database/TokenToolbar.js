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

  // Handle favorite toggle for the selected token
  const handleFavoriteToggle = () => {
    if (favoriteTokens.includes(selectedToken)) {
      // Remove from favorites if already a favorite
      setFavoriteTokens(favoriteTokens.filter(token => token !== selectedToken));
    } else {
      // Add to favorites if not a favorite
      setFavoriteTokens([...favoriteTokens, selectedToken]);
    }
  };

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

        {/* Favorite Button */}
        <Grid item>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              onClick={handleFavoriteToggle}
              aria-label="favorite"
              style={{
                backgroundColor: '#f1f1f1',
                padding: 10,
                borderRadius: '50%',
                marginLeft: '10px',  // Add some space from the token icons
              }}
            >
              {favoriteTokens.includes(selectedToken) ? (
                <Star style={{ color: '#ffcc00', width: 30, height: 30 }} /> // Filled star for favorite
              ) : (
                <StarBorder style={{ width: 30, height: 30 }} /> // Outline star for non-favorite
              )}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default TokenToolbar;