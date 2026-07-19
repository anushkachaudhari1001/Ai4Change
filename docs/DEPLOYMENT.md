# TruthLens AI – Deployment Guide

This document explains how to deploy **TruthLens AI** locally and on cloud platforms such as Render, Railway, AWS, or Docker.

---

# 1. Project Overview

TruthLens AI consists of:

- **Frontend:** React 19
- **Backend:** FastAPI
- **Database:** MongoDB
- **AI Provider:** OpenRouter API
- **LLM:** Qwen 3 32B (Free) *(or any OpenRouter-compatible model)*

---

# 2. Environment Variables

## Backend (`backend/.env`)

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=truthlens

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key

CORS_ORIGINS=http://localhost:3000
```

---

## Frontend (`frontend/.env`)

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

---

# 3. Local Deployment

## Backend

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the FastAPI server.

```bash
uvicorn server:app --reload
```

Backend will be available at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm start
```

Frontend will run at

```
http://localhost:3000
```

---

# 4. Docker Deployment

## Backend Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn","server:app","--host","0.0.0.0","--port","8000"]
```

---

## Frontend Dockerfile

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
```

---

## docker-compose.yml

```yaml
version: "3.9"

services:

  mongodb:
    image: mongo:7
    restart: always
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    env_file:
      - ./backend/.env
    depends_on:
      - mongodb
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    depends_on:
      - backend
    ports:
      - "3000:80"
```

Run

```bash
docker compose up --build
```

---

# 5. Deploying on Render

## Backend

Create a new **Web Service**.

Build Command

```bash
pip install -r requirements.txt
```

Start Command

```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

Environment Variables

```
MONGO_URL
DB_NAME
JWT_SECRET
OPENROUTER_API_KEY
CORS_ORIGINS
```

---

## Frontend

Create a Static Site.

Build Command

```bash
npm install
npm run build
```

Publish Directory

```
build
```

Environment Variable

```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

# 6. Deploying on Railway

Create a Railway project.

Add:

- MongoDB
- Backend
- Frontend

Backend Start Command

```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

Frontend Build

```bash
npm install
npm run build
```

Set all backend environment variables.

---

# 7. Deploying on AWS

## Backend

Deploy using:

- ECS Fargate
- EC2
- Elastic Beanstalk

Store secrets using:

- AWS Secrets Manager

---

## Frontend

Deploy to:

- Amazon S3
- CloudFront

Upload the production build generated using

```bash
npm run build
```

---

## Database

Recommended

MongoDB Atlas

---

# 8. Production Checklist

Before deploying to production ensure:

- JWT_SECRET is a strong random string.
- MongoDB authentication is enabled.
- HTTPS is enabled.
- CORS_ORIGINS contains only your frontend domain.
- MongoDB backups are configured.
- Logging is enabled.
- Rate limiting is configured.
- OPENROUTER_API_KEY is valid.
- Monitor OpenRouter API usage and costs.
- Enable uptime monitoring.

---

# 9. API Health Check

The backend exposes a simple health endpoint.

```
GET /api/
```

Expected Response

```json
{
    "message": "TruthLens AI API",
    "version": "1.0"
}
```

Swagger Documentation

```
GET /docs
```

---

# 10. Troubleshooting

## Backend does not start

Check:

- Python version
- Installed dependencies
- MongoDB connection
- Environment variables

---

## AI requests fail

Verify:

- OPENROUTER_API_KEY is correct.
- Internet connection is available.
- Selected OpenRouter model is available.

---

## Frontend cannot connect to backend

Ensure

```
REACT_APP_BACKEND_URL
```

points to the correct backend URL.

---

## MongoDB connection fails

Verify:

- MongoDB service is running.
- MONGO_URL is correct.
- Database name exists.

---

# 11. Supported AI Models

TruthLens AI supports any OpenRouter-compatible model.

Examples:

- Qwen 3 32B (Free)
- DeepSeek Chat
- Llama 3
- Mistral
- Gemma
- Claude (paid)
- GPT models (paid)

Changing models only requires updating the model name in `server.py`.

---

# 12. License

This project is intended for educational and research purposes. Users should verify AI-generated results with trusted fact-checking sources before making decisions.