// src/pages/public/HomePage.jsx

import { motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileDown,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  PlayCircle,
  Printer,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound
} from "lucide-react";

import LMSHero from "../../components/LMSHero";
import CourseBentoGrid from "../../components/CourseBentoGrid";
import LessonViewer from "../../components/LessonViewer";

/*
|--------------------------------------------------------------------------
| Animation Variants
|--------------------------------------------------------------------------
*/

const revealUp = {
  hidden: {
    opacity: 0,
    y: 36
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

/*
|--------------------------------------------------------------------------
| Academic Engine Data
|--------------------------------------------------------------------------
*/

const academicEngineCards = [
  {
    id: "results",
    eyebrow: "Academic Intelligence",
    title: "Result & Marksheet Engine",
    description:
      "Generate Monthly Tests, Mid-Terms, Final Examinations, and Final Combined Marksheets with structured BSEK and BIEK formats for Classes 9–12.",
    icon: FileSpreadsheet,
    gradient:
      "from-emerald-500/[0.14] via-emerald-500/[0.06] to-transparent",
    iconClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderClass:
      "border-emerald-500/15 hover:border-emerald-500/40",
    actionLabel: "Open Marksheets",
    route: "/marksheets",
    stats: [
      { label: "Monthly", value: "Tests" },
      { label: "Academic", value: "Mid-Term" },
      { label: "Combined", value: "Final" }
    ]
  },
  {
    id: "attendance",
    eyebrow: "Student Monitoring",
    title: "Attendance & Parent Alert Engine",
    description:
      "Manage Daily Attendance Sheets, monitor student presence, and track automatic SMS parent notifications for absent or late students.",
    icon: CalendarDays,
    gradient:
      "from-sky-500/[0.14] via-sky-500/[0.06] to-transparent",
    iconClass:
      "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    borderClass:
      "border-sky-500/15 hover:border-sky-500/40",
    actionLabel: "Open Dashboard",
    route: "/dashboard",
    stats: [
      { label: "Present", value: "94%" },
      { label: "Alerts", value: "Auto SMS" },
      { label: "Sheets", value: "Daily" }
    ]
  },
  {
    id: "fees",
    eyebrow: "Finance Management",
    title: "Fee Management System",
    description:
      "Review monthly fee challans, due dates and payment status with interactive instant print and PDF download actions.",
    icon: ReceiptText,
    gradient:
      "from-amber-500/[0.14] via-amber-500/[0.06] to-transparent",
    iconClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderClass:
      "border-amber-500/15 hover:border-amber-500/40",
    actionLabel: "Open Fee Portal",
    route: "/fee-portal",
    stats: [
      { label: "Cycle", value: "Monthly" },
      { label: "Status", value: "Live" },
      { label: "Actions", value: "Print/PDF" }
    ]
  }
];

/*
|--------------------------------------------------------------------------
| Quick Navigation Data
|--------------------------------------------------------------------------
*/

const quickNavigation = [
  {
    title: "Student Dashboard",
    description: "View learning progress, attendance and academic activity.",
    route: "/dashboard",
    icon: LayoutDashboard,
    iconClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Explore Courses",
    description: "Access General School and Class 1–12 Board courses.",
    route: "/courses",
    icon: BookOpen,
    iconClass:
      "bg-sky-500/10 text-sky-600 dark:text-sky-400"
  },
  {
    title: "Board Date Sheets",
    description: "Check Class 9–12 BSEK and BIEK examination schedules.",
    route: "/date-sheets",
    icon: ClipboardCheck,
    iconClass:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400"
  },
  {
    title: "Lesson Workspace",
    description: "Watch lectures, access notes, quizzes and learning streaks.",
    route: "/lesson",
    icon: PlayCircle,
    iconClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  }
];

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

export default function HomePage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start"
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      {/* Adaptive background */}
      <AdaptiveMeshBackground />

      <main className="relative">
        {/* HERO */}
        <section id="home" className="relative">
          <LMSHero />

          {/* LESSON PAGE NAVIGATION */}
          <div className="relative z-20 mx-auto -mt-3 flex w-full max-w-7xl justify-center px-4 pb-8 sm:px-6 lg:px-8">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -3,
                      scale: 1.015
                    }
              }
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/lesson"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-emerald-500/25 bg-white/80 px-5 py-3 text-sm font-black text-slate-900 shadow-[0_18px_60px_rgba(5,150,105,0.12)] backdrop-blur-xl transition hover:border-emerald-500/50 hover:text-emerald-700 dark:bg-slate-900/80 dark:text-white dark:hover:text-emerald-300"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <PlayCircle size={16} />
                </span>

                Start Learning — Open Lesson

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* COURSES / BENTO GRID */}
        <section
          id="courses"
          className="scroll-mt-24 py-10 sm:py-14 lg:py-20"
        >
          <motion.div
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12
            }}
          >
            <motion.div
              variants={revealUp}
              className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end"
            >
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  <GraduationCap size={14} />
                  Learning Tracks
                </div>

                <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.4rem)] font-black leading-[1.08] tracking-[-0.04em]">
                  One platform for{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-amber-400">
                    Class 1 to Class 12
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-[clamp(0.9rem,1.4vw,1.05rem)] leading-7 text-slate-500 dark:text-slate-400">
                  Explore primary school subjects, Matriculation streams,
                  Intermediate programs, board preparation, interactive
                  coursework and structured academic learning.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate("/courses")}
                className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-emerald-500/30 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-emerald-300"
              >
                View All Courses
                <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div variants={revealUp}>
              <CourseBentoGrid />
            </motion.div>
          </motion.div>
        </section>

        {/* ACADEMIC ENGINE */}
        <section
          id="academic-engine"
          className="scroll-mt-24 py-12 sm:py-16 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15
              }}
            >
              {/* Section heading */}
              <motion.div
                variants={revealUp}
                className="mx-auto max-w-3xl text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
                  <Sparkles size={14} />
                  Academic Engine
                </div>

                <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-black leading-[1.04] tracking-[-0.05em]">
                  Everything behind a{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-300 dark:to-amber-400">
                    modern academic workflow
                  </span>
                </h2>

                <p className="mt-5 text-[clamp(0.95rem,1.5vw,1.1rem)] leading-8 text-slate-500 dark:text-slate-400">
                  Results, attendance, parent notifications and fee operations
                  connected inside one responsive learning platform.
                </p>
              </motion.div>

              {/* Engine cards */}
              <motion.div
                variants={staggerContainer}
                className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              >
                {academicEngineCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.article
                      key={card.id}
                      variants={revealUp}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -7
                            }
                      }
                      className={`group relative overflow-hidden rounded-[2rem] border bg-white/65 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl transition dark:bg-slate-900/60 sm:p-6 ${card.borderClass}`}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                      />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconClass}`}
                          >
                            <Icon size={23} />
                          </div>

                          <span className="rounded-full border border-white/50 bg-white/50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 backdrop-blur dark:border-white/10 dark:bg-slate-950/30">
                            {card.eyebrow}
                          </span>
                        </div>

                        <h3 className="mt-6 text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">
                          {card.title}
                        </h3>

                        <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-slate-500 dark:text-slate-400">
                          {card.description}
                        </p>

                        <div className="mt-6 grid grid-cols-3 gap-2">
                          {card.stats.map((stat) => (
                            <div
                              key={`${card.id}-${stat.label}`}
                              className="min-w-0 rounded-2xl border border-slate-200/70 bg-white/55 p-3 dark:border-slate-700/60 dark:bg-slate-950/25"
                            >
                              <div className="truncate text-xs font-black text-slate-800 dark:text-slate-100">
                                {stat.value}
                              </div>

                              <div className="mt-1 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Result Preview */}
                        {card.id === "results" && (
                          <div className="mt-5">
                            <MarksheetPreview />
                          </div>
                        )}

                        {/* Attendance Preview */}
                        {card.id === "attendance" && (
                          <div className="mt-5">
                            <AttendancePreview />
                          </div>
                        )}

                        {/* Fee Preview */}
                        {card.id === "fees" && (
                          <div className="mt-5">
                            <FeeChallanPreview />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleNavigate(card.route)}
                          className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-black text-slate-800 transition hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-300"
                        >
                          {card.actionLabel}
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>

              {/* Academic workflow banner */}
              <motion.div
                variants={revealUp}
                className="mt-6 flex flex-col items-stretch justify-between gap-5 rounded-[2rem] border border-slate-200/70 bg-white/55 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/50 lg:flex-row lg:items-center sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <ShieldCheck size={23} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white">
                      Structured workflows for every LMS role
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Students access learning and results, teachers manage
                      coursework and attendance, while administrators oversee
                      board, academic and fee operations.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("quick-navigation")}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  Explore LMS Tools
                  <TrendingUp size={16} />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* LESSON VIEWER SECTION */}
        <section
          id="lesson-preview"
          className="scroll-mt-24 py-12 sm:py-16 lg:py-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{
                once: true,
                amount: 0.1
              }}
            >
              <motion.div
                variants={revealUp}
                className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
              >
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                    <PlayCircle size={14} />
                    Active Learning
                  </div>
                  <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.2rem)] font-black leading-tight tracking-[-0.04em]">
                    Learn, practice and track your progress
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                    Use interactive lectures, downloadable materials, quizzes,
                    attendance tracking and academic streaks from the Lesson
                    workspace.
                  </p>
                </div>
                <Link
                  to="/lesson"
                  className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-[0_14px_40px_rgba(5,150,105,0.22)] transition hover:bg-emerald-700"
                >
                  Open Full Lesson Page
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                variants={revealUp}
                className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/45 shadow-[0_20px_70px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/30"
              >
                <LessonViewer />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* QUICK NAVIGATION */}
        <section
          id="quick-navigation"
          className="scroll-mt-24 pb-20 pt-8 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15
              }}
            >
              <motion.div
                variants={revealUp}
                className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              >
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                    Quick Access
                  </div>

                  <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-black tracking-[-0.04em]">
                    Continue where you need to go
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <UsersRound size={15} />
                  Student · Teacher · Admin
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {quickNavigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.route}
                      variants={revealUp}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -4
                            }
                      }
                    >
                      <Link
                        to={item.route}
                        className="group flex min-h-[12rem] flex-col rounded-[1.75rem] border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition hover:border-emerald-500/25 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)] dark:border-slate-700/70 dark:bg-slate-900/55"
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconClass}`}
                        >
                          <Icon size={21} />
                        </div>

                        <h3 className="mt-5 font-black text-slate-900 dark:text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>

                        <span className="mt-auto inline-flex min-h-[44px] items-end gap-2 pt-4 text-xs font-black text-slate-500 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          Open Section
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Lesson shortcut */}
        <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
          <Link
            to="/lesson"
            className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:bg-emerald-600"
          >
            <PlayCircle size={19} />
            Open Lesson
          </Link>
        </div>
      </main>
    </div>
  );
}

