import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";

const AuthTokenContext = createContext<string | null>(null);

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (auth?.user) {
        const token = await auth.user.getIdToken();
        setAccessToken(token);
      } else {
        setAccessToken(null);
      }
    };

    getToken();
  }, [auth?.user]);

  return (
    <AuthTokenContext.Provider value={accessToken}>
      {children}
    </AuthTokenContext.Provider>
  );
}

export function useAuthToken() {
  const token = useContext(AuthTokenContext);
  if (token === undefined) {
    throw new Error("useAuthToken must be used within an AuthTokenProvider");
  }
  return token;
} 