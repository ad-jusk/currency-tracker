import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBfS3pRXCNqwJSr1dvhb3h_E2tqPKFQq1A",
  authDomain: "currency-tracker-b362b.firebaseapp.com",
  projectId: "currency-tracker-b362b",
  storageBucket: "currency-tracker-b362b.firebasestorage.app",
  messagingSenderId: "687426347559",
  appId: "1:687426347559:web:f227e1cdb15b401e9ee402",
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
