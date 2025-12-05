// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn35M6fpJUSviaFO35230s67GlLoXmPX4",
  authDomain: "eco-voice.firebaseapp.com",
  projectId: "eco-voice",
  storageBucket: "eco-voice.firebasestorage.app",
  messagingSenderId: "60649072042",
  appId: "1:60649072042:web:ba7a8ee7ab74fa50a4f7d3",
  measurementId: "G-PL04RVW9ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db,auth };