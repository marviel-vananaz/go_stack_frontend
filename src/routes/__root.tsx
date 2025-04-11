import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth";
import { PetsClientProvider } from "@/lib/petsClient";
import { AuthTokenProvider } from "@/lib/useAuthToken";
import { CentrifugeClientProvider } from "@/lib/centrifugeClient";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthTokenProvider>
            <CentrifugeClientProvider>
              <PetsClientProvider>
                <Outlet />
              </PetsClientProvider>
            </CentrifugeClientProvider>
          </AuthTokenProvider>
        </AuthProvider>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
