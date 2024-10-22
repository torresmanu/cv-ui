import React from 'react';
import { Box, Card, Container, Typography } from '@material-ui/core';
import { alpha, styled, useTheme } from '@material-ui/core/styles';

// Import your images
import predictionIcon from '../../../images/prediction.png';
import statsIcon from '../../../images/stats.png';
import chartsIcon from '../../../images/charts.png';

// Define your card styles with styled API
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 320,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    borderRadius: 20,
    boxShadow: theme.shadows[12],
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
    },
    '&.cardLeft, &.cardRight': {
      backgroundColor: alpha(theme.palette.grey[50], 0.7), // Make left and right cards very light
      boxShadow: `0px 0px 20px ${shadowCard(0.05)}`, // Subtle shadow for light cards
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// Define your main cards
const CARDS = [
  {
    icon: statsIcon,
    title: 'Statistics',
    description: 'Analyze historical data and gain insights from market statistics.',
  },
  {
    icon: predictionIcon,
    title: 'Prediction Models',
    description: 'Leverage cutting-edge models to predict crypto prices and trends.',
  },
  {
    icon: chartsIcon,
    title: 'Charts & Usability',
    description: 'Interactive and customizable charts for seamless data visualization.',
  },
];

// Main component
export default function FeaturesSection() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box sx={{ pt: 15, pb: { md: 15 } }} bgcolor="#f0f2f5">
      <Container>
        <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 25 } }}>
          <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
            CryptoVoice
          </Typography>
          <Typography variant="h2">Our Key Features</Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <CardStyle
              key={card.title}
              className={
                (index === 0 && 'cardLeft') || 
                (index === 1 && 'cardCenter') || 
                (index === 2 && 'cardRight')
              }
            >
              <img
                src={card.icon}
                alt={card.title}
                style={{
                  marginBottom: 40,
                  marginTop: 40,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: 60,
                  height: 60,
                  filter: `drop-shadow(2px 2px 2px ${alpha(theme.palette.primary.main, 0.48)})`,
                }}
              />
              <Typography variant="h5" paragraph>
                {card.title}
              </Typography>
              <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                {card.description}
              </Typography>
            </CardStyle>
          ))}
        </Box>
        <br />
        <br />
      </Container>
    </Box>
  );
}