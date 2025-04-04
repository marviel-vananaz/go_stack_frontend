import type { Client, Middleware } from "openapi-fetch";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { paths } from "./api/petstore";
import { AuthContext } from "./auth";
import createClient from "openapi-fetch";

const PetsClientContext = createContext<Client<paths> | null>(null);

const PetsClientProvider = ({ children }: { children: React.ReactNode }) => {
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

  let client = useMemo(() => {
    if (!accessToken) {
      return null;
    }

    const authMiddleware: Middleware = {
      async onRequest({ request }) {
        request.headers.set("Authorization", `Bearer ${accessToken}`);
        return request;
      },
    };

    const client = createClient<paths>({
      baseUrl: import.meta.env.VITE_BASE_URL,
    });

    client.use(authMiddleware);

    return client;
  }, [accessToken]);

  return (
    <PetsClientContext.Provider value={client}>
      {children}
    </PetsClientContext.Provider>
  );
};

export { PetsClientContext, PetsClientProvider };
