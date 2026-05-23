"use client";

import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID,
  initFacebookSDK,
} from "@/lib/auth/social";

interface SocialAuthProviderProps {
  children: React.ReactNode;
}

export function SocialAuthProvider({ children }: SocialAuthProviderProps) {
  useEffect(() => {
    // Initialize Facebook SDK when component mounts
    if (FACEBOOK_APP_ID) {
      initFacebookSDK().catch((error) => {
        console.warn("Failed to initialize Facebook SDK:", error);
      });
    }
  }, []);

  // Always wrap with Google OAuth Provider - hooks require the context
  // If no client ID, Google login button will show error when clicked
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "placeholder"}>
      {children}
    </GoogleOAuthProvider>
  );
}
