import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import btcNews from '../../../images/Bitcoin_modern.png'

const NewsCard = ({ imageUrl, title, description, newsLink }) => {
  return (
    <Card className="customCard">
    <CardContent>
        <Grid container spacing={5}>
              <Grid item  xs={12}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item md={5} xs={12}>
                  <img
                        src={btcNews} // Display token image
                        alt="bitcoin_news"
                      />
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <Typography variant="h6" style={{ marginBottom: '20px' }}>
                      {title}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => window.open(newsLink, '_blank', 'noopener,noreferrer')}
                      style={{ padding: '0px 50px', height:'31px', marginTop: '30px' }} // Adjust padding as needed
                    >
                      Read More
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
        </Grid>
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