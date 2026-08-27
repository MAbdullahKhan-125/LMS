import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

const courses = [
  ["Mathematics", "Class 10 · BSEK Science", "82%"],
  ["Physics", "Class 10 · BSEK Science", "72%"],
  ["Chemistry", "Class 10 · BSEK Science", "64%"],
  ["English", "Class 10 · General", "90%"],
  ["Computer Science", "Class 10 · Science", "58%"],
  ["Urdu", "Class 10 · General", "76%"]
];

export default function CoursesPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          Learning Library
        </div>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Courses · Class 1–12
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          Explore General School, BSEK Matriculation, and BIEK
          Intermediate learning paths.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map(([title, subtitle, progress], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -5 }}
            className="group rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition dark:border-slate-700/50 dark:bg-slate-900/70"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <BookOpen size={23} />
              </div>

              <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-bold text-gold-600 dark:text-gold-400">
                Active
              </span>
            </div>

            <h2 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-slate-400">Progress</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {progress}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                  style={{ width: progress }}
                />
              </div>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-emerald-600 dark:bg-white dark:text-slate-950">
              Open Course
              <ChevronRight size={17} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}