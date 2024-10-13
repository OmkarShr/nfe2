import React from 'react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 48 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#1A2B4B" stroke="#FFD700" strokeWidth="0.5"/>
      <path d="M7 7L17 17" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M17 7L7 17" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="#FFD700"/>
      <path d="M12 6V18" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M6 12H18" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round"/>
    </svg>
  );
};

export default Logo;