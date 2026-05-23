"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useRegister, useSocialAuth, registerSchema } from "@/lib/auth";
import {
  loginWithFacebook,
  GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID,
} from "@/lib/auth/social";
import type { RegisterFormValues } from "@/lib/auth";
import { RADIUS } from "@/theme/spacing";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const registerMutation = useRegister();
  const socialMutation = useSocialAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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

  // Google OAuth login
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      socialMutation.mutate({
        provider: "google",
        accessToken: tokenResponse.access_token,
      });
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error(
        t("socialLoginError") || "Google login failed. Please try again.",
      );
    },
  });

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      toast.error("Google login is not configured");
      return;
    }
    googleLogin();
  };

  const handleFacebookLogin = async () => {
    if (!FACEBOOK_APP_ID) {
      toast.error("Facebook login is not configured");
      return;
    }

    try {
      const accessToken = await loginWithFacebook();
      socialMutation.mutate({
        provider: "facebook",
        accessToken,
      });
    } catch (error) {
      console.error("Facebook login error:", error);
      toast.error(
        t("socialLoginError") || "Facebook login failed. Please try again.",
      );
    }
  };

  const isLoading = registerMutation.isPending || socialMutation.isPending;
  // Country options
  const countries = [
    { code: "SA", name: isRtl ? "السعودية" : "Saudi Arabia" },
    { code: "AE", name: isRtl ? "الإمارات" : "UAE" },
    { code: "EG", name: isRtl ? "مصر" : "Egypt" },
    { code: "JO", name: isRtl ? "الأردن" : "Jordan" },
    { code: "KW", name: isRtl ? "الكويت" : "Kuwait" },
    { code: "QA", name: isRtl ? "قطر" : "Qatar" },
    { code: "BH", name: isRtl ? "البحرين" : "Bahrain" },
    { code: "OM", name: isRtl ? "عُمان" : "Oman" },
    { code: "IQ", name: isRtl ? "العراق" : "Iraq" },
    { code: "SY", name: isRtl ? "سوريا" : "Syria" },
    { code: "LB", name: isRtl ? "لبنان" : "Lebanon" },
    { code: "PS", name: isRtl ? "فلسطين" : "Palestine" },
    { code: "YE", name: isRtl ? "اليمن" : "Yemen" },
    { code: "LY", name: isRtl ? "ليبيا" : "Libya" },
    { code: "TN", name: isRtl ? "تونس" : "Tunisia" },
    { code: "DZ", name: isRtl ? "الجزائر" : "Algeria" },
    { code: "MA", name: isRtl ? "المغرب" : "Morocco" },
    { code: "SD", name: isRtl ? "السودان" : "Sudan" },
    { code: "US", name: isRtl ? "أمريكا" : "United States" },
    { code: "GB", name: isRtl ? "بريطانيا" : "United Kingdom" },
    { code: "CA", name: isRtl ? "كندا" : "Canada" },
    { code: "AU", name: isRtl ? "أستراليا" : "Australia" },
    { code: "DE", name: isRtl ? "ألمانيا" : "Germany" },
    { code: "FR", name: isRtl ? "فرنسا" : "France" },
    { code: "TR", name: isRtl ? "تركيا" : "Turkey" },
    { code: "MY", name: isRtl ? "ماليزيا" : "Malaysia" },
    { code: "ID", name: isRtl ? "إندونيسيا" : "Indonesia" },
    { code: "PK", name: isRtl ? "باكستان" : "Pakistan" },
    { code: "IN", name: isRtl ? "الهند" : "India" },
    { code: "OTHER", name: isRtl ? "أخرى" : "Other" },
  ];

  const labelBg = alpha(theme.palette.background.paper, 0.88);

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: RADIUS.large,
      backgroundColor: alpha(theme.palette.background.paper, 0.26),
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: alpha(theme.palette.divider, 0.9),
      },
      "&:hover fieldset": {
        borderColor: alpha(theme.palette.primary.main, 0.45),
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "1px",
      },
      "& input, & .MuiSelect-select": {
        textAlign: isRtl ? "right" : "left",
        paddingRight: isRtl ? "14px" : "32px",
        paddingLeft: isRtl ? "32px" : "14px",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      right: isRtl ? 28 : "auto",
      left: isRtl ? "auto" : 14,
      transformOrigin: isRtl ? "top right" : "top left",
      background: labelBg,
      px: 1.2,
      mx: 0.5,
      borderRadius: 2,
      zIndex: 2,
      "&.MuiInputLabel-shrink": {
        right: isRtl ? 14 : "auto",
        left: isRtl ? "auto" : 14,
        background: labelBg,
        px: 1.2,
        mx: 0.5,
        borderRadius: 2,
      },
    },
    "& .MuiFormHelperText-root": {
      textAlign: isRtl ? "right" : "left",
      marginInlineStart: 0,
      marginInlineEnd: 0,
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      textAlign: isRtl ? "right" : "left",
    },
    "& .MuiSelect-icon": {
      right: isRtl ? "auto" : 7,
      left: isRtl ? 7 : "auto",
    },
  };

  const fieldSlotProps = {
    inputLabel: {
      sx: {
        right: isRtl ? 28 : "auto",
        left: isRtl ? "auto" : 14,
        transformOrigin: isRtl ? "top right" : "top left",
        background: labelBg,
        px: 1.2,
        mx: 0.5,
        borderRadius: 2,
        zIndex: 2,
        "&.MuiInputLabel-shrink": {
          right: isRtl ? 14 : "auto",
          left: isRtl ? "auto" : 14,
          background: labelBg,
          px: 1.2,
          mx: 0.5,
          borderRadius: 2,
        },
      },
    },
    htmlInput: {
      dir: isRtl ? "rtl" : "ltr",
      style: { textAlign: isRtl ? "right" : "left" } as React.CSSProperties,
    },
  };

  const selectSlotProps = {
    inputLabel: {
      sx: {
        right: isRtl ? 28 : "auto",
        left: isRtl ? "auto" : 14,
        transformOrigin: isRtl ? "top right" : "top left",
        background: labelBg,
        px: 1.2,
        mx: 0.5,
        borderRadius: 2,
        zIndex: 2,
        "&.MuiInputLabel-shrink": {
          right: isRtl ? 14 : "auto",
          left: isRtl ? "auto" : 14,
          background: labelBg,
          px: 1.2,
          mx: 0.5,
          borderRadius: 2,
        },
      },
    },
    select: {
      MenuProps: {
        PaperProps: {
          sx: {
            maxHeight: 300,
            "& .MuiMenuItem-root": {
              justifyContent: isRtl ? "flex-end" : "flex-start",
            },
          },
        },
      },
    },
  };

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
        py: { xs: 2, md: 4 },
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
          py: { xs: 1.5, md: 2 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: { xs: 2, sm: 2.5 },
            borderRadius: RADIUS.xl,
            background: alpha(theme.palette.background.paper, 0.88),
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow: theme.shadows[4],
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: { xs: 1, sm: 1.25, md: 1.6 },
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: isRtl ? "right" : "left", mb: 2.3 }}>
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
              <Stack spacing={1.5}>
                {/* Name row */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <TextField
                    fullWidth
                    label={t("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={isLoading}
                    sx={fieldSx}
                    slotProps={fieldSlotProps}
                    {...register("firstName")}
                  />
                  <TextField
                    fullWidth
                    label={t("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isLoading}
                    sx={fieldSx}
                    slotProps={fieldSlotProps}
                    {...register("lastName")}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label={t("email")}
                  type="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  sx={fieldSx}
                  slotProps={fieldSlotProps}
                  {...register("email")}
                />

                <TextField
                  fullWidth
                  label={t("phone")}
                  type="tel"
                  placeholder="+1234567890"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={isLoading}
                  sx={fieldSx}
                  slotProps={fieldSlotProps}
                  {...register("phone")}
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  {/* Country select */}
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        label={t("country")}
                        error={!!errors.country}
                        helperText={errors.country?.message}
                        disabled={isLoading}
                        sx={fieldSx}
                        slotProps={selectSlotProps}
                        {...field}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  {/* Role select */}
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        label={t("role")}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                        disabled={isLoading}
                        sx={fieldSx}
                        slotProps={selectSlotProps}
                        {...field}
                      >
                        <MenuItem value="student">{t("roleStudent")}</MenuItem>
                        <MenuItem value="parent">{t("roleParent")}</MenuItem>
                      </TextField>
                    )}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label={t("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  sx={fieldSx}
                  slotProps={{
                    ...fieldSlotProps,
                    input: {
                      endAdornment: isRtl ? (
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
                      ) : undefined,
                      startAdornment: !isRtl ? (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="start"
                            size="small"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon fontSize="small" />
                            ) : (
                              <VisibilityIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ) : undefined,
                    },
                  }}
                  {...register("password")}
                />

                <TextField
                  fullWidth
                  label={t("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={isLoading}
                  sx={fieldSx}
                  slotProps={{
                    ...fieldSlotProps,
                    input: {
                      endAdornment: isRtl ? (
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
                      ) : undefined,
                      startAdornment: !isRtl ? (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="start"
                            size="small"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon fontSize="small" />
                            ) : (
                              <VisibilityIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ) : undefined,
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
                    py: 1.2,
                    borderRadius: RADIUS.medium,
                    fontSize: "0.98rem",
                    fontWeight: 700,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t("registerButton")
                  )}
                </Button>

                <Divider sx={{ my: 0.6 }}>
                  <Typography variant="caption" color="text.secondary">
                    {t("orContinueWith")}
                  </Typography>
                </Divider>

                <Stack direction="row" gap={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    sx={{
                      py: 1.05,
                      borderRadius: RADIUS.medium,
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                      "& .MuiButton-startIcon": {
                        mr: isRtl ? 0.5 : 0.8,
                        ml: isRtl ? 0.8 : 0.5,
                      },
                      "&:hover": {
                        borderColor: "#ea4335",
                        bgcolor: alpha("#ea4335", 0.05),
                      },
                    }}
                  >
                    Google
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                    sx={{
                      py: 1.05,
                      borderRadius: RADIUS.medium,
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                      "& .MuiButton-startIcon": {
                        mr: isRtl ? 0.5 : 0.8,
                        ml: isRtl ? 0.8 : 0.5,
                      },
                      "&:hover": {
                        borderColor: "#1877f2",
                        bgcolor: alpha("#1877f2", 0.05),
                      },
                    }}
                  >
                    Facebook
                  </Button>
                </Stack>
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
        </Box>
      </Container>
    </Box>
  );
}
