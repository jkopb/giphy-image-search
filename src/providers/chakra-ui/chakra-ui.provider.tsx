"use client";

import {
  ChakraProvider as ChakraProviderOriginal,
  defaultSystem,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProviderOriginal value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProviderOriginal>
  );
}
