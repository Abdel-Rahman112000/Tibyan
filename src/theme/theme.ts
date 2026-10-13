import { createTheme, type Theme } from "@mui/material/styles";

// Re-export spacing constants for convenience
export {
  SECTION_PADDING,
  SECTION_HEADER_MB,
  GRID_GAP,
  CARD_PADDING,
  RADIUS,
} from "./spacing";

export const getTheme = (mode: "light" | "dark", direction: "ltr" | "rtl" = "ltr"): Theme =>
  createTheme({
    direction,
    // Custom spacing scale (1 unit = 8px by default)
    spacing: 8,
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#124536" : "#8bcca6",
        light: mode === "light" ? "#367b60" : "#b9e1c4",
        dark: "#0b342d",
        contrastText: mode === "light" ? "#ffffff" : "#102d25",
      },
      secondary: {
        main: "#d5a85f",
        light: "#f0ce90",
        dark: "#a97634",
        contrastText: "#173b34",
      },
      background: {
        default: mode === "light" ? "#f7f5ef" : "#0d1714",
        paper: mode === "light" ? "#fffefa" : "#15251f",
      },
      text: {
        primary: mode === "light" ? "#173b34" : "#f0f4ed",
        secondary: mode === "light" ? "#63766b" : "#afc0b5",
      },
      divider: mode === "light" ? "#dce4d9" : "#30493c",
    },
    typography: {
      fontFamily: direction === "rtl" ? "var(--font-cairo), sans-serif" : "var(--font-inter), sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 },
      h2: { fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 },
      h3: { fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 },
      h4: { fontWeight: 600, lineHeight: 1.3 },
      h5: { fontWeight: 600, lineHeight: 1.3 },
      h6: { fontWeight: 600, lineHeight: 1.4 },
      body1: { lineHeight: 1.7 },
      body2: { lineHeight: 1.7 },
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
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          "*::-webkit-scrollbar": { width: 7 },
          "*::-webkit-scrollbar-thumb": { backgroundColor: mode === "light" ? "#8aa99a" : "#456557", borderRadius: 5 },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: "0.95rem",
          },
          containedPrimary: ({ theme }) => ({
            boxShadow: `0 4px 14px ${theme.palette.action.hover}`,
            "&:hover": {
              backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.dark : theme.palette.primary.light,
              boxShadow: `0 6px 20px ${theme.palette.action.selected}`,
            },
          }),
          outlinedPrimary: ({ theme }) => ({
            borderColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
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
