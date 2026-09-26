import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Briefcase, Code, BookOpen } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { siteConfig } from '../config/siteConfig';
import { InteractiveHero } from '../components/widgets/InteractiveHero';
import { TiltCard } from '../components/common/TiltCard';
import { GradientText } from '../components/common/GradientText';
import { Boop } from '../components/common/Boop';
import { useSoundContext } from '../context/SoundContext';

export const Home: React.FC = () => {
  const { playPop, playClick } = useSoundContext();
  const featuredProjects = siteConfig.projects.filter((p) => p.featured);

  return (
    <div className="flex flex-col gap-24">
      {/* 1. Hero Section */}
      <InteractiveHero />

      {/* 2. Featured Projects Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="clay-pill inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#4ade80] font-bold bg-[#1e2e3a] px-3.5 py-1.5 border border-white/5">
              <Briefcase className="h-4 w-4 text-[#4ade80]" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f1f5f9]">
              Crafted with <GradientText animate={false}>Code & Claymorphism</GradientText>
            </h2>
          </div>

          <Link
            to="/projects"
            onClick={() => playClick(920)}
            className="clay-btn group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#f1f5f9]"
          >
            <span>View all projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
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
                {/* Header Pills */}
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

                <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Clay Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.slice(1, 4).map((tag) => (
                    <span
                      key={tag}
                      className="clay-inset rounded-lg px-2.5 py-1 text-[10px] text-[#94a3b8] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Links */}
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <Link
                  to={`/projects/${project.id}`}
                  onClick={() => playPop()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f1f5f9] hover:text-[#f43f5e] transition-colors"
                >
                  <span>Case Study</span>
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
      </section>

      {/* 3. Skills & Capabilities Breakdown (Clay Slabs) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="mb-12">
          <div className="clay-pill inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#a855f7] font-bold bg-[#1e2e3a] px-3.5 py-1.5 border border-white/5">
            <Code className="h-4 w-4" />
            <span>Tooling & Craft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f1f5f9]">
            Technical Rigor & Creative Flow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.skills.map((category) => (
            <div
              key={category.title}
              className="clay-card p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-white/10"
                    style={{ backgroundColor: `var(--${category.accent})` }}
                  />
                  <h3 className="font-extrabold text-lg text-[#f1f5f9]">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-[#94a3b8] mb-6">
                  {category.description}
                </p>

                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="clay-inset p-3.5 rounded-xl">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#f1f5f9]">{skill.name}</span>
                        <span className="font-mono text-[10px] text-[#4ade80] font-semibold">{skill.level}</span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Recent Articles Preview (Clay Inset Cards) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="clay-pill inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#4ade80] font-bold bg-[#1e2e3a] px-3.5 py-1.5 border border-white/5">
              <BookOpen className="h-4 w-4" />
              <span>Articles & Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f1f5f9]">
              Writing on Frontend Craft
            </h2>
          </div>

          <Link
            to="/articles"
            onClick={() => playClick(920)}
            className="clay-btn group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#f1f5f9]"
          >
            <span>Read all articles</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {siteConfig.articles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              onClick={() => playPop()}
              className="clay-card-interactive flex flex-col md:flex-row md:items-center justify-between gap-5 p-7 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-[#64748b] font-mono">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1f5f9] group-hover:text-[#f43f5e] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <div className="clay-btn flex h-10 w-10 items-center justify-center text-[#f1f5f9] group-hover:text-[#4ade80]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
