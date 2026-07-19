import { auth, googleProvider } from "./firebase-config.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const loginSection = document.getElementById("login-section");
const chatSection = document.getElementById("mustang-chat-app");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userAvatar = document.getElementById("user-avatar");
const userNameDisplay = document.getElementById("user-name");

export let currentUser = null;

// Đăng nhập
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    alert("Lỗi đăng nhập: " + error.message);
  }
});

// Đăng xuất
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Lắng nghe trạng thái (Đã đăng nhập hay chưa)
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loginSection.style.display = "none";
    chatSection.style.display = "flex";
    userAvatar.src = user.photoURL || "assets/default-avatar.png";
    userNameDisplay.innerText = user.displayName;
  } else {
    currentUser = null;
    loginSection.style.display = "block";
    chatSection.style.display = "none";
  }
});
