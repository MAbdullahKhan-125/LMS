import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  FileImage,
  FileText,
  Flame,
  Loader2,
  Lock,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  Video,
  Volume2,
  X,
  Zap
} from "lucide-react";

const chapters = [
  {
    id: "chapter-1",
    title: "Introduction & Core Concepts",
    duration: "18 min",
    lessons: 4,
    progress: 100
  },
  {
    id: "chapter-2",
    title: "Fundamental Principles",
    duration: "24 min",
    lessons: 5,
    progress: 80
  },
  {
    id: "chapter-3",
    title: "Applications & Examples",
    duration: "21 min",
    lessons: 6,
    progress: 40
  },
  {
    id: "chapter-4",
    title: "Exam Practice & Revision",
    duration: "32 min",
    lessons: 8,
    progress: 0
  }
];

const materials = [
  {
    id: "notes",
    title: "Chapter Notes",
    subtitle: "Complete revision notes",
    type: "PDF",
    size: "2.4 MB",
    icon: FileText,
    accent: "emerald",
    preview: [
      "Key concepts explained",
      "Exam-focused summaries",
      "Important definitions"
    ]
  },
  {
    id: "diagram",
    title: "Concept Diagram",
    subtitle: "Visual chapter overview",
    type: "PNG",
    size: "1.1 MB",
    icon: FileImage,
    accent: "gold",
    preview: [
      "Topic relationships",
      "Process visualization",
      "Quick revision map"
    ]
  },
  {
    id: "worksheet",
    title: "Practice Worksheet",
    subtitle: "Extra questions & exercises",
    type: "PDF",
    size: "780 KB",
    icon: FileText,
    accent: "blue",
    preview: [
      "MCQs",
      "Short questions",
      "Exam practice"
    ]
  }
];

const quizQuestions = [
  {
    id: "q1",
    category: "MCQ",
    question:
      "Which approach is most effective for understanding a new academic concept?",
    options: [
      "Memorizing without practice",
      "Learning the concept and applying it to examples",
      "Skipping difficult sections",
      "Only reading the chapter title"
    ],
    correctAnswer: 1,
    explanation:
      "Active understanding improves retention by connecting concepts with practical examples."
  },
  {
    id: "q2",
    category: "Short Question",
    question:
      "Briefly explain why regular revision is important for board examination preparation.",
    type: "short",
    keywords: [
      "retention",
      "memory",
      "practice",
      "recall",
      "concept"
    ],
    explanation:
      "A strong answer should mention improved retention, recall, practice, or reinforcement of concepts."
  },
  {
    id: "q3",
    category: "Board Pattern",
    question:
      "For a BSEK/BIEK-style model paper, which strategy best improves time management?",
    options: [
      "Spend equal time on every question regardless of marks",
      "Attempt high-confidence questions first and monitor time",
      "Leave all long questions until the final minutes",
      "Read the paper only after starting to write"
    ],
    correctAnswer: 1,
    explanation:
      "Prioritizing confident answers and tracking time helps students complete papers more effectively."
  }
];

const tabs = [
  {
    id: "materials",
    label: "Notes & Materials",
    icon: BookOpen
  },
  {
    id: "quiz",
    label: "Quiz Module",
    icon: Trophy
  },
  {
    id: "attendance",
    label: "Attendance & Streaks",
    icon: Flame
  }
];

