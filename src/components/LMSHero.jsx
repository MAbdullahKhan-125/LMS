import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const streams = [
  {
    id: "core",
    label: "Class 1–8 Core",
    path: "/courses?stream=class-1-8-core"
  },
  {
    id: "matric-bio",
    label: "Class 9–10 Bio",
    path: "/courses?stream=class-9-10-bio"
  },
  {
    id: "matric-cs",
    label: "Class 9–10 CS",
    path: "/courses?stream=class-9-10-cs"
  },
  {
    id: "pre-eng",
    label: "Pre-Eng",
    path: "/courses?stream=pre-eng"
  },
  {
    id: "pre-med",
    label: "Pre-Med",
    path: "/courses?stream=pre-med"
  },
  {
    id: "ics",
    label: "ICS",
    path: "/courses?stream=ics"
  },
  {
    id: "commerce",
    label: "Commerce",
    path: "/courses?stream=commerce"
  }
];

const stats = [
  {
    value: 12000,
    suffix: "+",
    label: "Active Enrolled Students"
  },
  {
    value: 850,
    suffix: "+",
    label: "Interactive Lessons"
  },
  {
    value: 96,
    suffix: "%",
    label: "Class 9–12 Board Success Rate"
  }
];

const ease = [0.22, 1, 0.36, 1];

export default function LMSHero() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const [activeStream, setActiveStream] = useState(null);

  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.25
  });

  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.35
  });

  const handleStreamClick = (stream) => {
    setActiveStream(stream.id);
    navigate(stream.path);
  };

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-14"
    >
      <AnimatedMeshBackground reduceMotion={shouldReduceMotion} />

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/[0.58] px-5 py-12 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/[0.52] sm:px-10 sm:py-16 lg:min-h-[650px] lg:px-16 lg:py-20">
          <HeroContent
            heroInView={heroInView}
            shouldReduceMotion={shouldReduceMotion}
            activeStream={activeStream}
            onExplore={() => navigate("/courses")}
            onDocuments={() => navigate("/date-sheets")}
            onStreamClick={handleStreamClick}
          />

          <div className="pointer-events-none absolute -bottom-24 -right-20 hidden h-80 w-80 rounded-full bg-emerald-500/[0.09] blur-3xl lg:block" />
          <div className="pointer-events-none absolute -left-24 top-1/3 hidden h-64 w-64 rounded-full bg-gold-500/[0.08] blur-3xl lg:block" />
        </div>

        <StatsBar
          statsRef={statsRef}
          statsInView={statsInView}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </section>
  );
}

