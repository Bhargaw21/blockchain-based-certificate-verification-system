// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfVpGZ8nK-h2ZzvEhE5Tm8iLU5N0FkcRc",
  authDomain: "blockchain-project-4467b.firebaseapp.com",
  projectId: "blockchain-project-4467b",
  storageBucket: "blockchain-project-4467b.firebasestorage.app",
  messagingSenderId: "863179737262",
  appId: "1:863179737262:web:c6a5fb83a484b68aea453f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

