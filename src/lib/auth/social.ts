// Social Auth Configuration & Utilities

// Environment variables for OAuth credentials
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";

// Facebook SDK types
declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: FacebookAuthResponse) => void,
        options?: { scope?: string },
      ) => void;
      getLoginStatus: (
        callback: (response: FacebookAuthResponse) => void,
      ) => void;
      logout: (callback: () => void) => void;
    };
    fbAsyncInit: () => void;
  }
}

export interface FacebookAuthResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
}

// Initialize Facebook SDK
export function initFacebookSDK(): Promise<void> {
  return new Promise((resolve) => {
    // If already loaded
    if (window.FB) {
      resolve();
      return;
    }

    // Load the SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      resolve();
    };

    // Load SDK script
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
}

// Facebook login helper
export function loginWithFacebook(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error("Facebook SDK not loaded"));
      return;
    }

    window.FB.login(
      (response) => {
        if (response.status === "connected" && response.authResponse) {
          resolve(response.authResponse.accessToken);
        } else {
          reject(new Error("Facebook login was cancelled or failed"));
        }
      },
      { scope: "email,public_profile" },
    );
  });
}

// Check if Facebook is connected
export function getFacebookLoginStatus(): Promise<FacebookAuthResponse> {
  return new Promise((resolve) => {
    if (!window.FB) {
      resolve({ status: "unknown" });
      return;
    }
    window.FB.getLoginStatus(resolve);
  });
}

// Logout from Facebook
export function logoutFromFacebook(): Promise<void> {
  return new Promise((resolve) => {
    if (!window.FB) {
      resolve();
      return;
    }
    window.FB.logout(() => resolve());
  });
}
