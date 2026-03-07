"use client";

import * as React from "react";
import { Box, Container, Typography, useTheme, Chip } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const iconMap = [
  <TrackChangesIcon key="mission" />,
  <VisibilityIcon key="vision" />,
  <MenuBookIcon key="method" />,
];

const colorMap = ["#047857", "#3b82f6", "#f59e0b"];

export default function About() {
  const t = useTranslations("about");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cards = [
    { title: t("mission.title"), desc: t("mission.desc") },
    { title: t("vision.title"), desc: t("vision.desc") },
    { title: t("method.title"), desc: t("method.desc") },
  ];

  return (
    <Box
      id="about"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <Box>
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
                  fontSize: "0.8rem",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2.5,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                {t("title")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  mb: 4,
                  maxWidth: 500,
                }}
              >
                {t("subtitle")}
              </Typography>

              {/* Decorative Arabic text */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(4,120,87,0.08)"
                      : "rgba(4,120,87,0.05)",
                  border: `1px solid ${theme.palette.primary.main}20`,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cairo', serif",
                    fontSize: "1.6rem",
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    mb: 0.5,
                    lineHeight: 1.6,
                  }}
                >
                  ﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, fontStyle: "italic" }}
                >
                  &ldquo;And recite the Quran with measured recitation.&rdquo; — Al-Muzzammil 73:4
                </Typography>
              </Box>
            </motion.div>
          </Box>

          {/* Right — Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    gap: 2.5,
                    alignItems: "flex-start",
                    boxShadow: theme.shadows[1],
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                      borderColor: `${colorMap[i]}40`,
                    },
                    cursor: "default",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      bgcolor: `${colorMap[i]}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      "& svg": { color: colorMap[i], fontSize: 24 },
                    }}
                  >
                    {iconMap[i]}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}
                    >
                      {card.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
