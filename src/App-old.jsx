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
const TITLE = "Full Stack Software Engineer";
const TAGLINE =
  "Building secure, production-ready SaaS platforms";
const HEADLINE = 
  "I design and build real-world systems for property management, payments, automation, and scalable backend workflows.";
const EMAIL = "panakantinandu@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nandu-panakanti-41839731a/";
const GITHUB = "https://github.com/panakantinandu";
const PHONE = "+1 (913) 206-2988";
const RESUME_URL = "/Resume(Nan).pdf";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "engineering", label: "Engineering" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const skills = [
  {
    group: "Backend & APIs",
    items: ["Node.js", "Express.js", "RESTful APIs", "Webhooks", "PHP"],
  },
  { 
    group: "Databases", 
    items: ["MongoDB Atlas", "MySQL", "SQL Server", "Firestore"] 
  },
  {
    group: "Payments & Security",
    items: ["Stripe", "JWT", "RBAC", "OAuth", "Encryption"],
  },
  {
    group: "Cloud & Deployment",
    items: ["AWS", "Azure", "Render", "Firebase", "Docker"],
  },
  { 
    group: "Frontend", 
    items: ["React", "JavaScript", "TypeScript", "HTML/CSS"] 
  },
  { 
    group: "Tools & Workflow", 
    items: ["Git", "GitHub Actions", "Postman", "VS Code"] 
  },
];

const projects = [
  {
    title: "LeaseHub — Property Management SaaS Platform",
    flagship: true,
    problem: "Manual lease management causes payment delays, tenant disputes, and revenue loss for property managers.",
    solution: "LeaseHub automates the entire lease lifecycle — applications, deposits, rent collection, late fees, cancellations, and real-time reporting.",
    blurb:
      "Full-stack rental platform with automated lease workflows, secure payment processing, and role-based access control.",
    highlights: [
      "Backend-driven automation with event-based payment processing",
      "Stripe webhooks for secure transaction verification & idempotency",
      "Role-based access control (Admin / Tenant) with JWT authentication",
      "Automated invoice generation with cron jobs for recurring rent",
      "Comprehensive audit logs for payment disputes and compliance",
      "Data consistency across Invoices ↔ Payments ↔ Financial Ledger",
      "Automated deposit handling, refunds, and late fee calculations",
    ],
    stack: ["Node.js", "Express", "MongoDB Atlas", "Stripe", "JWT", "Cron Jobs", "React", "Firebase"],
    architecture: [
      "RESTful API with Express middleware for auth & validation",
      "MongoDB schemas with referential integrity for tenant/lease/payment data",
      "Stripe webhook integration for payment state synchronization",
      "Scheduled jobs for automated invoicing and notification triggers",
      "Audit trail system for financial transparency and dispute resolution",
    ],
    impact: "Eliminates manual rent collection, reduces payment delays by 70%, and provides real-time financial visibility to property managers.",
    links: {
      AdminLive: "https://leasehub-admin.onrender.com/",
      TenantLive: "https://leasehub-tenant.onrender.com/",
      code: "https://github.com/panakantinandu/Property-MS-main",
    },
  },
  {
    title: "StudyMate — Educational Management Platform",
    problem: "Educational institutions need secure, role-based platforms for course management and student engagement.",
    solution: "LAMP stack platform with secure authentication, role-based access control, and automated email workflows.",
    blurb:
      "Educational platform with session management, file uploads, and email-based verification system.",
    highlights: [
      "Secure authentication with bcrypt password hashing & session management",
      "Role-based access control (Student / Instructor / Admin)",
      "PHPMailer integration for email verification & password reset flows",
      "MySQL database with normalized schema and migration scripts",
      "File upload system with validation and storage management",
    ],
    stack: ["PHP", "MySQL", "PHPMailer", "Bootstrap", "JavaScript", "HTML/CSS"],
    links: {
      code: "https://github.com/panakantinandu/studymate",
    },
  },
  {
    title: "Employee Attrition Prediction System",
    problem: "HR teams struggle to proactively identify at-risk employees, leading to costly turnover.",
    solution: "ML-powered web application that predicts employee attrition with explainable AI insights.",
    blurb:
      "Production ML system with Random Forest classification, SHAP explainability, and real-time prediction API.",
    highlights: [
      "Random Forest model with automated preprocessing pipeline",
      "SHAP explainability dashboard for model transparency",
      "Real-time prediction API with batch processing for HR data uploads",
      "Streamlit web interface deployed on Render for global access",
      "Feature engineering with imbalance handling and encoding strategies",
    ],
    stack: ["Python", "Scikit-Learn", "SHAP", "Streamlit", "Pandas", "NumPy"],
    links: {
      Live: "https://ml-project-nan.onrender.com/",
      code: "https://github.com/panakantinandu/ML_Project-Nan-",
    },
  },
  {
    title: "Community Food Sharing Platform",
    problem: "Food waste and hunger coexist due to lack of efficient donor-receiver matching systems.",
    solution: "Cloud-based marketplace with real-time geolocation matching and Firebase Cloud Functions.",
    blurb:
      "Donor/receiver platform with Firebase authentication, Google Maps integration, and real-time notifications.",
    highlights: [
      "Firebase Authentication with role-based user flows",
      "Google Maps API for proximity-based food listing discovery",
      "Cloud Functions for automated notifications and metrics tracking",
      "Firestore for real-time data synchronization",
    ],
    stack: ["React", "Express", "Firebase", "Firestore", "Google Maps API"],
    links: { code: "#" },
  },
];

const blogPosts = [
  {
    title: "Building Reliable Payment Systems with Stripe Webhooks",
    date: "Coming Soon",
    summary:
      "Deep dive into webhook security, idempotency, and handling payment failures in production.",
  },
  {
    title: "Designing Role-Based Access Control for SaaS Platforms",
    date: "Coming Soon",
    summary: "JWT authentication, middleware patterns, and secure session management.",
  },
  {
    title: "Automated Background Jobs: Cron, Queues, and Error Handling",
    date: "Coming Soon",
    summary:
      "Building reliable automation systems for recurring invoices and notifications.",
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
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-slate-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              OPEN TO FULL-TIME SOFTWARE ENGINEERING ROLES
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-5xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight"
            >
              {TITLE}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-xl font-semibold text-indigo-300"
            >
              {TAGLINE}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              {HEADLINE}
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-6 py-3 text-white font-medium hover:shadow-[0_0_38px_rgba(99,102,241,0.45)] transition"
                >
                  View Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="rounded-2xl border border-slate-700/70 px-6 py-3 font-medium hover:bg-slate-900/50 transition"
                >
                  View Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="rounded-2xl border border-slate-700/70 px-6 py-3 font-medium hover:bg-slate-900/50 transition"
                >
                  Contact Me
                </a>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span>📍 Remote / US</span>
              <a
                className="underline decoration-dotted underline-offset-4 hover:text-white transition"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
              <a
                className="underline decoration-dotted underline-offset-4 hover:text-white transition"
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
          {/* Resume Embed Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-slate-700/40 bg-slate-900/30 shadow-xl backdrop-blur-md overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700/40 bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-400 font-mono">Resume.pdf</span>
              </div>
            </div>
            <div className="h-[350px] bg-slate-950/60 flex items-center justify-center">
              <iframe
                src={RESUME_URL}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
            <div className="absolute bottom-4 right-4">
              <a
                href={RESUME_URL}
                download
                className="rounded-xl bg-indigo-500/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 transition shadow-lg"
              >
                Download Resume
              </a>
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
