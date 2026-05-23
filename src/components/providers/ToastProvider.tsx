"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

export default function ToastProvider() {
  const theme = useTheme();

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          fontSize: "0.9rem",
          fontWeight: 500,
          padding: "12px 16px",
          boxShadow: theme.shadows[4],
        },
        success: {
          iconTheme: {
            primary: theme.palette.primary.main,
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
