"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  useTheme,
  Avatar,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { alpha } from "@mui/material/styles";
import Link from "next/link";
import { GRID_GAP, RADIUS, SECTION_PADDING } from "@/theme/spacing";

const AVATAR_COLORS = ["#047857", "#059669", "#0f9f6e", "#34d399"];

const MOCK_STUDENTS = [
  { color: AVATAR_COLORS[0], letter: "A" },
  { color: AVATAR_COLORS[1], letter: "M" },
  { color: AVATAR_COLORS[2], letter: "F" },
  { color: AVATAR_COLORS[3], letter: "S" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const headline = t("headline");
  const headlineWords = headline.split(" ");
  const hasHighlightChunk = headlineWords.length > 4;
  const headlineLead = hasHighlightChunk
    ? headlineWords.slice(0, 4).join(" ")
    : headline;
  const headlineHighlight = hasHighlightChunk
    ? headlineWords.slice(4).join(" ")
    : "";
  const stats = [t("stat1"), t("stat2"), t("stat3")];

  return (
    <Box
      id="home"
      sx={{
        minHeight: { xs: "100vh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: SECTION_PADDING.xs + 2, md: SECTION_PADDING.md },
        pb: { xs: SECTION_PADDING.xs, md: SECTION_PADDING.md },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0a0f0d 0%, #0d1f18 50%, #0a0f0d 100%)"
            : "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fafaf8 100%)",
      }}
    >
      {/* Islamic geometric background pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: theme.palette.mode === "dark" ? 0.03 : 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23047857' fill-opacity='1'%3E%3Cpath d='M40 0L50 10L40 20L30 10zM0 40L10 30L20 40L10 50zM80 40L70 30L60 40L70 50zM40 80L50 70L40 60L30 70zM20 20L30 10L40 20L30 30zM60 20L70 10L80 20L70 30zM20 60L30 70L40 60L30 50zM60 60L70 70L80 60L70 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          [isRtl ? "left" : "right"]: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          [isRtl ? "right" : "left"]: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.16)} 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: { xs: GRID_GAP.xs + 1, md: GRID_GAP.md + 1 },
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              maxWidth: 860,
              mx: "auto",
              textAlign: "center",
              px: { xs: 1, md: 2 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Chip
                label={t("badge")}
                icon={<VerifiedIcon sx={{ fontSize: "14px !important" }} />}
                sx={{
                  mb: 3,
                  background: alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === "dark" ? 0.24 : 0.1,
                  ),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  py: 2.5,
                  "& .MuiChip-icon": {
                    color: theme.palette.primary.main,
                    mr: isRtl ? 0.4 : 0.7,
                    ml: isRtl ? 0.7 : 0.4,
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.4rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "3.8rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 3,
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.03em",
                }}
              >
                {headlineLead}
                {headlineHighlight ? " " : ""}
                {headlineHighlight ? (
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {headlineHighlight}
                  </Box>
                ) : null}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: 540,
                  mx: "auto",
                }}
              >
                {t("subheadline")}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 4, justifyContent: "center", alignItems: "center" }}
                gap={2}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  href={`/${locale}/auth/register`}
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontSize: "1rem",
                    borderRadius: RADIUS.medium,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.28)}`,
                  }}
                >
                  {t("ctaPrimary")}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<PlayCircleIcon />}
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontSize: "1rem",
                    borderRadius: RADIUS.medium,
                    "& .MuiButton-startIcon": {
                      mr: isRtl ? 0.25 : 1,
                      ml: isRtl ? 1 : 0.25,
                    },
                  }}
                >
                  {t("ctaSecondary")}
                </Button>
              </Stack>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2.5,
                  pt: 2,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {MOCK_STUDENTS.map((s, i) => (
                    <Avatar
                      key={i}
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: s.color,
                        border: `2px solid ${theme.palette.background.default}`,
                        [isRtl ? "mr" : "ml"]: i > 0 ? -0.75 : 0,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      {s.letter}
                    </Avatar>
                  ))}
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      mb: 0.8,
                      justifyContent: "center",
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          fontSize: 14,
                          color: theme.palette.secondary.main,
                        }}
                      />
                    ))}
                  </Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {stats.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          color: theme.palette.text.secondary,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
