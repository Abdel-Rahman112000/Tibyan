"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { alpha } from "@mui/material/styles";
import { Avatar, Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

export default function RoleSelection() {
  const t = useTranslations("enrollment");
  const locale = useLocale();
  const roles = [
    { key: "student", href: `/${locale}/auth/enroll`, icon: <PersonOutlineRoundedIcon /> },
    { key: "teacher", href: `/${locale}/auth/teacher-login`, icon: <SchoolOutlinedIcon /> },
  ] as const;

  return <Box component="main" dir={locale === "ar" ? "rtl" : "ltr"} sx={{ height: "100dvh", overflowY: "auto", display: "flex", alignItems: "center", bgcolor: "background.default", backgroundImage: (theme) => `radial-gradient(circle at 15% 5%, ${alpha(theme.palette.primary.main, .08)}, transparent 36%)` }}>
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack component={Link} href={`/${locale}`} direction="row" alignItems="center" gap={1} sx={{ color: "text.primary", textDecoration: "none", width: "fit-content" }}><Avatar variant="rounded" sx={{ bgcolor: "primary.dark", color: "secondary.light", borderRadius: 2 }}><AutoStoriesOutlinedIcon /></Avatar><Typography fontWeight={900} fontSize={19}>{t("brand")}</Typography></Stack>
      <Box sx={{ textAlign: "center", my: { xs: 4, md: 5 } }}><Typography color="secondary.dark" fontWeight={850} fontSize={12}>{t("role.eyebrow")}</Typography><Typography component="h1" sx={{ fontSize: { xs: 30, md: 46 }, fontWeight: 900, mt: 1 }}>{t("role.title")}</Typography><Typography color="text.secondary" sx={{ mt: 1, fontSize: 14 }}>{t("role.description")}</Typography></Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" }, gap: 2 }}>
        {roles.map((role) => <Card component={Link} href={role.href} key={role.key} variant="outlined" sx={{ p: { xs: 2, md: 3 }, minHeight: { xs: 145, md: 205 }, display: "flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none", color: "text.primary", borderRadius: 3, boxShadow: 2, transition: "transform .2s, border-color .2s", "&:hover": { transform: "translateY(-4px)", borderColor: "secondary.main" } }}><Avatar variant="rounded" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, .09), color: "primary.main", borderRadius: 2, width: 48, height: 48 }}>{role.icon}</Avatar><Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ width: "100%", mt: "auto", pt: 1.5 }}><Box><Typography fontWeight={850} fontSize={20}>{t(`role.${role.key}`)}</Typography><Typography color="text.secondary" fontSize={13}>{t(`role.${role.key}Description`)}</Typography></Box><ArrowForwardRoundedIcon sx={{ color: "secondary.dark", transform: locale === "ar" ? "scaleX(-1)" : undefined }} /></Stack></Card>)}
      </Box>
      <Typography align="center" color="text.secondary" sx={{ mt: 3, fontSize: 12 }}>{t("role.demoNotice")}</Typography>
      <Button component={Link} href={`/${locale}/auth/student-login`} variant="outlined" sx={{ display: "flex", mx: "auto", mt: 2 }}>{locale === "ar" ? "لديك حساب؟ دخول الطالب أو ولي الأمر" : "Have an account? Student or parent sign in"}</Button>
      <Button component={Link} href={`/${locale}`} sx={{ display: "flex", mx: "auto", mt: 1.5 }}>{t("backHome")}</Button>
    </Container>
  </Box>;
}
