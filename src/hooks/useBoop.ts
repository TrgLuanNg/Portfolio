import { useState, useEffect, useCallback, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface BoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
}

export function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 160,
}: BoopConfig = {}) {
  const [isBooped, setIsBooped] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isBooped) return;

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  const appliedRotation = prefersReducedMotion ? 0 : rotation;
  const appliedScale = prefersReducedMotion ? 1 : scale;
  const appliedX = prefersReducedMotion ? 0 : x;
  const appliedY = prefersReducedMotion ? 0 : y;

  const style: CSSProperties = {
    display: 'inline-block',
    transform: isBooped
      ? `translate3d(${appliedX}px, ${appliedY}px, 0) rotate(${appliedRotation}deg) scale(${appliedScale})`
      : 'translate3d(0px, 0px, 0) rotate(0deg) scale(1)',
    transition: isBooped
      ? `transform ${timing * 0.4}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
      : `transform ${timing * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: 'transform',
  };

  return [style, trigger] as const;
}
