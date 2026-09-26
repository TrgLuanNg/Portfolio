import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useSoundContext } from '../../context/SoundContext';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glowColor = 'rgba(66, 32, 120, 0.25)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const { playClick } = useSoundContext();

  // Smooth spring physics for rotation
  const mouseX = useSpring(0, { stiffness: 220, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;

    const normalizedX = xOffset / width - 0.5;
    const normalizedY = yOffset / height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    setGlarePosition({
      x: (xOffset / width) * 100,
      y: (yOffset / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playClick(1050);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.015,
          y: prefersReducedMotion ? 0 : -4,
        }}
        whileTap={{
          scale: prefersReducedMotion ? 1 : 0.985,
          y: 2,
        }}
        transition={{ duration: 0.2 }}
        className={`clay-card-interactive relative overflow-hidden rounded-[26px] p-6 sm:p-7 select-none ${className}`}
      >
        {/* Soft Specular Clay Sheen */}
        {!prefersReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[26px]"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, ${glowColor}, transparent 75%)`,
            }}
          />
        )}

        {/* 3D Depth Content */}
        <div style={{ transform: 'translateZ(18px)' }} className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
