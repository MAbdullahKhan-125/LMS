import { LogOut, Presentation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function TeacherDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-600">Teacher Portal</p>
            <h1 className="mt-1 text-3xl font-black">
              Welcome, {user?.name}
            </h1>
          </div>

          <Presentation />
        </div>

        <p className="mt-6 text-slate-500">
          Teacher protected content is accessible here.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}