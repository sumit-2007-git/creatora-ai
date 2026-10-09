import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBg_WNVthD9FWi-36fWehFeK89VFzP-8Qc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ember-98477.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ember-98477",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ember-98477.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "654762202772",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:654762202772:web:1e2dd5d1a2ed0944410681",
};

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let storageInstance: FirebaseStorage | undefined;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  storageInstance = getStorage(app);
} catch (error) {
  console.warn("Firebase client initialization warning:", error);
}

export const firebaseApp = app;
export const auth = authInstance;
export const storage = storageInstance;
export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("YOUR")
);
