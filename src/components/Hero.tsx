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
  Paper,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarIcon from "@mui/icons-material/Star";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const floatAnimate = {
  y: [0, -16, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const floatAnimate2 = {
  y: [0, 12, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 1,
  },
};

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

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 0 },
        pb: { xs: 8, md: 0 },
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
          background: `radial-gradient(circle, ${theme.palette.primary.main}18 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${theme.palette.secondary.main}18 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <Box>
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
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(4,120,87,0.2)"
                      : "rgba(4,120,87,0.08)",
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}40`,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  py: 2.5,
                  "& .MuiChip-icon": { color: theme.palette.primary.main },
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
                {t("headline").split(" ").slice(0, 4).join(" ")}{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("headline").split(" ").slice(4).join(" ")}
                </Box>
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
                sx={{ mb: 5 }}
                gap={2}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontSize: "1rem",
                    borderRadius: "10px",
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                  }}
                >
                  {t("ctaPrimary")}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<PlayCircleIcon sx={{ mx: 1 }} />}
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontSize: "1rem",
                    borderRadius: "10px",
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
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
                        ml: i > 0 ? -1.2 : 0,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      {s.letter}
                    </Avatar>
                  ))}
                </Box>
                <Box>
                  <Box sx={{ display: "flex", gap: 0.2, mb: 0.3 }}>
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
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {t("stat1")} · {t("stat2")} · {t("stat3")}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* Right — Mock Quran Class UI */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Main class card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <Paper
                elevation={8}
                sx={{
                  width: 420,
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {/* Video header */}
                <Box
                  sx={{
                    height: 220,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Pattern overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.08,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M20 0L25 5L20 10L15 5zM0 20L5 15L10 20L5 25zM40 20L35 15L30 20L35 25zM20 40L25 35L20 30L15 35z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  <Box sx={{ textAlign: "center", position: "relative" }}>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1.5,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <PlayCircleIcon sx={{ color: "#fff", fontSize: 40 }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}
                    >
                      Live Quran Session
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Surah Al-Baqarah · Verse 255
                    </Typography>
                  </Box>
                  {/* Live badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "#ef4444",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#fff",
                      }}
                    />
                    LIVE
                  </Box>
                </Box>

                {/* Session info */}
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
                          bgcolor: theme.palette.primary.main,
                          fontSize: "1.1rem",
                        }}
                      >
                        ش
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                          Sheikh Ahmad Al-Azhari
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Al-Azhar Certified · 12 yrs exp.
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label="In Session"
                      size="small"
                      sx={{
                        bgcolor: `${theme.palette.primary.main}18`,
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>

                  {/* Progress bar */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    Today&apos;s Progress
                  </Typography>
                  <Box
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: theme.palette.divider,
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: "68%",
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }}
                    />
                  </Box>

                  {/* Students row */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ display: "flex" }}>
                      {MOCK_STUDENTS.slice(0, 3).map((s, i) => (
                        <Avatar
                          key={i}
                          sx={{
                            width: 26,
                            height: 26,
                            bgcolor: s.color,
                            border: `2px solid ${theme.palette.background.paper}`,
                            ml: i > 0 ? -0.8 : 0,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                          }}
                        >
                          {s.letter}
                        </Avatar>
                      ))}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      +24 students attending
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              animate={floatAnimate}
              style={{
                position: "absolute",
                top: "8%",
                [isRtl ? "right" : "left"]: "-5%",
                zIndex: 3,
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  minWidth: 160,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: `${theme.palette.primary.main}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SchoolIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    5,000+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Active students
                  </Typography>
                </Box>
              </Paper>
            </motion.div>

            <motion.div
              animate={floatAnimate2}
              style={{
                position: "absolute",
                bottom: "12%",
                [isRtl ? "left" : "right"]: "-5%",
                zIndex: 3,
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  minWidth: 180,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: `${theme.palette.secondary.main}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AutoStoriesIcon
                    sx={{ color: theme.palette.secondary.main, fontSize: 20 }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: "flex", gap: 0.2, mb: 0.2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          fontSize: 11,
                          color: theme.palette.secondary.main,
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    4.9 avg. rating
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
