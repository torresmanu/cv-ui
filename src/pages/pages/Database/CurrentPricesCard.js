import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import btcImage from '../../../images/btc.png';
import ethImage from '../../../images/eth.png';
import adaImage from '../../../images/ada.png';
import linkImage from '../../../images/link.png';
import ltcImage from '../../../images/ltc.png';
import bnbImage from '../../../images/bnb.png';
import maticImage from '../../../images/matic.png';
import solImage from '../../../images/sol.png';

// Sample prices and changes (you can replace these with real-time data)
const tokenPrices = {
  BTC: { price: '$45,000', change: '-1.23%' },
  ETH: { price: '$3,500', change: '+2.45%' },
  ADA: { price: '$1.25', change: '+0.65%' },
  LINK: { price: '$25', change: '-0.75%' },
  LTC: { price: '$180', change: '+1.32%' },
  BNB: { price: '$400', change: '+3.45%' },
  MATIC: { price: '$1.50', change: '-2.00%' },
  SOL: { price: '$150', change: '+4.12%' },
};

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

const CurrentPricesCard = ({ favoriteTokens }) => {
  return (
    <Card className="customCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Favorite Tokens
        </Typography>
        <Typography variant="body2" gutterBottom>
        Last 24hs.
        </Typography>

        {/* Loop through favorite tokens */}
        {favoriteTokens.length > 0 ? (
          <Grid container spacing={2}>
            {favoriteTokens.map((token) => {
              const { price, change } = tokenPrices[token];
              const isPositiveChange = change.startsWith('+');
              const iconColor = isPositiveChange ? 'rgba(45, 177, 23, 1)' : 'rgba(231, 48, 81, 1)';
              const iconBackgroundColor = isPositiveChange ? 'rgba(213, 239, 209, 1)' : 'rgba(253, 229, 233, 1)';

              return (
                <Grid item key={token} xs={12} sm={6}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <img
                        src={tokenImages[token]} // Display token image
                        alt={token}
                        style={{ width: 40, height: 40 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{token}</Typography>
                      <Typography variant="body1">{price}</Typography>
                      <Box display="flex" alignItems="center" mt={1}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="50%"
                          width={24} 
                          height={24}  
                          style={{ backgroundColor: iconBackgroundColor }}
                        >
                          <Icon
                            width={12} 
                            height={12}  
                            icon={isPositiveChange ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
                            style={{ color: iconColor }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          style={{
                            color: isPositiveChange ? 'green' : 'red',
                            fontWeight: 500,
                            marginLeft: '4px',  // Reduce space between icon and text
                            fontSize: '0.85rem' // Slightly smaller text size
                          }}
                        >
                          {change}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="body2">No favorite tokens selected.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentPricesCard;