import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from "framer-motion";
import {
  Activity,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Command,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  Users,
  X,
  UserPlus,
  FileText,
  ClipboardList
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* =========================================================
   ROLE CONFIGURATION
========================================================= */

const roles = [
  {
    id: "student",
    label: "Student",
    description: "Learning workspace",
    icon: GraduationCap
  },
  {
    id: "teacher",
    label: "Teacher",
    description: "Teaching workspace",
    icon: BookOpen
  },
  {
    id: "admin",
    label: "Admin",
    description: "System management",
    icon: ShieldCheck
  }
];

const roleRoutes = {
  student: "/student/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin/dashboard"
};

/* =========================================================
   PUBLIC NAVIGATION
========================================================= */

const publicNavigation = [
  {
    label: "Home",
    path: "/",
    icon: LayoutDashboard
  },
  {
    label: "Courses",
    path: "/courses",
    icon: BookOpen
  },
  {
    label: "Date Sheets",
    path: "/date-sheets",
    icon: CalendarDays
  },
  {
    label: "Fee Portal",
    path: "/fee-portal",
    icon: ReceiptText
  },
  {
    label: "Marksheets",
    path: "/marksheets",
    icon: GraduationCap
  }
];

/* =========================================================
   STUDENT NAVIGATION
========================================================= */

const studentNavigation = [
  {
    label: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "My Courses",
    path: "/student/courses",
    icon: BookOpen
  },
  {
    label: "Lessons",
    path: "/student/lessons",
    icon: FileText
  },
  {
    label: "Quizzes",
    path: "/student/quizzes",
    icon: ClipboardCheck
  },
  {
    label: "Attendance",
    path: "/student/attendance",
    icon: Activity
  },
  {
    label: "Marks",
    path: "/student/marks",
    icon: GraduationCap
  },
  {
    label: "Fee Portal",
    path: "/student/fees",
    icon: ReceiptText
  },
  {
    label: "Date Sheets",
    path: "/student/date-sheets",
    icon: CalendarDays
  }
];

/* =========================================================
   TEACHER NAVIGATION
========================================================= */

const teacherNavigation = [
  {
    label: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "My Courses",
    path: "/teacher/courses",
    icon: BookOpen
  },
  {
    label: "Lessons",
    path: "/teacher/lessons",
    icon: FileText
  },
  {
    label: "Quizzes",
    path: "/teacher/quizzes",
    icon: ClipboardCheck
  },
  {
    label: "Students",
    path: "/teacher/students",
    icon: Users
  },
  {
    label: "Attendance",
    path: "/teacher/attendance",
    icon: Activity
  },
  {
    label: "Marksheets",
    path: "/teacher/marksheets",
    icon: GraduationCap
  },
  {
    label: "Date Sheets",
    path: "/teacher/date-sheets",
    icon: CalendarDays
  }
];

/* =========================================================
   ADMIN NAVIGATION
========================================================= */

const adminNavigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: Users
  },
  {
    label: "Teachers",
    path: "/admin/teachers",
    icon: BookOpen
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: BookOpen
  },
  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: Activity
  },
  {
    label: "Marksheets",
    path: "/admin/marksheets",
    icon: GraduationCap
  },
  {
    label: "Fee Management",
    path: "/admin/fees",
    icon: ReceiptText
  },
  {
    label: "Date Sheets",
    path: "/admin/date-sheets",
    icon: CalendarDays
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings
  }
];

const navigationByRole = {
  student: studentNavigation,
  teacher: teacherNavigation,
  admin: adminNavigation
};

/* =========================================================
   ANIMATION
========================================================= */

