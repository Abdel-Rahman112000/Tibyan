import { createTheme, type Theme } from "@mui/material/styles";

const emerald = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
};

const gold = {
  100: "#fef9e7",
  200: "#fef3c7",
  300: "#fde68a",
  400: "#fcd34d",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
};

export const getTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: emerald[700],
        light: emerald[500],
        dark: emerald[900],
        contrastText: "#ffffff",
      },
      secondary: {
        main: gold[500],
        light: gold[300],
        dark: gold[700],
        contrastText: "#000000",
      },
      background: {
        default: mode === "light" ? "#fafaf8" : "#0a0f0d",
        paper: mode === "light" ? "#ffffff" : "#111a14",
      },
      text: {
        primary: mode === "light" ? "#111827" : "#f9fafb",
        secondary: mode === "light" ? "#4b5563" : "#9ca3af",
      },
      divider: mode === "light" ? "#e5e7eb" : "#1f2d24",
    },
    typography: {
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.01em" },
      h3: { fontWeight: 700, letterSpacing: "-0.01em" },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    shadows: [
      "none",
      mode === "light"
        ? "0 1px 3px rgba(0,0,0,0.08)"
        : "0 1px 3px rgba(0,0,0,0.4)",
      mode === "light"
        ? "0 2px 8px rgba(0,0,0,0.08)"
        : "0 2px 8px rgba(0,0,0,0.4)",
      mode === "light"
        ? "0 4px 16px rgba(0,0,0,0.08)"
        : "0 4px 16px rgba(0,0,0,0.4)",
      mode === "light"
        ? "0 8px 32px rgba(4,120,87,0.10)"
        : "0 8px 32px rgba(0,0,0,0.5)",
      mode === "light"
        ? "0 12px 40px rgba(4,120,87,0.12)"
        : "0 12px 40px rgba(0,0,0,0.55)",
      mode === "light"
        ? "0 16px 48px rgba(4,120,87,0.14)"
        : "0 16px 48px rgba(0,0,0,0.6)",
      mode === "light"
        ? "0 20px 60px rgba(4,120,87,0.16)"
        : "0 20px 60px rgba(0,0,0,0.65)",
      mode === "light"
        ? "0 24px 72px rgba(4,120,87,0.18)"
        : "0 24px 72px rgba(0,0,0,0.7)",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
      "0 0 0 transparent",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: "0.95rem",
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${emerald[700]}, ${emerald[600]})`,
            boxShadow: `0 4px 14px rgba(4,120,87,0.35)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${emerald[800]}, ${emerald[700]})`,
              boxShadow: `0 6px 20px rgba(4,120,87,0.45)`,
            },
          },
          outlinedPrimary: {
            borderColor: emerald[700],
            "&:hover": {
              backgroundColor: `${emerald[50]}80`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6 },
        },
      },
    },
  });
