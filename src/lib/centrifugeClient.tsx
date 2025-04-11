import { createContext, useState, useEffect } from "react";
import { Centrifuge } from "centrifuge";
import { useAuthToken } from "./useAuthToken.tsx";

const CentrifugeClientContext = createContext<Centrifuge | null>(null);

const CentrifugeClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = useAuthToken();
  const [client, setClient] = useState<Centrifuge | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setClient(null);
      return;
    }

    const centrifuge = new Centrifuge(import.meta.env.VITE_CENTRIFUGE_URL, {
      token: accessToken,
    });

    centrifuge.on("connected", function (ctx) {
      console.log("centrifuge Connected over " + ctx.transport);
    });

    centrifuge.connect();
    setClient(centrifuge);

    return () => {
      centrifuge.disconnect();
    };
  }, [accessToken]);

  return (
    <CentrifugeClientContext.Provider value={client}>
      {children}
    </CentrifugeClientContext.Provider>
  );
};

export { CentrifugeClientContext, CentrifugeClientProvider };