export default function LessonViewer({
  lessonTitle = "Mastering Core Concepts for Academic Success",
  courseName = "Class 9–12 Board Preparation",
  boardType = "BSEK / BIEK Learning Track",
  lessonDuration = "42:18",
  loading = false,
  onComplete
}) {
  const [activeTab, setActiveTab] = useState("materials");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(42);
  const [activeChapter, setActiveChapter] = useState("chapter-2");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shortAnswers, setShortAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toast, setToast] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  const completionPercentage = useMemo(() => {
    if (isCompleted) {
      return 100;
    }

    const quizScore =
      Object.keys(submittedQuestions).length / quizQuestions.length;

    const lessonScore = videoProgress / 100;

    return Math.min(
      99,
      Math.round((lessonScore * 0.7 + quizScore * 0.3) * 100)
    );
  }, [
    isCompleted,
    submittedQuestions,
    videoProgress
  ]);

  const completedLessons = useMemo(() => {
    return isCompleted ? 19 : 18;
  }, [isCompleted]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 4500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toast]);

  const handleComplete = async () => {
    if (isCompleted || isCompleting) {
      return;
    }

    setIsCompleting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200);
    });

    setIsCompleting(false);
    setIsCompleted(true);
    setVideoProgress(100);

    setToast({
      type: "success",
      title: "Lesson completed!",
      message:
        "Your progress, attendance, and academic streak have been updated."
    });

    if (typeof onComplete === "function") {
      onComplete({
        lessonTitle,
        completedAt: new Date().toISOString()
      });
    }
  };

  const handleQuizOption = (questionId, optionIndex) => {
    if (submittedQuestions[questionId]) {
      return;
    }

    setSelectedAnswers((current) => ({
      ...current,
      [questionId]: optionIndex
    }));
  };

  const handleShortAnswer = (questionId, value) => {
    if (submittedQuestions[questionId]) {
      return;
    }

    setShortAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  };

  const submitQuestion = (question) => {
    if (submittedQuestions[question.id]) {
      return;
    }

    let correct = false;

    if (question.type === "short") {
      const answer =
        shortAnswers[question.id]?.toLowerCase().trim() || "";

      correct = question.keywords.some((keyword) =>
        answer.includes(keyword)
      );
    } else {
      correct =
        selectedAnswers[question.id] === question.correctAnswer;
    }

    setSubmittedQuestions((current) => ({
      ...current,
      [question.id]: correct
    }));
  };

  if (loading) {
    return <LessonViewerSkeleton />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <AmbientBackground />

      <div className="relative mx-auto max-w-7xl">
        <LessonBreadcrumb
          courseName={courseName}
          boardType={boardType}
        />

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
          <div className="xl:sticky xl:top-24">
            <LessonVideoPanel
              lessonTitle={lessonTitle}
              courseName={courseName}
              boardType={boardType}
              lessonDuration={lessonDuration}
              isPlaying={isPlaying}
              isMuted={isMuted}
              videoProgress={videoProgress}
              activeChapter={activeChapter}
              isCompleted={isCompleted}
              shouldReduceMotion={shouldReduceMotion}
              onTogglePlay={() =>
                setIsPlaying((current) => !current)
              }
              onToggleMute={() =>
                setIsMuted((current) => !current)
              }
              onProgressChange={setVideoProgress}
              onSelectChapter={setActiveChapter}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-5"
            >
              <CompletionButton
                isCompleting={isCompleting}
                isCompleted={isCompleted}
                onClick={handleComplete}
              />
            </motion.div>
          </div>

          <div>
            <InteractivePanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedAnswers={selectedAnswers}
              shortAnswers={shortAnswers}
              submittedQuestions={submittedQuestions}
              completionPercentage={completionPercentage}
              completedLessons={completedLessons}
              isCompleted={isCompleted}
              onQuizOption={handleQuizOption}
              onShortAnswer={handleShortAnswer}
              onSubmitQuestion={submitQuestion}
              onToast={setToast}
            />
          </div>
        </div>
      </div>

      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </section>
  );
}

function LessonBreadcrumb({ courseName, boardType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400"
    >
      <span>Learning</span>
      <ChevronRight size={13} />
      <span>{courseName}</span>
      <ChevronRight size={13} />
      <span className="text-emerald-600 dark:text-emerald-400">
        {boardType}
      </span>
    </motion.div>
  );
}

