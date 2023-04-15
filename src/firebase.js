import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Konfiguracja Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyByqVwbJBlQFacG1aYATMlT54dtmhrbBUM",
  authDomain: "upload-it-dev.firebaseapp.com",
  projectId: "upload-it-dev",
  storageBucket: "upload-it-dev.appspot.com",
  messagingSenderId: "423871758006",
  appId: "1:423871758006:web:0499da03e0bb02b68b3017"
});

// Inicjalizacja Firebase
export const auth = app.auth();

export default firebase;