# 🧱 Base image
FROM node:20.18.3-alpine

# 🏗️ Làm việc trong thư mục /app
WORKDIR /app

# 📦 Copy file cấu hình trước để cache npm install
COPY package*.json ./

# 🔧 Cài dependencies
RUN npm install

# 🧩 Copy toàn bộ source code vào container
COPY . .

# 🔥 Expose cổng React dev server
EXPOSE 3000

# 🚀 Chạy React dev server
CMD ["npm", "start"]
