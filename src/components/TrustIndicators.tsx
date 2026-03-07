"use client";

import * as React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  start: boolean;
  delay: number;
}

function StatItem({ icon, value, suffix, label, color, start, delay }: StatItemProps) {
  const theme = useTheme();
  const count = useCountUp(value, 2200, start);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: { xs: 3, md: 4 },
          borderRadius: "20px",
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[2],
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: theme.shadows[5],
          },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            bgcolor: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <Box sx={{ color, "& svg": { fontSize: 26 } }}>{icon}</Box>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            background: `linear-gradient(135deg, ${color}, ${color}bb)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 0.5,
          }}
        >
          {count.toLocaleString()}
          {suffix}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: "0.95rem" }}
        >
          {label}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default function TrustIndicators() {
  const t = useTranslations("trust");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: <PeopleAltIcon />,
      value: 5000,
      suffix: "+",
      label: t("students"),
      color: theme.palette.primary.main,
    },
    {
      icon: <PublicIcon />,
      value: 50,
      suffix: "+",
      label: t("countries"),
      color: "#3b82f6",
    },
    {
      icon: <SchoolIcon />,
      value: 200,
      suffix: "+",
      label: t("teachers"),
      color: theme.palette.secondary.main,
    },
    {
      icon: <AccessTimeIcon />,
      value: 120000,
      suffix: "+",
      label: t("hours"),
      color: "#8b5cf6",
    },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
            : `linear-gradient(180deg, #f0fdf4 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary, fontSize: "1.05rem" }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              {...stat}
              start={isInView}
              delay={i * 0.1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
