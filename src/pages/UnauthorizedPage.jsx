import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/70 p-8 text-center shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-500/10 text-rose-500">
          <ShieldAlert size={30} />
        </div>

        <h1 className="mt-5 text-3xl font-black">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your current account role does not have permission to access
          this area.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white"
        >
          Return to login
        </Link>
      </div>
    </div>
  );
}