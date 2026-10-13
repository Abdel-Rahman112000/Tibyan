import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = () => Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId,
);

let cachedAuth: Auth | undefined;

// Initialize only when Google sign-in is used. Missing deployment settings must
// not crash unrelated pages while their modules are loading.
export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured()) {
    throw new Error("Google login is not configured");
  }

  if (!cachedAuth) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    cachedAuth = getAuth(app);
  }

  return cachedAuth;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
