"use client";

import * as React from "react";
import { Box, Container, Typography, useTheme, Chip, Button, Stack } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { SECTION_PADDING, RADIUS } from "@/theme/spacing";

export default function CTA() {
  const t = useTranslations("cta");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="contact"
      ref={ref}
      component="section"
      sx={{
        py: { xs: SECTION_PADDING.xs, md: 14 },
        position: "relative",
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, #0d1f18 0%, #0a0f0d 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, #059669 100%)`,
      }}
    >
      {/* Islamic pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M40 0L50 10L40 20L30 10zM0 40L10 30L20 40L10 50zM80 40L70 30L60 40L70 50zM40 80L50 70L40 60L30 70zM20 20L30 10L40 20L30 30zM60 20L70 10L80 20L70 30zM20 60L30 70L40 60L30 50zM60 60L70 70L80 60L70 50z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Gradient orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Chip
            label={t("badge")}
            sx={{
              mb: 3,
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              fontWeight: 600,
              backdropFilter: "blur(10px)",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#fff",
              mb: 2.5,
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {t("title")}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.82)",
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 560,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {t("subtitle")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
              sx={{
                bgcolor: "#fff",
                color: theme.palette.primary.dark,
                fontWeight: 700,
                px: 4,
                py: 1.8,
                fontSize: "1rem",
                borderRadius: RADIUS.medium,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.92)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                },
              }}
            >
              {t("primary")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CalendarMonthIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.8,
                fontSize: "1rem",
                borderRadius: RADIUS.medium,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {t("secondary")}
            </Button>
          </Stack>

          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}
          >
            {t("note")}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
