"use client";

import * as React from "react";
import { Box, Container, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { SECTION_PADDING } from "@/theme/spacing";

type ContainerWidth = "sm" | "md" | "lg" | "xl" | false;

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  maxWidth?: ContainerWidth;
  background?: "default" | "paper" | "gradient" | "gradient-reverse" | "none";
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  animate?: boolean;
  decorativeOrb?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  maxWidth = "lg",
  background = "default",
  sx,
  containerSx,
  animate = true,
  decorativeOrb = false,
}: SectionWrapperProps) {
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const getBackground = () => {
    switch (background) {
      case "paper":
        return theme.palette.background.paper;
      case "gradient":
        return theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          : "linear-gradient(180deg, #fafaf8 0%, #f0fdf4 100%)";
      case "gradient-reverse":
        return theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          : "linear-gradient(180deg, #f0fdf4 0%, #fafaf8 100%)";
      case "none":
        return "transparent";
      default:
        return theme.palette.background.default;
    }
  };

  const content = (
    <Container maxWidth={maxWidth} sx={{ position: "relative", ...containerSx }}>
      {children}
    </Container>
  );

  return (
    <Box
      id={id}
      ref={ref}
      component="section"
      sx={{
        py: { xs: SECTION_PADDING.xs, md: SECTION_PADDING.md },
        background: getBackground(),
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      {decorativeOrb && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.palette.primary.main}06 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {animate ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </Box>
  );
}

// Export the ref-based in-view hook for child components
export { useInView } from "framer-motion";
