import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== HONEST DATA ONLY ======
const CONTACT = {
  name: "Nandu Panakanti",
  email: "panakantinandu@gmail.com",
  linkedin: "https://www.linkedin.com/in/nandu-panakanti-41839731a/",
  github: "https://github.com/panakantinandu",
  phone: "+1 (913) 206-2988",
  resume: "/Resume(Nan).pdf",
};

// Complete skills from resume - NO inflation
const SKILLS = {
  languages: {
    title: "Languages",
    icon: "📝",
    items: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "PHP"],
  },
  frontend: {
    title: "Frontend",
    icon: "🎨",
    items: ["React.js", "HTML5", "CSS3", "Bootstrap"],
  },
  backend: {
    title: "Backend & APIs",
    icon: "⚙️",
    items: ["Node.js", "Express.js", "REST APIs", "Webhooks"],
  },
  databases: {
    title: "Databases",
    icon: "💾",
    items: ["MongoDB Atlas", "MySQL", "Oracle", "SQL Server", "Firestore"],
  },
  payments: {
    title: "Payments & Security",
    icon: "🔐",
    items: [
      "Stripe (Checkout, Webhooks)",
      "JWT Authentication",
      "Role-Based Access Control",
      "Password Hashing (bcrypt)",
      "Environment Variables",
    ],
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: "☁️",
    items: ["AWS (IAM, RDS)", "Render", "Vercel", "Firebase", "Docker"],
  },
  tools: {
    title: "Tools & Others",
    icon: "🛠️",
    items: ["Git & GitHub", "Streamlit", "Arduino"],
  },
};

// Real projects - honest presentation
const PROJECTS = [
  {
    id: "leasehub",
    name: "LeaseHub",
    status: "Production",
    tagline: "Property Management SaaS Platform",
    problem:
      "Manual lease management causes payment delays, disputes, and admin overhead. Property managers lack visibility into financials and tenant status.",
    solution:
      "End-to-end automation for the entire lease lifecycle with secure payment processing and real-time reporting.",
    whatBuilt: [
      "Complete lease lifecycle automation (application → approval → deposit → rent → late fees → cancellation)",
      "Stripe payment integration with webhook verification and transaction reconciliation",
      "Role-based access control (Admin/Tenant) with JWT authentication",
      "Automated invoice generation and dispatch via cron jobs",
      "Comprehensive audit logs for dispute resolution",
      "Financial ledger with consistency across invoices, payments, and transactions",
    ],
    architecture: [
      "RESTful API built with Node.js/Express with auth middleware",
      "MongoDB schemas with referential integrity for tenants, leases, payments",
      "Stripe webhooks for real-time payment state synchronization",
      "Scheduled jobs (node-cron) for recurring invoices and notifications",
      "Audit trail system capturing all financial transactions",
    ],
    techStack: ["Node.js", "Express.js", "MongoDB Atlas", "Stripe", "JWT", "React", "Firebase"],
    links: {
      github: "https://github.com/panakantinandu/Property-MS-main",
      adminLive: "https://leasehub-admin.onrender.com/",
      tenantLive: "https://leasehub-tenant.onrender.com/",
    },
  },
  {
    id: "studymate",
    name: "StudyMate",
    status: "Complete",
    tagline: "Educational Platform with RBAC",
    problem:
      "Educational institutions needed a secure, scalable platform for course management, session booking, and document sharing.",
    solution:
      "Full-stack LAMP application with role-based access control, email workflows, and secure file handling.",
    whatBuilt: [
      "Secure authentication with bcrypt password hashing and session management",
      "Role-based access control (Student / Instructor / Admin)",
      "Email verification and password reset flows via PHPMailer",
      "MySQL database with normalized schema and proper indexing",
      "File upload system with validation and storage management",
      "Bootstrap UI with responsive design",
    ],
    architecture: [
      "PHP backend with MVC pattern and middleware",
      "MySQL relational database with foreign key constraints",
      "PHPMailer for SMTP email delivery",
      "Session-based authentication with hashed passwords",
      "File handling with type validation and secure storage",
    ],
    techStack: ["PHP", "MySQL", "PHPMailer", "Bootstrap", "JavaScript", "HTML5", "CSS3"],
    links: {
      github: "https://github.com/panakantinandu/studymate",
    },
  },
  {
    id: "attrition",
    name: "ML Attrition System",
    status: "Deployed",
    tagline: "Employee Attrition Prediction with Explainability",
    problem:
      "HR teams lack tools to proactively identify at-risk employees before they leave, leading to costly turnover and knowledge loss.",
    solution:
      "Machine learning system with SHAP explainability to transparently predict employee attrition.",
    whatBuilt: [
      "Random Forest classification model with automated preprocessing pipeline",
      "Data handling: encoding categorical variables, scaling numerical features, balancing class imbalance",
      "SHAP dashboard for model explainability and feature importance visualization",
      "Real-time prediction API with batch processing capabilities",
      "Streamlit web interface for interactive predictions and model insights",
      "Deployment on Render for global accessibility",
    ],
    architecture: [
      "Python/Scikit-Learn for model development and training",
      "Pandas/NumPy for data manipulation and preprocessing",
      "SHAP library for explaining model predictions",
      "Streamlit for web interface and interactive dashboard",
      "Render for serverless deployment and scaling",
    ],
    techStack: ["Python", "Scikit-Learn", "SHAP", "Streamlit", "Pandas", "NumPy"],
    links: {
      live: "https://ml-project-nan.onrender.com/",
      github: "https://github.com/panakantinandu/ML_Project-Nan-",
    },
  },
];

