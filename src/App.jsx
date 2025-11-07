import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// ====== STATIC DATA ======
const NAME = "Nandu Panakanti";
const TITLE = "Full Stack Developer";
const TAGLINE =
  "Building polished, scalable web apps with measurable impact.";
const EMAIL = "panakantinandu@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nandu-panakanti-41839731a/";
const GITHUB = "https://github.com/panakantinandu";
const PHONE = "+1 (913) 206-2988";
const RESUME_URL = "/Nandu_Resume.pdf";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const skills = [
  {
    group: "Frontend",
    items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  { group: "Backend", items: ["Node.js", "Express.js", "PHP"] },
  { group: "Databases", items: ["MongoDB", "MySQL", "SQL Server", "Oracle"] },
  {
    group: "Cloud / DevOps",
    items: ["AWS", "Azure", "Git", "GitHub", "GitLab"],
  },
  { group: "Other", items: ["Stripe", "Twilio", "Firebase", "Grafana"] },
];

const projects = [
  {
    title: "StudyMate — Educational Management",
    blurb:
      "LAMP stack platform for sessions, uploads, notifications, and role-based access control.",
    highlights: [
      "Secure auth with RBAC & hashed passwords",
      "PHPMailer for verification & password reset",
      "MySQL schema + migrations for reliability",
    ],
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    links: {
      demo: "#",
      code: "https://github.com/panakantinandu/studymate",
    },
  },
  {
    title: "Community Food Sharing Platform",
    blurb:
      "Cloud-based donor/receiver marketplace with real-time matching and geolocation.",
    highlights: [
      "Firebase Auth + role-based flows",
      "Google Maps for nearby listings",
      "Cloud Functions notifications & metrics",
    ],
    stack: ["React", "Express", "Firebase", "Firestore/MongoDB"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "AI Deepfake & Misinformation Detection",
    blurb:
      "Multimodal models (video/audio/text) with explainability tooling for robust detection.",
    highlights: [
      "CNNs for frames, Transformers for text",
      "Attention-based fusion, AUC-ROC/F1 evaluation",
      "Grad-CAM & SHAP/LIME explanations",
    ],
    stack: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
    links: {
      demo: "#",
      code: "https://github.com/panakantinandu/deepfake-detection-system_NanduML",
    },
  },
  {
    title: "Property Management Platform",
    blurb:
      "Full-stack rental platform with digital applications, secure payments, and notifications.",
    highlights: [
      "Automated deposit handling & refunds",
      "Stripe & PayPal payments with status updates",
      "Twilio/Firebase notifications for events",
    ],
    stack: ["React", "Node", "Express", "MongoDB", "Stripe", "Firebase"],
    links: {
      demo: "#",
      code: "https://github.com/panakantinandu/Property-MS-main",
    },
  },
  {
    title: "MQWC Bandpass Filter (HFSS)",
    blurb:
      "High-frequency filter design with improved harmonic suppression for radar communication.",
    highlights: [
      "S-parameter simulation & tuning",
      "Optimized resonators & coupling gaps",
      "Enhanced harmonic rejection",
    ],
    stack: ["HFSS", "EM Simulation"],
    links: { demo: "#", code: "#" },
  },
];

const blogPosts = [
  {
    title: "Building Reliable Notification Pipelines with Firebase + Twilio",
    date: "Coming Soon",
    summary:
      "Design notes, pitfalls, and patterns for real-time notifications in full-stack apps.",
  },
  {
    title: "From Prototype to Production: Hardening a MERN App",
    date: "Coming Soon",
    summary: "Auth, observability, CI/CD that actually matters.",
  },
  {
    title: "Multimodal Deepfake Detection: A Practical Walkthrough",
    date: "Coming Soon",
    summary:
      "Data prep, model fusion, and evaluation without academic fluff.",
  },
];

// ====== MOTION PRESETS ======
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.25 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ====== 3D OBJECT ======
function SpinningIcosahedron() {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.75;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.45, 0]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={2.6}
        metalness={0.5}
        roughness={0.25}
      />
    </mesh>
  );
}

// ====== MAGNETIC WRAPPER ======
function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    };
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

// ====== BASIC UI PIECES ======
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-sm font-medium text-slate-100 shadow-sm backdrop-blur-sm hover:border-indigo-400/80 hover:text-white transition">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className={`rounded-2xl border border-slate-700/40 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="h-1 w-28 mx-auto mt-5 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
    </div>
  );
}

