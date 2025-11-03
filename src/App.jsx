import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// ====== Portfolio (Upgraded Motion/Style) ======
// Drop this into src/App.jsx (or a dedicated component) and ensure Tailwind + Framer Motion are installed.
// Tailwind: @tailwind base; @tailwind components; @tailwind utilities; in src/index.css
// Framer Motion: npm i framer-motion

const NAME = 'Nandu Panakanti';
const TITLE = 'Full Stack Developer';
const TAGLINE = 'Building polished, scalable web apps with measurable impact.';
const EMAIL = 'panakantinandu@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/nandu-panakanti-41839731a/';
const GITHUB = 'https://github.com/panakantinandu';
const PHONE = '+1 (913) 206-2988';
const RESUME_URL = '/Nandu_Resume.pdf';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  { group: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'PHP'] },
  { group: 'Databases', items: ['MongoDB', 'MySQL', 'SQL Server', 'Oracle'] },
  { group: 'Cloud/DevOps', items: ['AWS', 'Azure', 'Git', 'GitHub', 'GitLab'] },
  { group: 'Other', items: ['Stripe', 'Twilio', 'Firebase', 'Grafana'] },
];

const projects = [
 
 {
    title: 'StudyMate — Educational Management',
    blurb: 'LAMP stack platform for sessions, uploads, notifications, and role‑based access control.',
    highlights: [
      'Secure auth with RBAC & hashed passwords',
      'PHPMailer for verification & password reset',
      'MySQL schema + migrations for reliability',
    ],
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    links: { demo: '#', code: '#' },
  },
  {
    title: 'Community Food Sharing Platform',
    blurb: 'Cloud‑based donor/receiver marketplace with real‑time matching and geolocation.',
    highlights: [
      'Firebase Auth + role‑based flows',
      'Google Maps for nearby listings',
      'Cloud Functions notifications & metrics',
    ],
    stack: ['React', 'Express', 'Firebase', 'Firestore/MongoDB'],
    links: { demo: '#', code: '#' },
  },
  {
    title: 'AI Deepfake & Misinformation Detection',
    blurb: 'Multimodal models (video/audio/text) with explainability tooling for robust detection.',
    highlights: [
      'CNNs for frames, RNN/CNN for audio, Transformers (BERT/RoBERTa) for text',
      'Attention‑based fusion, AUC‑ROC/F1 evaluation',
      'Grad‑CAM & SHAP/LIME explanations',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'Librosa', 'Transformers'],
    links: { demo: '#', code: '#' },
  },
   {
    title: 'Property Management Platform',
    blurb: 'Full‑stack rental platform with digital applications, secure payments, and real‑time notifications.',
    highlights: [
      'Automated deposit handling & refunds',
      'Stripe & PayPal payments with status updates',
      'Twilio/Firebase notifications for events',
    ],
    stack: ['React', 'Node', 'Express', 'MongoDB', 'Stripe', 'Firebase'],
    links: { demo: '#', code: '#' },
  },
  {
    title: 'MQWC Bandpass Filter (HFSS)',
    blurb: 'High‑frequency filter design with improved harmonic suppression for radar communication.',
    highlights: ['S‑parameter simulation & tuning', 'Optimized resonators & coupling gaps', 'Enhanced harmonic rejection'],
    stack: ['HFSS', 'EM Simulation'],
    links: { demo: '#', code: '#' },
  },
];

const blogPosts = [
  {
    title: 'Building Reliable Notification Pipelines with Firebase + Twilio',
    date: 'Coming Soon',
    summary: 'Design notes, pitfalls, and patterns for real‑time notifications in full‑stack apps.',
  },
  {
    title: 'From Prototype to Production: Hardening a MERN App',
    date: 'Coming Soon',
    summary: 'Auth, observability, and CI basics that actually matter when shipping.',
  },
  {
    title: 'Multimodal Deepfake Detection: A Practical Walkthrough',
    date: 'Coming Soon',
    summary: 'Data prep, model fusion, and evaluation without academic fluff.',
  },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.7 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0.2 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur"
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="h-1 w-28 mx-auto mt-4 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
    </div>
  );
}

