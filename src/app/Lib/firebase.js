import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAG3CpQClLQOID-xb69J6ZjWp10Xj_Iyw",
  authDomain: "welleats-16bdc.firebaseapp.com",
  projectId: "welleats-16bdc",
  storageBucket: "welleats-16bdc.firebasestorage.app",
  messagingSenderId: "603483492885",
  appId: "1:603483492885:web:7abb86ac67020e740cb41c",
  measurementId: "G-EGH942E6TB",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
