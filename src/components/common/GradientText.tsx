import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  animate = true,
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent font-bold inline-block ${
        animate ? 'animate-gradient-shift' : ''
      } ${className}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #2A7820 0%, #422078 45%, #782056 80%, #4ade80 100%)',
        backgroundSize: '250% 250%',
      }}
    >
      {children}
    </span>
  );
};
