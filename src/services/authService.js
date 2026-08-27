const AUTH_STORAGE_KEY = "eduportal_auth_session";

const MOCK_USERS = [
  {
    id: "student-001",
    name: "Ali Student",
    email: "student@eduportal.com",
    password: "Student@123",
    role: "Student"
  },
  {
    id: "teacher-001",
    name: "Sara Teacher",
    email: "teacher@eduportal.com",
    password: "Teacher@123",
    role: "Teacher"
  },
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@eduportal.com",
    password: "Admin@123",
    role: "Admin"
  }
];

const delay = (ms = 900) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const createMockJwt = (user) => {
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  );

  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    })
  );

  const signature = btoa(`mock-signature-${user.id}-${Date.now()}`);

  return `${header}.${payload}.${signature}`;
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role
});

export const authService = {
  async login({ email, password, role }) {
    await delay();

    const normalizedEmail = email.trim().toLowerCase();

    const user = MOCK_USERS.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (role && user.role !== role) {
      throw new Error(
        `This account belongs to the ${user.role} role. Please select the correct role.`
      );
    }

    const token = createMockJwt(user);

    const session = {
      user: sanitizeUser(user),
      token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return session;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getSession() {
    try {
      const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!rawSession) {
        return null;
      }

      const session = JSON.parse(rawSession);

      if (!session?.token || !session?.user) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }

      if (session.expiresAt && session.expiresAt < Date.now()) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }

      return session;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  },

  async switchRole(currentUser, nextRole) {
    await delay(350);

    if (!currentUser) {
      throw new Error("You must be logged in to switch roles.");
    }

    const user = MOCK_USERS.find(
      (item) =>
        item.email.toLowerCase() === currentUser.email.toLowerCase() &&
        item.role === nextRole
    );

    if (!user) {
      throw new Error(
        `No ${nextRole} profile is available for this mock account.`
      );
    }

    const token = createMockJwt(user);

    const session = {
      user: sanitizeUser(user),
      token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return session;
  },

  async requestPasswordReset(email) {
    await delay(1000);

    const normalizedEmail = email.trim().toLowerCase();

    const user = MOCK_USERS.find(
      (item) => item.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      return {
        success: true,
        message:
          "If an account exists for this email, password reset instructions have been sent."
      };
    }

    return {
      success: true,
      message:
        "Password reset instructions have been sent successfully."
    };
  },

  getDemoUsers() {
    return MOCK_USERS.map(sanitizeUser);
  }
};

export default authService;