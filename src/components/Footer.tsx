"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslations, useLocale } from "next-intl";
import { GRID_GAP, RADIUS } from "@/theme/spacing";

const navLinks = [
  "home",
  "programs",
  "teachers",
  "pricing",
  "testimonials",
  "faq",
  "contact",
] as const;
const programLinks = ["memorization", "tajweed", "quranForKids"] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tPrograms = useTranslations("programs");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "#060d09"
            : `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, #02331e 100%)`,
        color: "#fff",
        pt: { xs: GRID_GAP.md + 4, md: 10 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M30 0L37.5 7.5L30 15L22.5 7.5zM0 30L7.5 22.5L15 30L7.5 37.5zM60 30L52.5 22.5L45 30L52.5 37.5zM30 60L37.5 52.5L30 45L22.5 52.5z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1.5fr",
            },
            gap: { xs: 4, md: GRID_GAP.md + 2 },
            mb: GRID_GAP.md,
          }}
        >
          {/* Brand column */}
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: RADIUS.medium,
                  bgcolor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <AutoStoriesIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
                Tibyan | تبيان
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.8,
                mb: 3,
                maxWidth: 280,
              }}
            >
              {t("tagline")}
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { icon: <FacebookIcon fontSize="small" />, label: "Facebook" },
                { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
                {
                  icon: <InstagramIcon fontSize="small" />,
                  label: "Instagram",
                },
                { icon: <YouTubeIcon fontSize="small" />, label: "YouTube" },
              ].map((social) => (
                <IconButton
                  key={social.label}
                  size="small"
                  aria-label={social.label}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{
                color: "#fff",
                mb: 2.5,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.75rem",
              }}
            >
              {t("quickLinks")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {navLinks.map((key) => (
                <Button
                  key={key}
                  onClick={() =>
                    scrollToSection(`#${key === "home" ? "home" : key}`)
                  }
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    justifyContent: isRtl ? "flex-end" : "flex-start",
                    p: 0,
                    minWidth: 0,
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    "&:hover": { color: "#fff", background: "none" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {tNav(key)}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Programs */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{
                color: "#fff",
                mb: 2.5,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.75rem",
              }}
            >
              {t("programs")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {programLinks.map((key) => (
                <Button
                  key={key}
                  onClick={() => scrollToSection("#programs")}
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    justifyContent: isRtl ? "flex-end" : "flex-start",
                    p: 0,
                    minWidth: 0,
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    "&:hover": { color: "#fff", background: "none" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {tPrograms(`${key}.title`)}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{
                color: "#fff",
                mb: 2.5,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.75rem",
              }}
            >
              {t("contact")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                {
                  icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
                  text: t("address"),
                },
                { icon: <EmailIcon sx={{ fontSize: 16 }} />, text: t("email") },
                { icon: <PhoneIcon sx={{ fontSize: 16 }} />, text: t("phone") },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      mt: 0.1,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Newsletter hint */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: "12px",
                bgcolor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.6)", display: "block", mb: 1 }}
              >
                Free Trial Session
              </Typography>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: "#000",
                  fontWeight: 700,
                  "&:hover": { bgcolor: theme.palette.secondary.light },
                  borderRadius: "8px",
                }}
              >
                Book Free Trial
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "center" },
            gap: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}
          >
            © {year} Tibyan | تبيان. {t("rights")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2.5 }}>
            {[t("privacy"), t("terms")].map((link) => (
              <Typography
                key={link}
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  "&:hover": { color: "rgba(255,255,255,0.8)" },
                  transition: "color 0.2s ease",
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
