"use client";

import * as React from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { SECTION_HEADER_MB, TITLE_MB } from "@/theme/spacing";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number | string;
  animate?: boolean;
  sx?: SxProps<Theme>;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  maxWidth = 560,
  animate = true,
  sx,
}: SectionHeaderProps) {
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const content = (
    <Box
      ref={ref}
      sx={{
        textAlign: align,
        mb: { xs: SECTION_HEADER_MB.xs, md: SECTION_HEADER_MB.md },
        ...sx,
      }}
    >
      {badge && (
        <Chip
          label={badge}
          sx={{
            mb: 2,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(4,120,87,0.15)"
                : "rgba(4,120,87,0.08)",
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}30`,
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        />
      )}

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: TITLE_MB,
          fontSize: { xs: "1.9rem", md: "2.5rem" },
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: align === "center" ? maxWidth : "none",
            mx: align === "center" ? "auto" : 0,
            fontSize: "1.05rem",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
}
