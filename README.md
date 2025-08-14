# 📡 SyncSpace – Online Meeting App with Whiteboard & Realtime Chat

**SyncSpace** là một ứng dụng họp trực tuyến đơn giản, cho phép tạo phòng họp, vẽ bảng trắng theo thời gian thực, bật/tắt video/mic và nhắn tin với bạn bè.

---

## 🚀 Tech Stack

### 💻 Frontend:
- ReactJS (CRA)
- Tailwind CSS

### 🛠 Backend:
- Node.js + Express.js
- Socket.IO (realtime chat + whiteboard)
- JWT (authentication)
- Bcrypt (password hashing)
- Sequelize ORM + MySQL
- SwaggerJS Docs
- Dotenv, Nodemon

---

## 🗄 Database Schema (ERD)

### Main Entities:

- **User**: Đăng ký, đăng nhập, tham gia cuộc họp  
- **MeetingRoom**: Tạo và quản lý phòng họp  
- **UserMeeting**: Quan hệ N-N giữa user và phòng  
- **Message**: Lưu tin nhắn trong phòng họp  
- **WhiteboardAction** *(optional)*: Lưu các thao tác vẽ realtime

> Xem chi tiết sơ đồ ERD trong thư mục `/backend/documents`

---

## 🔑 Features

- ✅ Đăng ký / Đăng nhập (JWT Auth)
- ✅ Tạo / tham gia phòng họp qua Room Code
- ✅ Chat realtime (Socket.IO)
- ✅ Vẽ bảng trắng cùng lúc
- ✅ Bật/tắt micro, camera
- ✅ Kết thúc cuộc họp, thống kê thời gian

## Cách cài đặt và triển khai hệ thống: 
- Clone project: git clone https://github.com/KimNhuong/SyncSpace-OnlineMeetingApp
- Bash: cd backend
        npm install
*notes: tự tạo file .env và tự cấu hình môi trường 

