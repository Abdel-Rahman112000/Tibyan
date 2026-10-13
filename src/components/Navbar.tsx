"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Container,
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

// إعدادات الأنيميشن للروابط
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
          // خلفية ثابتة دائماً مع تأثير زجاجي (Glassmorphism)
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(10,15,13,0.85)"
              : "rgba(255,255,255,0.85)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: "all 0.3s ease",
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 80 }, // زيادة بسيطة في الارتفاع لشكل أكثر فخامة
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("#home")}
            >
              <Image
                src="/images/tibyan-logo.jpg"
                alt="Tibyan Logo"
                width={200}
                height={90}
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* Desktop Nav Links */}
            <Box
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              sx={{
                display: { xs: "none", lg: "flex" },
                gap: 1.5,
                alignItems: "center",
              }}
            >
              {navLinks.map((link) => (
                <motion.div key={link.key} variants={itemVariants}>
                  <Button
                    onClick={() => scrollToSection(link.href)}
                    disableRipple
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      position: "relative",
                      px: 1.5,
                      py: 1,
                      backgroundColor: "transparent",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "0%",
                        height: "2px",
                        bottom: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: theme.palette.primary.main,
                        transition: "width 0.3s ease-in-out",
                      },
                      "&:hover": {
                        color: theme.palette.primary.main,
                        backgroundColor: "transparent",
                        "&::after": {
                          width: "60%", // تأثير الخط السفلي عند التمرير
                        },
                      },
                    }}
                  >
                    {t(link.key as Parameters<typeof t>[0])}
                  </Button>
                </motion.div>
              ))}
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              sx={{
                display: { xs: "none", lg: "flex" },
                gap: 1.5,
                ml: 2,
                alignItems: "center",
              }}
            >
              {/* Language Toggle */}
              <IconButton
                onClick={switchLocale}
                size="small"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "10px",
                  width: 40,
                  height: 40,
                  color: theme.palette.text.secondary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    transform: "translateY(-2px)", // حركة خفيفة لأعلى
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
                    borderRadius: "10px",
                    width: 40,
                    height: 40,
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      transform: "translateY(-2px)",
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
                component={Link}
                href={`/${locale}/auth/login`}
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: "0.9rem",
                  borderRadius: "10px",
                  borderWidth: "1.5px",
                  "&:hover": { borderWidth: "1.5px" },
                }}
              >
                {t("login")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href={`/${locale}/auth/register`}
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: "0.9rem",
                  borderRadius: "10px",
                  boxShadow: theme.shadows[4],
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                {t("startLearning")}
              </Button>
            </Box>

            {/* Mobile Icons */}
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {mounted && (
                <IconButton onClick={toggleTheme} size="small" color="inherit">
                  {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              )}
              <IconButton onClick={switchLocale} size="small" color="inherit">
                <LanguageIcon />
              </IconButton>
              <IconButton
                onClick={() => setMobileOpen(true)}
                size="small"
                color="inherit"
                sx={{ ml: 1 }}
              >
                <MenuIcon fontSize="large" />
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
            width: 320,
            background: theme.palette.background.paper,
            px: 2,
            py: 3,
            borderTopLeftRadius: isRtl ? 0 : 20,
            borderBottomLeftRadius: isRtl ? 0 : 20,
            borderTopRightRadius: isRtl ? 20 : 0,
            borderBottomRightRadius: isRtl ? 20 : 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Image
            src="/images/tibyan-logo.jpg"
            alt="Tibyan Logo"
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ backgroundColor: theme.palette.action.hover }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, borderStyle: "dashed" }} />
        <List disablePadding>
          {navLinks.map((link) => (
            <ListItem key={link.key} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(link.href)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemText
                  primary={t(link.key as Parameters<typeof t>[0])}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "1.05rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 3, borderStyle: "dashed" }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            component={Link}
            href={`/${locale}/auth/login`}
            sx={{ borderRadius: "10px", borderWidth: "2px" }}
          >
            {t("login")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            component={Link}
            href={`/${locale}/auth/register`}
            sx={{ borderRadius: "10px", py: 1.5 }}
          >
            {t("startLearning")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
