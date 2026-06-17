import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2ydYGT-P6CepQIgsgZiBnmn0gLp8sQWc",
  authDomain: "neuromedit.firebaseapp.com",
  projectId: "neuromedit",
  storageBucket: "neuromedit.firebasestorage.app",
  messagingSenderId: "117112465445",
  appId: "1:117112465445:web:f440b328a89855b6f077cc",
  measurementId: "G-RSECJXYD9L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc };
