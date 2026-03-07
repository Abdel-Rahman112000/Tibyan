"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const theme = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = React.useState<string | false>("q1");

  const faqs = [
    { q: t("q1"), a: t("a1"), id: "q1" },
    { q: t("q2"), a: t("a2"), id: "q2" },
    { q: t("q3"), a: t("a3"), id: "q3" },
    { q: t("q4"), a: t("a4"), id: "q4" },
    { q: t("q5"), a: t("a5"), id: "q5" },
    { q: t("q6"), a: t("a6"), id: "q6" },
  ];

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="faq"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Accordion
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                disableGutters
                elevation={0}
                sx={{
                  borderRadius: "14px !important",
                  border: `1px solid ${
                    expanded === faq.id
                      ? theme.palette.primary.main + "50"
                      : theme.palette.divider
                  }`,
                  background: theme.palette.background.paper,
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow:
                    expanded === faq.id
                      ? `0 4px 24px ${theme.palette.primary.main}15`
                      : theme.shadows[1],
                  "&:before": { display: "none" },
                  mb: 0,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color:
                          expanded === faq.id
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                        transition: "color 0.2s ease",
                      }}
                    />
                  }
                  sx={{
                    px: 3,
                    py: 0.5,
                    "& .MuiAccordionSummary-content": { my: 1.5 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        bgcolor:
                          expanded === faq.id
                            ? `${theme.palette.primary.main}18`
                            : theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "background 0.2s ease",
                      }}
                    >
                      <HelpOutlineIcon
                        sx={{
                          fontSize: 16,
                          color:
                            expanded === faq.id
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{
                        color:
                          expanded === faq.id
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                        transition: "color 0.2s ease",
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.q}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ px: 3, pt: 0, pb: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      pt: 1.5,
                      pl: { xs: 0, sm: "47px" },
                    }}
                  >
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
