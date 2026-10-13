import api, { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/axios";
import Cookies from "js-cookie";
import type {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  SocialAuthPayload,
  User,
} from "./types";

// Login with email/password
export async function loginWithEmail(
  data: LoginFormData,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

// Register with form
export async function registerWithForm(
  data: RegisterFormData,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
}

// Social login (Google / Facebook)
export async function socialLogin(
  data: SocialAuthPayload,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/social", data);
  return response.data;
}

// Get current user profile
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<{ success: boolean; data: User }>("/auth/me");
  return response.data.data;
}

// Logout
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
}

// Store tokens in cookies
export function storeTokens(accessToken: string, refreshToken: string): void {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 1, // 1 day
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    secure: true,
    sameSite: "strict",
    expires: 7, // 7 days
  });
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!Cookies.get(ACCESS_TOKEN_KEY);
}
