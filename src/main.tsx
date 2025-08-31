import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@/providers/chakra-ui/chakra-ui.provider.tsx";
import { TanstackQueryProvider } from "@/providers/tanstack-query/tanstack-query.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </TanstackQueryProvider>
  </StrictMode>
);
