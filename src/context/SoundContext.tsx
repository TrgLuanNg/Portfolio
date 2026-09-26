import React, { createContext, useContext, useEffect, useState } from 'react';
import { sound } from '../audio/soundEngine';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playPop: () => void;
  playClick: (pitch?: number) => void;
  playBoop: (freq?: number) => void;
  playSparkle: () => void;
  playFanfare: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMutedState] = useState<boolean>(() => sound.getMuted());

  useEffect(() => {
    sound.setMuted(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMutedState((prev) => {
      const next = !prev;
      sound.setMuted(next);
      if (!next) {
        // If unmuting, play a happy little tone so user hears sound is on!
        setTimeout(() => sound.playPop(), 50);
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playPop: () => sound.playPop(),
        playClick: (pitch) => sound.playClick(pitch),
        playBoop: (freq) => sound.playBoop(freq),
        playSparkle: () => sound.playSparkle(),
        playFanfare: () => sound.playFanfare(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}
