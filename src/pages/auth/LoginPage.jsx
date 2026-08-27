import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  UserRound
} from "lucide-react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roles = ["Student", "Teacher", "Admin"];

const getRoleDashboard = (role) => {
  const roleRoutes = {
    Student: "/student/dashboard",
    Teacher: "/teacher/dashboard",
    Admin: "/admin/dashboard"
  };

  return roleRoutes[role] || "/login";
};

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

const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return "";
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Student"
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const errors = useMemo(
    () => ({
      email: validateEmail(form.email),
      password: validatePassword(form.password)
    }),
    [form.email, form.password]
  );

  const isValid = !errors.email && !errors.password;

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    const requestedPath = location.state?.from?.pathname;
    const roleHome = getRoleDashboard(user.role);
    const rolePrefix = `/${user.role.toLowerCase()}`;

    if (
      requestedPath &&
      requestedPath.startsWith(rolePrefix)
    ) {
      navigate(requestedPath, {
        replace: true
      });
      return;
    }

    navigate(roleHome, {
      replace: true
    });
  }, [isAuthenticated, user, navigate, location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      email: true,
      password: true
    });

    if (!isValid) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");

      const session = await login(form);

      setStatus("success");
      setMessage(`Welcome back, ${session.user.name}. Redirecting...`);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    }
  };

  if (isAuthenticated && user) {
    return (
      <Navigate
        to={getRoleDashboard(user.role)}
        replace
      />
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="relative hidden min-h-[42rem] overflow-hidden p-10 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-950" />

          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <GraduationCap size={25} />
              </div>

              <div>
                <p className="text-lg font-black tracking-tight">
                  Merits Inn Portal
                </p>
                <p className="text-xs text-emerald-100">
                  Learn. Teach. Manage.
                </p>
              </div>
            </div>

            <div className="my-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50 backdrop-blur">
                <ShieldCheck size={14} />
                Secure Role-Based Access
              </div>

              <h1 className="mt-6 max-w-md text-5xl font-black leading-[1.04] tracking-[-0.05em] text-white">
                Your complete academic workspace.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/75">
                Access coursework, board preparation, attendance,
                marksheets and academic management from one modern LMS.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <div
                  key={role}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur"
                >
                  <p className="text-xs font-black text-white">
                    {role}
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-100/70">
                    Dedicated access
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap size={25} />
                </div>

                <div>
                  <p className="font-black text-slate-950 dark:text-white">
                    Merits Inn Portal
                  </p>
                  <p className="text-xs text-slate-500">
                    Secure learning access
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <KeyRound size={21} />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Sign in to continue to your learning workspace.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-7 space-y-5"
            >
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400"
                >
                  Continue as
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        setForm((previous) => ({
                          ...previous,
                          role
                        }))
                      }
                      className={`min-h-[44px] rounded-xl border px-2 text-xs font-black transition ${
                        form.role === role
                          ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_10px_25px_rgba(5,150,105,0.2)]"
                          : "border-slate-200 bg-white/50 text-slate-500 hover:border-emerald-500/40 dark:border-slate-700 dark:bg-slate-950/30 dark:text-slate-400"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
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
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`min-h-[52px] w-full rounded-2xl border bg-white/60 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-950/30 dark:text-white ${
                      touched.email && errors.email
                        ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-slate-700"
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {touched.email && errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500"
                    >
                      <AlertCircle size={13} />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-black text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`min-h-[52px] w-full rounded-2xl border bg-white/60 py-3 pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-950/30 dark:text-white ${
                      touched.password && errors.password
                        ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-slate-700"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {touched.password && errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 1, height: "auto" }}
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500"
                    >
                      <AlertCircle size={13} />
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                {status !== "idle" && message && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`flex items-start gap-2 rounded-2xl border p-3 text-xs leading-5 ${
                      status === "success"
                        ? "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300"
                        : status === "error"
                          ? "border-rose-500/20 bg-rose-500/[0.07] text-rose-600 dark:text-rose-300"
                          : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={17}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileTap={{
                  scale: 0.985
                }}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(5,150,105,0.25)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <motion.span
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in securely
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-7 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <div className="flex items-center gap-2">
                <UserRound
                  size={15}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                  Demo accounts
                </p>
              </div>

              <div className="mt-3 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <p>
                  Student: student@eduportal.com / Student@123
                </p>
                <p>
                  Teacher: teacher@eduportal.com / Teacher@123
                </p>
                <p>
                  Admin: admin@eduportal.com / Admin@123
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AuthBackground() {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-emerald-400/15 blur-[120px] dark:bg-emerald-500/10"
        animate={{
          x: [0, 40, 0],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-[120px] dark:bg-amber-500/[0.07]"
        animate={{
          x: [0, -35, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:opacity-20"
      />
    </>
  );
}