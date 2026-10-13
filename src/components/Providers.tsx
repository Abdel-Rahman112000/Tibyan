"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeRegistry from "@/theme/ThemeRegistry";
import QueryProvider from "@/components/providers/QueryProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import { SocialAuthProvider } from "@/components/providers/SocialAuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <QueryProvider>
        <SocialAuthProvider>
          <ThemeRegistry>
            {children}
            <ToastProvider />
          </ThemeRegistry>
        </SocialAuthProvider>
      </QueryProvider>
    </NextThemesProvider>
  );
}
