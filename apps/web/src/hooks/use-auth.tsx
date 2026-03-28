import * as React from "react";
import { useMeQuery } from "../api/users-api";
import { userSchema } from "@vido-vala/validators/user";
import { z } from "zod";

type User = z.infer<typeof userSchema>;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  showAuthModal: () => void;
  hideAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "vido-vala-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const { data: me, isLoading, isError } = useMeQuery();

  React.useEffect(() => {
    if (me) {
      setUser(me);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(me));
    } else if (isError) {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [me, isError]);

  const login = React.useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  const showAuthModal = React.useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const hideAuthModal = React.useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        showAuthModal,
        hideAuthModal,
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
