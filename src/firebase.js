import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCA4ryEzkh0F2YGHGanfDJILByE8KdJD4Y",
  authDomain: "qaxal-33538.firebaseapp.com",
  projectId: "qaxal-33538",
  storageBucket: "qaxal-33538.firebasestorage.app",
  messagingSenderId: "68227562991",
  appId: "1:68227562991:web:39a8e19f1e32fbcb080a1a",
  measurementId: "G-C9N5J8KQXD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);