export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0); // for width only

  // motion values (for cursor glow)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const scrollMV = useMotionValue(0); // motion version of scroll
  const cursorSpringX = useSpring(cursorX, { stiffness: 120, damping: 15 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 120, damping: 15 });
  const cursorScale = useTransform(scrollMV, [0, 100], [1, 1.1]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (y / total) * 100 : 0;
      setScrollPercent(pct);
      scrollMV.set(pct); // update motion value too
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    const onMove = (e) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [cursorX, cursorY, scrollMV]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Cursor glow follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[5] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.26)_0%,rgba(15,23,42,0)_60%)]"
        style={{ x: cursorSpringX, y: cursorSpringY, scale: cursorScale }}
      />

      {/* Scroll progress bar */}
      <div className="fixed left-0 top-0 z-[80] h-[3px] w-full bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-all"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Background glow layers (replacing tsparticles to avoid version crash) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 via-sky-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-emerald-500/40 via-sky-500/20 to-transparent blur-2xl" />
      </div>

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "bg-slate-950/70 backdrop-blur border-b border-slate-800/70"
            : "bg-gradient-to-b from-slate-950/40 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div
            className={`flex items-center justify-between ${
              scrolled ? "h-14" : "h-16"
            }`}
          >
            <a
              href="#home"
              className="font-semibold tracking-tight text-white flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {NAME}
            </a>
            <nav className="hidden gap-6 md:flex">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-slate-200 hover:text-white transition relative after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-indigo-400 after:to-emerald-400 after:transition-all"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Magnetic strength={0.1}>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium hover:border-indigo-400 hover:text-white transition"
                >
                  Resume
                </a>
              </Magnetic>
              <Magnetic strength={0.12}>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-indigo-500/90 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-400 transition"
                >
                  GitHub
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="mx-auto max-w-6xl px-4 pt-20 pb-28 relative"
      >
        {/* depth layer */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/20 via-sky-500/10 to-transparent blur-3xl" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-slate-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE FOR FULL-TIME — 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              {TITLE}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-slate-300 max-w-xl"
            >
              {TAGLINE}
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-5 py-2.5 text-white hover:shadow-[0_0_38px_rgba(99,102,241,0.45)] transition"
                >
                  View Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="rounded-2xl border border-slate-700/70 px-5 py-2.5 hover:bg-slate-900/50 transition"
                >
                  Contact Me
                </a>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span>📍 Remote / US</span>
              <a
                className="underline decoration-dotted underline-offset-4"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
              <a
                className="underline decoration-dotted underline-offset-4"
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span>{PHONE}</span>
            </div>
          </motion.div>
          {/* HERO 3D PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-slate-700/40 bg-slate-900/30 shadow-xl backdrop-blur-md h-[350px]"
          >
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[3, 3, 3]}
                intensity={1.3}
                color="#94a3b8"
              />
              <Suspense fallback={null}>
                <SpinningIcosahedron />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
            <div className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-30 blur-2xl bg-gradient-to-br from-indigo-500/60 via-sky-500/30 to-emerald-400/40" />
            <div className="absolute bottom-3 left-3 text-xs text-slate-300/70">
              Interactive tech orb — just because we can.
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="About"
          subtitle="Full-stack developer across React, Node, and cloud. I turn ideas into production-ready systems with clean UX and measurable outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Snapshot</h3>
            <p className="mt-2 text-slate-300">
              I build end-to-end web apps: responsive frontends, robust APIs,
              and data models that hold up in the real world. Experience with
              AWS/Azure, Stripe, Firebase, and modern CI/CD.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Currently</h3>
            <p className="mt-2 text-slate-300">
              Master’s in Computer Science (UCM, 2026). Open to full-time roles
              where I can own features, move fast, and ship.
            </p>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader title="Skills" subtitle="Tools I use to build and ship." />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((group) => (
            <motion.div key={group.group} {...fadeUp}>
              <Card className="h-full">
                <h3 className="text-base font-semibold text-white">
                  {group.group}
                </h3>
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
        <SectionHeader
          title="Projects"
          subtitle="Selected work — real features, real stacks."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ duration: 0.55 + idx * 0.04 }}
            >
              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-gradient-to-br from-indigo-500/50 via-sky-500/20 to-emerald-400/40 transition" />
                <h3 className="text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-slate-300">{p.blurb}</p>
                <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
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
                  <a
                    href={p.links?.demo || "#"}
                    className="rounded-xl border border-slate-700/60 px-3 py-1.5 text-sm text-slate-100 hover:border-indigo-400 transition"
                  >
                    Live Demo
                  </a>
                  <a
                    href={p.links?.code || "#"}
                    className="rounded-xl bg-slate-100/90 px-3 py-1.5 text-sm text-slate-900 hover:bg-white transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Code
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GITHUB STATS */}
      <section id="github" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="GitHub"
          subtitle="A snapshot of recent activity."
        />
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <img
              className="w-full rounded-xl border border-slate-700"
              alt="GitHub Stats"
              src={`https://github-readme-stats.vercel.app/api?username=panakantinandu&show_icons=true&hide_border=true&theme=tokyonight`}
            />
            <img
              className="w-full rounded-xl border border-slate-700"
              alt="Top Languages"
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=panakantinandu&layout=compact&hide_border=true&theme=tokyonight`}
            />
          </div>
        </Card>
      </section>

      {/* BLOG */}
      <section id="blog" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="Blog"
          subtitle="Writing to clarify thinking. Posts are in progress."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.div key={post.title} {...fadeUp}>
              <Card>
                <h3 className="text-lg font-semibold text-white">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{post.date}</p>
                <p className="mt-2 text-slate-300">{post.summary}</p>
                <button
                  className="mt-4 rounded-xl border border-slate-700/60 px-3 py-1.5 text-sm text-slate-200 cursor-not-allowed"
                  disabled
                >
                  Coming soon
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="Contact"
          subtitle="No forms, no fluff — reach me directly."
        />
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-white">
                Let’s build something.
              </h3>
              <p className="mt-2 text-slate-300">
                Prefer a quick email over forms. If you really want a form
                later, wire it to Formspree/Nodemailer.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-slate-200">
                <a
                  className="underline underline-offset-4"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
                <a
                  className="underline underline-offset-4"
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="underline underline-offset-4"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <span>{PHONE}</span>
              </div>
              <div className="mt-6">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-2 text-white hover:shadow-[0_0_38px_rgba(99,102,241,0.45)] transition"
                >
                  Download Resume (PDF)
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400 bg-slate-950/40">
              <p className="font-medium text-slate-100">Form Placeholder</p>
              <p className="mt-2">
                Keep it simple: until you need a backend, use mailto links. If
                you want real submissions, hook this up to a serverless endpoint
                later.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-400">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>
              © {year} {NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="hover:text-slate-100 transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
