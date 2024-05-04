import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwKcWCUMGaHZon9S0GW-X-QtzwFmuaQKc",
  authDomain: "loginsignup-28bf9.firebaseapp.com",
  projectId: "loginsignup-28bf9",
  storageBucket: "loginsignup-28bf9.appspot.com",
  messagingSenderId: "786235885440",
  appId: "1:786235885440:web:8b0066507d494b376b2365",
  measurementId: "G-WVBCBFPEJ8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
