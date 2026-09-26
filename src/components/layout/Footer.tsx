import React from 'react';
import { Mail, Heart, Bell } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../common/BrandIcons';
import { siteConfig } from '../../config/siteConfig';
import { ConfettiButton } from '../common/ConfettiButton';
import { Boop } from '../common/Boop';
import { useSoundContext } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const { playSparkle, playPop } = useSoundContext();

  return (
    <footer className="relative mt-24 border-t border-white/[0.08] bg-[#141f28] pt-16 pb-12">
      {/* Top Animated Triad Gradient Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2A7820] via-[#422078] to-[#782056] animate-gradient-shift"
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Left: Bio & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#2A7820] border border-white/10" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#422078] border border-white/10" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#782056] border border-white/10" />
              <span className="font-extrabold text-base text-white ml-1.5 tracking-tight">
                {siteConfig.author.name}
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {siteConfig.author.bio}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#64748b]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span>Available for select creative engineering contracts</span>
            </div>
          </div>

          {/* Right: Confetti Claps & Easter Egg */}
          <div className="flex flex-col items-center gap-4">
            <ConfettiButton id="footer_claps" label="Enjoyed the visit?" />
            <button
              onClick={() => playSparkle()}
              className="clay-btn group flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-[#f43f5e] px-3.5 py-1.5"
            >
              <Bell className="h-3.5 w-3.5 text-[#ffd166] transition-transform group-hover:rotate-12" />
              <span>Click for a lucky sound chime</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Links & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
          {/* Social Links Centralized with Clay Buttons */}
          <div className="flex items-center gap-3">
            <Boop rotation={15} scale={1.15}>
              <a
                href={siteConfig.author.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPop()}
                className="clay-btn flex h-9 items-center gap-2 px-3 text-xs text-[#94a3b8] hover:text-[#f1f5f9]"
                title="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
                <span className="font-medium">GitHub</span>
              </a>
            </Boop>

            <Boop rotation={-15} scale={1.15}>
              <a
                href={siteConfig.author.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPop()}
                className="clay-btn flex h-9 items-center gap-2 px-3 text-xs text-[#94a3b8] hover:text-[#1d9bf0]"
                title="Twitter / X"
              >
                <TwitterIcon className="h-4 w-4" />
                <span className="font-medium">Twitter</span>
              </a>
            </Boop>

            <Boop rotation={15} scale={1.15}>
              <a
                href={siteConfig.author.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPop()}
                className="clay-btn flex h-9 items-center gap-2 px-3 text-xs text-[#94a3b8] hover:text-[#38bdf8]"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </Boop>

            <Boop rotation={-15} scale={1.15}>
              <a
                href={`mailto:${siteConfig.author.links.email}`}
                onClick={() => playPop()}
                className="clay-btn flex h-9 items-center gap-2 px-3 text-xs text-[#94a3b8] hover:text-[#f1f5f9]"
                title="Email"
              >
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email</span>
              </a>
            </Boop>
          </div>

          {/* Tag */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#64748b]">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-[#f43f5e] fill-current" /> by {siteConfig.author.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
