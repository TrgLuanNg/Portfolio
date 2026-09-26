import React from 'react';
import { useBoop, type BoopConfig } from '../../hooks/useBoop';
import { useSoundContext } from '../../context/SoundContext';

interface BoopProps extends BoopConfig {
  children: React.ReactNode;
  className?: string;
  withSound?: boolean;
  soundPitch?: number;
}

export const Boop: React.FC<BoopProps> = ({
  children,
  className = '',
  withSound = true,
  soundPitch,
  ...boopConfig
}) => {
  const [style, trigger] = useBoop(boopConfig);
  const { playBoop } = useSoundContext();

  const handleMouseEnter = () => {
    trigger();
    if (withSound) {
      playBoop(soundPitch);
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      style={style}
      className={className}
    >
      {children}
    </span>
  );
};
