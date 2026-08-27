import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-500/30 bg-white/70 text-emerald-600 shadow-[0_20px_60px_rgba(5,150,105,0.18)] backdrop-blur-xl dark:bg-slate-900/70"
        >
          <GraduationCap size={30} />
        </motion.div>

        <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">
          Restoring your EduPortal session...
        </p>
      </div>
    </div>
  );
}