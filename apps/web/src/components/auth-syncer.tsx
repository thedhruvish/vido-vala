import { useEffect } from "react";
import { useMeQuery } from "../api/users-api";
import { useAuthStore } from "../hooks/use-auth-store";

export function AuthSyncer() {
  const { data: me, isError, error } = useMeQuery();
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (me) {
      setUser(me);
    } else if (isError) {
      // If we get an error (e.g., 401), we should probably clear the local user state
      // But only if it's a specific auth error
      const status = (error as any)?.response?.status;
      if (status === 401 || status === 403) {
        logout();
      }
    }
  }, [me, isError, error, setUser, logout]);

  return null;
}