// Production principles
const SYSTEMS = [
  {
    title: "Secure Authentication & RBAC",
    icon: "🔐",
    description:
      "JWT tokens for stateless auth, refresh token rotation, role-based middleware. User context throughout request lifecycle.",
    color: "from-indigo-500/20",
  },
  {
    title: "Payment Reliability",
    icon: "💳",
    description:
      "Stripe webhook verification, idempotency keys for retry safety, transaction state machines, reconciliation logic.",
    color: "from-emerald-500/20",
  },
  {
    title: "Automation & Scheduling",
    icon: "⚡",
    description:
      "Cron jobs for recurring tasks (invoices, notifications), error handling with retry logic, job logging.",
    color: "from-sky-500/20",
  },
  {
    title: "Data Integrity",
    icon: "📊",
    description:
      "Referential integrity across related entities, audit logs for all financial transactions, consistency checks.",
    color: "from-amber-500/20",
  },
];

// ====== ANIMATION VARIANTS ======
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ====== COMPONENTS ======

function Navigation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "systems", label: "Systems" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{
          width:
            typeof window !== "undefined"
              ? `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
              : "0%",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/40 border-b border-slate-800/20"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 font-bold text-white text-lg hover:text-indigo-400 transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            {CONTACT.name}
          </motion.a>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-slate-400 hover:text-white transition relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-indigo-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.a
            href={CONTACT.resume}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-sm hover:bg-indigo-500/30 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
        </div>
      </motion.nav>
    </>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10"
        >
          <span className="text-indigo-300 text-sm font-medium">
            Full Stack Software Engineer • Production Systems
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Building Real Systems That Handle
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Money, Users & Scale
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          I build production-ready SaaS platforms with a focus on security, reliability, and data integrity. 
          From payment processing to automated workflows, I understand what it takes to build systems 
          that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-xl hover:shadow-indigo-500/30 transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href={`mailto:${CONTACT.email}`}
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
          <motion.a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <div className="text-slate-400 text-sm mb-2">Scroll to explore</div>
          <div className="flex justify-center gap-1">
            <motion.div
              className="w-1 h-6 rounded-full bg-indigo-400/50"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-slate-400">
            Building production systems with a focus on reliability and correctness
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-xl p-8 backdrop-blur"
        >
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I'm a full-stack software engineer with hands-on experience building production systems 
            that handle real business logic. I understand the complete stack—from secure authentication 
            and payment processing to automated workflows and data integrity.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            My focus is on engineering maturity: writing code that's secure, reliable, and maintainable. 
            Whether it's designing a payment system with idempotent operations or implementing automated 
            workflows with proper error handling, I approach every system with production-grade standards.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Currently pursuing a Master's in Computer Science (graduating May 2026) and open to full-time 
            roles where I can contribute to systems that matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState("leasehub");
  const currentProject = PROJECTS.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">
            Production systems solving real problems
          </p>
        </motion.div>

        {/* Project tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex gap-4 mb-8 flex-wrap"
        >
          {PROJECTS.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`px-6 py-3 rounded-lg border transition ${
                selectedProject === project.id
                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold">{project.name}</div>
              <div className="text-xs">{project.status}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Project detail */}
        <AnimatePresence mode="wait">
          {currentProject && (
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left side */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentProject.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    {currentProject.tagline}
                  </p>

                  {/* Problem */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-rose-400 mb-2">
                      Problem
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {currentProject.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                      Solution
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {currentProject.solution}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div>
                  {/* What I Built */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-indigo-400 mb-3">
                      What I Built
                    </h4>
                    <ul className="space-y-2">
                      {currentProject.whatBuilt.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-indigo-400 mt-1">→</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3">
                      Architecture
                    </h4>
                    <ul className="space-y-2">
                      {currentProject.architecture.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 + 0.2 }}
                          className="flex items-start gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {currentProject.links.github && (
                      <motion.a
                        href={currentProject.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition border border-slate-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        GitHub
                      </motion.a>
                    )}
                    {currentProject.links.adminLive && (
                      <motion.a
                        href={currentProject.links.adminLive}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm hover:bg-indigo-500/30 transition border border-indigo-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Admin Demo
                      </motion.a>
                    )}
                    {currentProject.links.tenantLive && (
                      <motion.a
                        href={currentProject.links.tenantLive}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-sky-500/20 text-sky-300 text-sm hover:bg-sky-500/30 transition border border-sky-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Tenant Demo
                      </motion.a>
                    )}
                    {currentProject.links.live && (
                      <motion.a
                        href={currentProject.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm hover:bg-emerald-500/30 transition border border-emerald-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section id="systems" className="py-24 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            How I Build Real Systems
          </h2>
          <p className="text-slate-400">
            Production principles that matter
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SYSTEMS.map((system, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className={`bg-gradient-to-br ${system.color} to-slate-900/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur hover:border-slate-600/50 transition group`}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{system.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {system.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {system.description}
                  </p>
                </div>
              </div>
              <motion.div
                className="mt-4 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skillCategories = Object.entries(SKILLS);

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-slate-400">
            Complete toolkit for building production systems
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map(([key, skill]) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="group"
            >
              <motion.div
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-lg p-6 h-full hover:border-slate-600/50 transition backdrop-blur"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-3">{skill.icon}</div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {skill.title}
                </h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {skill.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 group/item"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        whileHover={{ scale: 2 }}
                      />
                      <span className="text-slate-300 text-sm group-hover/item:text-indigo-300 transition">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Let's Build Something Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl text-slate-300 mb-8 leading-relaxed"
        >
          I build real, secure, production-ready systems.
          <br />
          <span className="text-indigo-400">
            If you're looking for an engineer who understands business and technology — let's talk.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href={`mailto:${CONTACT.email}`}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-xl hover:shadow-indigo-500/30 transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Email
          </motion.a>
          <motion.a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-slate-700/30"
        >
          <p className="text-slate-500 text-sm">
            Available for full-time roles | Open to remote and on-site positions
          </p>
          <p className="text-slate-600 text-xs mt-2">
            © 2026 {CONTACT.name}. Crafted with attention to detail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ====== MAIN APP ======
export default function Portfolio() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SystemsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
