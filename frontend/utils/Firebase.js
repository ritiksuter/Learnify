import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "lms-system-a45c6.firebaseapp.com",
  projectId: "lms-system-a45c6",
  storageBucket: "lms-system-a45c6.firebasestorage.app",
  messagingSenderId: "266703207334",
  appId: "1:266703207334:web:536a52f7ddc15baa342d67",
  measurementId: "G-78KV3HL3XJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};