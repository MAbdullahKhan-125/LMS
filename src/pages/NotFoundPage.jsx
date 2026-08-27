import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-3xl border border-white/70 bg-white/70 p-8 text-center shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
        <div className="text-6xl font-black text-emerald-600">
          404
        </div>

        <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          The LMS section you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-glow-emerald transition hover:bg-emerald-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}