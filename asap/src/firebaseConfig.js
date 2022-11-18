// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB2sC48Q6qTBrTrSMXEHzaLUWQqtyB7NTk",
  authDomain: "asap-a-safe-place.firebaseapp.com",
  projectId: "asap-a-safe-place",
  storageBucket: "asap-a-safe-place.appspot.com",
  messagingSenderId: "308493924321",
  appId: "1:308493924321:web:937753c4080ab5720f84a0",
  measurementId: "G-Z84BKBJPM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
