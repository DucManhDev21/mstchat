import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIkcg_JzSCWORJt4EKm0gG4XOCcz8a7UI",
  authDomain: "mstchat-f967d.firebaseapp.com",
  projectId: "mstchat-f967d",
  storageBucket: "mstchat-f967d.firebasestorage.app",
  messagingSenderId: "13505298709",
  appId: "1:13505298709:web:da999c2d5f25d9bb4fa91c",
  measurementId: "G-5S081E93W6"
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Xuất các dịch vụ ra ngoài để file khác gọi được
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

