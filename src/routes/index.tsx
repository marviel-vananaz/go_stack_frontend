import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import createClient from "openapi-fetch";
import type { paths } from "@/lib/api/petstore";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  let client = useMemo(
    () => createClient<paths>({ baseUrl: "http://localhost:8080/" }),
    [],
  );

  const query = useQuery({
    queryKey: ["pets"],
    queryFn: () => client.GET("/pet"),
  });
  return (
    <div className="text-center">
      <Button>Login</Button>
      {query.isSuccess ? (
        <span>{query.data.data?.map((data) => data.name).join(", ")}</span>
      ) : (
        <span>Error!</span>
      )}
    </div>
  );
}
