"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme as useNextTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getTheme } from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useNextTheme();
  const locale = useLocale();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const direction = locale === "ar" ? "rtl" : "ltr";
  const theme = getTheme(mode, direction, locale);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
