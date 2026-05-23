import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./config";

/**
 * Sign in with Google using Firebase popup
 * Returns the Firebase user and ID token for backend authentication
 */
export async function signInWithGoogle(): Promise<{
  user: User;
  idToken: string;
}> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    return {
      user: result.user,
      idToken,
    };
  } catch (error: unknown) {
    // Handle specific Firebase auth errors
    if (error && typeof error === "object" && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      switch (firebaseError.code) {
        case "auth/popup-closed-by-user":
          throw new Error("Sign-in cancelled. Please try again.");
        case "auth/popup-blocked":
          throw new Error(
            "Pop-up blocked by browser. Please allow pop-ups for this site.",
          );
        case "auth/cancelled-popup-request":
          throw new Error("Another sign-in is in progress.");
        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection.",
          );
        default:
          throw new Error(
            firebaseError.message || "Google sign-in failed. Please try again.",
          );
      }
    }
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current user's ID token (for backend authentication)
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}
