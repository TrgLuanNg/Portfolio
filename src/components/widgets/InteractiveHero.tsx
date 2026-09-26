import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Terminal } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { GradientText } from '../common/GradientText';
import { Boop } from '../common/Boop';
import { TiltCard } from '../common/TiltCard';
import { useSoundContext } from '../../context/SoundContext';

export const InteractiveHero: React.FC = () => {
  const { playPop, playClick } = useSoundContext();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="clay-pill inline-flex items-center gap-2.5 bg-[#1e2e3a] px-4 py-2 text-xs font-semibold text-[#94a3b8] mb-6 border border-white/[0.08]"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span>Available for engineering projects</span>
              <span className="text-[#64748b]">•</span>
              <span className="font-mono text-[#4ade80] font-bold">
                {siteConfig.author.location}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f1f5f9] leading-[1.12]"
            >
              My Portfolio, demo with building playful,{' '}
              <GradientText>tactile web</GradientText>{' '}
              experiences.
            </motion.h1>

            {/* Subheading / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#94a3b8] max-w-xl leading-relaxed"
            >
              {siteConfig.author.bio}
            </motion.p>

            {/* CTA Clay Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/projects"
                onClick={() => playPop()}
                className="clay-btn clay-color-2 group flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white tracking-wide"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/articles"
                onClick={() => playClick(900)}
                className="clay-btn flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#f1f5f9]"
              >
                <BookOpen className="h-4 w-4 text-[#ffd166]" />
                <span>Read Articles</span>
              </Link>

              <Boop rotation={15} scale={1.1}>
                <a
                  href={siteConfig.author.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick(1000)}
                  className="clay-btn flex h-12 w-12 items-center justify-center text-[#94a3b8] hover:text-[#f1f5f9]"
                  title="View GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              </Boop>
            </motion.div>
          </div>

          {/* Right Hero Interactive 3D Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TiltCard maxTilt={10} glowColor="rgba(120, 32, 86, 0.35)">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#782056] border border-white/10" />
                    <span className="h-3.5 w-3.5 rounded-full bg-[#422078] border border-white/10" />
                    <span className="h-3.5 w-3.5 rounded-full bg-[#2A7820] border border-white/10" />
                  </div>
                  <span className="clay-pill font-mono text-[10px] text-[#4ade80] bg-[#172530] px-3 py-1 font-bold uppercase tracking-wider border border-white/5">
                    3D Active
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3.5">
                    <div className="clay-btn flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A7820] to-[#422078] text-white">
                      <Terminal className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#f1f5f9]">
                        Claymorphic Depth
                      </h3>
                      <p className="text-xs text-[#94a3b8]">
                        Hover & move cursor to test 3D perspective
                      </p>
                    </div>
                  </div>

                  <div className="clay-inset p-4 text-xs text-[#94a3b8] leading-relaxed">
                    <div className="font-mono text-[11px] text-[#a855f7] mb-1.5 font-bold">
                      // Tactile Web Design
                    </div>
                    "Every surface responds like physical matter: cards tilt with perspective, buttons compress when touched, and synthesized audio brings life to interactions."
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                    <div className="clay-btn p-2.5 rounded-xl">
                      <div className="text-[10px] text-[#64748b] font-mono">Audio</div>
                      <div className="font-bold text-xs text-[#4ade80] mt-0.5">Synthesized</div>
                    </div>
                    <div className="clay-btn p-2.5 rounded-xl">
                      <div className="text-[10px] text-[#64748b] font-mono">Animation</div>
                      <div className="font-bold text-xs text-[#a855f7] mt-0.5">Springs</div>
                    </div>
                    <div className="clay-btn p-2.5 rounded-xl">
                      <div className="text-[10px] text-[#64748b] font-mono">Framerate</div>
                      <div className="font-bold text-xs text-[#f43f5e] mt-0.5">60 FPS</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
