
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBftrZAWLoLwPzgO9pQaXP-4qEylwbQw00",
  authDomain: "todo-5d04f.firebaseapp.com",
  projectId: "todo-5d04f",
  storageBucket: "todo-5d04f.appspot.com",
  messagingSenderId: "845234498076",
  appId: "1:845234498076:web:f9a66eb22679faf8464dd9",
  measurementId: "G-3FPL1VPHW5",
  databaseURL: "https://todo-5d04f-default-rtdb.asia-southeast1.firebasedatabase.app",
};


const app = initializeApp(firebaseConfig);

export default app;