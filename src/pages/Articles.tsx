import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { GradientText } from '../components/common/GradientText';
import { useSoundContext } from '../context/SoundContext';

export const Articles: React.FC = () => {
  const [search, setSearch] = useState('');
  const { playPop } = useSoundContext();

  const filteredArticles = siteConfig.articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="clay-pill inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#4ade80] font-bold bg-[#1e2e3a] px-3.5 py-1.5 border border-white/5">
          <BookOpen className="h-4 w-4" />
          <span>Writings & Explorations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#f1f5f9]">
          Articles & <GradientText>Notes</GradientText>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#94a3b8]">
          Deep dives into animation physics, Web Audio synthesizer design, and frontend craft.
        </p>
      </div>

      {/* Clay Search Input */}
      <div className="clay-inset mb-10 flex items-center px-4 py-3.5 max-w-lg">
        <Search className="h-4 w-4 text-[#94a3b8] shrink-0 mr-3" />
        <input
          type="text"
          placeholder="Search articles or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none"
        />
      </div>

      {/* Articles List (Clay Cards) */}
      <div className="space-y-5">
        {filteredArticles.length === 0 ? (
          <div className="clay-card p-12 text-center text-sm text-[#94a3b8]">
            No articles found matching "{search}".
          </div>
        ) : (
          filteredArticles.map((article) => (
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
                <h2 className="text-lg sm:text-xl font-extrabold text-[#f1f5f9] group-hover:text-[#a855f7] transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="clay-inset rounded-lg px-2.5 py-1 text-[10px] text-[#94a3b8] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <div className="clay-btn flex h-10 w-10 items-center justify-center text-[#f1f5f9] group-hover:text-[#4ade80]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
