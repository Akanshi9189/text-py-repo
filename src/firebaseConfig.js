import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDy6vO_oe8gvWfWHemEPZjwrJONRcAFzlA",
    authDomain: "medicine-reminder-7c35c.firebaseapp.com",
    projectId: "medicine-reminder-7c35c",
    storageBucket: "medicine-reminder-7c35c.firebasestorage.app",
    messagingSenderId: "990409909647",
    appId: "1:990409909647:web:8609d869cf14962c9cd7fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
