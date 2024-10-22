import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Tooltip } from '@material-ui/core';

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
`;

const CarouselContent = styled.div`
  display: inline-block;
  padding: 10px 0;
  animation: ${scrollAnimation} ${({ duration }) => duration*100}s linear infinite;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TweetContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

// Tweets data (hardcoded)
const tweets = [
  { username: 'ElonMusk', text: 'This is a sample tweet about crypto markets.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { username: 'CryptoUser', text: 'Breaking news! Crypto is going up fast! Stay tuned.', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { username: 'finance', text: 'CryptoVoice predicts that BTC will rise by 5%.', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { username: 'Binance', text: 'Here’s my analysis on ETH. Let’s see what happens next.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { username: 'iLoveUPC', text: 'CryptoVoice TFM is awesome! Take a look at', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { username: 'CryptoUser', text: 'Breaking news! Crypto is going up fast! Stay tuned.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { username: 'finance', text: 'CryptoVoice predicts that BTC will rise by 5%.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { username: 'Binance', text: 'Here’s my analysis on ETH. Let’s see what happens next.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
];

const Carousel = () => {
  const carouselContentRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(45); // Initial duration

  useEffect(() => {
    // Adjust the animation duration based on the content width
    if (carouselContentRef.current) {
      const contentWidth = carouselContentRef.current.scrollWidth;
      const viewportWidth = carouselContentRef.current.parentElement.offsetWidth;
      const speedPerPixel = 0.05; // Adjust this value to control speed
      const calculatedDuration = (contentWidth / viewportWidth) * speedPerPixel;
      setAnimationDuration(calculatedDuration);
    }
  }, [carouselContentRef]);

  return (
    <CarouselContainer>
    <CarouselContent ref={carouselContentRef} duration={animationDuration}>
        {[...tweets, ...tweets].map((tweet, index) => (
        <Tooltip 
            key={index} 
            title={`Go to @${tweet.username} account on X (Twitter)`} 
            arrow  // Optional: adds an arrow to the tooltip
            placement="top"  // Position the tooltip at the top
        >
            <a 
            href={`https://twitter.com/${tweet.username}`}  // Link to the Twitter profile
            target="_blank"  // Opens in a new tab
            rel="noopener noreferrer"  // For security reasons
            style={{ textDecoration: 'none', color: 'inherit' }}  // No underline, inherit text color
            >
            <TweetContainer>
                <Avatar src={tweet.avatar} alt={`${tweet.username} avatar`} />
                <span>
                <strong>@{tweet.username}</strong>: {tweet.text.slice(0, 100)}...
                </span>
            </TweetContainer>
            </a>
        </Tooltip>
        ))}
    </CarouselContent>
    </CarouselContainer>
  );
};

export default Carousel;