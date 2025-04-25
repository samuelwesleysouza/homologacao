import React, { useEffect, useState } from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Importar as imagens
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bj2.jpg';
import bg3 from '../../assets/images/bg3.jpg';
import bg4 from '../../assets/images/bg4.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BackgroundImage = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  animation: `${isActive ? fadeIn : fadeOut} 1s ease-in-out`,
  opacity: isActive ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

const backgrounds = [
  bg1,
  bg2,
  bg3,
  bg4
];

const AnimatedBackground: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {backgrounds.map((bg, index) => (
        <BackgroundImage
          key={bg}
          isActive={index === currentIndex}
          sx={{
            backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(0, 31, 63, 0.95)), url(${bg})`,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
    </>
  );
};

export default AnimatedBackground;
