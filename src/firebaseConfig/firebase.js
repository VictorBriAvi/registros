import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMpEqgmNqza0TFSW0vaUJyQeF0L0sKXlY",
  authDomain: "calculospeluqueria.firebaseapp.com",
  projectId: "calculospeluqueria",
  storageBucket: "calculospeluqueria.appspot.com",
  messagingSenderId: "736946055567",
  appId: "1:736946055567:web:ececd76c1cbc5c25e6c3fa",
  measurementId: "G-3YKFZZL4E8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
