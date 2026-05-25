import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase safely
let app;
try {
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  } else {
    console.error("Firebase VITE_FIREBASE_API_KEY is missing. Please add it to your Vercel Environment Variables.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// Export services safely even if app initialization fails or throws
let auth: any = {} as any;
let db: any = {} as any;

if (app) {
  try {
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase getAuth failed:", error);
  }
  try {
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase getFirestore failed:", error);
  }
}

export const analytics = app && typeof window !== 'undefined' ? getAnalytics(app) : null;
export { auth, db };
export default app;
