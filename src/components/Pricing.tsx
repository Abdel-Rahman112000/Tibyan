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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { SECTION_PADDING, SECTION_HEADER_MB, GRID_GAP, CARD_PADDING, RADIUS } from "@/theme/spacing";

export default function Pricing() {
  const t = useTranslations("pricing");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const plans = [
    {
      key: "basic",
      name: t("basic.name"),
      price: t("basic.price"),
      desc: t("basic.desc"),
      sessions: t("basic.sessions"),
      features: t.raw("basic.features") as string[],
      featured: false,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    },
    {
      key: "standard",
      name: t("standard.name"),
      price: t("standard.price"),
      desc: t("standard.desc"),
      sessions: t("standard.sessions"),
      features: t.raw("standard.features") as string[],
      featured: true,
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
    {
      key: "premium",
      name: t("premium.name"),
      price: t("premium.price"),
      desc: t("premium.desc"),
      sessions: t("premium.sessions"),
      features: t.raw("premium.features") as string[],
      featured: false,
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
    },
  ];

  return (
    <Box
      id="pricing"
      ref={ref}
      component="section"
      sx={{
        py: { xs: SECTION_PADDING.xs, md: SECTION_PADDING.md },
        background: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, rgba(4,120,87,0.04) 0%, transparent 100%)"
              : "linear-gradient(180deg, rgba(4,120,87,0.03) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", mb: { xs: SECTION_HEADER_MB.xs, md: SECTION_HEADER_MB.md } }}>
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
                maxWidth: 480,
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
            gap: { xs: GRID_GAP.xs, md: GRID_GAP.md },
            alignItems: "center",
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
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
                  borderRadius: plan.featured ? "24px" : "20px",
                  overflow: "hidden",
                  background: plan.featured
                    ? plan.gradient
                    : theme.palette.background.paper,
                  border: plan.featured
                    ? "none"
                    : `1px solid ${theme.palette.divider}`,
                  boxShadow: plan.featured
                    ? `0 20px 60px ${plan.color}40`
                    : theme.shadows[1],
                  transform: plan.featured ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    transform: plan.featured ? "scale(1.06) translateY(-4px)" : "translateY(-8px)",
                    boxShadow: `0 24px 64px ${plan.color}50`,
                  },
                }}
              >
                {plan.featured && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "8px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    ★ {t("mostPopular")}
                  </Box>
                )}

                <Box sx={{ p: { xs: CARD_PADDING.md, md: 4 }, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: plan.featured ? "rgba(255,255,255,0.8)" : theme.palette.text.secondary,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      mb: 0.5,
                      display: "block",
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, mb: 1 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: plan.featured ? "#fff" : theme.palette.text.primary,
                        lineHeight: 1,
                      }}
                    >
                      ${plan.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: plan.featured ? "rgba(255,255,255,0.7)" : theme.palette.text.secondary,
                        mb: 0.5,
                      }}
                    >
                      /{t("monthly")}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: plan.featured ? "rgba(255,255,255,0.75)" : theme.palette.text.secondary,
                      mb: 1,
                    }}
                  >
                    {plan.desc}
                  </Typography>

                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      bgcolor: plan.featured ? "rgba(255,255,255,0.15)" : `${plan.color}12`,
                      mb: 3,
                      display: "inline-block",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ color: plan.featured ? "#fff" : plan.color }}
                    >
                      {plan.sessions}
                    </Typography>
                  </Box>

                  {/* Divider */}
                  <Box
                    sx={{
                      height: 1,
                      bgcolor: plan.featured ? "rgba(255,255,255,0.2)" : theme.palette.divider,
                      mb: 3,
                    }}
                  />

                  <Box sx={{ flex: 1, mb: 3 }}>
                    {plan.features.map((feature, fi) => (
                      <Box
                        key={fi}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
                      >
                        <CheckCircleIcon
                          sx={{
                            fontSize: 18,
                            color: plan.featured ? "rgba(255,255,255,0.9)" : plan.color,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: plan.featured ? "rgba(255,255,255,0.9)" : theme.palette.text.secondary,
                            lineHeight: 1.5,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant={plan.featured ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={
                      plan.featured
                        ? {
                            bgcolor: "#fff",
                            color: plan.color,
                            fontWeight: 700,
                            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                          }
                        : {
                            borderColor: plan.color,
                            color: plan.color,
                            "&:hover": {
                              borderColor: plan.color,
                              bgcolor: `${plan.color}10`,
                            },
                          }
                    }
                  >
                    {t("getStarted")}
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
