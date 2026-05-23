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
import { useRegister, useSocialAuth, registerSchema } from "@/lib/auth";
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

  const handleGoogleLogin = () => {
    toast("Google signup: Integrate with Google OAuth SDK", { icon: "ℹ️" });
  };

  const handleFacebookLogin = () => {
    toast("Facebook signup: Integrate with Facebook SDK", { icon: "ℹ️" });
  };

  const isLoading = registerMutation.isPending || socialMutation.isPending;
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
      "& input": {
        textAlign: isRtl ? "right" : "left",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
    "& .MuiFormHelperText-root": {
      textAlign: isRtl ? "right" : "left",
      marginInlineStart: 0,
      marginInlineEnd: 0,
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      textAlign: isRtl ? "right" : "left",
    },
  };

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0a0f0d 0%, #0d1f18 50%, #0a0f0d 100%)"
            : "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fafaf8 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: RADIUS.xl,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[4],
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: isRtl ? "right" : "left", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mb: 1, color: theme.palette.text.primary }}
            >
              {t("registerTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("registerSubtitle")}
            </Typography>
          </Box>

          {/* Social Login Buttons */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              sx={{
                py: 1.4,
                borderRadius: RADIUS.medium,
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                fontWeight: 600,
                "& .MuiButton-startIcon": {
                  mr: isRtl ? 0.6 : 1,
                  ml: isRtl ? 1 : 0.6,
                },
                "&:hover": {
                  borderColor: "#ea4335",
                  bgcolor: alpha("#ea4335", 0.04),
                },
              }}
            >
              {t("continueWithGoogle")}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              disabled={isLoading}
              sx={{
                py: 1.4,
                borderRadius: RADIUS.medium,
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                fontWeight: 600,
                "& .MuiButton-startIcon": {
                  mr: isRtl ? 0.6 : 1,
                  ml: isRtl ? 1 : 0.6,
                },
                "&:hover": {
                  borderColor: "#1877f2",
                  bgcolor: alpha("#1877f2", 0.04),
                },
              }}
            >
              {t("continueWithFacebook")}
            </Button>
          </Stack>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              {t("orContinueWith")}
            </Typography>
          </Divider>

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              {/* Name row */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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

              <TextField
                fullWidth
                label={t("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
                disabled={isLoading}
                sx={fieldSx}
                slotProps={fieldSlotProps}
                {...register("country")}
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
                    slotProps={fieldSlotProps}
                    {...field}
                  >
                    <MenuItem value="student">{t("roleStudent")}</MenuItem>
                    <MenuItem value="parent">{t("roleParent")}</MenuItem>
                  </TextField>
                )}
              />

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
                    startAdornment: isRtl ? (
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
                    endAdornment: !isRtl ? (
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
                    startAdornment: isRtl ? (
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
                    endAdornment: !isRtl ? (
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
                  py: 1.5,
                  borderRadius: RADIUS.medium,
                  fontSize: "1rem",
                  fontWeight: 600,
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
            sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}
          >
            {t("hasAccount")}{" "}
            <Link
              href={`/${locale}/auth/login`}
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: 600,
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
