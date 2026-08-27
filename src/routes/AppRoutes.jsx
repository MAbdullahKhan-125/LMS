import { Navigate, Route, Routes } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./../components/auth/ProtectedRoute";
import RoleRoute from "./../components/auth/RoleRoute";

// Public Pages
import HomePage from "../pages/public/HomePage";
import LessonPage from "../pages/public/LessonPage";
import DashboardPage from "../pages/public/DashboardPage";
import CoursesPage from "../pages/public/CoursesPage";
import DateSheetsPage from "../pages/public/DateSheetsPage";
import FeePortalPage from "../pages/public/FeePortalPage";
import MarksheetsPage from "../pages/public/MarksheetsPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// System Pages
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";

// Student Pages
import StudentDashboardPage from "../pages/student/StudentDashboardPage";

// Teacher Pages
import TeacherDashboardPage from "../pages/teacher/TeacherDashboardPage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
          PUBLIC ROUTES
      ========================================================= */}

      <Route path="/" element={<HomePage />} />

      <Route path="/lesson" element={<LessonPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/courses" element={<CoursesPage />} />

      <Route path="/date-sheets" element={<DateSheetsPage />} />

      <Route path="/fee-portal" element={<FeePortalPage />} />

      <Route path="/marksheets" element={<MarksheetsPage />} />

      {/* =========================================================
          AUTH ROUTES
      ========================================================= */}

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />

      {/* =========================================================
          PROTECTED ROUTES
      ========================================================= */}

      <Route element={<ProtectedRoute />}>
        {/* ---------------------------------------------------------
            STUDENT
        --------------------------------------------------------- */}

        <Route
          path="/student"
          element={<RoleRoute allowedRoles={["Student"]} />}
        >
          <Route
            index
            element={
              <Navigate
                to="/student/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<StudentDashboardPage />}
          />
        </Route>

        {/* ---------------------------------------------------------
            TEACHER
        --------------------------------------------------------- */}

        <Route
          path="/teacher"
          element={<RoleRoute allowedRoles={["Teacher"]} />}
        >
          <Route
            index
            element={
              <Navigate
                to="/teacher/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<TeacherDashboardPage />}
          />
        </Route>

        {/* ---------------------------------------------------------
            ADMIN
        --------------------------------------------------------- */}

        <Route
          path="/admin"
          element={<RoleRoute allowedRoles={["Admin"]} />}
        >
          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboardPage />}
          />
        </Route>
      </Route>

      {/* =========================================================
          UNAUTHORIZED
      ========================================================= */}

      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      {/* =========================================================
          404
      ========================================================= */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}