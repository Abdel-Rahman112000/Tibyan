import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  loginWithEmail,
  registerWithForm,
  socialLogin,
  getCurrentUser,
  logout,
  storeTokens,
  isAuthenticated,
} from "./api";
import type {
  LoginFormData,
  RegisterFormData,
  SocialAuthPayload,
  ApiError,
  AuthResponse,
} from "./types";

const AUTH_USER_KEY = ["auth", "user"];

// Hook: Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_USER_KEY,
    queryFn: getCurrentUser,
    enabled: isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook: Login with email
export function useLogin() {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginWithEmail(data),
    onSuccess: (response: AuthResponse) => {
      const { tokens, user } = response.data;
      storeTokens(tokens.accessToken, tokens.refreshToken);
      queryClient.setQueryData(AUTH_USER_KEY, user);
      toast.success(response.message || "Login successful!");
      router.push(`/${locale}`);
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });
}

// Hook: Register with form
export function useRegister() {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerWithForm(data),
    onSuccess: (response: AuthResponse) => {
      const { tokens, user } = response.data;
      storeTokens(tokens.accessToken, tokens.refreshToken);
      queryClient.setQueryData(AUTH_USER_KEY, user);
      toast.success(response.message || "Registration successful!");
      router.push(`/${locale}`);
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    },
  });
}

// Hook: Social login (Google / Facebook)
export function useSocialAuth() {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SocialAuthPayload) => socialLogin(data),
    onSuccess: (response: AuthResponse) => {
      const { tokens, user } = response.data;
      storeTokens(tokens.accessToken, tokens.refreshToken);
      queryClient.setQueryData(AUTH_USER_KEY, user);
      toast.success(response.message || "Login successful!");
      router.push(`/${locale}`);
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        "Social login failed. Please try again.";
      toast.error(message);
    },
  });
}

// Hook: Logout
export function useLogout() {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: AUTH_USER_KEY });
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push(`/${locale}/auth/login`);
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
}
