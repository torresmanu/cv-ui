import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoNews } from '../../../redux/store/binanceNewsSlice';
import styled, { keyframes } from 'styled-components';
import { Tooltip, CircularProgress, Typography, useMediaQuery } from '@material-ui/core';

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const CarouselContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  position: relative;
  margin-bottom: 30px;
`;

const CarouselContent = styled.div`
  display: inline-block;
  padding: 10px 0;
  animation: ${scrollAnimation} ${({ duration }) => duration}s linear infinite;
  display: flex;
  align-items: center;
  width: 100%;
`;

const NewsItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  color: white;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Carousel = () => {
  const dispatch = useDispatch();
  const { data: newsArticles, status, error } = useSelector((state) => state.cryptoNews);
  const carouselContentRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [animationDuration, setAnimationDuration] = useState(30); // Default duration

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCryptoNews());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (carouselContentRef.current && newsArticles.length > 0) {
      const contentWidth = carouselContentRef.current.scrollWidth;
      const viewportWidth = carouselContentRef.current.parentElement.offsetWidth;
      const speedPerPixel = isMobile ? 0.02 : 0.05; // Increase speed on mobile
      let calculatedDuration = (contentWidth / viewportWidth) * speedPerPixel;

      if (isMobile) {
        calculatedDuration = Math.max(15, calculatedDuration); // Ensure it's fast enough on mobile
      } else {
        calculatedDuration = Math.max(30, calculatedDuration); // Ensure minimum duration on desktop
      }

      setAnimationDuration(calculatedDuration);
    }
  }, [newsArticles, isMobile]);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error loading news: {error}</Typography>;
  if (!newsArticles.length) return <Typography>No news available.</Typography>;

  return (
    <CarouselContainer>
      <CarouselContent ref={carouselContentRef} duration={animationDuration}>
        {[...newsArticles, ...newsArticles].map((article, index) => (
          <Tooltip key={index} title={`Read on ${article.username}`} arrow placement="top">
            <a 
              href={article.newsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <NewsItem>
                <span>
                  <strong>{article.username}</strong>: {article.text.slice(0, 100)}...
                </span>
              </NewsItem>
            </a>
          </Tooltip>
        ))}
      </CarouselContent>
    </CarouselContainer>
  );
};

export default Carousel;