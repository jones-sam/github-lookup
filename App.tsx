import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./Search";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
}
