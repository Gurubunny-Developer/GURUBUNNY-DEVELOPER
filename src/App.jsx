import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import profilePhoto from "./assets/bunny.png";
import {
  ArrowDownToLine,
  ArrowRight,
  Braces,
  Code2,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

const cn = (...inputs) => twMerge(clsx(inputs));

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-300 text-slate-950 shadow-neon hover:-translate-y-0.5 hover:bg-white hover:shadow-neon-strong",
        ghost:
          "border border-white/15 bg-white/5 text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Button({ className, variant, ...props }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}

function GlassCard({ className, children }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-2xl",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-300/12 before:via-transparent before:to-blue-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

const navItems = [
  ["Hero", "hero"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Education", "education"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

const skills = [
  ["C", 78, Code2],
  ["Python", 84, Terminal],
  ["DBMS", 82, Database],
  ["Java", 90, Braces],
  ["React", 86, Rocket],
  ["SQL", 85, Database],
];

const projects = [
  {
    title: "Java Enterprise Command Center",
    tag: "Spring-ready architecture",
    body: "A scalable dashboard concept for managing APIs, services, metrics, and role-based workflows with a premium admin experience.",
  },
  {
    title: "React Portfolio OS",
    tag: "Frontend experience",
    body: "A motion-first personal operating system for showcasing skills, projects, education, and direct hiring signals.",
  },
  {
    title: "Database Intelligence Toolkit",
    tag: "SQL + DBMS",
    body: "A clean query and schema visualization concept focused on performance, clarity, and developer productivity.",
  },
];

const education = [
  {
    year: "2026",
    title: "Full Stack Java Development",
    text: "Focused learning in Java, React, databases, and scalable web application engineering.",
  },
  {
    year: "Core",
    title: "Computer Science Foundations",
    text: "Strong base in C, Python, DBMS, SQL, programming logic, and problem solving.",
  },
  {
    year: "Now",
    title: "Modern Software Engineering",
    text: "Continuous practice with UI engineering, clean architecture, cloud-ready patterns, and production habits.",
  },
];

function useTyping(words, speed = 72, pause = 1300) {
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const current = words[wordIndex];
      setText(current.slice(0, charIndex));

      if (!deleting && charIndex < current.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(tick, speed);
        return;
      }

      if (!deleting && charIndex === current.length) {
        deleting = true;
        timeoutId = window.setTimeout(tick, pause);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(tick, speed / 2);
        return;
      }

      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      timeoutId = window.setTimeout(tick, 260);
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, [words, speed, pause]);

  return text;
}

function TechnicalHeroBackdrop() {
  const traces = [
    "M28 84 H128 V38 H226",
    "M48 190 H178 V142 H320",
    "M86 318 H214 V260 H354",
    "M22 414 H148 V370 H270",
    "M300 66 H390 V128 H470",
    "M282 236 H420 V294 H500",
  ];
  const snippets = ["const app = build();", "java.sql.connect()", "SELECT * FROM skills", "React.render(<Portfolio />)", "api.status = 200"];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.11)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <motion.div
        animate={{ y: ["-18%", "118%"] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 top-0 h-28 bg-gradient-to-b from-transparent via-cyan-200/16 to-transparent"
      />
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        {traces.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke={index % 2 ? "#38bdf8" : "#67e8f9"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.18 }}
            animate={{ pathLength: [0.08, 1, 0.08], opacity: [0.18, 0.72, 0.18] }}
            transition={{ duration: 4 + index * 0.45, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
          />
        ))}
        {[
          [128, 38],
          [178, 142],
          [214, 260],
          [148, 370],
          [390, 128],
          [420, 294],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="#67e8f9"
            animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25 }}
          />
        ))}
      </svg>
      {snippets.map((snippet, index) => (
        <motion.div
          key={snippet}
          animate={{ x: index % 2 ? [18, -18, 18] : [-18, 18, -18], opacity: [0.18, 0.58, 0.18] }}
          transition={{ duration: 5 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-md border border-cyan-200/20 bg-slate-950/55 px-3 py-2 font-mono text-[11px] text-cyan-100 shadow-neon backdrop-blur"
          style={{
            left: `${8 + ((index * 19) % 58)}%`,
            top: `${12 + ((index * 17) % 66)}%`,
          }}
        >
          {snippet}
        </motion.div>
      ))}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.18)_45%,rgba(2,6,23,0.88)_100%)]" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">{eyebrow}</p>
      <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-300">{text}</p> : null}
    </motion.div>
  );
}

