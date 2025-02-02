import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoNews } from '../../../redux/store/newsSlice';
import { Grid, Card, CardContent, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import '../../../App.css';

const NewsCard = ({ imageUrl, title, description, newsLink, handleNext, handlePrevious }) => {
  return (
    <Card className="news-card">
      <IconButton onClick={handlePrevious} className="news-arrows news-arrow-left">
        <ArrowBackIos style={{ color: 'white' }} />
      </IconButton>

      <CardContent>
        <Grid container spacing={5} className="news-card-content">
          <Grid item md={4} xs={12}>
            <img src={imageUrl} alt={title} className="news-image" />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" className="news-description">
              {description.length > 350 ? `${description.slice(0, 350)}...` : description}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => window.open(newsLink, '_blank', 'noopener,noreferrer')}
              className="news-button"
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <IconButton onClick={handleNext} className="news-arrows news-arrow-right">
        <ArrowForwardIos style={{ color: 'white' }} />
      </IconButton>
    </Card>
  );
};

const NewsSection = () => {
  const dispatch = useDispatch();
  const { data: newsData, status, error } = useSelector((state) => state.news);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCryptoNews());
    }
  }, [dispatch, status]);

  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  const handlePrevious = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));

  if (status === 'loading') return <div className="loading-spinner"><CircularProgress /></div>;
  if (status === 'failed') return <Typography className="error-message">Error loading news: {error}</Typography>;
  if (!newsData.length) return <Typography className="error-message">No news available.</Typography>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <NewsCard
          imageUrl={newsData[currentIndex].imageUrl}
          title={newsData[currentIndex].title}
          description={newsData[currentIndex].description}
          newsLink={newsData[currentIndex].newsLink}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </Grid>
    </Grid>
  );
};

export default NewsSection;