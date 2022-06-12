import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

//Aqui pon la informacion que te habia arrojado antes el firebase y no deberia haber peo
const firebaseConfig = {
  apiKey: "AIzaSyAXx0EmxOIHn-uSBDSHZqWfn2IZ1ASuuKg",
  authDomain: "guessme-741c9.firebaseapp.com",
  projectId: "guessme-741c9",
  storageBucket: "guessme-741c9.appspot.com",
  messagingSenderId: "157450027169",
  appId: "1:157450027169:web:2ea7eb096285f6c3fcb0e0",
  measurementId: "G-80810VBXBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