function FloatingField({ label, type = "text", name, multiline = false }) {
  const inputClass =
    "peer w-full rounded-md border border-white/10 bg-slate-950/45 px-4 pb-3 pt-6 text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-cyan-300/80 focus:shadow-neon";

  return (
    <label className="relative block">
      {multiline ? (
        <textarea name={name} placeholder={label} rows={5} className={cn(inputClass, "resize-none")} required />
      ) : (
        <input name={name} type={type} placeholder={label} className={inputClass} required />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition-all peer-focus:text-cyan-200">
        {label}
      </span>
    </label>
  );
}

function App() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const typed = useTyping(useMemo(() => ["Full Stack Java Developer"], []));
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 160, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 160, damping: 28 });
  const parallaxY = useTransform(smoothY, [0, 900], [-24, 24]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );
    navItems.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const downloadResume = () => {
    const resume = [
      "TIRUNAM GURUBUNNY",
      "Gurubunny-Developer | Full Stack Java Developer",
      "Location: Bengaluru, BTM",
      "Email: bunnyt903@gmail.com",
      "Phone: 7337259252",
      "",
      "Profile",
      "Passionate Full Stack Java Developer and Software Engineer with strong problem-solving skills, modern web technology interest, and a focus on scalable applications.",
      "",
      "Skills",
      "C, Python, DBMS, Java, React, SQL",
    ].join("\n");
    const blob = new Blob([resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Tirunam-Gurubunny-Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`);
    window.location.href = `mailto:bunnyt903@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55 } }}
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 0, 360] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-24 w-24 place-items-center rounded-lg border border-cyan-300/50 bg-cyan-300/10 shadow-neon"
            >
              <Code2 className="h-10 w-10 text-cyan-200" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/15 blur-3xl lg:block"
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-grid" />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/10 shadow-neon">
              <Sparkles className="h-5 w-5 text-cyan-200" />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-white">Gurubunny</span>
              <span className="block text-xs font-semibold text-cyan-200">Developer</span>
            </span>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-cyan-100",
                  active === id && "bg-cyan-300/10 text-cyan-200 shadow-[inset_0_0_18px_rgba(34,211,238,0.13)]"
                )}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 bg-slate-950/90 lg:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4">
                {navItems.map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn("rounded-md px-4 py-3 font-semibold text-slate-200", active === id && "bg-cyan-300/10 text-cyan-200")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">
        <section id="hero" className="relative flex min-h-screen items-center px-4 pt-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 28 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute h-1 w-1 rounded-full bg-cyan-200 shadow-neon"
                style={{ left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%` }}
                animate={{ y: [-18, 18, -18], opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 3 + (index % 6), repeat: Infinity, delay: index * 0.08 }}
              />
            ))}
          </div>

          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <motion.div style={{ y: parallaxY }} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-neon">
                <Terminal className="h-4 w-4" />
                Bengaluru, BTM
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                TIRUNAM <span className="block text-cyan-200 drop-shadow-[0_0_22px_rgba(34,211,238,0.75)]">GURUBUNNY</span>
              </h1>
              <div className="mt-6 min-h-12 text-2xl font-bold text-slate-100 sm:text-3xl">
                <span className="text-cyan-200">{typed}</span>
                <span className="ml-1 animate-pulse text-white">|</span>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Brand: <span className="font-semibold text-white">Gurubunny-Developer</span>. I build clean, scalable, and modern
                full stack experiences with Java, React, SQL, and a strong software engineering mindset.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#contact" className={buttonVariants({ variant: "primary" })}>
                  Hire Me <ArrowRight className="h-4 w-4" />
                </a>
                <Button type="button" variant="ghost" onClick={downloadResume}>
                  Download Resume <ArrowDownToLine className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative grid min-h-[430px] place-items-center sm:min-h-[520px] lg:min-h-[580px]"
            >
              <div className="absolute inset-10 rounded-lg bg-cyan-300/12 blur-3xl" />
              <div className="absolute inset-0 opacity-80">
                <TechnicalHeroBackdrop />
              </div>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="relative z-10 w-full max-w-[360px] overflow-hidden rounded-lg border border-white/15 bg-slate-950/80 p-3 shadow-[0_28px_90px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:max-w-[410px]"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-md bg-slate-900">
                  <img src={profilePhoto} alt="Tirunam Gurubunny profile" className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex items-center justify-between gap-4 px-2 py-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-white">Tirunam Gurubunny</p>
                    <p className="mt-1 text-xs font-semibold text-cyan-200">Full Stack Java Developer</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-neon" aria-hidden="true" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-cyan-200/20" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="About Me" title="Software Engineer With A Builder Mindset" />
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            <GlassCard className="lg:col-span-2">
              <p className="text-lg leading-9 text-slate-200">
                I am a passionate Full Stack Java Developer and Software Engineer with strong problem-solving skills and a keen interest in
                modern web technologies. I enjoy building scalable applications and continuously learning new technologies to improve my
                development skills.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-4 text-xl font-black text-white">Beyond Code</h3>
              <p className="leading-8 text-slate-300">
                I enjoy playing games as a hobby, sharpening strategy, reflexes, and creative thinking that flow back into how I design and
                engineer software.
              </p>
            </GlassCard>
          </div>
        </section>

        <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Skills" title="Core Technologies" text="A focused stack for building full stack Java and modern web applications." />
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(([name, level, Icon], index) => (
              <GlassCard key={name}>
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-md bg-cyan-300/10 text-cyan-200 shadow-neon">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-xl font-black">{name}</h3>
                    </div>
                    <span className="text-sm font-bold text-cyan-200">{level}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-white shadow-neon"
                    />
                  </div>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="education" className="px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Education" title="Learning Timeline" />
          <div className="mx-auto max-w-4xl">
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65 }}
                className="relative border-l border-cyan-300/25 pb-10 pl-8 last:pb-0"
              >
                <span className="absolute -left-3 top-0 h-6 w-6 rounded-full border border-cyan-200 bg-slate-950 shadow-neon" />
                <GlassCard>
                  <span className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">{item.year}</span>
                  <h3 className="mt-2 text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-300">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Projects" title="Futuristic Build Concepts" />
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <GlassCard key={project.title} className="min-h-[330px]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-300 to-white opacity-80" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">{project.tag}</p>
                  <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  <p className="mt-5 min-h-28 leading-8 text-slate-300">{project.body}</p>
                  <div className="mt-8 flex gap-3">
                    <a href="#hero" className={cn(buttonVariants({ variant: "primary" }), "px-4 py-2")}>
                      Live Preview
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost" }), "px-4 py-2")}>
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Contact" title="Build Something Sharp Together" text="Reach out for Java full stack roles, collaborations, and software engineering opportunities." />
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard>
              <div className="space-y-5">
                <a href="mailto:bunnyt903@gmail.com" className="flex items-center gap-4 rounded-md border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/50 hover:bg-cyan-300/10">
                  <Mail className="h-5 w-5 text-cyan-200" /> bunnyt903@gmail.com
                </a>
                <a href="tel:7337259252" className="flex items-center gap-4 rounded-md border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/50 hover:bg-cyan-300/10">
                  <Phone className="h-5 w-5 text-cyan-200" /> 7337259252
                </a>
                <div className="flex items-center gap-4 rounded-md border border-white/10 bg-white/5 p-4">
                  <MapPin className="h-5 w-5 text-cyan-200" /> Bengaluru, BTM
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                {[Github, Linkedin, Mail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href={index === 2 ? "mailto:bunnyt903@gmail.com" : "#hero"}
                    whileHover={{ y: -6, rotate: 6 }}
                    className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/5 text-cyan-100 shadow-neon transition hover:bg-cyan-300/10"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              <Button type="button" onClick={downloadResume} className="mt-8 w-full">
                Resume Download <ArrowDownToLine className="h-4 w-4" />
              </Button>
            </GlassCard>

            <GlassCard>
              <form onSubmit={handleSubmit} className="grid gap-5">
                <FloatingField name="name" label="Name" />
                <FloatingField name="email" type="email" label="Email" />
                <FloatingField name="message" label="Message" multiline />
                <Button type="submit" className="w-full">
                  Send Message <Send className="h-4 w-4" />
                </Button>
                <AnimatePresence>
                  {sent ? (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm font-semibold text-cyan-200">
                      Opening your email app with the message ready.
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </form>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400">
        Gurubunny-Developer. Built with React, Vite, Tailwind CSS, Framer Motion, Three.js, Lenis, and ShadCN-style UI.
      </footer>
    </div>
  );
}

export default App;
