import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBoop } from '../../hooks/useBoop';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [style, trigger] = useBoop({ rotation: 25, scale: 1.15 });

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => {
        trigger();
        toggleTheme();
      }}
      onMouseEnter={trigger}
      className="clay-btn relative flex h-10 w-10 items-center justify-center text-[var(--text-primary)]"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      <span style={style} className="flex items-center justify-center">
        {isDark ? (
          <Moon className="h-4 w-4 text-[#a855f7] transition-transform duration-300" />
        ) : (
          <Sun className="h-4 w-4 text-[#ffd166] transition-transform duration-300" />
        )}
      </span>
    </button>
  );
};
