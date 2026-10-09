import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./client";

export type UserRole = "CREATOR" | "BRAND";

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  creatorId?: string;
  brandId?: string;
  token?: string;
  isDemo?: boolean;
}

const DEMO_CREATOR: AppUser = {
  uid: "user-creator-001",
  email: "aarav@ember.ai",
  name: "Aarav Sharma",
  role: "CREATOR",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  creatorId: "creator-001",
  token: "demo-creator-token",
  isDemo: true
};

const DEMO_BRAND: AppUser = {
  uid: "user-brand-001",
  email: "partnerships@solace.com",
  name: "Solace Studio Brand",
  role: "BRAND",
  profileImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
  brandId: "brand-001",
  token: "demo-brand-token",
  isDemo: true
};

const STORAGE_KEY = "ember_auth_session";

export function getStoredUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AppUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export async function loginDemoCreator(): Promise<AppUser> {
  setStoredUser(DEMO_CREATOR);
  return DEMO_CREATOR;
}

export async function loginDemoBrand(): Promise<AppUser> {
  setStoredUser(DEMO_BRAND);
  return DEMO_BRAND;
}

export async function signIn(email: string, pass: string): Promise<AppUser> {
  if (!auth || !isFirebaseConfigured) {
    // If not configured, provide demo user
    const user = email.includes("brand") ? DEMO_BRAND : DEMO_CREATOR;
    setStoredUser(user);
    return user;
  }
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  const token = await cred.user.getIdToken();
  const appUser: AppUser = {
    uid: cred.user.uid,
    email: cred.user.email || email,
    name: cred.user.displayName || email.split("@")[0],
    role: "CREATOR", // default or retrieved from backend
    profileImage: cred.user.photoURL || undefined,
    token
  };
  setStoredUser(appUser);
  return appUser;
}

export async function signUp(email: string, pass: string, name: string, role: UserRole): Promise<AppUser> {
  if (!auth || !isFirebaseConfigured) {
    const user: AppUser = {
      uid: `demo-${Date.now()}`,
      email,
      name,
      role,
      token: role === "CREATOR" ? "demo-creator-token" : "demo-brand-token",
      isDemo: true
    };
    setStoredUser(user);
    return user;
  }
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const token = await cred.user.getIdToken();
  const appUser: AppUser = {
    uid: cred.user.uid,
    email: cred.user.email || email,
    name,
    role,
    token
  };
  setStoredUser(appUser);
  return appUser;
}

export async function signInGoogle(role: UserRole = "CREATOR"): Promise<AppUser> {
  if (!auth || !isFirebaseConfigured) {
    return loginDemoCreator();
  }
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const token = await cred.user.getIdToken();
  const appUser: AppUser = {
    uid: cred.user.uid,
    email: cred.user.email || "",
    name: cred.user.displayName || "Google User",
    role,
    profileImage: cred.user.photoURL || undefined,
    token
  };
  setStoredUser(appUser);
  return appUser;
}

export async function logOut(): Promise<void> {
  setStoredUser(null);
  if (auth && isFirebaseConfigured) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Sign out error:", e);
    }
  }
}

export async function getAuthToken(): Promise<string> {
  const stored = getStoredUser();
  if (stored?.token) return stored.token;
  if (auth?.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return "";
}
