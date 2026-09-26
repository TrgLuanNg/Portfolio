import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSoundContext } from '../../context/SoundContext';

interface ConfettiButtonProps {
  id?: string;
  label?: string;
  initialCount?: number;
}

export const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  id = 'global_claps',
  label = 'Send Some Love',
  initialCount = 42,
}) => {
  const [claps, setClaps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`claps_${id}`);
      return saved ? parseInt(saved, 10) : initialCount;
    } catch {
      return initialCount;
    }
  });

  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const { playFanfare, playPop } = useSoundContext();

  const handleClap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextClaps = claps + 1;
    setClaps(nextClaps);
    try {
      localStorage.setItem(`claps_${id}`, nextClaps.toString());
    } catch {
      // Ignore
    }

    // Trigger floating burst
    const newHeart = { id: Date.now() + Math.random(), x: (Math.random() - 0.5) * 60 };
    setFloatingHearts((prev) => [...prev.slice(-6), newHeart]);

    // Trigger Canvas Confetti with triad colors
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#2A7820', '#422078', '#782056', '#4ade80', '#a855f7', '#ffd166'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.9,
    });

    if (nextClaps % 5 === 0) {
      playFanfare();
    } else {
      playPop();
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Floating mini hearts */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.6 }}
            animate={{ opacity: 0, y: -70, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setFloatingHearts((prev) => prev.filter((h) => h.id !== heart.id));
            }}
            className="pointer-events-none absolute -top-4 font-bold text-sm text-[#f43f5e]"
          >
            +1 ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleClap}
        className="clay-btn group relative flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-[#f1f5f9] select-none"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#782056] text-white border border-white/10 transition-transform duration-300 group-hover:scale-110">
          <Heart className="h-4 w-4 fill-current" />
        </span>
        <span>{label}</span>
        <span className="clay-inset rounded-full px-2.5 py-0.5 text-xs font-mono font-bold text-[#f43f5e]">
          {claps}
        </span>
      </motion.button>
    </div>
  );
};
