import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@/providers/chakra-ui/chakra-ui.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a custom render function that includes providers
// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything except render
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// Override render method
export { customRender as render };