function LessonVideoPanel({
  lessonTitle,
  courseName,
  boardType,
  lessonDuration,
  isPlaying,
  isMuted,
  videoProgress,
  activeChapter,
  isCompleted,
  shouldReduceMotion,
  onTogglePlay,
  onToggleMute,
  onProgressChange,
  onSelectChapter
}) {
  return (
    <div>
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/[0.7] shadow-[0_25px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/[0.65]">
        <VideoPlayer
          isPlaying={isPlaying}
          isMuted={isMuted}
          videoProgress={videoProgress}
          lessonDuration={lessonDuration}
          shouldReduceMotion={shouldReduceMotion}
          onTogglePlay={onTogglePlay}
          onToggleMute={onToggleMute}
          onProgressChange={onProgressChange}
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
              Active Lesson
            </span>

            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 size={13} />
                Completed
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Clock3 size={14} />
              {lessonDuration}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
            {lessonTitle}
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
            Follow the lecture, review chapter materials, test your
            understanding, and update your academic learning streak.
          </p>

          <div className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-black text-slate-900 dark:text-white">
                  Chapter Breakdown
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Track your progress across lesson sections
                </div>
              </div>

              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {courseName}
              </div>
            </div>

            <div className="space-y-2">
              {chapters.map((chapter) => (
                <ChapterItem
                  key={chapter.id}
                  chapter={chapter}
                  active={activeChapter === chapter.id}
                  onClick={() => onSelectChapter(chapter.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPlayer({
  isPlaying,
  isMuted,
  videoProgress,
  lessonDuration,
  shouldReduceMotion,
  onTogglePlay,
  onToggleMute,
  onProgressChange
}) {
  return (
    <div className="group relative aspect-video overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.34),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(217,119,6,0.22),transparent_25%),linear-gradient(135deg,#020617,#0f172a_50%,#052e2b)]" />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: isPlaying
                  ? [1, 1.05, 1]
                  : [1, 1.02, 1],
                opacity: [0.6, 0.9, 0.6]
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -left-10 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px]"
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -8, 0]
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      >
        <motion.button
          type="button"
          onClick={onTogglePlay}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  scale: 1.08
                }
          }
          whileTap={
            shouldReduceMotion
              ? {}
              : {
                  scale: 0.94
                }
          }
          className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_20px_70px_rgba(5,150,105,0.25)] backdrop-blur-xl"
          aria-label={
            isPlaying ? "Pause lesson" : "Play lesson"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isPlaying ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              {isPlaying ? (
                <Pause size={30} fill="currentColor" />
              ) : (
                <Play
                  size={30}
                  fill="currentColor"
                  className="ml-1"
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <div className="mt-4 text-center">
          <div className="text-sm font-bold text-white">
            Interactive Video Lecture
          </div>

          <div className="mt-1 text-xs text-slate-400">
            Continue from your saved progress
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-3 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onTogglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15"
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play
                  size={16}
                  fill="currentColor"
                  className="ml-0.5"
                />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={videoProgress}
              onChange={(event) =>
                onProgressChange(Number(event.target.value))
              }
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-emerald-500"
              aria-label="Video progress"
            />

            <span className="hidden shrink-0 text-xs font-bold text-slate-300 sm:block">
              {lessonDuration}
            </span>

            <button
              type="button"
              onClick={onToggleMute}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label={
                isMuted ? "Unmute lesson" : "Mute lesson"
              }
            >
              <Volume2
                size={17}
                className={isMuted ? "opacity-40" : ""}
              />
            </button>

            <button
              type="button"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white sm:flex"
              aria-label="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterItem({ chapter, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      className={[
        "group w-full rounded-2xl border p-3.5 text-left transition",
        active
          ? "border-emerald-500/25 bg-emerald-500/[0.07]"
          : "border-slate-200/70 bg-white/40 hover:border-emerald-500/15 hover:bg-emerald-500/[0.03] dark:border-slate-700/70 dark:bg-slate-950/15"
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            active
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          ].join(" ")}
        >
          {chapter.progress === 100 ? (
            <Check size={17} />
          ) : active ? (
            <Play size={15} fill="currentColor" />
          ) : (
            <BookOpen size={16} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
            {chapter.title}
          </div>

          <div className="mt-1 flex items-center gap-3 text-[11px] font-semibold text-slate-400">
            <span>{chapter.lessons} lessons</span>
            <span>{chapter.duration}</span>
          </div>
        </div>

        <div className="w-12 text-right">
          <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">
            {chapter.progress}%
          </div>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${chapter.progress}%` }}
          transition={{ duration: 0.65 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
        />
      </div>
    </motion.button>
  );
}

function InteractivePanel({
  activeTab,
  onTabChange,
  selectedAnswers,
  shortAnswers,
  submittedQuestions,
  completionPercentage,
  completedLessons,
  isCompleted,
  onQuizOption,
  onShortAnswer,
  onSubmitQuestion,
  onToast
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/[0.7] shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/[0.62]">
      <div className="border-b border-slate-200/70 px-3 pt-3 dark:border-slate-700/70 sm:px-5 sm:pt-5">
        <div className="flex gap-1 overflow-x-auto pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  "relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:text-sm",
                  active
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                ].join(" ")}
              >
                {active && (
                  <motion.span
                    layoutId="lesson-active-tab"
                    className="absolute inset-0 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.08]"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28
                    }}
                  />
                )}

                <Icon
                  size={16}
                  className="relative z-10"
                />

                <span className="relative z-10">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "materials" && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              <MaterialsTab onToast={onToast} />
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              <QuizTab
                selectedAnswers={selectedAnswers}
                shortAnswers={shortAnswers}
                submittedQuestions={submittedQuestions}
                onQuizOption={onQuizOption}
                onShortAnswer={onShortAnswer}
                onSubmitQuestion={onSubmitQuestion}
              />
            </motion.div>
          )}

          {activeTab === "attendance" && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              <AttendanceTab
                completionPercentage={completionPercentage}
                completedLessons={completedLessons}
                isCompleted={isCompleted}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MaterialsTab({ onToast }) {
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [downloading, setDownloading] = useState(null);

  const handleDownload = (material) => {
    if (downloading) {
      return;
    }

    setDownloading(material.id);

    window.setTimeout(() => {
      setDownloading(null);

      onToast({
        type: "success",
        title: `${material.title} ready`,
        message: `${material.type} material has been prepared for download.`
      });
    }, 850);
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="text-lg font-black text-slate-950 dark:text-white">
            Notes & Learning Materials
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Download revision notes, diagrams, and practice resources
            for this chapter.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
          <BookOpen size={13} />
          {materials.length} resources
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {materials.map((material) => {
          const Icon = material.icon;
          const isDownloading =
            downloading === material.id;

          return (
            <motion.div
              key={material.id}
              layout
              whileHover={{ y: -2 }}
              className="group rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm transition hover:border-emerald-500/20 hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-950/20"
            >
              <div className="flex gap-3">
                <div
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    material.accent === "gold"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : material.accent === "blue"
                        ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  ].join(" ")}
                >
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {material.title}
                      </div>

                      <div className="mt-0.5 text-xs text-slate-400">
                        {material.subtitle}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-slate-400">
                      {material.type} · {material.size}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewMaterial(
                          previewMaterial === material.id
                            ? null
                            : material.id
                        )
                      }
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-500/25 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {previewMaterial === material.id
                        ? "Close Preview"
                        : "Preview"}
                    </button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        handleDownload(material)
                      }
                      whileTap={{ scale: 0.96 }}
                      disabled={Boolean(downloading)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                          Preparing
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          Download
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {previewMaterial === material.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto"
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                      <div className="mb-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Preview Summary
                      </div>

                      <ul className="space-y-2">
                        {material.preview.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-emerald-500"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function QuizTab({
  selectedAnswers,
  shortAnswers,
  submittedQuestions,
  onQuizOption,
  onShortAnswer,
  onSubmitQuestion
}) {
  const correctCount = Object.values(
    submittedQuestions
  ).filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="text-lg font-black text-slate-950 dark:text-white">
            Interactive Quiz Module
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Practice general learning questions and Class 9–12
            BSEK/BIEK-style model paper patterns.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.07] px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          Score: {correctCount} /{" "}
          {quizQuestions.length}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {quizQuestions.map((question, index) => (
          <QuizQuestionCard
            key={question.id}
            question={question}
            number={index + 1}
            selectedAnswer={
              selectedAnswers[question.id]
            }
            shortAnswer={shortAnswers[question.id] || ""}
            submitted={
              submittedQuestions[question.id] !== undefined
            }
            correct={submittedQuestions[question.id]}
            onSelect={(optionIndex) =>
              onQuizOption(
                question.id,
                optionIndex
              )
            }
            onShortAnswer={(value) =>
              onShortAnswer(question.id, value)
            }
            onSubmit={() =>
              onSubmitQuestion(question)
            }
          />
        ))}
      </div>
    </div>
  );
}

function QuizQuestionCard({
  question,
  number,
  selectedAnswer,
  shortAnswer,
  submitted,
  correct,
  onSelect,
  onShortAnswer,
  onSubmit
}) {
  const canSubmit =
    question.type === "short"
      ? shortAnswer.trim().length >= 3
      : selectedAnswer !== undefined;

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-4 dark:border-slate-700/70 dark:bg-slate-950/20 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {number}
          </span>

          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
            {question.category}
          </span>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
              correct
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-600 dark:text-red-300"
            ].join(" ")}
          >
            {correct ? (
              <CheckCircle2 size={13} />
            ) : (
              <CircleAlert size={13} />
            )}

            {correct ? "Correct" : "Incorrect"}
          </motion.div>
        )}
      </div>

      <h4 className="mt-4 text-base font-bold leading-7 text-slate-900 dark:text-white">
        {question.question}
      </h4>

      {question.type === "short" ? (
        <textarea
          value={shortAnswer}
          disabled={submitted}
          onChange={(event) =>
            onShortAnswer(event.target.value)
          }
          placeholder="Write a concise answer..."
          className="mt-4 min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-white/70 p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
        />
      ) : (
        <div className="mt-4 grid gap-2">
          {question.options.map((option, optionIndex) => {
            const selected =
              selectedAnswer === optionIndex;

            const isCorrectOption =
              submitted &&
              optionIndex === question.correctAnswer;

            const isWrongSelected =
              submitted &&
              selected &&
              optionIndex !== question.correctAnswer;

            return (
              <button
                key={option}
                type="button"
                disabled={submitted}
                onClick={() => onSelect(optionIndex)}
                className={[
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-sm font-medium transition",
                  isCorrectOption
                    ? "border-emerald-500/35 bg-emerald-500/[0.09] text-emerald-800 dark:text-emerald-200"
                    : isWrongSelected
                      ? "border-red-500/30 bg-red-500/[0.07] text-red-700 dark:text-red-300"
                      : selected
                        ? "border-emerald-500/30 bg-emerald-500/[0.06] text-slate-800 dark:text-slate-100"
                        : "border-slate-200/70 bg-white/50 text-slate-600 hover:border-emerald-500/20 dark:border-slate-700/70 dark:bg-slate-900/30 dark:text-slate-300"
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[11px] font-black",
                    isCorrectOption
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isWrongSelected
                        ? "border-red-500 bg-red-500 text-white"
                        : selected
                          ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                          : "border-slate-200 text-slate-400 dark:border-slate-700"
                  ].join(" ")}
                >
                  {isCorrectOption ? (
                    <Check size={14} />
                  ) : isWrongSelected ? (
                    <X size={14} />
                  ) : (
                    String.fromCharCode(65 + optionIndex)
                  )}
                </span>

                {option}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Check Answer
          </button>
        ) : (
          <div
            className={[
              "flex flex-1 items-start gap-2 rounded-2xl border p-3 text-xs leading-5",
              correct
                ? "border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-800 dark:text-emerald-200"
                : "border-red-500/15 bg-red-500/[0.05] text-slate-600 dark:text-slate-300"
            ].join(" ")}
          >
            {correct ? (
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
            ) : (
              <RotateCcw
                size={16}
                className="mt-0.5 shrink-0 text-red-500"
              />
            )}

            <span>
              <strong className="font-black">
                {correct ? "Great work. " : "Review this concept. "}
              </strong>
              {question.explanation}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function AttendanceTab({
  completionPercentage,
  completedLessons,
  isCompleted
}) {
  const streakDays = isCompleted ? 13 : 12;

  return (
    <div>
      <div>
        <div className="text-lg font-black text-slate-950 dark:text-white">
          Attendance & Academic Streaks
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Lesson engagement contributes to your academic activity,
          completion history, and learning streak.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.10] to-emerald-500/[0.02] p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CalendarCheck2 size={21} />
            </div>

            <span className="rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:bg-slate-950/30 dark:text-emerald-300">
              Live Tracker
            </span>
          </div>

          <div className="mt-6 text-3xl font-black text-slate-950 dark:text-white">
            {completedLessons}
            <span className="text-lg text-slate-400">
              /24
            </span>
          </div>

          <div className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            Lessons completed this cycle
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-slate-950/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.round(
                  (completedLessons / 24) * 100
                )}%`
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.10] to-amber-500/[0.02] p-5">
          <div className="flex items-center justify-between">
            <motion.div
              animate={{
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400"
            >
              <Flame size={22} />
            </motion.div>

            <span className="rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:bg-slate-950/30 dark:text-amber-300">
              Best: 21 Days
            </span>
          </div>

          <div className="mt-6 text-3xl font-black text-slate-950 dark:text-white">
            {streakDays}
            <span className="ml-1 text-lg text-slate-400">
              days
            </span>
          </div>

          <div className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            Current academic streak
          </div>

          <div className="mt-5 flex gap-1.5">
            {Array.from({ length: 7 }).map(
              (_, index) => (
                <motion.div
                  key={index}
                  initial={{ scaleY: 0.5 }}
                  animate={{
                    scaleY: 1
                  }}
                  transition={{
                    delay: index * 0.05
                  }}
                  className={[
                    "h-8 flex-1 rounded-lg",
                    index < 6 || isCompleted
                      ? "bg-amber-500"
                      : "bg-white/60 dark:bg-slate-950/30"
                  ].join(" ")}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-200/70 bg-white/55 p-5 dark:border-slate-700/70 dark:bg-slate-950/20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
              <Zap
                size={17}
                className="text-emerald-500"
              />
              Current Lesson Progress
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Video activity and completed quiz questions contribute to
              your lesson completion score.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {completionPercentage}%
            </div>

            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
              Completion
            </div>
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            animate={{
              width: `${completionPercentage}%`
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18
            }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400"
          />
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50/80 p-3 text-xs text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
          {isCompleted ? (
            <>
              <CheckCircle2
                size={16}
                className="shrink-0 text-emerald-500"
              />
              Lesson successfully recorded as completed in your academic
              activity.
            </>
          ) : (
            <>
              <Lock
                size={16}
                className="shrink-0 text-slate-400"
              />
              Mark the lesson as completed when you are ready to record
              your learning activity.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CompletionButton({
  isCompleting,
  isCompleted,
  onClick
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isCompleting || isCompleted}
      whileHover={
        !isCompleted && !isCompleting
          ? {
              y: -2,
              scale: 1.01
            }
          : {}
      }
      whileTap={
        !isCompleted && !isCompleting
          ? {
              scale: 0.985
            }
          : {}
      }
      className={[
        "flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-lg transition",
        isCompleted
          ? "bg-emerald-500 text-white shadow-[0_15px_40px_rgba(5,150,105,0.22)]"
          : "bg-slate-950 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
        isCompleting
          ? "cursor-wait opacity-90"
          : ""
      ].join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCompleting ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={18} className="animate-spin" />
            Saving Progress...
          </motion.span>
        ) : isCompleted ? (
          <motion.span
            key="completed"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20
            }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 size={19} />
            Lesson Completed
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Check size={18} />
            Mark as Completed
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ToastNotification({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.96
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 26
          }}
          className="fixed bottom-5 right-4 z-50 w-[calc(100%-2rem)] max-w-md"
          role="status"
        >
          <div className="flex gap-3 rounded-3xl border border-emerald-500/20 bg-white/90 p-4 shadow-[0_25px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:bg-slate-900/95">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-black text-slate-900 dark:text-white">
                {toast.title}
              </div>

              <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {toast.message}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LessonViewerSkeleton() {
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-72 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="aspect-video animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />

              <div className="mt-6 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-4/5 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="mt-8 space-y-3">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/80"
                    />
                  )
                )}
              </div>
            </div>

            <div className="mt-5 h-14 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-10 flex-1 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                  />
                )
              )}
            </div>

            <div className="mt-7 space-y-4">
              <div className="h-6 w-2/5 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

              {Array.from({ length: 3 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-28 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800/80"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/[0.05] blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.04] blur-[130px]" />
    </div>
  );
}