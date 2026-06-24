"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { RADIUS } from "@/theme/spacing";

export default function Hero() {
  const t = useTranslations("hero");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const isDark = theme.palette.mode === "dark";
  const textAlign = isRtl ? "right" : "left";

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
        background: isDark
          ? `radial-gradient(circle at 18% 38%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 26%), radial-gradient(circle at 48% 88%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 28%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          : `radial-gradient(circle at 18% 38%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 24%), radial-gradient(circle at 48% 88%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 28%), linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      {/* Ambient glow */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -120, md: -140 },
          [isRtl ? "left" : "right"]: { xs: -110, md: -70 },
          width: { xs: 340, md: 520 },
          height: { xs: 340, md: 520 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, isDark ? 0.12 : 0.07)} 0%, transparent 70%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: -70, md: -90 },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: 440, md: 880 },
          height: { xs: 240, md: 360 },
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${alpha(theme.palette.secondary.main, isDark ? 0.14 : 0.08)} 0%, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Three-column layout: Family | Ornament | Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr 1.4fr" },
            alignItems: "center",
            flex: 1,
            direction: isRtl ? "rtl" : "ltr",
          }}
        >
          {" "}
          {/* RIGHT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Box
              sx={{
                maxWidth: { md: 480 },
                mx: { xs: "auto", md: 0 },
                [isRtl ? "mr" : "ml"]: { md: "auto" },
                textAlign,
              }}
            >
              {/* Trust Badge */}
              <Chip
                icon={
                  <AutoAwesomeIcon
                    sx={{
                      fontSize: 16,
                      color: `${theme.palette.secondary.main} !important`,
                    }}
                  />
                }
                label={t("badge")}
                sx={{
                  mb: 2.5,
                  px: 1,
                  py: 2.5,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "999px",
                  background: alpha(
                    theme.palette.secondary.main,
                    isDark ? 0.08 : 0.06,
                  ),
                  border: `1px solid ${alpha(theme.palette.secondary.main, isDark ? 0.2 : 0.15)}`,
                  color: isDark
                    ? theme.palette.secondary.light
                    : theme.palette.secondary.dark,
                  boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.08)}`,
                  "& .MuiChip-icon": {
                    ml: isRtl ? 0 : 0.5,
                    mr: isRtl ? 0.5 : 0,
                  },
                }}
              />

              {/* Arabic Title */}
              <Typography
                sx={{
                  fontSize: { xs: "3rem", sm: "3.6rem", md: "4.2rem" },
                  fontWeight: 800,
                  lineHeight: 0.95,
                  mb: 0.8,
                  fontFamily: "'Amiri', serif",
                  background: isDark
                    ? `linear-gradient(135deg, ${theme.palette.primary.contrastText} 0%, ${theme.palette.primary.light} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("titleAr")}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 1.5,
                  fontSize: { xs: "1.1rem", md: "1.35rem" },
                }}
              >
                {t("titleEn")}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  lineHeight: 1.75,
                  fontSize: { xs: "0.9rem", md: "0.95rem" },
                  maxWidth: 440,
                }}
              >
                {t("subheadline")}
              </Typography>

              {/* CTA Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: { xs: 3.5, md: 4 },
                    py: 1.4,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: RADIUS.medium,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
                    color: theme.palette.primary.contrastText,
                    boxShadow: `0 10px 28px ${alpha(theme.palette.primary.main, 0.3)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main} 100%)`,
                      boxShadow: `0 14px 36px ${alpha(theme.palette.primary.main, 0.4)}`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {t("ctaPrimary")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: { xs: 3, md: 3.5 },
                    py: 1.4,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: RADIUS.medium,
                    borderColor: alpha(
                      theme.palette.primary.light,
                      isDark ? 0.3 : 0.4,
                    ),
                    color: isDark
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                    "&:hover": {
                      borderColor: alpha(
                        theme.palette.primary.light,
                        isDark ? 0.5 : 0.6,
                      ),
                      background: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  {t("ctaSecondary")}
                </Button>
              </Stack>

              {/* Stats Row */}
              <Stack
                direction="row"
                spacing={{ xs: 2, md: 3 }}
                divider={
                  <Box
                    sx={{
                      width: "1px",
                      height: 32,
                      background: theme.palette.divider,
                      alignSelf: "center",
                    }}
                  />
                }
                sx={{
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                {[
                  {
                    icon: <GroupsIcon sx={{ fontSize: 20 }} />,
                    value: "+5000",
                    label: t("stat1"),
                  },
                  {
                    icon: <PublicIcon sx={{ fontSize: 20 }} />,
                    value: "+50",
                    label: t("stat2"),
                  },
                  {
                    icon: <SchoolIcon sx={{ fontSize: 20 }} />,
                    value: "+200",
                    label: t("stat3"),
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <Box sx={{ textAlign }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isRtl ? "flex-end" : "flex-start",
                          gap: 0.8,
                          mb: 0.3,
                        }}
                      >
                        <Box
                          sx={{
                            color: theme.palette.primary.main,
                            display: "flex",
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "1.2rem", md: "1.4rem" },
                            fontWeight: 800,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          fontSize: "0.72rem",
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </motion.div>
          {/* CENTER: Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 200, md: "100%" },
                height: { xs: 300, md: "100%" },
                maxWidth: { md: 600 },
              }}
            >
              <Image
                src="/images/center-image.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </motion.div>
          {/* LEFT: Family Image */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 320, md: "80%" },
                [isRtl ? "ml" : "mr"]: { md: -3 },
              }}
            >
              <Image
                src="/images/image-family.png"
                alt="Children learning Quran"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: isRtl ? "right bottom" : "left bottom",
                }}
                priority
              />
            </Box>
          </motion.div>
        </Box>

        {/* Bottom Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mt: "auto",
              pt: 2,
            }}
          >
            {[
              {
                icon: <VideocamIcon sx={{ fontSize: 18 }} />,
                label: t("liveClasses"),
              },
              {
                icon: <SchoolIcon sx={{ fontSize: 18 }} />,
                label: t("expertTutors"),
              },
              {
                icon: <AccessTimeIcon sx={{ fontSize: 18 }} />,
                label: t("flexibleSchedule"),
              },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "999px",
                  background: alpha(
                    theme.palette.primary.main,
                    isDark ? 0.04 : 0.05,
                  ),
                  border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.1)}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: alpha(
                      theme.palette.primary.main,
                      isDark ? 0.08 : 0.08,
                    ),
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Box
                  sx={{ color: theme.palette.primary.main, display: "flex" }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontSize: "0.85rem",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
