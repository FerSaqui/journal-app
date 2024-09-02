// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

console.log(firebaseConfig)

//for TESTING environment
// const firebaseConfig = {
//   apiKey: "AIzaSyD7Dhar4ofvHYNlQxwOT9TAEGm_PHn4Viw",
//   authDomain: "react-journal-test-a66cd.firebaseapp.com",
//   projectId: "react-journal-test-a66cd",
//   storageBucket: "react-journal-test-a66cd.appspot.com",
//   messagingSenderId: "292490353945",
//   appId: "1:292490353945:web:47c177819d2607ebc33988"
// };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Authentication
export const FirebaseAuth = getAuth(FirebaseApp);

//Database
export const FirebaseDB = getFirestore(FirebaseApp);