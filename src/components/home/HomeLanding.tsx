"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme as useNextTheme } from "next-themes";
import { alpha } from "@mui/material/styles";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Container, Drawer, IconButton, Stack, Typography } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const programs = ["reading", "tajweed", "memorization"] as const;
const benefits = ["personal", "progress", "schedule"] as const;
const journey = ["account", "goal", "start"] as const;
const questions = ["beginner", "age", "schedule", "pricing"] as const;

export default function HomeLanding() {
  const t = useTranslations("landing");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isArabic = locale === "ar";
  const entry = `/${locale}/auth/login`;
  const nav = [
    { href: "#about", label: t("nav.about") },
    { href: "#programs", label: t("nav.programs") },
    { href: "#journey", label: t("nav.journey") },
    { href: "#faq", label: t("nav.faq") },
  ];
  const switchLanguage = () => {
    const parts = pathname.split("/");
    parts[1] = isArabic ? "en" : "ar";
    setMenuOpen(false);
    router.push(parts.join("/"));
  };
  const linkSx = { color: "text.secondary", textDecoration: "none", fontSize: 14, fontWeight: 750, "&:hover": { color: "secondary.dark" } };

  return <Box dir={isArabic ? "rtl" : "ltr"} sx={{ bgcolor: "background.default", color: "text.primary", overflowX: "clip" }}>
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 20, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="xl" sx={{ height: { xs: 68, md: 76 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Stack component={Link} href={`/${locale}`} direction="row" alignItems="center" spacing={1} sx={{ color: "text.primary", textDecoration: "none", flexShrink: 0 }} aria-label={t("brand.homeLabel")}>
          <Box sx={{ width: 42, height: 42, borderRadius: "13px 13px 13px 3px", bgcolor: "primary.dark", color: "secondary.light", display: "grid", placeItems: "center" }}><AutoStoriesOutlinedIcon fontSize="small" /></Box>
          <Box><Typography fontWeight={900} fontSize={20} lineHeight={1.1}>{t("brand.name")}</Typography><Typography fontSize={10} color="text.secondary">{t("brand.tagline")}</Typography></Box>
        </Stack>
        <Stack component="nav" direction="row" spacing={3} sx={{ display: { xs: "none", lg: "flex" } }} aria-label={t("nav.label")}>{nav.map((item) => <Box component="a" href={item.href} key={item.href} sx={linkSx}>{item.label}</Box>)}</Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={switchLanguage} size="small" aria-label={t("actions.language")} sx={{ border: 1, borderColor: "divider", width: 37, height: 37, fontWeight: 850, fontSize: 12 }}>{isArabic ? "EN" : "ع"}</IconButton>
          {mounted && <IconButton onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} size="small" aria-label={t("actions.theme")} sx={{ border: 1, borderColor: "divider", width: 37, height: 37 }}>{resolvedTheme === "dark" ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}</IconButton>}
          <Button component={Link} href={entry} color="inherit" sx={{ display: { xs: "none", md: "inline-flex" }, fontWeight: 800 }}>{t("actions.login")}</Button>
          <Button component={Link} href={entry} variant="contained" sx={{ display: { xs: "none", sm: "inline-flex" } }}>{t("actions.register")}</Button>
          <IconButton onClick={() => setMenuOpen(true)} aria-label={t("actions.openMenu")} sx={{ display: { xs: "inline-flex", lg: "none" } }}><MenuRoundedIcon /></IconButton>
        </Stack>
      </Container>
      <Drawer anchor={isArabic ? "left" : "right"} open={menuOpen} onClose={() => setMenuOpen(false)}><Box sx={{ width: 270, p: 3, bgcolor: "background.paper", height: "100%" }} dir={isArabic ? "rtl" : "ltr"}><IconButton onClick={() => setMenuOpen(false)} aria-label={t("actions.closeMenu")}><CloseRoundedIcon /></IconButton><Stack spacing={2.5} sx={{ mt: 3 }}>{nav.map((item) => <Box component="a" href={item.href} key={item.href} onClick={() => setMenuOpen(false)} sx={linkSx}>{item.label}</Box>)}<Button component={Link} href={entry} onClick={() => setMenuOpen(false)} variant="contained">{t("hero.primary")}</Button></Stack></Box></Drawer>
    </Box>

    <Box component="main">
      <Box component="section" id="home" aria-labelledby="hero-title" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: "calc(100dvh - 68px)", md: "calc(100dvh - 76px)" }, bgcolor: "primary.dark", color: "#fff", overflow: "hidden" }}>
        <Image src="/images/hero3.jpg" alt={t("hero.imageAlt")} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "left center", zIndex: -2 }} />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: -1, background: { xs: "linear-gradient(180deg, #082b26f2 0%, #082b26db 38%, #082b2666 68%, #082b2677 100%)", md: "linear-gradient(270deg, #082b26f7 0%, #082b26ed 27%, #082b2699 55%, #082b2614 85%)" } }} />
        <Container maxWidth="xl" sx={{ minHeight: { xs: "calc(100dvh - 68px)", md: "calc(100dvh - 76px)" }, display: "flex", flexDirection: "column", position: "relative" }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: { xs: "flex-start", md: "center" }, justifyContent: isArabic ? "flex-start" : "flex-end", pt: { xs: 4, md: 2 }, pb: 2 }}>
            <Box sx={{ width: "100%", maxWidth: { xs: 470, md: 580 } }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ width: "fit-content", border: "1px solid #e8ca8a70", bgcolor: "#e8ca8a18", color: "#f0cf91", borderRadius: 99, px: 1.7, py: .65 }}><AutoStoriesOutlinedIcon sx={{ fontSize: 16 }} /><Typography fontSize={{ xs: 11, md: 12 }} fontWeight={800}>{t("hero.eyebrow")}</Typography></Stack>
              <Typography component="h1" id="hero-title" sx={{ fontSize: { xs: "clamp(2.15rem, 8vw, 3.15rem)", sm: "clamp(2.9rem, 6vw, 4.4rem)", lg: "clamp(3.5rem, 5.5vw, 5.3rem)" }, fontWeight: 900, lineHeight: 1.18, letterSpacing: "-.045em", mt: { xs: 2, md: 2.5 }, textWrap: "balance" }}>{t("hero.titleFirst")}<br /><Box component="span" sx={{ color: "secondary.light" }}>{t("hero.titleAccent")}</Box></Typography>
              <Typography sx={{ maxWidth: 470, color: "#dfebe2", fontSize: { xs: 13, md: 16 }, lineHeight: 1.8, mt: 2.5 }}>{t("hero.description")}</Typography>
              <Stack direction="row" gap={1.5} flexWrap="wrap" sx={{ mt: 3 }}>
                <Button component={Link} href={entry} variant="contained" color="secondary" endIcon={<ArrowOutwardRoundedIcon />} sx={{ minHeight: 48, px: 3, fontWeight: 850 }}>{t("hero.primary")}</Button>
                <Button component="a" href="#programs" variant="outlined" endIcon={<ArrowForwardRoundedIcon />} sx={{ minHeight: 48, color: "#fff", borderColor: "#ffffff85", px: 2.5, "&:hover": { borderColor: "#fff", bgcolor: "#ffffff12" } }}>{t("hero.secondary")}</Button>
              </Stack>
              <Typography sx={{ color: "#cbded1", fontSize: 12, mt: 2.5 }}>{t("hero.note")}</Typography>
            </Box>
          </Box>
          <Stack direction="row" gap={{ xs: 1.5, md: 4 }} justifyContent="space-between" sx={{ borderTop: "1px solid #ffffff55", py: { xs: 1.6, md: 2.4 }, color: "#f5f1e7" }}>{(["personal", "programs", "schedule"] as const).map((key) => <Stack direction="row" alignItems="center" gap={1} key={key} sx={{ minWidth: 0 }}><Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "secondary.light", flexShrink: 0 }} /><Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, fontWeight: 750, whiteSpace: "nowrap" }}>{t(`hero.highlights.${key}`)}</Typography></Stack>)}</Stack>
        </Container>
      </Box>

      <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 90 }}><Container maxWidth="lg"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, alignItems: "center", gap: 5 }}><Box><Typography color="secondary.dark" fontWeight={850} fontSize={12}>{t("about.kicker")}</Typography><Typography variant="h2" sx={{ mt: 1, fontSize: { xs: 32, md: 48 }, fontWeight: 850 }}>{t("about.title")}</Typography></Box><Box><Typography color="text.secondary" lineHeight={1.9}>{t("about.description")}</Typography><Button component="a" href="#journey" endIcon={<ArrowOutwardRoundedIcon />} sx={{ mt: 2 }}>{t("about.link")}</Button></Box></Box><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, borderBlock: 1, borderColor: "divider", mt: 7 }}>{benefits.map((key, index) => <Box key={key} sx={{ py: 4, px: { xs: 0, md: 3 }, borderInlineStart: { xs: 0, md: index ? 1 : 0 }, borderTop: { xs: index ? 1 : 0, md: 0 }, borderColor: "divider" }}><Typography color="secondary.dark" fontWeight={850} fontSize={13}>0{index + 1}</Typography><Typography variant="h6" sx={{ mt: 2, fontWeight: 800 }}>{t(`benefits.${key}.title`)}</Typography><Typography color="text.secondary" fontSize={14} lineHeight={1.8} sx={{ mt: 1 }}>{t(`benefits.${key}.description`)}</Typography></Box>)}</Box></Container></Box>

      <Box component="section" id="programs" sx={{ py: { xs: 8, md: 12 }, bgcolor: (muiTheme) => alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === "light" ? .045 : .13), scrollMarginTop: 90 }}><Container maxWidth="lg"><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "flex-end" }} gap={3} sx={{ mb: 4 }}><Box><Typography color="secondary.dark" fontSize={12} fontWeight={850}>{t("programs.kicker")}</Typography><Typography variant="h2" sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 850, mt: 1 }}>{t("programs.title")}</Typography></Box><Typography color="text.secondary" sx={{ maxWidth: 350 }}>{t("programs.description")}</Typography></Stack><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2 }}>{programs.map((key, index) => <Card key={key} variant="outlined" sx={{ display: "flex", flexDirection: "column", minHeight: { xs: 260, md: 340 }, borderRadius: 3 }}><CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1 }}><Stack direction="row" justifyContent="space-between" alignItems="flex-start"><Typography color="secondary.dark" fontSize={12} fontWeight={850}>0{index + 1} /</Typography><Box sx={{ width: 73, height: 73, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: "background.default", color: "primary.main", fontSize: 34 }}>{index === 0 ? "أ" : index === 1 ? "۞" : "ق"}</Box></Stack><Typography color="secondary.dark" fontSize={12} fontWeight={850} sx={{ mt: 3 }}>{t(`programs.${key}.audience`)}</Typography><Typography variant="h6" fontWeight={850} sx={{ mt: 1 }}>{t(`programs.${key}.title`)}</Typography><Typography color="text.secondary" fontSize={14} lineHeight={1.8} sx={{ mt: 1 }}>{t(`programs.${key}.description`)}</Typography><Button component="a" href="#journey" endIcon={<ArrowOutwardRoundedIcon />} sx={{ alignSelf: "flex-start", mt: "auto", pt: 2 }}>{t("programs.next")}</Button></CardContent></Card>)}</Box></Container></Box>

      <Box component="section" id="journey" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper", scrollMarginTop: 90 }}><Container maxWidth="lg"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 5, md: 12 } }}><Box><Typography color="secondary.dark" fontSize={12} fontWeight={850}>{t("journey.kicker")}</Typography><Typography variant="h2" sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 850, mt: 1 }}>{t("journey.title")}</Typography><Typography color="text.secondary" lineHeight={1.9} sx={{ mt: 2 }}>{t("journey.description")}</Typography><Button component={Link} href={entry} variant="contained" sx={{ mt: 3 }}>{t("journey.cta")}</Button></Box><Stack>{journey.map((key, index) => <Stack direction="row" gap={3} key={key} sx={{ borderTop: 1, borderColor: "divider", py: 2.5 }}><Typography color="secondary.dark" fontSize={28} fontFamily="Georgia,serif">0{index + 1}</Typography><Box><Typography variant="h6" fontWeight={800}>{t(`journey.${key}.title`)}</Typography><Typography color="text.secondary" fontSize={14} lineHeight={1.8}>{t(`journey.${key}.description`)}</Typography></Box></Stack>)}</Stack></Box></Container></Box>

      <Box component="section" sx={{ py: 5, bgcolor: (muiTheme) => alpha(muiTheme.palette.primary.main, .06) }}><Container maxWidth="lg"><Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "center" }} gap={3}><Box sx={{ width: 58, height: 58, borderRadius: "50%", border: 1, borderColor: "secondary.main", color: "secondary.dark", display: "grid", placeItems: "center", fontSize: 28 }}>✳</Box><Box sx={{ flex: 1 }}><Typography color="secondary.dark" fontSize={12} fontWeight={850}>{t("pricing.kicker")}</Typography><Typography variant="h5" fontWeight={850}>{t("pricing.title")}</Typography><Typography color="text.secondary" fontSize={14}>{t("pricing.description")}</Typography></Box><Button component={Link} href={entry} endIcon={<ArrowOutwardRoundedIcon />}>{t("pricing.link")}</Button></Stack></Container></Box>

      <Box component="section" id="faq" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 90 }}><Container maxWidth="lg"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: ".8fr 1.2fr" }, gap: 5 }}><Box><Typography color="secondary.dark" fontSize={12} fontWeight={850}>{t("faq.kicker")}</Typography><Typography variant="h2" sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 850, mt: 1 }}>{t("faq.title")}</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>{t("faq.description")}</Typography></Box><Box>{questions.map((key) => <Accordion key={key} disableGutters elevation={0} sx={{ bgcolor: "transparent", borderBottom: 1, borderColor: "divider", "&:before": { display: "none" } }}><AccordionSummary expandIcon={<AddRoundedIcon />} sx={{ px: 0 }}><Typography fontWeight={800}>{t(`faq.${key}.question`)}</Typography></AccordionSummary><AccordionDetails sx={{ px: 0, color: "text.secondary" }}>{t(`faq.${key}.answer`)}</AccordionDetails></Accordion>)}</Box></Box></Container></Box>

      <Box component="section" id="contact" sx={{ bgcolor: "primary.dark", color: "#fff", py: { xs: 9, md: 12 }, textAlign: "center" }}><Container maxWidth="md"><Typography color="secondary.light" fontSize={12} fontWeight={850}>{t("final.kicker")}</Typography><Typography variant="h2" sx={{ fontSize: { xs: 32, md: 60 }, fontWeight: 850, mt: 1 }}>{t("final.title")}</Typography><Typography sx={{ color: "#d2e0d5", maxWidth: 550, mx: "auto", mt: 2 }}>{t("final.description")}</Typography><Button component={Link} href={entry} variant="contained" color="secondary" endIcon={<ArrowOutwardRoundedIcon />} sx={{ mt: 3 }}>{t("final.button")}</Button></Container></Box>
    </Box>

    <Box component="footer" sx={{ bgcolor: "primary.dark", color: "#d8e6dd", borderTop: "1px solid #ffffff2e", py: 5 }}><Container maxWidth="lg"><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={4}><Box><Stack direction="row" alignItems="center" gap={1}><AutoStoriesOutlinedIcon sx={{ color: "secondary.light" }} /><Typography fontWeight={850} fontSize={20}>{t("brand.name")}</Typography></Stack><Typography sx={{ maxWidth: 330, mt: 1, fontSize: 13, color: "#b8cbbf" }}>{t("footer.description")}</Typography></Box><Stack component="nav" direction="row" flexWrap="wrap" gap={2} aria-label={t("footer.linksLabel")}>{nav.map((item) => <Box component="a" href={item.href} key={item.href} sx={{ color: "#d8e6dd", textDecoration: "none", fontSize: 13 }}>{item.label}</Box>)}</Stack></Stack><Box sx={{ borderTop: "1px solid #ffffff2e", mt: 4, pt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1, fontSize: 12, color: "#a7bdae" }}><span>© {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}</span><span>{t("footer.closing")}</span></Box></Container></Box>
  </Box>;
}
