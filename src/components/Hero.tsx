"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VideocamIcon from "@mui/icons-material/Videocam";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { RADIUS } from "@/theme/spacing";

export default function Hero() {
  const t = useTranslations("hero");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Box
      id="home"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 12 },
        pb: { xs: 2, md: 3 },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0a0f0d 0%, #0d1f18 100%)"
            : "#ffffff",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Main Hero Content - Two Columns */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "center",
            flex: 1,
            direction: isRtl ? "rtl" : "ltr",
          }}
        >
          {/* Left Card - Text Content with Islamic Pattern */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "28px",
                overflow: "hidden",
                height: "fit-content",
                maxWidth: { md: 460 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 3, md: 4 },
                py: { xs: 3.5, md: 4 },
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(11, 58, 37, 0.96) 0%, rgba(10, 48, 33, 0.98) 60%, rgba(8, 36, 25, 1) 100%)"
                    : "linear-gradient(145deg, rgba(13, 94, 62, 0.96) 0%, rgba(9, 72, 49, 1) 100%)",
                border: `1px solid ${theme.palette.mode === "dark" ? "rgba(32, 157, 111, 0.2)" : "rgba(255,255,255,0.12)"}`,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 24px 60px rgba(0, 0, 0, 0.35)"
                    : "0 24px 60px rgba(3, 43, 26, 0.15)",
              }}
            >
              {/* Islamic geometric pattern overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.07,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M30 0L37.5 7.5L30 15L22.5 7.5Z'/%3E%3Cpath d='M0 30L7.5 22.5L15 30L7.5 37.5Z'/%3E%3Cpath d='M60 30L52.5 22.5L45 30L52.5 37.5Z'/%3E%3Cpath d='M30 60L37.5 52.5L30 45L22.5 52.5Z'/%3E%3Cpath d='M15 15L22.5 7.5L30 15L22.5 22.5Z'/%3E%3Cpath d='M45 15L52.5 7.5L60 15L52.5 22.5Z'/%3E%3Cpath d='M15 45L22.5 52.5L30 45L22.5 37.5Z'/%3E%3Cpath d='M45 45L52.5 52.5L60 45L52.5 37.5Z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                  pointerEvents: "none",
                }}
              />

              {/* Gold side accent */}
              <Box
                sx={{
                  position: "absolute",
                  insetBlock: 0,
                  [isRtl ? "right" : "left"]: 0,
                  width: { xs: 5, md: 6 },
                  background: "linear-gradient(180deg, rgba(212,165,40,0.5) 0%, rgba(212,165,40,0.05) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <Box sx={{ position: "relative", zIndex: 1 }}>
                {/* Arabic Title */}
                <Typography
                  sx={{
                    fontSize: { xs: "3.2rem", md: "4.2rem" },
                    fontWeight: 800,
                    color: "#f8faf7",
                    lineHeight: 1.1,
                    mb: 1,
                    fontFamily: "'Amiri', serif",
                    textShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  {t("titleAr")}
                </Typography>

                {/* English Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                    mb: 2.5,
                    fontSize: { xs: "1.3rem", md: "1.6rem" },
                  }}
                >
                  {t("titleEn")}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    color: "rgba(232, 242, 235, 0.8)",
                    mb: 3.5,
                    lineHeight: 1.75,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    maxWidth: 400,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: "#d4a528",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      lineHeight: 1.2,
                    }}
                  >
                    +
                  </Box>
                  {t("subheadline")}
                </Typography>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.7,
                    fontSize: "1rem",
                    fontWeight: 700,
                    borderRadius: RADIUS.medium,
                    background:
                      "linear-gradient(135deg, #b8860b 0%, #d4a528 50%, #c49b1a 100%)",
                    color: "#fff",
                    boxShadow: "0 10px 28px rgba(184,134,11,0.35)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #a0750a 0%, #c49b1a 50%, #b8860b 100%)",
                      boxShadow: "0 12px 32px rgba(184,134,11,0.45)",
                    },
                  }}
                >
                  {t("ctaPrimary")}
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Box
              sx={{
                position: "relative",
                height: { xs: 280, md: 400 },
                maxWidth: { md: 480 },
                mx: "auto",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/hero-kidsss.png"
                alt="Children learning Quran"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "center bottom",
                }}
                priority
              />
            </Box>
          </motion.div>
        </Box>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: { xs: 2, md: 2 },
              mt: "auto",
              pt: 2.5,
              pb: 1,
              borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : theme.palette.divider}`,
            }}
          >
            {/* Features */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ flexWrap: "wrap", gap: 1.5 }}
            >
              {[
                { icon: <VideocamIcon sx={{ fontSize: 18 }} />, label: t("liveClasses") },
                { icon: <SchoolIcon sx={{ fontSize: 18 }} />, label: t("expertTutors") },
                { icon: <AccessTimeIcon sx={{ fontSize: 18 }} />, label: t("flexibleSchedule") },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: "999px",
                    background: theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(4,120,87,0.05)",
                    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(4,120,87,0.08)"}`,
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: "0.82rem" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box>
                <Box sx={{ display: "flex", gap: 0.3, justifyContent: "flex-end", mb: 0.3 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 15, color: "#f59e0b" }} />
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                >
                  {t("ratingText")}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  fontWeight: 800,
                  lineHeight: 1,
                  color: theme.palette.primary.main,
                }}
              >
                5.0
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
