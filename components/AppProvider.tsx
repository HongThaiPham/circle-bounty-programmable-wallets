"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CircleClientProvider from "./CircleClientProvider";
const queryClient = new QueryClient();
const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CircleClientProvider>{children}</CircleClientProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