export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Local CSS for animated background */}
      
      <style>{`
        @keyframes gradientMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .bg-animate { background: linear-gradient(-45deg,#14b8a6,#6366f1,#ec4899,#f59e0b); background-size: 400% 400%; animation: gradientMove 18s ease infinite; }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Backdrop gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 bg-animate" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full blur-2xl opacity-20 bg-animate" />
      </div>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className={`flex items-center justify-between ${scrolled ? 'h-14' : 'h-16'}`}>
            <a href="#home" className="font-semibold tracking-tight">{NAME}</a>
            <nav className="hidden gap-6 md:flex">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm text-slate-700 hover:text-slate-900">
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium hover:shadow">Resume</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800">GitHub</a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-28">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid items-center gap-12 md:grid-cols-2">
          <motion.div variants={fadeUp}>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              {TITLE}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-4 text-lg text-slate-700 max-w-xl">
              {TAGLINE}
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-2xl bg-slate-900 px-5 py-2 text-white hover:bg-slate-800">View Projects</a>
              <a href="#contact" className="rounded-2xl border border-slate-300 px-5 py-2 hover:shadow">Contact Me</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span>📍 Remote / US</span>
              <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a className="underline" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
              <span>{PHONE}</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl">
            <p className="text-sm font-medium text-slate-500">What I care about</p>
            <ul className="mt-3 space-y-2 text-slate-800">
              <li>• Clear, maintainable code and pragmatic architecture</li>
              <li>• Shipping features, measuring impact, iterating fast</li>
              <li>• Secure auth, reliable payments, and real‑time UX</li>
            </ul>
            <div className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-30 blur-2xl bg-animate" />
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="About" subtitle="Full‑stack developer across React, Node, and cloud. I turn ideas into production‑ready systems with clean UX and measurable outcomes." />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">Snapshot</h3>
            <p className="mt-2 text-slate-700">I build end‑to‑end web apps: responsive frontends, robust APIs, and data models that hold up in the real world. I’ve worked with AWS/Azure, Stripe, Firebase, and modern tooling across the stack.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Currently</h3>
            <p className="mt-2 text-slate-700">Master’s in Computer Science (UCM, 2026). Open to full‑time roles where I can own features, move fast, and ship.</p>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="Skills" subtitle="Tools I use to build and ship." />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((group) => (
            <motion.div key={group.group} {...fadeUp}>
              <Card>
                <h3 className="text-base font-semibold">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="Projects" subtitle="Selected software work with one technical detour for breadth." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.55 + idx * 0.06 }}>
              <Card>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-slate-700">{p.blurb}</p>
                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <a href={p.links?.demo || '#'} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:shadow">Live Demo</a>
                  <a href={p.links?.code || '#'} className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800">View Code</a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GITHUB STATS */}
      <section id="github" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="GitHub" subtitle="A snapshot of recent activity." />
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <img className="w-full rounded-xl border" alt="GitHub Stats" src={`https://github-readme-stats.vercel.app/api?username=panakantinandu&show_icons=true&hide_border=true`} />
            <img className="w-full rounded-xl border" alt="Top Languages" src={`https://github-readme-stats.vercel.app/api/top-langs/?username=panakantinandu&layout=compact&hide_border=true`} />
          </div>
        </Card>
      </section>

      {/* BLOG */}
      <section id="blog" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="Blog" subtitle="Writing to clarify thinking. Posts are in progress." />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.div key={post.title} {...fadeUp}>
              <Card>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{post.date}</p>
                <p className="mt-2 text-slate-700">{post.summary}</p>
                <button className="mt-4 rounded-xl border border-slate-300 px-3 py-1.5 text-sm text-slate-600" disabled>Coming soon</button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="Contact" subtitle="No forms, no fluff — reach me directly." />
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold">Let’s build something.</h3>
              <p className="mt-2 text-slate-700">Prefer a quick email over forms. If you really want a form later, wire it to Formspree/Nodemailer.</p>
              <div className="mt-4 flex flex-col gap-2 text-slate-800">
                <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a className="underline" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="underline" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
                <span>{PHONE}</span>
              </div>
              <div className="mt-6">
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="rounded-2xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">Download Resume (PDF)</a>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              <p className="font-medium text-slate-600">Form Placeholder</p>
              <p className="mt-2">Keep it simple: until you need a backend, use mailto links. If you want real submissions, hook this up to a serverless endpoint later.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© {year} {NAME}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:text-slate-900">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
