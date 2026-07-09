
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-2f65a.firebaseapp.com",
  projectId: "interviewiq-2f65a",
  storageBucket: "interviewiq-2f65a.firebasestorage.app",
  messagingSenderId: "169202912151",
  appId: "1:169202912151:web:8e076257fffcad1a8292d2"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}