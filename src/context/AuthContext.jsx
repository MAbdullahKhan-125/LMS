import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const savedSession = authService.getSession();

    setSession(savedSession);
    setIsInitializing(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const nextSession = await authService.login(credentials);

    setSession(nextSession);

    return nextSession;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const switchRole = useCallback(
    async (nextRole) => {
      const nextSession = await authService.switchRole(
        session?.user,
        nextRole
      );

      setSession(nextSession);

      return nextSession;
    },
    [session]
  );

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token && session?.user),
      isInitializing,
      login,
      logout,
      switchRole
    }),
    [session, isInitializing, login, logout, switchRole]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}