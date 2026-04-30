import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lottie from "lottie-react";
import "./App.css";

// ====== CUSTOM HOOKS ======
function useMousePosition(ref) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  }, [ref, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x, y, handleMouse, handleLeave };
}

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
    title: "Backend & Runtime",
    icons: "nodejs,express,spring,php"
  },
  {
    title: "Languages",
    icons: "java,js,ts,python"
  },
  {
    title: "Databases",
    icons: "mongodb,postgres,mysql,redis"
  },
  {
    title: "Cloud & Infrastructure",
    icons: "aws,docker,firebase,vercel"
  },
  {
    title: "Messaging & Streaming",
    icons: "kafka"
  },
  {
    title: "Frontend",
    icons: "react,angular,html,css,bootstrap"
  },
  {
    title: "DevOps & Tooling",
    icons: "git,github,vscode,idea,postman"
  }
];
// Real projects - honest presentation
const PROJECTS = [
  {
    id: "leasehub",
    name: "LeaseHub",
    status: "Production",
    tagline: "Multi-Tenant Property Management SaaS",
    problem:
      "Property managers rely on spreadsheets and manual follow-ups for rent collection, lease tracking, and financial reconciliation — leading to missed payments, disputes, and zero audit visibility.",
    solution:
      "Full-stack SaaS platform with separate Admin and Tenant portals, automated billing via Stripe, and a complete audit trail for every financial transaction.",
    whatBuilt: [
      "End-to-end lease lifecycle engine: application → approval → deposit → recurring rent → late fees → cancellation",
      "Stripe integration with webhook signature verification, idempotent payment processing, and transaction reconciliation",
      "JWT-based authentication with refresh token rotation and RBAC middleware (Admin / Tenant)",
      "Cron-driven invoice generation with retry logic and email dispatch",
      "Financial ledger maintaining consistency across invoices, payments, and balance records",
      "Immutable audit log capturing all state transitions for compliance and dispute resolution",
    ],
    architecture: [
      "Node.js/Express REST API with layered middleware (auth, validation, error handling)",
      "MongoDB Atlas with referential integrity across tenants, leases, invoices, and payment documents",
      "Stripe webhooks for asynchronous payment state synchronization with idempotency guards",
      "node-cron scheduler for recurring invoice jobs and overdue payment notifications",
      "Deployed on Render with separate services for Admin and Tenant frontends",
    ],
    techStack: ["Node.js", "Express", "MongoDB Atlas", "Stripe", "JWT", "React", "Render"],
    links: {
      github: "https://github.com/panakantinandu/Property-MS-main",
      adminLive: "https://leasehub-admin.onrender.com/",
      tenantLive: "https://leasehub-tenant.onrender.com/",
    },
  },
  {
    id: "aws-iam-security",
    name: "AWS IAM Threat Detector",
    status: "Complete",
    tagline: "Event-Driven IAM Privilege Escalation Detection",
    problem:
      "Unauthorized IAM policy changes and privilege escalation attempts in AWS accounts often go undetected until a security incident occurs, because native CloudTrail logs are passive and lack real-time alerting.",
    solution:
      "Serverless event-driven pipeline that monitors CloudTrail for IAM mutations, evaluates risk via Lambda, and sends real-time alerts through SNS.",
    whatBuilt: [
      "CloudTrail → EventBridge rule chain filtering IAM-related API calls (AttachUserPolicy, CreateRole, PutRolePolicy)",
      "Lambda function evaluating event payloads against escalation heuristics and risk scoring",
      "SNS fan-out for multi-channel alerting (email, Slack-ready webhook)",
      "IAM least-privilege policies scoped per Lambda execution role",
      "CloudWatch dashboards for event volume monitoring and alert latency tracking",
    ],
    architecture: [
      "Fully serverless — zero standing infrastructure, pay-per-invocation cost model",
      "Event-driven pipeline: CloudTrail → EventBridge → Lambda → SNS",
      "Infrastructure defined with IAM policy documents and resource-based permissions",
      "Decoupled alert routing via SNS topic subscriptions for extensibility",
    ],
    techStack: ["AWS Lambda", "CloudTrail", "EventBridge", "SNS", "IAM", "Python"],
    links: {
      github: "https://github.com/panakantinandu",
    },
  },
  {
    id: "attrition",
    name: "Attrition Prediction Engine",
    status: "Deployed",
    tagline: "ML System with Explainable Predictions",
    problem:
      "HR departments react to employee attrition after resignation, missing the window for intervention. Existing surveys are subjective and lack predictive power.",
    solution:
      "Random Forest classification system with SHAP-based explainability, exposing both individual and batch predictions through an interactive Streamlit interface.",
    whatBuilt: [
      "Random Forest model with automated feature engineering pipeline (encoding, scaling, SMOTE for class imbalance)",
      "SHAP integration for per-prediction feature attribution and global importance rankings",
      "Batch prediction mode accepting CSV uploads for bulk HR analysis",
      "Interactive Streamlit dashboard with filters, charts, and downloadable reports",
      "Model serialization and versioned deployment on Render",
    ],
    architecture: [
      "Scikit-Learn pipeline encapsulating preprocessing, training, and inference",
      "SHAP TreeExplainer for efficient feature contribution computation",
      "Streamlit server handling both real-time and batch prediction workflows",
      "Deployed as a containerized service on Render with health checks",
    ],
    techStack: ["Python", "Scikit-Learn", "SHAP", "Streamlit", "Pandas", "NumPy"],
    links: {
      live: "https://ml-project-nan.onrender.com/",
      github: "https://github.com/panakantinandu/ML_Project-Nan-",
    },
  },
  {
    id: "studymate",
    name: "StudyMate",
    status: "Complete",
    tagline: "LAMP-Stack Educational Platform",
    problem:
      "Institutions managed course materials, session scheduling, and user access through disconnected tools with no unified access control or audit capability.",
    solution:
      "Monolithic PHP application with a normalized MySQL schema, three-tier RBAC, and transactional email workflows for authentication and notifications.",
    whatBuilt: [
      "Session-based authentication with bcrypt hashing, CSRF tokens, and secure cookie configuration",
      "Three-role access control system (Student / Instructor / Admin) enforced at the middleware layer",
      "Email verification and password reset flows via PHPMailer over SMTP",
      "Normalized MySQL schema (3NF) with foreign key constraints and composite indexes",
      "File upload pipeline with MIME validation, size limits, and organized storage paths",
    ],
    architecture: [
      "PHP backend following MVC separation with routing middleware",
      "MySQL with prepared statements to prevent SQL injection",
      "PHPMailer handling transactional email delivery over TLS",
      "Server-side session management with configurable expiry and regeneration",
    ],
    techStack: ["PHP", "MySQL", "PHPMailer", "Bootstrap", "JavaScript"],
    links: {
      github: "https://github.com/panakantinandu/studymate",
    },
  },
  {
    id: "leetcode",
    name: "LeetCode DSA",
    status: "Ongoing",
    tagline: "200+ Problems · Core Algorithm Patterns",
    problem:
      "Solving isolated coding problems without pattern recognition leads to brute-force solutions and poor performance in system design interviews.",
    solution:
      "Systematic problem-solving practice organized by pattern — building reusable mental models for time/space optimization.",
    whatBuilt: [
      "200+ problems solved across arrays, trees, graphs, dynamic programming, and sliding window",
      "Pattern-based approach: two pointers, binary search, BFS/DFS, topological sort, union-find",
      "Complexity analysis for every solution with space/time trade-off documentation",
      "Consistent practice in Java and Python for language-agnostic proficiency",
    ],
    architecture: [
      "Solutions organized by pattern category for quick reference",
      "Edge case documentation and test case design per problem",
      "Focus on optimal solutions with reasoning over brute-force approaches",
    ],
    techStack: ["Java", "Python", "Data Structures", "Algorithms"],
    links: {
      github: "https://github.com/panakantinandu",
    },
  },
];
//certificates
const CERTIFICATES = [
  {
    id: "aws-cloud-arch",
    name: "AWS Academy Graduate – Cloud Architecting",
    issuer: "AWS Academy",
    date: "Apr 2026",
    skills: ["EC2", "VPC", "Auto Scaling", "RDS", "S3", "ALB", "Security Groups"],
    description:
      "Designed multi-tier AWS architectures with compute, networking, storage, and database services following Well-Architected Framework principles.",
    link: "#"
  },
  {
    id: "aws-cloud-security",
    name: "AWS Academy Graduate – Cloud Security Foundations",
    issuer: "AWS Academy",
    date: "Apr 2026",
    skills: ["IAM", "Data Protection", "Network Security", "Monitoring"],
    description:
      "Applied AWS security controls across identity management, data encryption, network isolation, and audit logging.",
    link: "#"
  },
  {
    id: "anthropic-claude-api",
    name: "Building with Claude API",
    issuer: "Anthropic",
    date: "Apr 2026",
    skills: ["LLM Integration", "API Design", "Prompt Engineering"],
    description:
      "Built applications integrating Claude's API for structured generation, tool use, and production prompt workflows.",
    link: "#"
  },
  {
    id: "anthropic-claude-code",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Apr 2026",
    skills: ["AI-Assisted Development", "Code Generation"],
    description:
      "Applied Claude for code generation, debugging, and automated development workflows.",
    link: "#"
  },
  {
    id: "anthropic-claude-101",
    name: "Claude 101",
    issuer: "Anthropic",
    date: "Apr 2026",
    skills: ["LLM Fundamentals", "AI Safety"],
    description:
      "Foundational understanding of large language model capabilities, limitations, and responsible usage patterns.",
    link: "#"
  },
  {
    id: "walmart",
    name: "Advanced Software Engineering Simulation",
    issuer: "Walmart",
    date: "May 2025",
    credentialId: "GdMwD3PmFhM4ECmYS",
    skills: ["System Design", "Data Modeling", "Relational Databases"],
    description:
      "Completed backend engineering tasks including heap-based data structures, UML system design, and relational schema modeling.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_hFspdJeJnuae3BoDB_1747109821353_completion_certificate.pdf"
  },
  {
    id: "skyscanner",
    name: "Software Engineering Simulation",
    issuer: "Skyscanner",
    date: "Apr 2025",
    credentialId: "hdjhWrTH3R8dnkFQM",
    skills: ["React.js", "Microservices", "Component Design"],
    description:
      "Built frontend components and worked with microservices architecture in a simulated production environment.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/skoQmxqhtgWmKv2pm/p3xGFkpdot5H8NBih_skoQmxqhtgWmKv2pm_hFspdJeJnuae3BoDB_1745513981330_completion_certificate.pdf"
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    issuer: "NPTEL",
    date: "Jul 2023",
    skills: ["SQL", "Normalization", "Query Optimization", "Schema Design"],
    description:
      "Covered relational algebra, normalization theory, indexing strategies, and transaction management.",
    link: "https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs79/Course/NPTEL23CS79S3570127910087952.pdf"
  },
  {
    id: "python-ds",
    name: "Python for Data Science",
    issuer: "NPTEL",
    date: "Jul 2023",
    skills: ["Python", "Data Analysis", "Visualization", "NumPy", "Pandas"],
    description:
      "Applied Python for data wrangling, statistical analysis, and visualization using NumPy, Pandas, and Matplotlib.",
    link: "https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs99/Course/NPTEL23CS99S4570083010087952.pdf"
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerTabs = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const tabItem = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const listItemReveal = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ====== COMPONENTS ======

function Navigation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
      {/* Scroll progress bar — spring-eased */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 scroll-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-5 left-0 right-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            className="flex items-center justify-between backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-xl px-6 py-3 shadow-lg shadow-black/20"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            transition={{ duration: 1 }}
          >

            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-white font-semibold text-lg tracking-wide"
            >
              {CONTACT.name}
            </motion.a>

            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-300 relative animated-underline"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href={CONTACT.resume}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="magnetic-btn px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-md"
            >
              Resume
            </motion.a>

          </motion.div>

        </div>
      </motion.nav>
    </>
  );
}


function HeroSection() {
  const heroRef = useRef(null);
  const { x: mouseX, y: mouseY, handleMouse, handleLeave } = useMousePosition(heroRef);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 px-6 bg-slate-950"
      ref={heroRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {/* background glow */}
      <div className="absolute inset-0 -z-10">

        <motion.div
          className="absolute top-20 left-10 w-[380px] h-[380px] bg-indigo-500/20 rounded-full blur-[120px] glow-pulse"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        {/* Additional subtle glow behind headline */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[160px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-5 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10"
          >
            <span className="text-indigo-300 text-sm">
              Full-Stack Engineer • Distributed Systems
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
          >
            Building scalable backend systems for

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animated-gradient-text">
              payments, users &amp; real-world scale
            </span>
          </motion.h1>

          {/* accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[3px] w-[120px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-6"
            style={{ transformOrigin: "left" }}
          />

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-slate-400 text-[15px] leading-relaxed mb-7 max-w-lg"
          >
            Backend-focused developer building production SaaS platforms
            with automated billing, reliable APIs, background workers,
            and systems designed to scale under real workloads.
          </motion.p>

          {/* tech tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {["React", "Node.js", "PostgreSQL", "Distributed Systems"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.08, borderColor: "rgba(99,102,241,0.6)" }}
                className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700 transition-colors duration-300"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* buttons */}
          <motion.div
            className="flex gap-3 flex-wrap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >

            <motion.a
              href="#projects"
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="magnetic-btn px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-lg shadow-indigo-500/30"
            >
              View Projects
            </motion.a>

            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:text-white transition-colors duration-300"
            >
              Contact
            </motion.a>

            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:text-white transition-colors duration-300"
            >
              GitHub
            </motion.a>

          </motion.div>

        </div>

        {/* RIGHT SIDE ANIMATION — 3D tilt on mouse */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
          style={{ perspective: 800 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[360px] max-w-full"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] text-slate-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-[2px] h-6 bg-gradient-to-b from-indigo-400/60 to-transparent"
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
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
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-14"
          variants={staggerTabs}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.button
              key={project.id}
              variants={tabItem}
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl border transition-all duration-300 backdrop-blur ${
                selectedProject === project.id
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-indigo-400/60"
              }`}
            >
              <div className="font-semibold">{project.name}</div>
              <div className="text-xs opacity-70">{project.status}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Project Card */}
        <AnimatePresence mode="wait">
          {currentProject && (
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-xl card-glow"
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
                    {currentProject.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.3)" }}
                        className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 transition-colors duration-200"
                      >
                        {tech}
                      </motion.span>
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
                          custom={idx}
                          variants={listItemReveal}
                          initial="hidden"
                          animate="visible"
                          className="flex gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-indigo-400 flex-shrink-0">→</span>
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
                          custom={idx + 3}
                          variants={listItemReveal}
                          initial="hidden"
                          animate="visible"
                          className="flex gap-2 text-slate-300 text-sm"
                        >
                          <span className="text-purple-400 flex-shrink-0">•</span>
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
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="magnetic-btn px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-all duration-300"
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
  const [selectedCert, setSelectedCert] = useState("aws-cloud-arch");
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
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Licenses & Certifications
          </h2>
          <p className="text-slate-400 text-lg">
            Verified credentials and professional training
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-14"
          variants={staggerTabs}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CERTIFICATES.map(cert => (
            <motion.button
              key={cert.id}
              variants={tabItem}
              onClick={() => setSelectedCert(cert.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                selectedCert === cert.id
                  ? "bg-indigo-500/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-indigo-400/60"
              }`}
            >
              <div className="font-semibold">{cert.issuer}</div>
              <div className="text-xs opacity-70">{cert.date}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
        {currentCert && (
          <motion.div
            key={currentCert.id}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 card-glow"
          >

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
              {currentCert.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.3)" }}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Button */}
            <motion.a
              href={currentCert.link}
              target="_blank"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="magnetic-btn inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              View Certificate
            </motion.a>

          </motion.div>
        )}
        </AnimatePresence>

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
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
                whileHover={{ y: -10, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl overflow-hidden transition-shadow duration-500 card-glow"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl group-hover:opacity-60 transition duration-500"></div>

                <div className="relative">

                  <motion.div
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-5 text-2xl"
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >

          {SKILLS.map((category, index) => (

            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative p-6 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur overflow-hidden card-glow"
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
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 200, damping: 15 }
                }}
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

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
            className="magnetic-btn px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Send Email
          </motion.a>
          <motion.a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3, borderColor: "rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3, borderColor: "rgba(99,102,241,0.5)" }}
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <CertificatesSection/>
      <div className="section-divider" />
      <SystemsSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ContactSection />
    </div>
  );
}
