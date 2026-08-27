import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Computer,
  CreditCard,
  FlaskConical,
  GraduationCap,
  Landmark,
  Layers3,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const boardTracks = [
  {
    id: "class-9-10",
    title: "Class 9–10",
    subtitle: "Matriculation",
    boards: "BSEK Science / Arts",
    progress: 74
  },
  {
    id: "class-11-12",
    title: "Class 11–12",
    subtitle: "Intermediate",
    boards: "BIEK Pre-Eng / Pre-Med / ICS / Commerce",
    progress: 68
  }
];

const coreSubjects = [
  "English",
  "Mathematics",
  "Science",
  "Urdu",
  "Social Studies"
];

const streams = [
  {
    label: "Biology",
    icon: FlaskConical,
    path: "/courses?stream=class-9-10-biology"
  },
  {
    label: "Computer Science",
    icon: Computer,
    path: "/courses?stream=class-9-10-computer-science"
  },
  {
    label: "Pre-Engineering",
    icon: TrendingUp,
    path: "/courses?stream=pre-engineering"
  },
  {
    label: "Pre-Medical",
    icon: FlaskConical,
    path: "/courses?stream=pre-medical"
  },
  {
    label: "ICS",
    icon: Computer,
    path: "/courses?stream=ics"
  },
  {
    label: "Commerce",
    icon: Landmark,
    path: "/courses?stream=commerce"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function CourseBentoGrid() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <AmbientBackground />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader onExplore={() => navigate("/courses")} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid auto-rows-[minmax(180px,auto)] gap-4 lg:grid-cols-12 lg:gap-5"
        >
          <motion.div
            variants={cardVariants}
            className="lg:col-span-7 lg:row-span-2"
          >
            <BoardHeroCard
              onNavigate={(path) => navigate(path)}
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="lg:col-span-5"
          >
            <CoreSubjectsCard
              onNavigate={() =>
                navigate("/courses?stream=class-1-8-core")
              }
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="lg:col-span-5"
          >
            <ElectivesStreamsCard
              onNavigate={(path) => navigate(path)}
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="sm:col-span-1 lg:col-span-6"
          >
            <DateSheetCard
              onNavigate={() => navigate("/date-sheets")}
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="sm:col-span-1 lg:col-span-6"
          >
            <FeeStatusCard
              onNavigate={() => navigate("/fee-portal")}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ onExplore }) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.08] dark:text-emerald-300">
          <Layers3 size={14} />
          Learning Tracks
        </div>

        <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl">
          One portal.{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Every academic journey.
          </span>
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          Explore structured learning from primary education through
          Matriculation and Intermediate board preparation.
        </p>
      </div>

      <motion.button
        type="button"
        onClick={onExplore}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-emerald-500/30 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-emerald-300 sm:self-auto"
      >
        Explore all courses
        <ArrowRight size={16} />
      </motion.button>
    </div>
  );
}

