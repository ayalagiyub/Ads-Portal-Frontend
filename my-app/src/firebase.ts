// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaAoFASLsK8vtlVR3ulZl9I6ARv1DeFQg",
  authDomain: "final-project-java-eacea.firebaseapp.com",
  projectId: "final-project-java-eacea",
  storageBucket: "final-project-java-eacea.firebasestorage.app",
  messagingSenderId: "8605007450",
  appId: "1:8605007450:web:28b8faceff711518a9e263",
  measurementId: "G-MBTJL4E1BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);