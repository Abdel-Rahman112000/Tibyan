"use client";

import React, { useEffect } from "react";
import { FACEBOOK_APP_ID, initFacebookSDK } from "@/lib/auth/social";

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

  // Firebase doesn't require a context provider for auth
  return <>{children}</>;
}
