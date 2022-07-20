import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEpV1xxpyBF-gM_nWIpY149HpLEYhW84w",
  authDomain: "student-portal-5af58.firebaseapp.com",
  projectId: "student-portal-5af58",
  storageBucket: "student-portal-5af58.appspot.com",
  messagingSenderId: "872278020302",
  appId: "1:872278020302:web:17e09bcf78eb88bd10409f",
  measurementId: "G-TK958W3ZTS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
