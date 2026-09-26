import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { GradientText } from '../components/common/GradientText';
import { useSoundContext } from '../context/SoundContext';

export const NotFound: React.FC = () => {
  const { playPop, playBoop } = useSoundContext();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative mb-6">
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          onDragStart={() => playBoop(350)}
          onDragEnd={() => playBoop(600)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="clay-color-2 flex h-26 w-26 cursor-grab active:cursor-grabbing items-center justify-center rounded-[32px] text-4xl font-black text-white select-none border border-white/20"
        >
          404
        </motion.div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f1f5f9]">
        You've wandered into <GradientText>Uncharted Space</GradientText>
      </h1>

      <p className="mt-3 text-sm sm:text-base text-[#94a3b8] max-w-md">
        The route you're looking for doesn't exist (or was pulled by spring gravity). Drag the squishy 404 clay cube above or head back home.
      </p>

      <div className="mt-8">
        <Link
          to="/"
          onClick={() => playPop()}
          className="clay-btn clay-color-1 inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-white tracking-wide"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
