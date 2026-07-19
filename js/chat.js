import { db } from "./firebase-config.js";
import { currentUser } from "./auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("messages-container");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Lắng nghe và hiển thị tin nhắn (Real-time)
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    container.innerHTML = ""; // Làm sạch khung chat
    snapshot.forEach((doc) => {
        appendMessage(doc.data());
    });
});

// Hàm gửi tin nhắn
async function sendMessage() {
    const text = input.value.trim();
    if (text === "" || !currentUser) return;

    try {
        await addDoc(collection(db, "messages"), {
            text: text,
            senderName: currentUser.displayName,
            senderPhoto: currentUser.photoURL,
            senderId: currentUser.uid,
            createdAt: serverTimestamp()
        });
        input.value = ""; // Xóa chữ trong ô input
    } catch (e) {
        console.error("Lỗi khi gửi:", e);
    }
}

// Hàm tạo giao diện bóng tin nhắn
function appendMessage(data) {
    const div = document.createElement("div");
    
    // Kiểm tra xem tin nhắn này là của mình hay người khác
    const isMe = data.senderId === (currentUser ? currentUser.uid : null);
    
    // Áp class tương ứng (của mình nằm phải, của họ nằm trái)
    div.className = `message-bubble ${isMe ? 'my-message' : 'other-message'}`;
    
    div.innerHTML = `
        <div class="msg-info">
            <img src="${data.senderPhoto || 'assets/default-avatar.png'}" alt="">
            <strong>${data.senderName}</strong>
        </div>
        <p>${data.text}</p>
    `;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // Luôn cuộn xuống dòng mới nhất
}

// Gắn sự kiện click và phím Enter
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if(e.key === 'Enter') sendMessage();
});
