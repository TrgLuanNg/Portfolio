import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Home,
  Layers,
  Volume2,
  VolumeX,
  ExternalLink,
  Code,
  BookOpen,
  PartyPopper
} from 'lucide-react';
import { GithubIcon, TwitterIcon } from '../common/BrandIcons';

import { siteConfig } from '../../config/siteConfig';
import { useSoundContext } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { isMuted, toggleMute, playPop, playFanfare } = useSoundContext();
  const [search, setSearch] = useState('');

  // Handle keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#2A7820', '#422078', '#782056', '#4ade80', '#a855f7'],
    });
    playFanfare();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="clay-card relative w-full max-w-xl overflow-hidden rounded-[26px] p-2">
        <Command
          className="w-full"
          value={search}
          onValueChange={setSearch}
          filter={(value, searchStr) => (value.toLowerCase().includes(searchStr.toLowerCase()) ? 1 : 0)}
        >
          {/* Search Header Inset */}
          <div className="clay-inset m-2 flex items-center gap-3 px-4 py-3">
            <Search className="h-5 w-5 text-[#94a3b8]" />
            <Command.Input
              autoFocus
              placeholder="Search projects, actions, or links... (Esc to close)"
              className="w-full bg-transparent text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none"
            />
            <kbd className="hidden sm:inline-block rounded-md bg-[#20313e] px-2 py-0.5 font-mono text-[10px] text-[#94a3b8] border border-white/5">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-none">
            <Command.Empty className="py-6 text-center text-sm text-[#64748b]">
              No results found for "{search}".
            </Command.Empty>

            {/* Navigation */}
            <Command.Group heading="Navigation" className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    navigate('/');
                    playPop();
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[#f1f5f9] hover:bg-[#253949] aria-selected:bg-[#253949] transition-colors"
              >
                <Home className="h-4 w-4 text-[#4ade80]" />
                <span>Home & Featured</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    navigate('/projects');
                    playPop();
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[#f1f5f9] hover:bg-[#253949] aria-selected:bg-[#253949] transition-colors"
              >
                <Layers className="h-4 w-4 text-[#a855f7]" />
                <span>All Projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    navigate('/articles');
                    playPop();
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[#f1f5f9] hover:bg-[#253949] aria-selected:bg-[#253949] transition-colors"
              >
                <BookOpen className="h-4 w-4 text-[#ffd166]" />
                <span>Articles & Guides</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    toggleMute();
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--color-2-tint)] transition-colors"
              >
                {isMuted ? <Volume2 className="h-4 w-4 text-[#4ade80]" /> : <VolumeX className="h-4 w-4 text-[var(--text-muted)]" />}
                <span>Toggle Sound Effects ({isMuted ? 'Turn On' : 'Mute'})</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    triggerConfetti();
                  })
                }
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--color-2-tint)] transition-colors"
              >
                <PartyPopper className="h-4 w-4 text-[#ffd166]" />
                <span>Trigger Confetti Explosion 🎉</span>
              </Command.Item>
            </Command.Group>

            {/* Projects */}
            <Command.Group heading="Featured Projects" className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {siteConfig.projects.map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() =>
                    handleSelect(() => {
                      navigate(`/projects/${project.id}`);
                      playPop();
                    })
                  }
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--color-2-tint)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-[var(--text-muted)]" />
                    <span className="font-medium">{project.title}</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono">{project.tags[0]}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Links */}
            <Command.Group heading="External & Social Links" className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    window.open(siteConfig.author.links.github, '_blank');
                  })
                }
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--color-2-tint)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  handleSelect(() => {
                    window.open(siteConfig.author.links.twitter, '_blank');
                  })
                }
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--color-2-tint)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TwitterIcon className="h-4 w-4 text-[#1d9bf0]" />
                  <span>Twitter / X</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 px-4 py-2 text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span>Use <kbd className="font-mono rounded border border-[var(--border-subtle)] px-1">↑</kbd><kbd className="font-mono rounded border border-[var(--border-subtle)] px-1">↓</kbd> to navigate</span>
              <span>•</span>
              <span><kbd className="font-mono rounded border border-[var(--border-subtle)] px-1">↵</kbd> to select</span>
            </div>
            <span className="font-mono">Press ESC to dismiss</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
