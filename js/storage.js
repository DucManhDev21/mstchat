// js/storage.js
import { storage } from "./firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

// Hàm này sẽ được gọi khi bạn chọn ảnh
export async function uploadImage(file) {
    if (!file) return null;

    // 1. Đặt tên file không bị trùng (dùng thời gian hiện tại)
    const fileName = `${Date.now()}_${file.name}`;
    
    // 2. Tạo đường dẫn lưu trên Firebase (thư mục chat_images)
    const storageRef = ref(storage, `chat_images/${fileName}`);

    try {
        console.log("Đang tải ảnh lên...");
        // 3. Đẩy file lên Storage
        const snapshot = await uploadBytes(storageRef, file);
        
        // 4. Lấy link URL của ảnh vừa tải lên
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Tải ảnh thành công!", downloadURL);
        
        return downloadURL; // Trả về link để chat.js dùng
    } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        alert("Tải ảnh thất bại!");
        return null;
    }
}
