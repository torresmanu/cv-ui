import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import btcNews from '../../../images/btc_news.webp'

const useStyles = makeStyles((theme) => ({
    newsCard: {
      display: 'flex',
      width: '100%',
      marginBottom: theme.spacing(4),
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[3],
    },
    media: {
      width: '33%', // 1/3 of the card for the image
      minHeight: 300,
    },
    content: {
      padding: theme.spacing(8),
      flex: '1',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))', // Added gradient
      color: 'black'
    },
    description: {
      marginTop: theme.spacing(8),
      color: 'black',
    },
    button: {
      marginTop: theme.spacing(8),
    },
  }));

const NewsCard = ({ imageUrl, title, description, newsLink }) => {
  const classes = useStyles();

  return (
    <Card className={classes.newsCard}>
      {/* Left side: Image */}
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={title}
      />

      {/* Right side: Text */}
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          href={newsLink}
          target="_blank"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

const NewsSection = () => {
  const news = {
    imageUrl: btcNews,
    title: 'Latest Crypto News: Bitcoin Hits All-Time High',
    description:
'Researchers at Shanghai University recently claimed to have made a significant breakthrough by cracking RSA encryption algorithms used in banking, military, and cryptocurrency sectors.However, popular YouTuber Mental Outlaw has cast doubt on the impact of this discovery, citing several limitations that make it unlikely to affect current encryption standards.The breakthrough, according to the research paper, involved a quantum computer that factorized the integer 2,269,753, a notable achievement that surpasses previous quantum computing records.',
    newsLink: 'https://cryptonews.com/',
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <NewsCard
          imageUrl={news.imageUrl}
          title={news.title}
          description={news.description}
          newsLink={news.newsLink}
        />
      </Grid>
    </Grid>
  );
};

export default NewsSection;