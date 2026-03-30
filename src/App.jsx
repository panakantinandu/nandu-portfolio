import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

// ====== HONEST DATA ONLY ======
const CONTACT = {
  name: "Nandu Panakanti",
  email: "panakantinandu@gmail.com",
  linkedin: "https://www.linkedin.com/in/nandu-panakanti-41839731a/",
  github: "https://github.com/panakantinandu",
  phone: "+1 (913) 206-2988",
  resume: "/Resume(Nan).pdf",
};
const SKILLS = [

{
title: "Languages",
icons: "java,js,ts,python,php"
},

{
title: "Frontend",
icons: "react,angular,html,css,bootstrap"
},

{
title: "Backend",
icons: "nodejs,express,spring"
},

{
title: "Databases",
icons: "mongodb,postgres,mysql"
},

{
title: "Distributed Systems",
icons: "redis,kafka"
},

{
title: "Cloud & DevOps",
icons: "aws,docker,github,git,firebase,vercel"
},

{
title: "Tools",
icons: "vscode,idea,postman"
}

];
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
//certificates
const CERTIFICATES = [
  {
    id: "walmart",
    name: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart",
    date: "May 2025",
    credentialId: "GdMwD3PmFhM4ECmYS",
    skills: ["Data Structures", "UML", "Relational Databases"],
    description:
      "Completed real-world backend engineering tasks including system design and data modeling.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_hFspdJeJnuae3BoDB_1747109821353_completion_certificate.pdf"
  },
  {
    id: "skyscanner",
    name: "Software Engineering Job Simulation",
    issuer: "Skyscanner",
    date: "Apr 2025",
    credentialId: "hdjhWrTH3R8dnkFQM",
    skills: ["React.js", "Figma", "Microservices"],
    description:
      "Worked on frontend systems and microservices architecture simulation.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/skoQmxqhtgWmKv2pm/p3xGFkpdot5H8NBih_skoQmxqhtgWmKv2pm_hFspdJeJnuae3BoDB_1745513981330_completion_certificate.pdf"
  },
  {
    id: "python",
    name: "Full Stack - Python",
    issuer: "Sreyas Institute of Engineering & Technology",
    date: "2024",
    skills: ["Python"],
    description:
      "Built full-stack applications using Python technologies.",
    link: "#"
  },
  {
    id: "python-ds",
    name: "Python for Data Science",
    issuer: "NPTEL",
    date: "Jul 2023",
    skills: [
      "Python",
      "Data Science",
      "Data Analysis",
      "Data Visualization",
      "Machine Learning",
      "Big Data"
    ],
    description:
      "Gained hands-on experience in data analysis, visualization, and machine learning using Python.",
    link: "https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs99/Course/NPTEL23CS99S4570083010087952.pdf"
  },
  {
    id: "dbms",
    name: "Database Management System",
    issuer: "NPTEL",
    date: "Jul 2023",
    skills: ["SQL", "NoSQL", "Database Design"],
    description:
      "Learned database design, querying, and system architecture.",
    link: "https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs79/Course/NPTEL23CS79S3570127910087952.pdf"
  }
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates"},
    { id: "systems", label: "Systems" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{
          width:
            typeof window !== "undefined"
              ? `${(scrollY /
                  (document.documentElement.scrollHeight -
                    window.innerHeight)) *
                100}%`
              : "0%",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-5 left-0 right-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-xl px-6 py-3 shadow-lg">

            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white font-semibold text-lg tracking-wide"
            >
              {CONTACT.name}
            </motion.a>

            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-slate-400 hover:text-white transition relative"
                  whileHover={{ y: -1 }}
                >
                  {item.label}

                  <motion.div
                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-400"
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href={CONTACT.resume}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-md"
            >
              Resume
            </motion.a>

          </div>

        </div>
      </motion.nav>
    </>
  );
}


function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 px-6 bg-slate-950"
    >
      {/* background glow */}
      <div className="absolute inset-0 -z-10">

        <motion.div
          className="absolute top-20 left-10 w-[380px] h-[380px] bg-indigo-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />

      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-5 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10"
          >
            <span className="text-indigo-300 text-sm">
              Full-Stack Engineer • Distributed Systems
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
          >
            Building scalable backend systems for

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              payments, users & real-world scale
            </span>
          </motion.h1>

          {/* accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5 }}
            className="h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-6"
          />

          {/* description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-[15px] leading-relaxed mb-7 max-w-lg"
          >
            Backend-focused developer building production SaaS platforms
            with automated billing, reliable APIs, background workers,
            and systems designed to scale under real workloads.
          </motion.p>

          {/* tech tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {["React", "Node.js", "PostgreSQL", "Distributed Systems"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* buttons */}
          <div className="flex gap-3 flex-wrap">

            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-lg shadow-indigo-500/30"
            >
              View Projects
            </motion.a>

            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={{ y: -2 }}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:text-white"
            >
              Contact
            </motion.a>

            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:text-white"
            >
              GitHub
            </motion.a>

          </div>

        </div>

        {/* RIGHT SIDE ANIMATION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-[360px] max-w-full"
          >
            <Lottie
              path="/animations/tech-startup.json"
              loop
              autoplay
            />
          </motion.div>
        </motion.div>

      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[2px] h-6 bg-indigo-400/40" />
      </motion.div>

    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 bg-slate-950 overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px]"></div>

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-slate-400 text-lg">
            Building scalable systems with reliability and precision
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="flex justify-center"
          >
            <div className="relative group">

              {/* animated glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>

              <img
                src="/profile.jpeg"
                alt="profile"
                className="relative w-[340px] h-[420px] object-cover rounded-3xl border border-slate-700 shadow-2xl transform group-hover:scale-105 transition duration-500"
              />

            </div>
          </motion.div>

          {/* Text Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-xl"
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm a full-stack software engineer focused on building
              production-grade systems that handle real business logic. I design
              reliable backends, scalable APIs, and secure authentication and
              payment systems.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              My engineering philosophy centers on reliability, maintainability,
              and correctness. I design systems with proper error handling,
              idempotent operations, and strong data integrity.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Currently pursuing a Master's in Computer Science (May 2026) and
              actively seeking full-time opportunities to build impactful
              software systems.
            </p>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                React
              </span>

              <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Node.js
              </span>

              <span className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full text-sm">
                Distributed Systems
              </span>

              <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm">
                System Design
              </span>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}




function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState("leasehub");
  const currentProject = PROJECTS.find((p) => p.id === selectedProject);

  return (
    <section
      id="projects"
      className="relative py-32 px-6 bg-slate-950 overflow-hidden"
    >
      {/* background lights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[140px]"></div>

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>

          <p className="text-slate-400 text-lg">
            Production systems solving real-world problems
          </p>
        </motion.div>

        {/* Project Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">

          {PROJECTS.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl border transition backdrop-blur ${
                selectedProject === project.id
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400 text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-indigo-400"
              }`}
            >
              <div className="font-semibold">{project.name}</div>
              <div className="text-xs opacity-70">{project.status}</div>
            </motion.button>
          ))}

        </div>

        {/* Project Card */}
        <AnimatePresence mode="wait">
          {currentProject && (
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-xl"
            >
              <div className="grid lg:grid-cols-2 gap-14 items-start">

                {/* LEFT SIDE */}
                <div>

                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentProject.name}
                  </h3>

                  <p className="text-slate-400 mb-8">
                    {currentProject.tagline}
                  </p>

                  {/* Problem */}
                  <div className="mb-6">
                    <h4 className="text-rose-400 font-semibold mb-2">
                      Problem
                    </h4>

                    <p className="text-slate-300 leading-relaxed">
                      {currentProject.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-8">
                    <h4 className="text-emerald-400 font-semibold mb-2">
                      Solution
                    </h4>

                    <p className="text-slate-300 leading-relaxed">
                      {currentProject.solution}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div>

                  {/* What I Built */}
                  <div className="mb-8">
                    <h4 className="text-indigo-400 font-semibold mb-3">
                      What I Built
                    </h4>

                    <ul className="space-y-3">
                      {currentProject.whatBuilt.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-indigo-400">→</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture */}
                  <div className="mb-8">
                    <h4 className="text-purple-400 font-semibold mb-3">
                      Architecture
                    </h4>

                    <ul className="space-y-3">
                      {currentProject.architecture.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 + 0.2 }}
                          className="flex gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-purple-400">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">

                    {currentProject.links.github && (
                      <motion.a
                        href={currentProject.links.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition"
                      >
                        GitHub
                      </motion.a>
                    )}

                    {currentProject.links.adminLive && (
                      <motion.a
                        href={currentProject.links.adminLive}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition"
                      >
                        Admin Demo
                      </motion.a>
                    )}

                    {currentProject.links.tenantLive && (
                      <motion.a
                        href={currentProject.links.tenantLive}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition"
                      >
                        Tenant Demo
                      </motion.a>
                    )}

                    {currentProject.links.live && (
                      <motion.a
                        href={currentProject.links.live}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
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


function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState("walmart");
  const currentCert = CERTIFICATES.find(c => c.id === selectedCert);

  return (
      <section
        id="certificates"
        className="relative py-32 px-6 bg-slate-950 overflow-hidden"
      >
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[140px]"></div>

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Licenses & Certifications
          </h2>
          <p className="text-slate-400 text-lg">
            Verified credentials and professional training
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {CERTIFICATES.map(cert => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert(cert.id)}
              className={`px-6 py-3 rounded-xl border transition ${
                selectedCert === cert.id
                  ? "bg-indigo-500/20 border-indigo-400 text-white"
                  : "bg-white/5 border-white/10 text-slate-400"
              }`}
            >
              <div className="font-semibold">{cert.issuer}</div>
              <div className="text-xs opacity-70">{cert.date}</div>
            </button>
          ))}
        </div>

        {/* Card */}
        {currentCert && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">

            <h3 className="text-3xl font-bold text-white mb-2">
              {currentCert.name}
            </h3>

            <p className="text-slate-400 mb-6">
              {currentCert.issuer} • {currentCert.date}
            </p>

            <p className="text-slate-300 mb-6">
              {currentCert.description}
            </p>

            {currentCert.credentialId && (
              <p className="text-sm text-slate-500 mb-6">
                Credential ID: {currentCert.credentialId}
              </p>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentCert.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Button */}
            <a
              href={currentCert.link}
              target="_blank"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              View Certificate
            </a>

          </div>
        )}

      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section
      id="systems"
      className="relative py-32 px-6 bg-slate-950 overflow-hidden"
    >
      {/* background glow lights */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            How I Build Real Systems
          </h2>

          <p className="text-slate-400 text-lg">
            Production engineering principles that actually matter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-[420px] max-w-full">
              <Lottie
                path="/animations/Build.json"
                loop
                autoplay
              />
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SYSTEMS.map((system, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl overflow-hidden transition"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl group-hover:opacity-60 transition duration-500"></div>

                <div className="relative">

                  <motion.div
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-5 text-2xl"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                  >
                    {system.icon}
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {system.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed text-sm">
                    {system.description}
                  </p>

                  <motion.div
                    className="mt-6 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{ originX: 0 }}
                  />

                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 bg-slate-950 overflow-hidden">

      {/* animated glow background */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[150px]"
      />

      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px]"
      />

      <div className="max-w-6xl mx-auto relative">

        {/* title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Skills & Technologies
        </motion.h2>

        {/* Lottie animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-20"
        >
          <motion.div
            className="w-[340px]"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity
            }}
          >
            <Lottie
              path="/animations/coding.json"
              loop
              autoplay
            />
          </motion.div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {SKILLS.map((category, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.03
              }}
              className="
              relative
              p-6
              rounded-xl
              bg-slate-900/60
              border border-slate-800
              backdrop-blur
              overflow-hidden
              "
            >

              {/* animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))",
                  filter: "blur(30px)"
                }}
              />

              <h3 className="text-slate-300 mb-6 text-lg relative z-10">
                {category.title}
              </h3>

              <motion.img
                src={`https://skillicons.dev/icons?i=${category.icons}`}
                className="max-w-full relative z-10"
                whileHover={{
                  scale: 1.08
                }}
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity
                }}
              />

            </motion.div>

          ))}

        </div>

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
      <CertificatesSection/>
      <SystemsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
