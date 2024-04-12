"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0,
          },
        },
      })
  );

  const [isDehydration, setIsDehydration] = useState(false);

  useEffect(() => {
    setIsDehydration(true);
  }, []);

  if (isDehydration)
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
