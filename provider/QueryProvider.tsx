"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: any) => {
  return (
    <QueryClientProvider client={QueryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