function HeroContent({
  heroInView,
  shouldReduceMotion,
  activeStream,
  onExplore,
  onDocuments,
  onStreamClick
}) {
  return (
    <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={
            heroInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.55, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.08] dark:text-emerald-300"
        >
          <Sparkles size={14} />
          Complete Academic Learning Ecosystem
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={
            heroInView
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)"
                }
              : {
                  opacity: 0,
                  y: 26,
                  filter: "blur(8px)"
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease
          }}
          className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl xl:text-7xl"
        >
          Empowering Modern Learning from{" "}
          <span className="relative inline-block text-emerald-600 dark:text-emerald-400">
            Primary School
            <motion.span
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                delay: 0.65,
                duration: shouldReduceMotion ? 0 : 0.7,
                ease
              }}
              className="absolute -bottom-2 left-0 h-2 w-full origin-left rounded-full bg-gold-400/70"
            />
          </span>{" "}
          to{" "}
          <span className="text-gold-600 dark:text-gold-400">
            Board Examinations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={
            heroInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{
            delay: 0.2,
            duration: 0.55,
            ease
          }}
          className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
        >
          One intelligent learning platform for Class 1–8 core
          education, Class 9–10 Matric preparation, and Class 11–12
          Intermediate streams — with interactive lessons, academic
          progress, fee services, marksheets, and board examination
          resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={
            heroInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{
            delay: 0.3,
            duration: 0.55,
            ease
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <MagneticButton onClick={onExplore}>
            <BookOpen size={18} />
            Explore Courses
            <ArrowRight size={17} />
          </MagneticButton>

          <GlowButton onClick={onDocuments}>
            <Download size={18} />
            Download Fee Challan / Date Sheet
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={
            heroInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{
            delay: 0.42,
            duration: 0.55,
            ease
          }}
          className="mt-10"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            <GraduationCap size={15} className="text-emerald-600" />
            Explore by stream
          </div>

          <div className="flex flex-wrap gap-2">
            {streams.map((stream) => {
              const active = activeStream === stream.id;

              return (
                <motion.button
                  key={stream.id}
                  type="button"
                  onClick={() => onStreamClick(stream)}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { y: -2, scale: 1.015 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? {}
                      : { scale: 0.97 }
                  }
                  className={[
                    "relative overflow-hidden rounded-full border px-3.5 py-2 text-xs font-bold transition sm:px-4",
                    active
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-[0_0_24px_rgba(5,150,105,0.12)] dark:text-emerald-300"
                      : "border-slate-200/80 bg-white/60 text-slate-600 hover:border-emerald-500/25 hover:text-emerald-700 dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-300 dark:hover:text-emerald-300"
                  ].join(" ")}
                >
                  {active && (
                    <motion.span
                      layoutId="active-stream-pill"
                      className="absolute inset-0 rounded-full bg-emerald-500/[0.08]"
                    />
                  )}

                  <span className="relative z-10">{stream.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <HeroVisual
        heroInView={heroInView}
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}

function HeroVisual({ heroInView, shouldReduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 25 }}
      animate={
        heroInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.94, y: 25 }
      }
      transition={{
        delay: 0.2,
        duration: shouldReduceMotion ? 0 : 0.8,
        ease
      }}
      className="relative mx-auto hidden w-full max-w-md lg:block"
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0]
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/[0.62] p-5 shadow-[0_35px_100px_rgba(5,150,105,0.16)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-slate-950/[0.48]"
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-emerald-500/20 via-emerald-400/5 to-gold-400/10" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Your Learning Journey
              </div>

              <div className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                Academic Progress
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <GraduationCap size={22} />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200/70 bg-white/60 p-5 dark:border-slate-700/60 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Class 10 Science
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  BSEK · Active Learning Track
                </div>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
                78%
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={heroInView ? { width: "78%" } : { width: 0 }}
                transition={{
                  delay: 0.7,
                  duration: shouldReduceMotion ? 0 : 1.1,
                  ease
                }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                14 lessons completed
              </span>

              <span className="font-bold text-gold-600 dark:text-gold-400">
                Keep growing
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <MiniVisualCard
              icon={<BookOpen size={18} />}
              label="Interactive"
              value="850+ Lessons"
              accent="emerald"
            />

            <MiniVisualCard
              icon={<CheckCircle2 size={18} />}
              label="Board Ready"
              value="96% Success"
              accent="gold"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 12, 0],
                rotate: [0, 2, 0]
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -right-10 top-16 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/60 bg-white/70 text-gold-600 shadow-[0_15px_40px_rgba(217,119,6,0.18)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/80"
      >
        <Sparkles size={25} />
      </motion.div>

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -8, 0]
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
        className="absolute -bottom-18 left-4 rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-[0_18px_50px_rgba(5,150,105,0.14)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/85"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Learning Status
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          On Track
        </div>
      </motion.div>
    </motion.div>
  );
}

function MiniVisualCard({ icon, label, value, accent }) {
  const accentClass =
    accent === "gold"
      ? "bg-gold-500/10 text-gold-600 dark:text-gold-400"
      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-slate-700/60 dark:bg-slate-900/45">
      <div
        className={[
          "flex h-9 w-9 items-center justify-center rounded-xl",
          accentClass
        ].join(" ")}
      >
        {icon}
      </div>

      <div className="mt-4 text-xs font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-black text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}

function MagneticButton({ children, onClick }) {
  const buttonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 15,
    mass: 0.4
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 15,
    mass: 0.4
  });

  const rippleScale = useMotionValue(0);
  const rippleOpacity = useTransform(
    rippleScale,
    [0, 1],
    [0.45, 0]
  );

  const handleMouseMove = (event) => {
    if (shouldReduceMotion || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();

    const offsetX =
      (event.clientX - rect.left - rect.width / 2) * 0.16;

    const offsetY =
      (event.clientY - rect.top - rect.height / 2) * 0.2;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    rippleScale.set(0);

    requestAnimationFrame(() => {
      rippleScale.set(1);
    });

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      style={{
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={
        shouldReduceMotion
          ? {}
          : {
              scale: 0.97
            }
      }
      className="relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_14px_35px_rgba(5,150,105,0.28)] transition hover:bg-emerald-700"
    >
      <motion.span
        style={{
          scale: rippleScale,
          opacity: rippleOpacity
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

function GlowButton({ children, onClick }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -2
            }
      }
      whileTap={
        shouldReduceMotion
          ? {}
          : {
              scale: 0.98
            }
      }
      className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-slate-300/80 bg-white/65 px-5 py-3.5 text-sm font-bold text-slate-700 backdrop-blur-xl transition dark:border-slate-600/80 dark:bg-slate-950/30 dark:text-slate-200"
    >
      <motion.span
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.15, 0.75, 0.15],
                scale: [0.95, 1.05, 0.95]
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-500/50 shadow-[0_0_22px_rgba(5,150,105,0.14)]"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

function StatsBar({
  statsRef,
  statsInView,
  shouldReduceMotion
}) {
  return (
    <motion.div
      ref={statsRef}
      initial={{ opacity: 0, y: 24 }}
      animate={
        statsInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        ease
      }}
      className="relative z-20 mx-auto mt-3 grid max-w-5xl gap-px overflow-hidden rounded-[1.75rem] border border-white/70 bg-slate-200/70 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-700/60 md:grid-cols-3"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative bg-white/[0.88] px-6 py-6 text-center dark:bg-slate-900/[0.9] sm:px-8"
        >
          {index === 1 && (
            <div className="pointer-events-none absolute inset-y-5 left-0 hidden w-px bg-slate-200 dark:bg-slate-700 md:block" />
          )}

          {index === 2 && (
            <div className="pointer-events-none absolute inset-y-5 left-0 hidden w-px bg-slate-200 dark:bg-slate-700 md:block" />
          )}

          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            active={statsInView}
            reduceMotion={shouldReduceMotion}
          />

          <div className="mt-2 text-xs font-bold uppercase tracking-[0.11em] text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function AnimatedCounter({
  value,
  suffix,
  active,
  reduceMotion
}) {
  const [displayValue, setDisplayValue] = useState(
    reduceMotion ? value : 0
  );

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1800;
    const startTime = performance.now();

    let frameId;

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setDisplayValue(
        Math.floor(value * easedProgress)
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [active, reduceMotion, value]);

  return (
    <div className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
      {new Intl.NumberFormat("en-US").format(displayValue)}
      <span className="text-emerald-600 dark:text-emerald-400">
        {suffix}
      </span>
    </div>
  );
}

function AnimatedMeshBackground({ reduceMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />

      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 90, -40, 0],
                y: [0, -35, 55, 0],
                scale: [1, 1.18, 0.96, 1]
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-[110px]"
      />

      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -100, 50, 0],
                y: [0, 60, -25, 0],
                scale: [1, 0.9, 1.15, 1]
              }
        }
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-[120px]"
      />

      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 60, -70, 0],
                y: [0, -40, 35, 0]
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-14rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-[120px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.16] dark:bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)]" />
    </div>
  );
}