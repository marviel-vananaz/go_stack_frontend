import type { Client, Middleware } from "openapi-fetch";
import { createContext, useMemo } from "react";
import type { paths } from "./api/petstore";
import createClient from "openapi-fetch";
import { useAuthToken } from "./useAuthToken.tsx";

const PetsClientContext = createContext<Client<paths> | null>(null);

const PetsClientProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthToken();

  const client = useMemo(() => {
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
