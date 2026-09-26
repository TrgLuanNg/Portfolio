import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SoundToggle } from './SoundToggle';
import { CommandPalette } from './CommandPalette';
import { Boop } from '../common/Boop';
import { useSoundContext } from '../../context/SoundContext';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/articles', label: 'Articles' },
];

export const Header: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { playPop, playClick } = useSoundContext();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#18242e] border-b border-white/[0.08]">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo / Brand */}
          <Link
            to="/"
            onClick={() => playPop()}
            className="group flex items-center gap-3 text-lg font-bold tracking-tight text-white"
          >
            <Boop rotation={12} scale={1.1}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#20313e] text-white font-black text-base border border-white/10 transition-transform group-hover:scale-105">
                {siteConfig.author.name.charAt(0)}
              </div>
            </Boop>
            <div className="flex flex-col">
              <span className="leading-none text-base font-extrabold tracking-tight text-white">
                {siteConfig.author.name}
              </span>
              <span className="font-mono text-[10px] text-[#64748b] tracking-wider mt-1 font-semibold">
                PORTFOLIO
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-[#141f27] p-1.5 border border-white/[0.08]">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => playClick(960)}
                  className={`relative px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-full ${
                    isActive
                      ? 'text-[#f1f5f9]'
                      : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#243746] border border-white/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => {
                playClick(850);
                setCommandOpen(true);
              }}
              className="clay-btn flex h-10 items-center gap-2 px-3.5 text-xs text-[#94a3b8] hover:text-[#f1f5f9]"
              title="Search and quick actions (Cmd+K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline-block font-medium">Search</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] rounded-md bg-[#141f27] px-1.5 py-0.5 text-[#64748b] border border-white/5">
                ⌘K
              </kbd>
            </button>

            {/* Sound Toggle */}
            <SoundToggle />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="clay-btn flex md:hidden h-10 w-10 items-center justify-center text-[#f1f5f9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#1a2732] px-4 py-4">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    playPop();
                    setMobileMenuOpen(false);
                  }}
                  className={`clay-btn rounded-xl px-4 py-3 text-sm font-semibold ${
                    location.pathname === item.path
                      ? 'text-white bg-[#243746]'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};
