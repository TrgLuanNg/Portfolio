export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl: string; // Easily modified later by user
  accentColor: 'color-1' | 'color-2' | 'color-3';
  accentHex: string;
  highlights: string[];
  stats?: { label: string; value: string }[];
  date: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  accent: 'color-1' | 'color-2' | 'color-3';
  skills: { name: string; level: string; note: string }[];
}

export const siteConfig = {
  author: {
    name: "Nguyễn Trọng Luân",
    handle: "@TrgLuanNg",
    role: "Fullstack Developer & Data Engineer",
    tagline: "I'm a Rustlang enjoyer who does web too.",
    bio: "Everything i'm not makes me everything i am.",
    location: "HCMC & Remote",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    // All social links centralized here for easy modification
    links: {
      github: "https://github.com/TrgLuanNg",
      twitter: "",
      linkedin: "https://linkedin.com/in/your-username",
      email: "ngluan0307@gmail.com",
      resume: "#",
    },
  },
  theme: {
    colors: {
      color1: "#2A7820", // Forest Emerald
      color2: "#422078", // Deep Mystic Violet
      color3: "#782056", // Rich Berry Magenta
    },
  },
  projects: [
    {
      id: "aurora-synth",
      title: "Aurora Sound & Motion Studio",
      tagline: "An interactive audiovisual canvas built for the modern browser",
      description: "A generative synthesizer and particle physics laboratory designed for creative exploration with Web Audio API and hardware-accelerated Canvas. Produces rich ambient drone chords keyed to user mouse interaction.",
      tags: ["React 19", "Web Audio API", "Framer Motion", "Canvas", "TypeScript"],
      featured: true,
      githubUrl: "https://github.com/your-username/aurora-synth",
      demoUrl: "https://aurora-synth-demo.example.com",
      accentColor: "color-1",
      accentHex: "#2A7820",
      highlights: [
        "Zero-latency mathematical sound synthesis with ADSR envelopes",
        "Interactive 60fps particle swarm with spring dampening",
        "Exportable audio loops and harmonic scale quantizer"
      ],
      stats: [
        { label: "Audio Latency", value: "< 4ms" },
        { label: "Particles", value: "2,000+" },
        { label: "Bundle Size", value: "38 KB" }
      ],
      date: "2026"
    },
    {
      id: "hypercraft-ui",
      title: "HyperCraft Design System",
      tagline: "Tactile, accessible, and physics-driven component library",
      description: "A high-craft React component library bringing physical tactility, spring rebounds, dynamic 3D tilt, and spatial audio cues to web interfaces with 100% keyboard accessibility.",
      tags: ["TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Accessibility"],
      featured: true,
      githubUrl: "https://github.com/your-username/hypercraft-ui",
      demoUrl: "https://hypercraft-ui.example.com",
      accentColor: "color-2",
      accentHex: "#422078",
      highlights: [
        "useBoop and 3D specular glare primitives",
        "Full WAI-ARIA and prefers-reduced-motion compliance",
        "Extensible design token engine supporting dynamic CSS themes"
      ],
      stats: [
        { label: "Components", value: "32" },
        { label: "A11y Score", value: "100%" },
        { label: "GitHub Stars", value: "1.4k" }
      ],
      date: "2025"
    },
    {
      id: "pulse-telemetry",
      title: "Pulse Realtime Telemetry",
      tagline: "Sub-millisecond client-side event aggregation and query engine",
      description: "A client-side telemetry dashboard capable of indexing, filtering, and charting 200,000+ metrics in real time using Web Workers and typed binary buffers with zero server roundtrips.",
      tags: ["React 19", "Web Workers", "Vite", "Tailwind CSS", "Charts"],
      featured: true,
      githubUrl: "https://github.com/your-username/pulse-telemetry",
      demoUrl: "https://pulse-telemetry.example.com",
      accentColor: "color-3",
      accentHex: "#782056",
      highlights: [
        "Zero server query latency with Web Worker indexing",
        "Virtual scrolling table rendering 100k items smoothly",
        "Interactive multi-range brush zoom charts"
      ],
      stats: [
        { label: "Query Speed", value: "0.8ms" },
        { label: "Max Records", value: "250K" },
        { label: "Memory Footprint", value: "14 MB" }
      ],
      date: "2025"
    },
    {
      id: "chroma-flow",
      title: "ChromaFlow Shader Lab",
      tagline: "WebGL procedural fluid simulation and gradient generator",
      description: "A browser-based generative art tool for creating fluid, dynamic color meshes, animated SVG blobs, and glassmorphic displacement backgrounds with one-click CSS export.",
      tags: ["WebGL", "GLSL", "React", "TypeScript"],
      featured: false,
      githubUrl: "https://github.com/your-username/chroma-flow",
      demoUrl: "https://chroma-flow.example.com",
      accentColor: "color-1",
      accentHex: "#2A7820",
      highlights: [
        "Fragment shader fluid simulation running on GPU",
        "Export to CSS keyframe animations and SVG filters",
        "Preset manager with local persistence"
      ],
      stats: [
        { label: "GPU Load", value: "3%" },
        { label: "Presets", value: "24" }
      ],
      date: "2024"
    }
  ] as ProjectItem[],

  articles: [
    {
      id: "whimsical-spring-physics",
      title: "The Physics of Delight: Implementing Spring Animations in React",
      summary: "Why linear easing feels mechanical and dead, and how mass, stiffness, and damping create organic, tactile interfaces that users love touching.",
      readTime: "6 min read",
      date: "Feb 2026",
      tags: ["Framer Motion", "Animation", "UI Engineering"],
      featured: true,
    },
    {
      id: "web-audio-micro-interactions",
      title: "Tasteful Sound Design for Web Applications Without Audio Files",
      summary: "Building a zero-dependency synthesizer using Web Audio API oscillators to generate subtle, satisfying clicks, pops, and chimes without downloading MP3s.",
      readTime: "8 min read",
      date: "Jan 2026",
      tags: ["Web Audio API", "UX Design", "Performance"],
      featured: true,
    },
    {
      id: "crafting-3d-tilt-cards",
      title: "Deconstructing the 3D Holographic Card Effect",
      summary: "Combining mouse vector math, CSS perspective, transform matrices, and radial gradient specular reflections for realistic physical card interactions.",
      readTime: "5 min read",
      date: "Nov 2025",
      tags: ["CSS", "Math", "React"],
      featured: false,
    }
  ] as ArticleItem[],

  skills: [
    {
      title: "Frontend Craft",
      description: "Building expressive, accessible, and high-performance user interfaces.",
      accent: "color-1",
      skills: [
        { name: "React 19 / TypeScript", level: "Expert", note: "Concurrent features, custom hooks, type systems" },
        { name: "Framer Motion", level: "Expert", note: "Spring dynamics, layout morphing, gesture handlers" },
        { name: "Tailwind CSS & Modern CSS", level: "Expert", note: "Tokens, clamp typography, CSS variables, subgrid" },
        { name: "Web Audio API", level: "Advanced", note: "Synthesizers, audio nodes, soundscapes" },
      ]
    },
    {
      title: "System Architecture",
      description: "Robust foundations, modular pipelines, and lightning-fast developer experience.",
      accent: "color-2",
      skills: [
        { name: "Vite & Tooling", level: "Expert", note: "Tree-shaking, code splitting, HMR optimization" },
        { name: "Frontend Performance", level: "Expert", note: "Web Workers, Virtualization, 60fps rendering" },
        { name: "Accessibility (a11y)", level: "Advanced", note: "Screen readers, focus trapping, reduced motion" },
        { name: "State Management", level: "Advanced", note: "Context, Zustand, optimistic UI" },
      ]
    },
    {
      title: "Creative Technology",
      description: "Explorations at the intersection of code, physics, and design.",
      accent: "color-3",
      skills: [
        { name: "Canvas & WebGL", level: "Intermediate", note: "2D particles, interactive generative graphics" },
        { name: "Interactive Sandboxes", level: "Expert", note: "Custom sliders, live code generators, sandboxing" },
        { name: "UI Design & Prototyping", level: "Advanced", note: "Visual rhythm, color theory, micro-copy" },
        { name: "Sound Design", level: "Advanced", note: "Subtle frequency tuning, ADSR envelopes" },
      ]
    }
  ] as SkillCategory[],
};
