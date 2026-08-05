import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
} from 'firebase/firestore';

// Public Firebase web config. Falls back to the deployed project's values when
// Vite env vars (used for local dev) are absent — safe, since Firestore security
// is enforced by rules, not by hiding this key.
const fallbackConfig = {
  apiKey: "AIzaSyAHx7sKMMeDcv8xX0-78JFTM294K39STEQ",
  authDomain: "alifrahman-8aae8.firebaseapp.com",
  projectId: "alifrahman-8aae8",
  storageBucket: "alifrahman-8aae8.firebasestorage.app",
  messagingSenderId: "1078820847179",
  appId: "1:1078820847179:web:a2d977f07b6a0bad0757ce",
  measurementId: "G-73GJGQ7DWH",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackConfig.appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Anonymous auth lets Firestore rules permit writes from "any signed-in user".
export function ensureAnonymousUser() {
  return signInAnonymously(auth).catch(() => null);
}

export async function addMessage({ name, email, message }) {
  await addDoc(collection(db, 'messages'), {
    name,
    email,
    message,
    createdAt: serverTimestamp(),
  });
}

export async function incrementVisitors() {
  const ref = doc(db, 'stats', 'visitors');
  await runTransaction(db, async (t) => {
    const snap = await t.get(ref);
    const count = (snap.exists() ? snap.data().count || 0 : 0) + 1;
    t.set(ref, { count }, { merge: true });
  });
}
