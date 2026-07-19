<div align="center">

# 🧠 TruthLens AI

### AI-Powered Fake News Detection & Credibility Analysis Platform

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-purple)
![License](https://img.shields.io/badge/License-MIT-green)

### Detect misinformation using Open-Source Large Language Models

</div>

---

# 📖 Overview

TruthLens AI is an AI-powered fake news detection platform that analyzes news articles using modern open-source Large Language Models (LLMs). It helps users determine whether news is likely genuine or misleading by generating credibility scores, explanations, summaries, and AI-powered insights.

Users can analyze news through plain text, URLs, or uploaded documents and interact with an AI assistant to better understand the results.

---

# ✨ Features

## 🤖 AI News Analysis

- Fake vs Real prediction
- Credibility Score (0–100)
- Confidence Percentage
- Risk Level
- AI-generated Summary
- Detailed Reasoning
- Suspicious Claims Detection
- Topic Classification
- Fact-checking Recommendations

---

## 💬 AI Chat Assistant

- Ask follow-up questions
- Context-aware conversations
- AI explanations
- Session-based chat
- Chat history

---

## 📄 Multiple Input Methods

Analyze news using:

- Plain Text
- News URL
- PDF Files
- DOCX Files
- TXT Files

---

## 📊 Dashboard

- User Dashboard
- Analysis History
- Favorite Articles
- Quick Statistics
- Recent Activity

---

## 📑 PDF Report Generation

Generate downloadable reports including:

- Prediction
- Credibility Score
- Confidence
- Summary
- AI Reasoning
- Recommendations
- Source Information

---

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes

---

## 👨‍💼 Admin Features

- User Management
- Platform Statistics
- Feedback Monitoring
- Article Management

---

# 🏗️ Project Structure

```
TruthLens-AI
│
├── backend
│   ├── server.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── docs
│
├── memory
│
└── README.md
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- React Router 7
- Tailwind CSS
- ShadCN UI
- Axios
- Framer Motion
- Recharts

---

## Backend

- FastAPI
- Python
- MongoDB
- Motor
- JWT
- bcrypt
- ReportLab
- PyPDF
- python-docx

---

## Artificial Intelligence

- OpenRouter API
- OpenAI Python SDK
- Qwen3 32B (Free Model)

---

## Database

- MongoDB

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/anushkachaudhari1001/TruthLens-AI.git

cd TruthLens-AI
```

---

## 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn server:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger:

```
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install --legacy-peer-deps

npm start
```

Frontend:

```
http://localhost:3000
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder.

```env
MONGO_URL=your_mongodb_connection_string

DB_NAME=truthlens

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key

CORS_ORIGINS=http://localhost:3000
```

---

# 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | Register user |
| `/api/login` | POST | User login |
| `/api/analyze` | POST | Analyze article |
| `/api/chat` | POST | AI Chat |
| `/api/history` | GET | Analysis history |
| `/api/favorites` | GET | Favorite articles |
| `/api/report/{id}` | GET | Download PDF report |

---

# 🧪 Testing

Verify the application by:

- Registering a new user
- Logging in
- Analyzing article text
- Analyzing URLs
- Uploading PDF/DOCX/TXT files
- Chatting with AI
- Downloading PDF reports
- Viewing History
- Managing Favorites

---

# 📚 Documentation

Additional project documentation is available in the `docs` folder.

- API.md
- ARCHITECTURE.md
- DATABASE.md
- DEPLOYMENT.md
- TROUBLESHOOTING.md
- WORKFLOW.md

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Environment Variables
- Protected API Endpoints
- MongoDB Authentication Support

---

# 📸 Screenshots

Add screenshots of:

- Landing Page
- Login Page
- Dashboard
- News Analysis
- AI Chat
- PDF Report
- History
- Admin Dashboard

---

# 🚀 Future Improvements

- Browser Extension
- Mobile Application
- OCR Support
- Live Fact-check APIs
- Explainable AI
- Multi-language Support
- Source Reputation Database
- Multiple AI Model Selection

---

# 👩‍💻 Developer

Developed as a hackathon project focused on combating misinformation using modern open-source AI technologies.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

**TruthLens AI — Helping users identify misinformation through AI-powered credibility analysis.**

</div>