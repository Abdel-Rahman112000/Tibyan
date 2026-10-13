// Auth request/response types

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  role: "student" | "teacher";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  role: "student" | "parent" | "teacher" | "admin";
  avatar?: string;
  isVerified: boolean;
  provider: "email" | "google" | "facebook";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface SocialAuthPayload {
  provider: "google" | "facebook";
  accessToken: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
