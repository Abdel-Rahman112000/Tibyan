"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Container,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "programs", href: "#programs" },
  { key: "teachers", href: "#teachers" },
  { key: "pricing", href: "#pricing" },
  { key: "testimonials", href: "#testimonials" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const theme = useTheme();
  const { resolvedTheme, setTheme } = useNextTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  const isDark = mounted && resolvedTheme === "dark";
  const isRtl = locale === "ar";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  };

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          backgroundColor: scrolled
            ? theme.palette.mode === "dark"
              ? "rgba(10,15,13,0.85)"
              : "rgba(255,255,255,0.85)"
            : "transparent",
          borderBottom: scrolled
            ? `1px solid ${theme.palette.divider}`
            : "none",
          transition: "all 0.3s ease",
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: "space-between" }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("#home")}
            >
              <Image
                src="/images/tibyan.png"
                alt="Tibyan Logo"
                width={200}
                height={80}
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* Desktop Nav Links */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    px: 1.5,
                    py: 1,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {t(link.key as Parameters<typeof t>[0])}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1, ml: 2 }}>
              {/* Language Toggle */}
              <IconButton
                onClick={switchLocale}
                size="small"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                  width: 38,
                  height: 38,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
                title={locale === "en" ? "عربي" : "English"}
              >
                <LanguageIcon fontSize="small" />
              </IconButton>

              {/* Theme Toggle */}
              {mounted && (
                <IconButton
                  onClick={toggleTheme}
                  size="small"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "8px",
                    width: 38,
                    height: 38,
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {isDark ? (
                    <LightModeIcon fontSize="small" />
                  ) : (
                    <DarkModeIcon fontSize="small" />
                  )}
                </IconButton>
              )}

              <Button
                variant="outlined"
                color="primary"
                size="small"
                component={Link}
                href={`/${locale}/auth/login`}
                sx={{ px: 2.5, py: 1, fontSize: "0.875rem" }}
              >
                {t("login")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                href={`/${locale}/auth/register`}
                sx={{ px: 2.5, py: 1, fontSize: "0.875rem" }}
              >
                {t("startLearning")}
              </Button>
            </Box>

            {/* Mobile Icons */}
            <Box sx={{ display: { xs: "flex", lg: "none" }, gap: 0.5 }}>
              {mounted && (
                <IconButton onClick={toggleTheme} size="small" color="inherit">
                  {isDark ? (
                    <LightModeIcon fontSize="small" />
                  ) : (
                    <DarkModeIcon fontSize="small" />
                  )}
                </IconButton>
              )}
              <IconButton onClick={switchLocale} size="small" color="inherit">
                <LanguageIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => setMobileOpen(true)}
                size="small"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor={isRtl ? "left" : "right"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: theme.palette.background.paper,
            px: 2,
            py: 3,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/images/tibyan2.png"
              alt="Tibyan Logo"
              width={44}
              height={44}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List disablePadding>
          {navLinks.map((link) => (
            <ListItem key={link.key} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(link.href)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText
                  primary={t(link.key as Parameters<typeof t>[0])}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            component={Link}
            href={`/${locale}/auth/login`}
          >
            {t("login")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            href={`/${locale}/auth/register`}
          >
            {t("startLearning")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
