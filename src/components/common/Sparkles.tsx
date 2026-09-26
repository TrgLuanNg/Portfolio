import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useSoundContext } from '../../context/SoundContext';

const DEFAULT_COLOR_PALETTE = ['#2A7820', '#422078', '#782056', '#4ade80', '#a855f7', '#f43f5e', '#ffd166'];

interface SparkleItem {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (colorPalette: string[] = DEFAULT_COLOR_PALETTE): SparkleItem => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color: colorPalette[random(0, colorPalette.length)],
    size: random(12, 22),
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
    },
  };
};

interface SparklesProps {
  children: React.ReactNode;
  colorPalette?: string[];
  className?: string;
  interactive?: boolean;
}

export const Sparkles: React.FC<SparklesProps> = ({
  children,
  colorPalette = DEFAULT_COLOR_PALETTE,
  className = '',
  interactive = true,
}) => {
  const [sparkles, setSparkles] = useState<SparkleItem[]>(() => [
    generateSparkle(colorPalette),
    generateSparkle(colorPalette),
  ]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { playSparkle } = useSoundContext();
  const isHovered = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSparkles([]);
      return;
    }

    const intervalId = window.setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle(colorPalette);

      setSparkles((prev) => {
        // Clean up older sparkles
        const filtered = prev.filter((sp) => now - sp.createdAt < 800);
        return [...filtered, sparkle];
      });

      if (isHovered.current && Math.random() > 0.6) {
        playSparkle();
      }
    }, 450);

    return () => window.clearInterval(intervalId);
  }, [colorPalette, prefersReducedMotion, playSparkle]);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        isHovered.current = true;
        if (interactive) playSparkle();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="pointer-events-none absolute z-10 block animate-sparkle"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg
            className="block h-full w-full"
            viewBox="0 0 160 160"
            fill="none"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </span>
      ))}
      <strong className="relative z-1 font-inherit text-inherit">{children}</strong>
    </span>
  );
};
