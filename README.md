# 🧾 PDF Editor & AI Summarizer

> ✨ Upload, edit, and summarize your PDFs like magic — powered by AI ✨

---

## 📌 What is this?

This is a full-stack web application that lets users:

🔐 **Sign up/Login** securely  
📄 **Upload PDFs** from any device  
📝 **Edit the text** inside the PDF with a rich editor  
🧠 **Generate AI summaries** instantly using OpenAI  
💾 **Save and manage documents** with your own account

---

## ⚙️ Built With

### 🔷 Frontend

- ⚛️ React (Vite)
- 📜 React Quill (for rich text editing)
- 🌐 Axios for API calls
- 🎨 Tailwind CSS (or inline styles)

### 🔶 Backend

- 🖥️ Node.js + Express.js
- 🔐 JWT + Bcrypt for auth
- 📦 MongoDB + Mongoose
- 📤 Multer (PDF uploads)
- 📖 pdf-parse (PDF text extraction)
- 🧠 OpenAI API (GPT for summarization)

---

## 🧠 Features You’ll Love

| Feature               | Description                                        |
| --------------------- | -------------------------------------------------- |
| ✅ Signup/Login       | JWT-based authentication with hashed passwords     |
| 📤 Upload PDF         | Upload and parse .pdf files securely               |
| 📝 Edit Text          | Modify extracted text in a clean, rich editor      |
| 🤖 AI Summary         | Instant summary generation using GPT               |
| 💾 Save & Manage Docs | View your history, revisit or delete saved content |
| 📱 Mobile-Responsive  | Works on mobile, tablet, and desktop               |

---

## 🧰 Project Structure

/client → React frontend (Vite)
/server → Node + Express backend
/uploads → Temporary storage for PDFs

---

## 🚀 Getting Started

### 1. Clone the Repo

git clone https://github.com/your-username/pdf-ai-editor.git
cd pdf-ai-editor

### 2. Backend Setup

cd server
npm install

### 🔐 Create a .env file inside /server:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key

npm run dev
