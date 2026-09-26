import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { siteConfig } from '../config/siteConfig';
import { GradientText } from '../components/common/GradientText';
import { TiltCard } from '../components/common/TiltCard';
import { ConfettiButton } from '../components/common/ConfettiButton';
import { Boop } from '../components/common/Boop';
import { useSoundContext } from '../context/SoundContext';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playClick } = useSoundContext();

  const project = siteConfig.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="clay-card p-12">
          <h2 className="text-2xl font-bold text-[#f1f5f9]">Project not found</h2>
          <p className="mt-2 text-sm text-[#94a3b8]">
            The project you are looking for does not exist.
          </p>
          <Link
            to="/projects"
            className="clay-btn mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#f1f5f9]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => {
          playClick();
          navigate('/projects');
        }}
        className="clay-btn group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#94a3b8] hover:text-[#f1f5f9] mb-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to all projects</span>
      </button>

      {/* Header */}
      <div className="space-y-5 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="clay-pill px-3.5 py-1 text-xs font-mono font-bold"
            style={{
              backgroundColor: `var(--${project.accentColor}-tint)`,
              color: project.accentHex === '#2A7820' ? '#4ade80' : project.accentHex === '#422078' ? '#c084fc' : '#f43f5e',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            {project.tags[0]}
          </span>
          <span className="font-mono text-xs text-[#64748b]">Published {project.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f1f5f9]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Clay Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Boop rotation={15} scale={1.05}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick(1000)}
              className="clay-btn clay-color-1 flex items-center gap-2 px-5 py-3 text-sm font-bold text-white tracking-wide"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Source Repository</span>
            </a>
          </Boop>

          {project.demoUrl && (
            <Boop rotation={-15} scale={1.05}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick(1050)}
                className="clay-btn flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#f1f5f9]"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Interactive Demo</span>
              </a>
            </Boop>
          )}

          <ConfettiButton id={`project_${project.id}`} label="Applaud Project" />
        </div>
      </div>

      {/* Metrics Banner (Clay Cards) */}
      {project.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-14">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="clay-card p-6 text-center"
            >
              <div className="text-xs font-mono text-[#64748b] uppercase tracking-wider font-bold">
                {stat.label}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#f1f5f9]">
                <GradientText animate={false}>{stat.value}</GradientText>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive 3D Showcase Card */}
      <div className="mb-14">
        <TiltCard maxTilt={8}>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="clay-btn flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#2A7820] via-[#422078] to-[#782056] text-white mb-4">
              <Code2 className="h-8 w-8 text-[#ffd166]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#f1f5f9]">
              Interactive Case Study Sandbox
            </h3>
            <p className="mt-2 text-sm text-[#94a3b8] max-w-md">
              Hover to test the 3D clay reflection. Built with zero runtime layout thrashing.
            </p>
          </div>
        </TiltCard>
      </div>

      {/* Deep Dive & Highlights */}
      <div className="space-y-10 text-base text-[#94a3b8] leading-relaxed">
        <div>
          <h2 className="text-2xl font-extrabold text-[#f1f5f9] mb-3">
            Overview & Motivation
          </h2>
          <p>{project.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#f1f5f9] mb-4">
            Key Highlights
          </h2>
          <div className="grid grid-cols-1 gap-3.5">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="clay-inset flex items-start gap-3.5 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-[#4ade80] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#f1f5f9]">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#f1f5f9] mb-3">
            Technologies & Libraries
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="clay-inset rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold text-[#f1f5f9]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