function BoardHeroCard({ onNavigate }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 140,
    damping: 18,
    mass: 0.7
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 140,
    damping: 18,
    mass: 0.7
  });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(16,185,129,0.24), transparent 32%)`
  );

  const handleMouseMove = (event) => {
    if (shouldReduceMotion || !cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    rotateY.set((xPercent - 0.5) * 8);
    rotateX.set((0.5 - yPercent) * 8);

    glowX.set(xPercent * 100);
    glowY.set(yPercent * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div
      className="h-full"
      style={{
        perspective: "1200px"
      }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: shouldReduceMotion ? 0 : smoothRotateX,
          rotateY: shouldReduceMotion ? 0 : smoothRotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -6
              }
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22
        }}
        className="group relative h-full min-h-[520px] overflow-hidden rounded-[2rem] border border-white/60 bg-slate-950 p-6 shadow-[0_30px_100px_rgba(5,150,105,0.20)] dark:border-white/[0.08] sm:p-8"
      >
        <motion.div
          style={{
            background: shouldReduceMotion
              ? "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.16), transparent 35%)"
              : glowBackground
          }}
          className="pointer-events-none absolute inset-0 z-0"
        />

        <div className="absolute inset-0 opacity-90">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/25 blur-[90px] transition duration-700 group-hover:scale-125" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-500/20 blur-[100px] transition duration-700 group-hover:scale-125" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-emerald-300">
                <GraduationCap size={14} />
                Board Preparation
              </div>

              <h3
                className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl"
                style={{
                  transform: "translateZ(40px)"
                }}
              >
                Class 9–12 Matriculation & Intermediate
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Syllabus trackers, structured lessons, exam preparation,
                and academic progress for BSEK and BIEK learning paths.
              </p>
            </div>

            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-amber-300 backdrop-blur-xl sm:flex">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {boardTracks.map((track, index) => (
              <BoardTrackItem
                key={track.id}
                track={track}
                delay={index * 0.12}
                onClick={() =>
                  onNavigate(
                    track.id === "class-9-10"
                      ? "/courses?level=class-9-10"
                      : "/courses?level=class-11-12"
                  )
                }
              />
            ))}
          </div>

          <div className="mt-auto pt-8">
            <motion.button
              type="button"
              onClick={() =>
                onNavigate("/courses?category=board-streams")
              }
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-emerald-50"
            >
              View Board Streams
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 overflow-hidden rounded-2xl opacity-20 transition duration-500 group-hover:scale-110 group-hover:opacity-30">
          <div className="h-full w-full rounded-[35%_65%_50%_50%/45%_40%_60%_55%] border border-white bg-white/20 blur-sm" />
        </div>
      </motion.div>
    </div>
  );
}

function BoardTrackItem({ track, delay, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.45
      }}
      whileHover={{
        y: -3,
        backgroundColor: "rgba(255,255,255,0.12)"
      }}
      whileTap={{ scale: 0.98 }}
      className="group/track rounded-3xl border border-white/[0.09] bg-white/[0.06] p-4 text-left backdrop-blur-xl transition"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            {track.subtitle}
          </div>

          <div className="mt-1 text-lg font-black text-white">
            {track.title}
          </div>
        </div>

        <ChevronRight
          size={18}
          className="text-slate-500 transition group-hover/track:translate-x-1 group-hover/track:text-emerald-300"
        />
      </div>

      <div className="mt-3 text-xs text-slate-400">
        {track.boards}
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide">
          <span className="text-slate-400">Syllabus Progress</span>
          <span className="text-emerald-300">{track.progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${track.progress}%` }}
            viewport={{ once: true }}
            transition={{
              delay: delay + 0.25,
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
          />
        </div>
      </div>
    </motion.button>
  );
}

