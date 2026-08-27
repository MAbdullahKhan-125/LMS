import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Mail,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required.";
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmail.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const error = useMemo(() => validateEmail(email), [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched(true);

    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");

      const result = await authService.requestPasswordReset(email);

      setStatus("success");
      setMessage(result.message);
    } catch (requestError) {
      setStatus("error");
      setMessage(
        requestError instanceof Error
          ? requestError.message
          : "Unable to process your request."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 dark:bg-slate-950">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70 sm:p-8"
      >
        <Link
          to="/login"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to login
        </Link>

        <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <KeyRound size={25} />
        </div>

        <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
          Forgot your password?
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
          Enter your account email and we&apos;ll prepare password reset
          instructions.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-7 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.07] p-5"
            >
              <CheckCircle2
                size={30}
                className="text-emerald-600 dark:text-emerald-400"
              />

              <h2 className="mt-4 font-black text-emerald-800 dark:text-emerald-200">
                Request submitted
              </h2>

              <p className="mt-2 text-sm leading-6 text-emerald-700/80 dark:text-emerald-300/80">
                {message}
              </p>

              <Link
                to="/login"
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                Return to login
                <ArrowLeft size={16} />
              </Link>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              noValidate
              className="mt-7"
            >
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus("idle");
                    setMessage("");
                  }}
                  onBlur={() => setTouched(true)}
                  placeholder="you@example.com"
                  className={`min-h-[52px] w-full rounded-2xl border bg-white/60 py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-4 dark:bg-slate-950/30 ${
                    touched && error
                      ? "border-rose-500 focus:ring-rose-500/10"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-slate-700"
                  }`}
                />
              </div>

              <AnimatePresence>
                {touched && error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex items-center gap-1.5 text-xs text-rose-500"
                  >
                    <AlertCircle size={13} />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {status === "error" && message && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-4 flex gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/[0.07] p-3 text-xs leading-5 text-rose-600 dark:text-rose-300"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileTap={{ scale: 0.985 }}
                className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(5,150,105,0.22)] transition hover:bg-emerald-700 disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Send reset instructions
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}