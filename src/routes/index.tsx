import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { PetsClientContext } from "@/lib/petsClient";
import { AuthContext } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const auth = useContext(AuthContext);
  const client = useContext(PetsClientContext);
  const query = useQuery({
    queryKey: ["pets", client],
    queryFn: () => client?.GET("/pet"),
    enabled: () => !!client,
  });

  // Add state for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth?.login(username, password);
    },
    [username, password],
  );

  const onLogout = useCallback(() => {
    auth?.logout();
  }, []);

  const onGoogleLogin = useCallback(() => {
    auth?.googleLogin();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {!auth?.user ? (
          //Login Form
          <form
            onSubmit={onLogin}
            className="flex flex-col gap-4 max-w-sm mx-auto p-6 border rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border rounded"
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onGoogleLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </form>
        ) : (
          //List of Pets View
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-2xl font-semibold">Pet List</h2>
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              {query.isSuccess ? (
                <div className="divide-y">
                  <div className="grid grid-cols-3 gap-4 font-semibold pb-2">
                    <div>ID</div>
                    <div>Name</div>
                    <div>Status</div>
                  </div>
                  {query.data?.data?.map((pet) => (
                    <div key={pet.id} className="grid grid-cols-3 gap-4 py-3">
                      <div className="text-gray-600">{pet.id}</div>
                      <div>{pet.name}</div>
                      <div>
                        <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                          {pet.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : query.isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : (
                <div className="text-red-500">Error loading pets</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
