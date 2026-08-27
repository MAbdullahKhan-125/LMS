import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  TrendingUp
} from "lucide-react";

const stats = [
  {
    label: "Active Courses",
    value: "08",
    detail: "Across Class 10 Science"
  },
  {
    label: "Attendance",
    value: "94%",
    detail: "+2.4% this month"
  },
  {
    label: "Average Marks",
    value: "87%",
    detail: "Strong academic progress"
  },
  {
    label: "Pending Fees",
    value: "01",
    detail: "Due in 12 days"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-6 shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Academic Session 2026–27
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Welcome back to your
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}learning space.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            Track your Class 1–12 curriculum, board schedules,
            attendance, fee challans, quizzes, and academic results
            from one modern workspace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-glow-emerald transition hover:bg-emerald-700">
              Continue Learning
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white/60 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800">
              View Progress
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/70 bg-white/65 p-5 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/65"
          >
            <div className="text-sm font-semibold text-slate-400">
              {stat.label}
            </div>

            <div className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {stat.value}
            </div>

            <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {stat.detail}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <DashboardCard
          icon={BookOpen}
          title="Continue Learning"
          description="Physics · Chapter 04"
          value="72% Complete"
        />

        <DashboardCard
          icon={CalendarDays}
          title="Next Important Date"
          description="BSEK Class 10 Examination"
          value="View Date Sheet"
        />

        <DashboardCard
          icon={TrendingUp}
          title="Academic Performance"
          description="Your strongest subject"
          value="Mathematics · 92%"
        />
      </section>
    </div>
  );
}

function DashboardCard({ icon: Icon, title, description, value }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/65 p-6 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/65">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <Icon size={21} />
      </div>

      <div className="mt-5 text-lg font-black text-slate-900 dark:text-white">
        {title}
      </div>

      <div className="mt-1 text-sm text-slate-400">
        {description}
      </div>

      <div className="mt-5 font-bold text-gold-600 dark:text-gold-400">
        {value}
      </div>
    </div>
  );
}