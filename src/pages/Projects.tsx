import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { siteConfig } from '../config/siteConfig';
import { TiltCard } from '../components/common/TiltCard';
import { GradientText } from '../components/common/GradientText';
import { Boop } from '../components/common/Boop';
import { useSoundContext } from '../context/SoundContext';

export const Projects: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const { playPop, playClick } = useSoundContext();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    siteConfig.projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    return siteConfig.projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesTag = selectedTag === 'All' || project.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="clay-pill inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#a855f7] font-bold bg-[#1e2e3a] px-3.5 py-1.5 border border-white/5">
          <Layers className="h-4 w-4" />
          <span>Case Studies & Software</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#f1f5f9]">
          Selected <GradientText>Projects</GradientText>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#94a3b8] max-w-2xl">
          A showcase of creative development experiments, software applications, and design systems.
        </p>
      </div>

      {/* Filter and Search Controls (Clay Layout) */}
      <div className="mb-12 flex flex-col md:flex-row gap-5 justify-between items-stretch md:items-center">
        {/* Clay Inset Search Bar */}
        <div className="clay-inset relative flex items-center px-4 py-3 w-full md:w-80">
          <Search className="h-4 w-4 text-[#94a3b8] shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none"
          />
        </div>

        {/* Clay Tag Pills */}
        <div className="flex flex-wrap gap-2.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                playClick();
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'clay-btn clay-color-2 text-white'
                  : 'clay-btn text-[#94a3b8] hover:text-[#f1f5f9]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="clay-card p-12 text-center text-[#94a3b8]">
          <p className="text-base font-bold">No projects found matching your query.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedTag('All');
              playPop();
            }}
            className="clay-btn mt-5 px-5 py-2 text-xs font-bold text-[#f1f5f9]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              className="flex flex-col justify-between"
              glowColor={
                project.accentColor === 'color-1'
                  ? 'rgba(42, 120, 32, 0.35)'
                  : project.accentColor === 'color-2'
                  ? 'rgba(66, 32, 120, 0.4)'
                  : 'rgba(120, 32, 86, 0.4)'
              }
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-[#64748b]">{project.date}</span>
                  <span
                    className="clay-pill px-3 py-1 text-[11px] font-mono font-bold"
                    style={{
                      backgroundColor: `var(--${project.accentColor}-tint)`,
                      color: project.accentHex === '#2A7820' ? '#4ade80' : project.accentHex === '#422078' ? '#c084fc' : '#f43f5e',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    {project.tags[0]}
                  </span>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  onClick={() => playPop()}
                  className="group block"
                >
                  <h3 className="text-xl font-extrabold text-[#f1f5f9] group-hover:text-[#a855f7] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </Link>

                <p className="mt-2 text-xs font-bold text-[#64748b]">
                  {project.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Clay Insets */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="clay-inset rounded-lg px-2.5 py-1 text-[10px] text-[#94a3b8] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <Link
                  to={`/projects/${project.id}`}
                  onClick={() => playPop()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f1f5f9] hover:text-[#f43f5e] transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  <Boop rotation={15} scale={1.15}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick(1000)}
                      className="clay-btn flex h-9 w-9 items-center justify-center text-[#94a3b8] hover:text-[#f1f5f9]"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  </Boop>

                  {project.demoUrl && (
                    <Boop rotation={-15} scale={1.15}>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClick(1050)}
                        className="clay-btn flex h-9 w-9 items-center justify-center text-[#94a3b8] hover:text-[#f1f5f9]"
                        title="Live Preview"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Boop>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
};
