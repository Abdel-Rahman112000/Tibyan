"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useRegister, createRegisterSchema } from "@/lib/auth";
import type { RegisterFormValues } from "@/lib/auth";
import { RADIUS } from "@/theme/spacing";
import { AuthTextField, AuthSelectField } from "./AuthFields";

export function RegisterForm() {
  const t = useTranslations("auth");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const registerMutation = useRegister();

  const schema = React.useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      country: "",
      role: "student",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  const isLoading = registerMutation.isPending;

  const countries = [
    { value: "SA", label: isRtl ? "السعودية" : "Saudi Arabia" },
    { value: "AE", label: isRtl ? "الإمارات" : "UAE" },
    { value: "EG", label: isRtl ? "مصر" : "Egypt" },
    { value: "JO", label: isRtl ? "الأردن" : "Jordan" },
    { value: "KW", label: isRtl ? "الكويت" : "Kuwait" },
    { value: "QA", label: isRtl ? "قطر" : "Qatar" },
    { value: "BH", label: isRtl ? "البحرين" : "Bahrain" },
    { value: "OM", label: isRtl ? "عُمان" : "Oman" },
    { value: "IQ", label: isRtl ? "العراق" : "Iraq" },
    { value: "SY", label: isRtl ? "سوريا" : "Syria" },
    { value: "LB", label: isRtl ? "لبنان" : "Lebanon" },
    { value: "PS", label: isRtl ? "فلسطين" : "Palestine" },
    { value: "YE", label: isRtl ? "اليمن" : "Yemen" },
    { value: "LY", label: isRtl ? "ليبيا" : "Libya" },
    { value: "TN", label: isRtl ? "تونس" : "Tunisia" },
    { value: "DZ", label: isRtl ? "الجزائر" : "Algeria" },
    { value: "MA", label: isRtl ? "المغرب" : "Morocco" },
    { value: "SD", label: isRtl ? "السودان" : "Sudan" },
    { value: "US", label: isRtl ? "أمريكا" : "United States" },
    { value: "GB", label: isRtl ? "بريطانيا" : "United Kingdom" },
    { value: "CA", label: isRtl ? "كندا" : "Canada" },
    { value: "AU", label: isRtl ? "أستراليا" : "Australia" },
    { value: "DE", label: isRtl ? "ألمانيا" : "Germany" },
    { value: "FR", label: isRtl ? "فرنسا" : "France" },
    { value: "TR", label: isRtl ? "تركيا" : "Turkey" },
    { value: "MY", label: isRtl ? "ماليزيا" : "Malaysia" },
    { value: "ID", label: isRtl ? "إندونيسيا" : "Indonesia" },
    { value: "PK", label: isRtl ? "باكستان" : "Pakistan" },
    { value: "IN", label: isRtl ? "الهند" : "India" },
    { value: "OTHER", label: isRtl ? "أخرى" : "Other" },
  ];

  const roles = [
    { value: "student", label: t("roleStudent") },
    { value: "teacher", label: t("roleTeacher") },
  ];

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        py: { xs: 3, md: 4 },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0a0f0d 0%, #0d1f18 50%, #0a0f0d 100%)"
            : "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fafaf8 100%)",
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: "8%",
          [isRtl ? "left" : "right"]: "6%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 72%)`,
          filter: "blur(34px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "8%",
          [isRtl ? "right" : "left"]: "6%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 72%)`,
          filter: "blur(34px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: RADIUS.xl,
            background: alpha(theme.palette.background.paper, 0.88),
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow: theme.shadows[4],
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: isRtl ? "right" : "left", mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                mb: 0.8,
                color: theme.palette.text.primary,
                fontSize: { xs: "1.65rem", md: "1.85rem" },
              }}
            >
              {t("registerTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("registerSubtitle")}
            </Typography>
          </Box>

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack sx={{ gap: 2.5 }}>
              {/* Name row */}
              <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2 }}>
                <AuthTextField
                  label={t("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  disabled={isLoading}
                  {...register("firstName")}
                />
                <AuthTextField
                  label={t("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  disabled={isLoading}
                  {...register("lastName")}
                />
              </Stack>

              <AuthTextField
                label={t("email")}
                type="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                {...register("email")}
              />

              <AuthTextField
                label={t("phone")}
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={isLoading}
                {...register("phone")}
              />

              {/* Country & Role row */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <AuthSelectField
                      label={t("country")}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      disabled={isLoading}
                      options={countries}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <AuthSelectField
                      label={t("role")}
                      error={!!errors.role}
                      helperText={errors.role?.message}
                      disabled={isLoading}
                      options={roles}
                      {...field}
                    />
                  )}
                />
              </Stack>

              {/* Password */}
              <AuthTextField
                label={t("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
                extraSlotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("password")}
              />

              {/* Confirm Password */}
              <AuthTextField
                label={t("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                disabled={isLoading}
                extraSlotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: RADIUS.medium,
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t("registerButton")
                )}
              </Button>
            </Stack>
          </Box>

          {/* Login link */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 2.5, color: "text.secondary" }}
          >
            {t("hasAccount")}{" "}
            <Link
              href={`/${locale}/auth/login`}
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {t("loginLink")}
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
