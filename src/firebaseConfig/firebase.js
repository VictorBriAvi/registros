import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMpEqgmNqza0TFSW0vaUJyQeF0L0sKXlY",
  authDomain: "calculospeluqueria.firebaseapp.com",
  projectId: "calculospeluqueria",
  storageBucket: "calculospeluqueria.appspot.com",
  messagingSenderId: "736946055567",
  appId: "1:736946055567:web:ececd76c1cbc5c25e6c3fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
