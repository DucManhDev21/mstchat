const themeSelector = document.getElementById("theme-selector");

// Kiểm tra xem trước đó đã lưu màu gì chưa
const savedTheme = localStorage.getItem("mustang-theme") || "light";

// Áp dụng màu đó ngay khi tải trang
document.documentElement.setAttribute("data-theme", savedTheme);
themeSelector.value = savedTheme;

// Xử lý khi người dùng chọn màu mới
themeSelector.addEventListener("change", (e) => {
    const newTheme = e.target.value;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("mustang-theme", newTheme); // Lưu vào máy
});
