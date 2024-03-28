import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxmkdfhNvJxzTAhrSoNLxHJ-9-rm5eIqg",
  authDomain: "votesup-19e2f.firebaseapp.com",
  projectId: "votesup-19e2f",
  storageBucket: "votesup-19e2f.appspot.com",
  messagingSenderId: "1067507050144",
  appId: "1:1067507050144:web:093a335ea081e9ebce0bc5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default db;
export { auth };
