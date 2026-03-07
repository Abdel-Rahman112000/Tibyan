"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  Button,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function Programs() {
  const t = useTranslations("programs");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const programs = [
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 32 }} />,
      title: t("memorization.title"),
      subtitle: t("memorization.subtitle"),
      desc: t("memorization.desc"),
      features: (t.raw("memorization.features") as string[]),
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      featured: false,
    },
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 32 }} />,
      title: t("tajweed.title"),
      subtitle: t("tajweed.subtitle"),
      desc: t("tajweed.desc"),
      features: (t.raw("tajweed.features") as string[]),
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #b45309, #f59e0b)",
      featured: true,
    },
    {
      icon: <ChildCareIcon sx={{ fontSize: 32 }} />,
      title: t("quranForKids.title"),
      subtitle: t("quranForKids.subtitle"),
      desc: t("quranForKids.desc"),
      features: (t.raw("quranForKids.features") as string[]),
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
      featured: false,
    },
  ];

  return (
    <Box
      id="programs"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            : "linear-gradient(180deg, #fafaf8 0%, #f0fdf4 100%)",
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
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "1.9rem", md: "2.5rem" },
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 560,
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
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: theme.palette.background.paper,
                  border: program.featured
                    ? `2px solid ${program.color}60`
                    : `1px solid ${theme.palette.divider}`,
                  boxShadow: program.featured ? theme.shadows[5] : theme.shadows[1],
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[7],
                  },
                }}
              >
                {program.featured && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      [isRtl ? "left" : "right"]: 16,
                      background: program.gradient,
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "8px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    ★ Popular
                  </Box>
                )}

                {/* Card header */}
                <Box
                  sx={{
                    p: 3,
                    background: program.gradient,
                    color: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "14px",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {program.icon}
                  </Box>
                  <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {program.subtitle}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, lineHeight: 1.3 }}>
                    {program.title}
                  </Typography>
                </Box>

                {/* Card body */}
                <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      mb: 3,
                    }}
                  >
                    {program.desc}
                  </Typography>

                  <Box sx={{ flex: 1, mb: 3 }}>
                    {program.features.map((feature, fi) => (
                      <Box
                        key={fi}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: program.color, flexShrink: 0 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, lineHeight: 1.5 }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant={program.featured ? "contained" : "outlined"}
                    fullWidth
                    endIcon={<ArrowForwardIcon sx={{ transform: isRtl ? "rotate(180deg)" : "none" }} />}
                    sx={
                      program.featured
                        ? {
                            background: program.gradient,
                            color: "#fff",
                            border: "none",
                            "&:hover": { opacity: 0.9 },
                          }
                        : {
                            borderColor: program.color,
                            color: program.color,
                            "&:hover": {
                              borderColor: program.color,
                              bgcolor: `${program.color}10`,
                            },
                          }
                    }
                  >
                    {t("learnMore")}
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
