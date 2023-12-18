import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCowDpde6uUM1RS98_440wK-vPPfpCYP7Q",
  authDomain: "final-year-project-11791.firebaseapp.com",
  projectId: "final-year-project-11791",
  storageBucket: "final-year-project-11791.appspot.com",
  messagingSenderId: "740773453026",
  appId: "1:740773453026:web:1a719ca04a6c88d3fd12bb",
  measurementId: "G-K4D5B5YTLK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
