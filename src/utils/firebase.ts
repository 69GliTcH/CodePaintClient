// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQupAvfO77t3jfyxZ4QGg8P2C7651wwr8",
    authDomain: "codepaint-c7512.firebaseapp.com",
    projectId: "codepaint-c7512",
    storageBucket: "codepaint-c7512.appspot.com",
    messagingSenderId: "473394959180",
    appId: "1:473394959180:web:64c096ebf26ce52dd335e9",
    measurementId: "G-TQPNJY8PD8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
