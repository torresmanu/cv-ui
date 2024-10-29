import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import btcNews from '../../../images/Bitcoin_modern.png'; // Import your image
import styled from 'styled-components';

const newsData = [
  {
    imageUrl: btcNews,
    title: 'Latest Crypto News: Bitcoin Hits All-Time High',
    description:
      'Researchers at Shanghai University recently claimed to have made a significant breakthrough by cracking RSA encryption algorithms used in banking, military, and cryptocurrency sectors...',
    newsLink: 'https://cryptonews.com/',
  },
  {
    imageUrl: btcNews,
    title: 'Ethereum Soars After Upgrade',
    description:
      'The latest Ethereum upgrade has sent the price soaring...',
    newsLink: 'https://cryptonews.com/ethereum',
  },
  // Add more news items here
];

const StyledCard = styled(Card)`
  position: relative;
  &:hover .arrows {
    opacity: 1;
  }
`;

const ArrowContainer = styled(Grid)`
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const NewsCard = ({ imageUrl, title, description, newsLink, handleNext, handlePrevious }) => {
  return (
    <StyledCard className="customCard">
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <ArrowContainer item md={1} className="arrows">
                <IconButton onClick={handlePrevious}>
                  <ArrowBackIos style={{ color: 'white' }} />
                </IconButton>
              </ArrowContainer>
              <Grid item md={4} xs={12}>
                <img src={imageUrl} alt={title} style={{ width: '100%' }} />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="h6" style={{ marginBottom: '20px' }}>
                  {title}
                </Typography>
                <Typography variant="body2">{description}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => window.open(newsLink, '_blank', 'noopener,noreferrer')}
                  style={{ padding: '0px 50px', height: '31px', marginTop: '30px' }} // Adjust padding as needed
                >
                  Read More
                </Button>
              </Grid>
              <ArrowContainer item md={1} className="arrows">
                <IconButton onClick={handleNext}>
                  <ArrowForwardIos style={{ color: 'white' }} />
                </IconButton>
              </ArrowContainer>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length); // Loop back to the first news
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));
  };

  const currentNews = newsData[currentIndex];

  return (
    <Grid container>
      <Grid item xs={12}>
        <NewsCard
          imageUrl={currentNews.imageUrl}
          title={currentNews.title}
          description={currentNews.description}
          newsLink={currentNews.newsLink}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </Grid>
    </Grid>
  );
};

export default NewsSection;