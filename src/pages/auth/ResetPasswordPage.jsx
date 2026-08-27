import { useState } from "react";
import { CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("success");
    setMessage("Password reset successfully. You can now sign in.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] border border-slate-200/70 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70"
      >
        <h1 className="text-3xl font-black tracking-tight">
          Reset password
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Choose a secure new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {[
            {
              id: "password",
              label: "New password",
              value: password,
              setter: setPassword
            },
            {
              id: "confirmPassword",
              label: "Confirm password",
              value: confirmPassword,
              setter: setConfirmPassword
            }
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="mb-2 block text-sm font-bold"
              >
                {field.label}
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id={field.id}
                  type={showPassword ? "text" : "password"}
                  value={field.value}
                  onChange={(event) =>
                    field.setter(event.target.value)
                  }
                  className="min-h-[52px] w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-2xl p-3 text-sm ${
                  status === "success"
                    ? "bg-emerald-500/10 text-emerald-700"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {status === "success" && (
                  <CheckCircle2
                    size={16}
                    className="mr-2 inline"
                  />
                )}
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {status === "success" ? (
            <Link
              to="/login"
              className="flex min-h-[52px] items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white"
            >
              Go to login
            </Link>
          ) : (
            <button
              type="submit"
              className="min-h-[52px] w-full rounded-2xl bg-emerald-600 text-sm font-black text-white"
            >
              Reset password
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
}