function CoreSubjectsCard({ onNavigate }) {
  return (
    <LiftCard
      onClick={onNavigate}
      className="group relative min-h-[245px] overflow-hidden"
    >
      <CardGlow glow="emerald" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpen size={22} />
          </div>

          <div className="rounded-full border border-emerald-500/15 bg-emerald-500/[0.07] px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            Classes 1–8
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">
          Primary & Middle School Core
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Build strong foundations through structured core subjects.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {coreSubjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-slate-950/20 dark:text-slate-300"
            >
              {subject}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
          Explore Core Subjects
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </LiftCard>
  );
}

function ElectivesStreamsCard({ onNavigate }) {
  const visibleStreams = useMemo(
    () => streams.slice(0, 6),
    []
  );

  return (
    <LiftCard className="group relative min-h-[245px] overflow-hidden">
      <CardGlow glow="gold" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers3 size={22} />
            </div>

            <h3 className="mt-4 text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">
              Electives & Career Streams
            </h3>
          </div>

          <div className="rounded-full border border-amber-500/15 bg-amber-500/[0.07] px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
            Class 9–12
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {visibleStreams.map((stream) => {
            const Icon = stream.icon;

            return (
              <motion.button
                key={stream.label}
                type="button"
                onClick={() => onNavigate(stream.path)}
                whileHover={{
                  y: -2,
                  scale: 1.015
                }}
                whileTap={{ scale: 0.97 }}
                className="flex min-h-16 flex-col items-start justify-center rounded-2xl border border-slate-200/80 bg-white/60 p-3 text-left backdrop-blur-xl transition hover:border-amber-500/30 hover:shadow-[0_10px_25px_rgba(217,119,6,0.08)] dark:border-slate-700/80 dark:bg-slate-950/25"
              >
                <Icon
                  size={15}
                  className="text-amber-600 dark:text-amber-400"
                />

                <span className="mt-1.5 text-[11px] font-bold leading-tight text-slate-700 dark:text-slate-200">
                  {stream.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </LiftCard>
  );
}

function DateSheetCard({ onNavigate }) {
  return (
    <LiftCard
      onClick={onNavigate}
      className="group relative min-h-[185px] overflow-hidden"
    >
      <CardGlow glow="emerald" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CalendarDays size={20} />
          </div>

          <motion.div
            animate={{
              opacity: [0.65, 1, 0.65]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:text-amber-300"
          >
            <BellRing size={12} />
            Exam Alert
          </motion.div>
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-black tracking-[-0.025em] text-slate-950 dark:text-white">
            Class 9–12 Date Sheets
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Access board examination schedules and important updates.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Clock3 size={14} />
            Latest schedules
          </div>

          <ArrowRight
            size={18}
            className="text-emerald-600 transition-transform group-hover:translate-x-1 dark:text-emerald-400"
          />
        </div>
      </div>
    </LiftCard>
  );
}

function FeeStatusCard({ onNavigate }) {
  const paidPercentage = 82;

  return (
    <LiftCard
      onClick={onNavigate}
      className="group relative min-h-[185px] overflow-hidden"
    >
      <CardGlow glow="gold" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CreditCard size={20} />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 size={12} />
            Payment Active
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-black tracking-[-0.025em] text-slate-950 dark:text-white">
                Monthly Fee Status
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Current academic month
              </p>
            </div>

            <div className="text-right">
              <div className="text-xl font-black text-slate-950 dark:text-white">
                {paidPercentage}%
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                Complete
              </div>
            </div>
          </div>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${paidPercentage}%`
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">
            View challans & payments
          </span>

          <CircleDollarSign
            size={18}
            className="text-amber-600 transition-transform group-hover:scale-110 dark:text-amber-400"
          />
        </div>
      </div>
    </LiftCard>
  );
}

function LiftCard({
  children,
  className = "",
  onClick
}) {
  const shouldReduceMotion = useReducedMotion();

  const interactiveProps = onClick
    ? {
        onClick,
        role: "button",
        tabIndex: 0,
        onKeyDown: (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            onClick();
          }
        }
      }
    : {};

  return (
    <motion.div
      {...interactiveProps}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6
            }
      }
      whileTap={
        onClick && !shouldReduceMotion
          ? {
              scale: 0.99
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22
      }}
      className={[
        "cursor-default rounded-[1.75rem] border border-white/60 bg-white/[0.68] p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors dark:border-white/[0.08] dark:bg-slate-900/[0.58] sm:p-6",
        onClick
          ? "cursor-pointer hover:border-emerald-500/20"
          : "",
        className
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}

function CardGlow({ glow }) {
  const glowClass =
    glow === "gold"
      ? "bg-amber-500/[0.08] group-hover:bg-amber-500/[0.14]"
      : "bg-emerald-500/[0.08] group-hover:bg-emerald-500/[0.14]";

  return (
    <div
      className={[
        "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition duration-700",
        glowClass
      ].join(" ")}
    />
  );
}

function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-[100px]" />

      <div className="absolute bottom-[5%] right-[10%] h-80 w-80 rounded-full bg-amber-500/[0.05] blur-[110px]" />
    </div>
  );
}