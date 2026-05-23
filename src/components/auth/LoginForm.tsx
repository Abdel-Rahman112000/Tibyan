"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useLogin, useSocialAuth, createLoginSchema } from "@/lib/auth";
import {
  loginWithFacebook,
  GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID,
} from "@/lib/auth/social";
import type { LoginFormValues } from "@/lib/auth";
import { RADIUS } from "@/theme/spacing";
import { AuthTextField } from "./AuthFields";

export default function LoginPage() {
  const t = useTranslations("auth");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [showPassword, setShowPassword] = React.useState(false);

  const loginMutation = useLogin();
  const socialMutation = useSocialAuth();

  const schema = React.useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
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

  const isLoading = loginMutation.isPending || socialMutation.isPending;

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        minHeight: "100dvh",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        py: 0,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0a0f0d 0%, #0d1f18 50%, #0a0f0d 100%)"
            : "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fafaf8 100%)",
      }}
    >
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
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 1.5, md: 2 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxHeight: "100%",
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: RADIUS.xl,
            background: alpha(theme.palette.background.paper, 0.88),
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow: theme.shadows[4],
            backdropFilter: "blur(10px)",
            overflow: "hidden",
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
              {t("loginTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("loginSubtitle")}
            </Typography>
          </Box>

          {/* Email/Password Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
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
                label={t("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: isRtl ? "flex-start" : "flex-end",
                }}
              >
                <Link
                  href={`/${locale}/auth/forgot-password`}
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {t("forgotPassword")}
                </Link>
              </Box>

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
                  t("loginButton")
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

          {/* Register link */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 2.5, color: "text.secondary" }}
          >
            {t("noAccount")}{" "}
            <Link
              href={`/${locale}/auth/register`}
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {t("registerLink")}
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
