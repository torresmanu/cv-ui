import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';
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
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  ETH: ethImage,
  ADA: adaImage,
  LINK: linkImage,
  LTC: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
  BNB: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  MATIC: maticImage,
  SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
};

const CurrentPricesCard = ({ favoriteTokens }) => {
  return (
    <Card className="customCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Favorite Tokens
        </Typography>
        <Typography variant="body2" gutterBottom style={{marginBottom: 30}}>
          Last 24hs.
        </Typography>

        {/* Loop through favorite tokens */}
        {favoriteTokens.length > 0 ? (
          <Grid container spacing={5}>
            {favoriteTokens.map((token) => {
              const { price, change } = tokenPrices[token];
              const isPositiveChange = change.startsWith('+');

              return (
                <Grid item key={token} xs={6} sm={6}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <img
                        src={tokenImages[token]} // Display token image
                        alt={token}
                        style={{ width: 50, height: 50, marginRight: 10 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{token}</Typography>
                        <Typography variant="body2">{price}</Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: isPositiveChange ? '#2AAE6F' : '#FF3333',
                            fontWeight: 500,
                            fontSize: '0.85rem', // Slightly smaller text size
                          }}
                        >
                          {change}
                        </Typography>
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