"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  Avatar,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PublicIcon from "@mui/icons-material/Public";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const students = [
  { name: "Abdullah Rahman", country: "Egypt", flag: "🇪🇬", surah: "Al-Fatiha", color: "#047857", letter: "A" },
  { name: "Mariam Hassan", country: "UK", flag: "🇬🇧", surah: "Al-Baqarah", color: "#3b82f6", letter: "M" },
  { name: "Yusuf Al-Farsi", country: "UAE", flag: "🇦🇪", surah: "Al-Imran", color: "#f59e0b", letter: "Y" },
  { name: "Fatima Zahra", country: "Morocco", flag: "🇲🇦", surah: "An-Nisa", color: "#8b5cf6", letter: "F" },
  { name: "Omar Siddiqui", country: "USA", flag: "🇺🇸", surah: "Al-Maidah", color: "#ec4899", letter: "O" },
  { name: "Aisha Malik", country: "Pakistan", flag: "🇵🇰", surah: "Al-Anam", color: "#06b6d4", letter: "A" },
];

export default function StudentVideos() {
  const t = useTranslations("videos");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="videos"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
            : "linear-gradient(180deg, #f0fdf4 0%, #fafaf8 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label={t("badge")}
              sx={{
                mb: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(4,120,87,0.15)"
                    : "rgba(4,120,87,0.08)",
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}30`,
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "1.9rem", md: "2.5rem" } }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 520,
                mx: "auto",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {students.map((student, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[1],
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.01)",
                    boxShadow: theme.shadows[6],
                    "& .play-overlay": { opacity: 1 },
                    "& .play-icon": { transform: "scale(1.1)" },
                  },
                }}
              >
                {/* Video thumbnail */}
                <Box
                  sx={{
                    height: 180,
                    background: `linear-gradient(135deg, ${student.color}dd, ${student.color}88)`,
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
                      opacity: 0.06,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M20 0L25 5L20 10L15 5zM0 20L5 15L10 20L5 25zM40 20L35 15L30 20L35 25zM20 40L25 35L20 30L15 35z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: "rgba(255,255,255,0.25)",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.4)",
                    }}
                  >
                    {student.letter}
                  </Avatar>

                  {/* Play overlay */}
                  <Box
                    className="play-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <PlayCircleFilledIcon
                      className="play-icon"
                      sx={{
                        fontSize: 52,
                        color: "#fff",
                        transition: "transform 0.3s ease",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      }}
                    />
                  </Box>

                  {/* Surah badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "rgba(0,0,0,0.4)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    Surah {student.surah}
                  </Box>
                </Box>

                {/* Student info */}
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
                    {student.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <PublicIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                      {student.flag} {student.country}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