const spring = {
  type: "spring",
  stiffness: 340,
  damping: 30
};

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  const shouldReduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState("system");

  const searchInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  /* =======================================================
     CURRENT ROLE
  ======================================================= */

  const currentRole =
    typeof user?.role === "string"
      ? user.role.toLowerCase()
      : null;

  const activeRole =
    roles.find((role) => role.id === currentRole) ||
    null;

  /* =======================================================
     CURRENT NAVIGATION
  ======================================================= */

  const currentNavigation = useMemo(() => {
    if (!isAuthenticated || !currentRole) {
      return publicNavigation;
    }

    return (
      navigationByRole[currentRole] ||
      publicNavigation
    );
  }, [isAuthenticated, currentRole]);

  /* =======================================================
     CLOSE MENUS ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  /* =======================================================
     SCROLL EFFECT
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     LOAD THEME
  ======================================================= */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("eduportal-theme") ||
      "system";

    setTheme(savedTheme);
  }, []);

  /* =======================================================
     APPLY THEME
  ======================================================= */

  useEffect(() => {
    const root = document.documentElement;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = () => {
      const dark =
        theme === "dark" ||
        (theme === "system" && media.matches);

      root.classList.toggle("dark", dark);
    };

    applyTheme();

    if (theme === "system") {
      media.addEventListener(
        "change",
        applyTheme
      );

      return () => {
        media.removeEventListener(
          "change",
          applyTheme
        );
      };
    }
  }, [theme]);

  /* =======================================================
     KEYBOARD SHORTCUTS
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      const searchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";

      if (searchShortcut) {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     SEARCH FOCUS
  ======================================================= */

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchOpen]);

  /* =======================================================
     CLICK OUTSIDE PROFILE
  ======================================================= */

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
    };
  }, []);

  /* =======================================================
     MOBILE BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     THEME
  ======================================================= */

  const changeTheme = () => {
    const nextTheme =
      theme === "light"
        ? "dark"
        : theme === "dark"
          ? "system"
          : "light";

    setTheme(nextTheme);

    localStorage.setItem(
      "eduportal-theme",
      nextTheme
    );
  };

  /* =======================================================
     ACTIVE LINK
  ======================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(
        `${path}/`
      )
    );
  };

  /* =======================================================
     DASHBOARD
  ======================================================= */

  const goToDashboard = () => {
    if (!isAuthenticated || !currentRole) {
      navigate("/login");
      return;
    }

    const destination =
      roleRoutes[currentRole];

    if (destination) {
      setProfileOpen(false);
      setMobileOpen(false);
      navigate(destination);
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);

    logout();

    navigate("/login", {
      replace: true
    });
  };

  /* =======================================================
     USER INFORMATION
  ======================================================= */

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "User";

  const getInitials = () => {
    const parts = userName
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return (
        parts[0][0] +
        parts[parts.length - 1][0]
      ).toUpperCase();
    }

    return userName
      .slice(0, 2)
      .toUpperCase();
  };

  const initials = getInitials();

  return (
    <>
      {/* ===================================================
          DESKTOP / MAIN NAVBAR
      =================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <motion.nav
          animate={{
            maxWidth: scrolled ? 1320 : 1536,
            borderRadius: scrolled ? 28 : 0
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : spring
          }
          className={[
            "mx-auto flex h-[68px] w-full items-center",
            "transition-[background-color,border-color,box-shadow]",
            "duration-300",
            scrolled
              ? [
                  "glass",
                  "border border-white/60",
                  "shadow-floating",
                  "dark:border-slate-700/60"
                ].join(" ")
              : [
                  "border-b border-slate-200/70",
                  "bg-white/70",
                  "backdrop-blur-xl",
                  "dark:border-slate-800/70",
                  "dark:bg-slate-950/70"
                ].join(" ")
          ].join(" ")}
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div className="flex min-w-0 shrink-0 items-center">
            <Link
              to="/"
              aria-label="EduPortal LMS home"
              className="group ml-1 flex shrink-0 items-center gap-2.5 px-2 sm:ml-2"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: -5,
                        scale: 1.04
                      }
                }
                transition={spring}
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-glow-emerald"
              >
                <GraduationCap
                  size={21}
                  strokeWidth={2.4}
                />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-gold-500 dark:border-slate-900" />
              </motion.div>

              <div className="hidden leading-tight sm:block">
                <div className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                  EduPortal
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {" "}LMS
                  </span>
                </div>

                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Learn. Grow. Achieve.
                </div>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div className="ml-7 hidden items-center gap-2 xl:flex">
              {currentNavigation
                .slice(0, 5)
                .map((item) => {
                  const active = isActive(
                    item.path
                  );

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={[
                        "relative whitespace-nowrap",
                        "rounded-xl px-3.5 py-2.5",
                        "text-sm font-semibold",
                        "transition-colors",
                        active
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      ].join(" ")}
                    >
                      {active && (
                        <motion.span
                          layoutId="desktop-active-nav"
                          transition={spring}
                          className="absolute inset-0 rounded-xl bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/10 dark:bg-emerald-400/10"
                        />
                      )}

                      <span className="relative z-10">
                        {item.label}
                      </span>

                      {active && (
                        <motion.span
                          layoutId="desktop-active-dot"
                          transition={spring}
                          className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-500 shadow-glow-emerald"
                        />
                      )}
                    </Link>
                  );
                })}

              {/* MORE ITEMS */}

              {currentNavigation.length > 5 && (
                <MoreNavigation
                  items={currentNavigation.slice(5)}
                  isActive={isActive}
                />
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="ml-auto flex shrink-0 items-center gap-1.5 pr-2 sm:gap-2">
            {/* SEARCH */}

            <button
              type="button"
              onClick={() =>
                setSearchOpen(true)
              }
              className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200/70 bg-white/60 px-3 text-slate-500 transition hover:border-emerald-500/30 hover:text-emerald-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-emerald-400 md:flex"
              aria-label="Open global search"
            >
              <Search size={17} />

              <span className="hidden text-xs font-medium lg:inline">
                Search
              </span>

              <kbd className="hidden items-center gap-0.5 rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 lg:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                Ctrl
                <span>+</span>
                K
              </kbd>
            </button>

            {/* MOBILE SEARCH */}

            <button
              type="button"
              onClick={() =>
                setSearchOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
              aria-label="Open search"
            >
              <Search size={19} />
            </button>

            {/* THEME */}

            <motion.button
              type="button"
              onClick={changeTheme}
              whileTap={
                shouldReduceMotion
                  ? {}
                  : { scale: 0.9 }
              }
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-gold-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-gold-400"
              aria-label={`Theme mode: ${theme}`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6
                  }}
                  transition={{
                    duration: 0.22
                  }}
                  className="absolute"
                >
                  {theme === "dark" ? (
                    <Moon size={19} />
                  ) : (
                    <Sun size={19} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* =================================================
                LOGGED OUT
            ================================================= */}

            {!isAuthenticated && (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                >
                  <LogIn size={16} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white shadow-glow-emerald transition hover:bg-emerald-700"
                >
                  <UserPlus size={16} />
                  Sign Up
                </Link>
              </div>
            )}

            {/* =================================================
                LOGGED IN PROFILE
            ================================================= */}

            {isAuthenticated &&
              activeRole && (
                <div
                  ref={profileMenuRef}
                  className="relative hidden sm:block"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen(
                        (value) => !value
                      )
                    }
                    className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    aria-label="Open profile menu"
                  >
                    <div className="relative">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-950 text-xs font-extrabold text-white shadow-lg">
                        {initials}
                      </div>

                      <motion.span
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                scale: [
                                  1,
                                  1.18,
                                  1
                                ]
                              }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                        className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950"
                      />
                    </div>

                    <div className="hidden max-w-[100px] text-left lg:block">
                      <div className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                        {userName}
                      </div>

                      <div className="text-[10px] text-slate-400">
                        {activeRole.label}
                      </div>
                    </div>

                    <ChevronDown
                      size={14}
                      className={[
                        "hidden text-slate-400 transition-transform duration-200 lg:block",
                        profileOpen
                          ? "rotate-180"
                          : ""
                      ].join(" ")}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <ProfileMenu
                        userName={userName}
                        initials={initials}
                        role={activeRole.label}
                        onDashboard={
                          goToDashboard
                        }
                        onLogout={
                          handleLogout
                        }
                        onClose={() =>
                          setProfileOpen(false)
                        }
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}

            {/* MOBILE MENU */}

            <motion.button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : { scale: 0.92 }
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </motion.nav>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 280,
                      damping: 30
                    }
              }
              className="glass-strong fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-sm flex-col shadow-2xl"
              aria-label="Mobile navigation"
            >
              {/* MOBILE HEADER */}

              <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4 dark:border-slate-700/70">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-glow-emerald">
                    <GraduationCap size={20} />
                  </div>

                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      EduPortal LMS
                    </div>

                    <div className="text-xs text-slate-400">
                      {isAuthenticated &&
                      activeRole
                        ? `${activeRole.label} Workspace`
                        : "Public Navigation"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Close navigation menu"
                >
                  <X size={21} />
                </button>
              </div>

              {/* USER INFO */}

              {isAuthenticated &&
                activeRole && (
                  <div className="border-b border-slate-200/70 p-4 dark:border-slate-700/70">
                    <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/5 p-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 font-bold text-white">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate font-bold text-slate-900 dark:text-white">
                          {userName}
                        </div>

                        <div className="text-xs text-emerald-600 dark:text-emerald-400">
                          {activeRole.label}
                          {" "}Account
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* MOBILE LINKS */}

              <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {isAuthenticated
                    ? `${activeRole?.label || ""} Navigation`
                    : "Explore EduPortal"}
                </div>

                <div className="space-y-1.5">
                  {currentNavigation.map(
                    (item, index) => {
                      const active =
                        isActive(item.path);

                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.path}
                          initial={{
                            opacity: 0,
                            x: 20
                          }}
                          animate={{
                            opacity: 1,
                            x: 0
                          }}
                          transition={{
                            delay:
                              shouldReduceMotion
                                ? 0
                                : 0.035 * index
                          }}
                        >
                          <Link
                            to={item.path}
                            className={[
                              "relative flex items-center gap-3",
                              "overflow-hidden rounded-2xl",
                              "px-4 py-3.5",
                              "font-semibold transition",
                              active
                                ? "text-emerald-700 dark:text-emerald-300"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            ].join(" ")}
                          >
                            {active && (
                              <motion.span
                                layoutId="mobile-active-nav"
                                className="absolute inset-0 rounded-2xl bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/15"
                              />
                            )}

                            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                              <Icon
                                size={19}
                                className={
                                  active
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : ""
                                }
                              />
                            </span>

                            <span className="relative z-10 flex-1 text-sm">
                              {item.label}
                            </span>

                            {active && (
                              <motion.span
                                initial={{
                                  scale: 0
                                }}
                                animate={{
                                  scale: 1
                                }}
                                className="relative z-10 h-2 w-2 rounded-full bg-emerald-500"
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    }
                  )}
                </div>

                {/* PUBLIC AUTH BUTTONS */}

                {!isAuthenticated && (
                  <div className="mt-6 space-y-2 border-t border-slate-200/70 pt-5 dark:border-slate-700/70">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <LogIn size={18} />
                      </span>

                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-glow-emerald transition hover:bg-emerald-700"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <UserPlus size={18} />
                      </span>

                      Create Account
                    </Link>
                  </div>
                )}
              </div>

              {/* MOBILE QUICK CONTROLS */}

              <div className="border-t border-slate-200/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-slate-700/70">
                <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-2 dark:border-slate-700/70 dark:bg-slate-900/60">
                  <div className="mb-2 px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Quick controls
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* SEARCH */}

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                      className="flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                    >
                      <Search size={18} />
                      Search
                    </button>

                    {/* THEME */}

                    <button
                      type="button"
                      onClick={changeTheme}
                      className="flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold text-slate-600 transition hover:bg-gold-500/10 hover:text-gold-600 dark:text-slate-300 dark:hover:text-gold-400"
                    >
                      {theme === "dark" ? (
                        <Moon size={18} />
                      ) : (
                        <Sun size={18} />
                      )}

                      Theme
                    </button>

                    {/* PROFILE / LOGIN */}

                    {isAuthenticated ? (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          setProfileOpen(true);
                        }}
                        className="flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                      >
                        <UserRound size={18} />
                        Profile
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                      >
                        <LogIn size={18} />
                        Login
                      </Link>
                    )}
                  </div>
                </div>

                {/* LOGOUT */}

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-rose-500 transition hover:bg-rose-500/10"
                  >
                    <LogOut size={17} />
                    Sign out
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          SEARCH COMMAND PALETTE
      ===================================================== */}

      <AnimatePresence>
        {searchOpen && (
          <SearchModal
            inputRef={searchInputRef}
            onClose={() =>
              setSearchOpen(false)
            }
            navigationItems={
              currentNavigation
            }
            role={activeRole?.label}
            onNavigate={(path) => {
              navigate(path);
              setSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ===========================================================
   MORE NAVIGATION
=========================================================== */

function MoreNavigation({
  items,
  isActive
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        More
        <ChevronDown
          size={15}
          className={
            open
              ? "rotate-180 transition-transform"
              : "transition-transform"
          }
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.96
            }}
            transition={{
              duration: 0.18
            }}
            className="glass-strong absolute left-0 top-[50px] w-56 overflow-hidden rounded-2xl p-1.5 shadow-floating"
          >
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(
                item.path
              );

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  ].join(" ")}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===========================================================
   PROFILE MENU
=========================================================== */

function ProfileMenu({
  userName,
  initials,
  role,
  onDashboard,
  onLogout,
  onClose
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.96
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.96
      }}
      transition={{
        duration: 0.18
      }}
      className="glass-strong absolute right-0 top-[52px] w-72 overflow-hidden rounded-2xl shadow-floating"
      role="menu"
    >
      <div className="border-b border-slate-200/70 p-4 dark:border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <div className="truncate font-bold text-slate-900 dark:text-white">
              {userName}
            </div>

            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online · {role}
            </div>
          </div>
        </div>
      </div>

      <div className="p-1.5">
        <button
          type="button"
          onClick={onDashboard}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <LayoutDashboard size={17} />
          Dashboard
        </button>

        <Link
          to="/profile"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <UserRound size={17} />
          My Profile
        </Link>

        <Link
          to="/settings"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Settings size={17} />
          Account Settings
        </Link>

        <div className="my-1 border-t border-slate-200/70 dark:border-slate-700/70" />

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-500 transition hover:bg-rose-500/10"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

/* ===========================================================
   SEARCH COMMAND PALETTE
=========================================================== */

function SearchModal({
  inputRef,
  onClose,
  navigationItems,
  role,
  onNavigate
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const results = useMemo(() => {
    const normalized =
      query.trim().toLowerCase();

    if (!normalized) {
      return navigationItems;
    }

    return navigationItems.filter(
      (item) =>
        item.label
          .toLowerCase()
          .includes(normalized) ||
        item.path
          .toLowerCase()
          .includes(normalized)
    );
  }, [query, navigationItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((current) =>
        Math.min(
          current + 1,
          results.length - 1
        )
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((current) =>
        Math.max(current - 1, 0)
      );
    }

    if (
      event.key === "Enter" &&
      results[selectedIndex]
    ) {
      event.preventDefault();

      onNavigate(
        results[selectedIndex].path
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-4 pt-[8vh] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
          scale: 0.97
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: -12,
          scale: 0.97
        }}
        transition={spring}
        className="glass-strong w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* SEARCH INPUT */}

        <div className="flex items-center gap-3 border-b border-slate-200/70 px-5 py-4 dark:border-slate-700/70">
          <Search
            size={21}
            className="shrink-0 text-emerald-600 dark:text-emerald-400"
          />

          <input
            ref={inputRef}
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              role
                ? `Search ${role.toLowerCase()} workspace...`
                : "Search EduPortal..."
            }
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
            aria-label="Search navigation"
          />

          <kbd className="hidden rounded-lg border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500 sm:block dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* SEARCH INFO */}

        <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-3 dark:border-slate-700/70">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles
              size={14}
              className="text-emerald-500"
            />

            {query
              ? "Matching navigation"
              : "Quick navigation"}
          </div>

          <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
            <kbd className="rounded border px-1.5 py-0.5">
              ↑
            </kbd>
            <kbd className="rounded border px-1.5 py-0.5">
              ↓
            </kbd>
            Navigate
            <kbd className="rounded border px-1.5 py-0.5">
              Enter
            </kbd>
            Open
          </div>
        </div>

        {/* RESULTS */}

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map(
                (item, index) => {
                  const Icon = item.icon;

                  const selected =
                    index === selectedIndex;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onMouseEnter={() =>
                        setSelectedIndex(
                          index
                        )
                      }
                      onClick={() =>
                        onNavigate(
                          item.path
                        )
                      }
                      className={[
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                        selected
                          ? "bg-emerald-500/10"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          selected
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        ].join(" ")}
                      >
                        <Icon size={18} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                          {item.label}
                        </span>

                        <span className="block truncate text-xs text-slate-400">
                          {item.path}
                        </span>
                      </span>

                      <ChevronDown
                        size={16}
                        className="-rotate-90 text-slate-400"
                      />
                    </button>
                  );
                }
              )}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <Search
                size={28}
                className="mx-auto mb-3 text-slate-300 dark:text-slate-600"
              />

              <div className="font-semibold text-slate-600 dark:text-slate-300">
                No results found
              </div>

              <div className="mt-1 text-sm text-slate-400">
                Try searching for another section.
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-slate-200/70 px-5 py-3 text-[11px] text-slate-400 dark:border-slate-700/70">
          <span>
            Global command palette
          </span>

          <button
            type="button"
            onClick={onClose}
            className="font-semibold transition hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}