// Marksheet Preview
function MarksheetPreview() {
  const subjects = [
    ["English", "84"],
    ["Mathematics", "91"],
    ["Physics", "88"]
  ];
  return (
    <div className="rounded-2xl border border-emerald-500/15 bg-white/70 p-3 shadow-inner dark:bg-slate-950/30">
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 dark:border-slate-700/70">
        <div>
          <p className="text-[10px] font-black text-slate-800 dark:text-slate-100">
            Combined Marksheet
          </p>
          <p className="text-[9px] text-slate-400">
            Monthly + Mid-Term + Final
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Preview marksheet"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition hover:bg-emerald-500/20"
          >
            <FileDown size={14} />
          </button>
          <button
            type="button"
            aria-label="Download marksheet"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {subjects.map(([subject, marks]) => (
          <div
            key={subject}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-[9px] dark:bg-slate-900/60"
          >
            <span className="font-semibold text-slate-500">
              {subject}
            </span>
            <span className="font-black text-slate-800 dark:text-slate-200">
              {marks}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Attendance Preview
function AttendancePreview() {
  return (
    <div className="rounded-2xl border border-sky-500/15 bg-white/70 p-3 shadow-inner dark:bg-slate-950/30">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-800 dark:text-slate-100">
          Today&apos;s Attendance
        </span>
        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={11} />
          Synced
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <AttendanceStat label="Present" value="94%" />
        <AttendanceStat label="Absent" value="4%" />
        <AttendanceStat label="Late" value="2%" />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-sky-500/[0.07] p-2.5">
        <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 dark:text-slate-300">
          <MessageSquareText size={13} className="text-sky-500" />
          Parent SMS Alerts
        </span>
        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 dark:text-emerald-400">
          <BellRing size={11} />
          Sent
        </span>
      </div>
    </div>
  );
}

function AttendanceStat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-900/60">
      <div className="text-xs font-black text-slate-800 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </div>
    </div>
  );
}

// Fee Challan Preview
function FeeChallanPreview() {
  return (
    <div className="rounded-2xl border border-amber-500/15 bg-white/70 p-3 shadow-inner dark:bg-slate-950/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-800 dark:text-slate-100">
            Monthly Fee Challan
          </p>
          <p className="mt-0.5 text-[9px] text-slate-400">
            Current billing cycle
          </p>
        </div>
        <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[9px] font-black text-amber-700 dark:text-amber-300">
          Pending
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between rounded-xl bg-amber-500/[0.06] p-3">
        <div>
          <p className="text-[9px] font-bold text-slate-400">
            Total Payable
          </p>
          <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">
            PKR 12,500
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Print fee challan"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm transition hover:text-amber-600 dark:bg-slate-900 dark:text-slate-300"
          >
            <Printer size={14} />
          </button>
          <button
            type="button"
            aria-label="Download fee challan"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white transition hover:scale-105"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Adaptive Light/Dark Mesh Background
|--------------------------------------------------------------------------
*/
function AdaptiveMeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-50 transition-colors duration-500 dark:bg-slate-950" />

      <motion.div
        className="absolute -left-[20vw] top-[5vh] h-[min(45rem,80vw)] w-[min(45rem,80vw)] rounded-full bg-emerald-400/[0.10] blur-[110px] dark:bg-emerald-500/[0.08]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-[-15vw] top-[30vh] h-[min(40rem,75vw)] w-[min(40rem,75vw)] rounded-full bg-amber-400/[0.08] blur-[120px] dark:bg-amber-500/[0.06]"
        animate={{
          x: [0, -35, 0],
          y: [0, -20, 0],
          scale: [1.05, 1, 1.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.018)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-60 dark:opacity-[0.08]" />
    </div>
  );
}