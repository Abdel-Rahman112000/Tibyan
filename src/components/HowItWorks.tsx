"use client";

import * as React from "react";
import { Box, Container, Typography, useTheme, Chip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      number: "01",
      icon: <PersonAddIcon sx={{ fontSize: 32 }} />,
      title: t("step1.title"),
      desc: t("step1.desc"),
      color: theme.palette.primary.main,
    },
    {
      number: "02",
      icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
      title: t("step2.title"),
      desc: t("step2.desc"),
      color: "#3b82f6",
    },
    {
      number: "03",
      icon: <PlayCircleFilledIcon sx={{ fontSize: 32 }} />,
      title: t("step3.title"),
      desc: t("step3.desc"),
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box
      id="how-it-works"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
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

      <Container maxWidth="lg" sx={{ position: "relative" }}>
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
                maxWidth: 500,
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
            gap: 4,
            position: "relative",
          }}
        >
          {/* Connector line (desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 52,
              left: "16.5%",
              right: "16.5%",
              height: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}40, #3b82f640, ${theme.palette.secondary.main}40)`,
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                  p: { xs: 3, md: 4 },
                  borderRadius: "20px",
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[1],
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[5],
                    borderColor: `${step.color}40`,
                  },
                }}
              >
                {/* Step number badge */}
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: `0 8px 20px ${step.color}40`,
                    color: "#fff",
                  }}
                >
                  {step.icon}
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: step.color,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    fontSize: "0.7rem",
                    display: "block",
                    mb: 1,
                  }}
                >
                  STEP {step.number}
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
                  {step.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
