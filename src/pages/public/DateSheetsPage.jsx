import { CalendarDays, Clock, FileText } from "lucide-react";

const schedules = [
  {
    className: "Class 9",
    board: "BSEK · Science",
    exam: "Mathematics",
    date: "15 March 2027",
    time: "09:00 AM"
  },
  {
    className: "Class 10",
    board: "BSEK · Science",
    exam: "Physics",
    date: "18 March 2027",
    time: "09:00 AM"
  },
  {
    className: "Class 11",
    board: "BIEK · Pre-Engineering",
    exam: "Mathematics",
    date: "21 March 2027",
    time: "10:00 AM"
  },
  {
    className: "Class 12",
    board: "BIEK · Pre-Medical",
    exam: "Biology",
    date: "25 March 2027",
    time: "10:00 AM"
  }
];

export default function DateSheetsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-gold-600 dark:text-gold-400">
          <CalendarDays size={16} />
          Examination Schedule
        </div>

        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
          Class 9–12 Board Date Sheets
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          BSEK and BIEK examination schedules organized by class and stream.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
        <div className="grid gap-px bg-slate-200/70 dark:bg-slate-700/50">
          {schedules.map((item) => (
            <div
              key={`${item.className}-${item.exam}`}
              className="grid gap-4 bg-white/80 p-5 sm:grid-cols-[1.2fr_1.5fr_1fr_auto] sm:items-center dark:bg-slate-900/80"
            >
              <div>
                <div className="font-black text-slate-900 dark:text-white">
                  {item.className}
                </div>

                <div className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                  {item.board}
                </div>
              </div>

              <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                <FileText size={17} className="text-gold-600" />
                {item.exam}
              </div>

              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {item.date}
                </div>

                <div className="mt-1 flex items-center gap-1 text-sm text-slate-400">
                  <Clock size={14} />
                  {item.time}
                </div>
              </div>

              <button className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-500 hover:text-white dark:text-emerald-300">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}