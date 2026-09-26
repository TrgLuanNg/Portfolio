import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Lightbulb } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { CodeBlock } from '../components/common/CodeBlock';
import { ConfettiButton } from '../components/common/ConfettiButton';
import { useSoundContext } from '../context/SoundContext';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playClick } = useSoundContext();

  const article = siteConfig.articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="clay-card p-12">
          <h2 className="text-2xl font-bold text-[#f1f5f9]">Article not found</h2>
          <Link
            to="/articles"
            className="clay-btn mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#f1f5f9]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const sampleSpringCode = `// Spring physics configuration
const springTransition = {
  type: "spring",
  stiffness: 300,  // Controls the snap velocity
  damping: 20,     // Controls the resistance/friction
  mass: 0.8,       // Controls the inertia
};

export function InteractiveButton({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
    >
      {children}
    </motion.button>
  );
}`;

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Back Link */}
      <button
        onClick={() => {
          playClick();
          navigate('/articles');
        }}
        className="clay-btn group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#94a3b8] hover:text-[#f1f5f9] mb-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to all articles</span>
      </button>

      {/* Article Header */}
      <div className="space-y-5 border-b border-white/[0.08] pb-10 mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748b]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f1f5f9] leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="clay-inset rounded-xl px-3 py-1 text-xs font-mono font-bold text-[#4ade80]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article Body */}
      <div className="space-y-7 text-base text-[#94a3b8] leading-relaxed">
        <p>
          In the physical world, objects do not start moving at instantaneous speed and come to an abrupt halt. They possess inertia, weight, and elastic resistance. Yet in web development, for decades we defaulted to linear transitions like <code className="text-xs bg-[#141f27] px-2 py-0.5 rounded text-[#4ade80]">transition: all 0.3s ease</code>.
        </p>

        {/* Claymorphic Callout Box */}
        <div className="clay-card p-6 bg-[#212f3d] border-l-4 border-[#a855f7]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#a855f7] mb-2">
            <Lightbulb className="h-4 w-4" />
            <span>Key Takeaway</span>
          </div>
          <p className="text-sm text-[#f1f5f9] leading-relaxed">
            Spring-based motion removes the arbitrary constraint of fixed duration. If a user interrupts an animation halfway through, a spring seamlessly inherits the existing velocity without jerky resets.
          </p>
        </div>

        <h2 className="text-2xl font-extrabold text-[#f1f5f9] pt-4">
          The Three Levers of Spring Dynamics
        </h2>
        <p>
          When you configure a spring in Framer Motion, there are three primary parameters that dictate its personality:
        </p>

        <ul className="list-disc pl-6 space-y-2.5 text-sm sm:text-base">
          <li>
            <strong className="text-[#f1f5f9]">Stiffness (Tension)</strong>: How forcefully the spring pulls toward its target resting position. Higher values mean snappier, quicker motion.
          </li>
          <li>
            <strong className="text-[#f1f5f9]">Damping (Friction)</strong>: How quickly the oscillating energy is absorbed. Underdamped springs bounce back and forth like jelly; critically damped springs settle immediately.
          </li>
          <li>
            <strong className="text-[#f1f5f9]">Mass (Weight)</strong>: How heavy the moving element feels. A bowling ball requires more force to accelerate and decelerate than a feather.
          </li>
        </ul>

        <CodeBlock code={sampleSpringCode} filename="SpringButton.tsx" language="typescript" />

        <p>
          By pairing these physical parameters with subtle auditory feedback (like short synthesized Web Audio clicks), the interface transforms from a passive document into an engaging, tactile instrument.
        </p>
      </div>

      {/* Footer / Claps (Clay Card) */}
      <div className="clay-card mt-16 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-extrabold text-base text-[#f1f5f9]">
            Did you find this article insightful?
          </h4>
          <p className="text-xs text-[#94a3b8] mt-1">
            Hit the claps button below to shower some celebratory confetti.
          </p>
        </div>

        <ConfettiButton id={`article_${article.id}`} label="Applaud Article" />
      </div>
    </article>
  );
};
