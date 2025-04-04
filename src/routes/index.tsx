import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
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

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth?.login(username, password);
  };

  const onLogout = () => {
    auth?.logout();
  };

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
