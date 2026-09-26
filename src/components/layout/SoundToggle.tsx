import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from '../../context/SoundContext';
import { useBoop } from '../../hooks/useBoop';

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useSoundContext();
  const [style, trigger] = useBoop({ rotation: 18, scale: 1.15 });

  return (
    <button
      onClick={() => {
        trigger();
        toggleMute();
      }}
      onMouseEnter={trigger}
      className={`clay-btn relative flex h-10 items-center gap-2 px-3.5 text-xs font-medium ${
        !isMuted ? 'text-[#4ade80]' : 'text-[#64748b]'
      }`}

      title={isMuted ? 'Sound is Muted (Click to enable audio)' : 'Sound is Active (Click to mute)'}
      aria-label="Toggle sound effects"
    >
      <span style={style} className="flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </span>
      <span className="hidden sm:inline-block font-mono text-[11px]">
        {isMuted ? 'Muted' : 'Sound On'}
      </span>
    </button>
  );
};
