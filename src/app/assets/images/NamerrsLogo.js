import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import namerrsPathData from './path'; 
import '../../../styles/components/hero/hero.scss'
const NamerrsLogo = () => {
  const pathLength = 5000; 
  const colors = [
    '#1E90FF', // Dodger Blue
    '#00CED1', // Dark Turquoise
    '#8A2BE2', // Blue Violet
    '#DA70D6', // Orchid
    '#1C2526', // Dark Slate Gray
    '#A9A9A9', // Dark Gray
    '#1E90FF', // Loop back to blue
  ];

  const { offset } = useSpring({
    from: { offset: 0 },
    to: { offset: pathLength },
    loop: true,
    config: { duration: 3000 },
  });

  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 1280 900"
      xmlns="http://www.w3.org/2000/svg"
      className="heroIcon"
    >
      <defs>
        <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="20%" stopColor={colors[1]} />
          <stop offset="40%" stopColor={colors[2]} />
          <stop offset="60%" stopColor={colors[3]} />
          <stop offset="80%" stopColor={colors[4]} />
          <stop offset="100%" stopColor={colors[5]} />
        </linearGradient>
      </defs>
      <animated.path
        d={namerrsPathData}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="10"
        strokeDasharray={pathLength / 2}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export default NamerrsLogo;