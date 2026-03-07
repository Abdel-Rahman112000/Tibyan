"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeRegistry from "@/theme/ThemeRegistry";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ThemeRegistry>{children}</ThemeRegistry>
    </NextThemesProvider>
  );
}
