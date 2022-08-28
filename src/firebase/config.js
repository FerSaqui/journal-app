// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Dev/PROD
const firebaseConfig = {
  apiKey: "AIzaSyBqO2p5nsLqAwVpiLYIW35K7W5IkTb-Dko",
  authDomain: "react-journal-update.firebaseapp.com",
  projectId: "react-journal-update",
  storageBucket: "react-journal-update.appspot.com",
  messagingSenderId: "855321471124",
  appId: "1:855321471124:web:fc28179362c3d5101f6c81"
};

//TESTING
/* const firebaseConfig = {
  apiKey: "AIzaSyB6ORPwvwS6e3lmIaFixHnh82pIOJDUJAU",
  authDomain: "react-journal-test-ambiente.firebaseapp.com",
  projectId: "react-journal-test-ambiente",
  storageBucket: "react-journal-test-ambiente.appspot.com",
  messagingSenderId: "764917810247",
  appId: "1:764917810247:web:05a5f017aa6b77f99c9d62"
};
 */
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );