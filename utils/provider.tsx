// In /app/providers.tsx
"use client";
import { ProgressProvider } from "@bprogress/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="2px"
        color="#18A0FB"
        options={{ showSpinner: true }}
        shallowRouting
      >
        <JotaiProvider>{children}</JotaiProvider>
      </ProgressProvider>
    </QueryClientProvider>
  );
};
