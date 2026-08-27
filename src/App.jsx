// import React from "react";
// import { useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// // Layout Components
// import Navbar from "./components/layout/Navbar";

// // Centralized Routing
// import AppRoutes from "./routes/AppRoutes";

// export default function App() {
//   const location = useLocation();

//   return (
//     <div className="min-h-screen overflow-x-hidden text-slate-900 transition-colors duration-300 dark:text-slate-100">
//       <Navbar />

//       <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
//         <AnimatePresence mode="wait">
//           <PageTransition key={location.pathname}>
//             <AppRoutes />
//           </PageTransition>
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }

// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 12,
//         filter: "blur(4px)"
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)"
//       }}
//       exit={{
//         opacity: 0,
//         y: -8,
//         filter: "blur(3px)"
//       }}
//       transition={{
//         duration: 0.3,
//         ease: [0.22, 1, 0.36, 1]
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900 transition-colors duration-300 dark:text-slate-100">
      {!isAuthPage && <Navbar />}

      <main
        className={
          isAuthPage
            ? "w-full"
            : "mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8"
        }
      >
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <AppRoutes />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
        filter: "blur(4px)"
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      }}
      exit={{
        opacity: 0,
        y: -8,
        filter: "blur(3px)"
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}