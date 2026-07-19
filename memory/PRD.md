# TruthLens AI - Product Requirements Document

## Project Overview

TruthLens AI is a full-stack AI-powered web application designed to detect potential misinformation and assess the credibility of news articles. The system leverages Large Language Models (LLMs), Natural Language Processing (NLP), and Explainable AI techniques to analyze articles submitted as text, URLs, or uploaded documents.

The platform provides credibility scoring, AI-generated explanations, highlighted suspicious statements, historical analysis, downloadable reports, analytics dashboards, AI-assisted discussions, and administrative controls.

---

# Problem Statement

The rapid spread of misinformation across digital platforms makes it increasingly difficult for users to distinguish between trustworthy and misleading information.

TruthLens AI aims to assist journalists, researchers, students, and everyday readers by providing AI-assisted credibility analysis and explainable reasoning rather than acting as an absolute source of truth.

---

# Objectives

The application should allow users to:

- Analyze news articles from text, URLs, or uploaded files.
- Detect potentially misleading or low-credibility content.
- Generate an AI explanation for every prediction.
- Display credibility and confidence scores.
- Highlight suspicious statements inside articles.
- Generate downloadable PDF and JSON reports.
- Track previous analyses.
- Chat with an AI assistant about analyzed articles.
- Provide dashboard analytics.
- Support administrator management features.

---

# Technology Stack

## Frontend

- React 19
- React Router 7
- Tailwind CSS
- ShadCN UI
- Axios
- Framer Motion
- Recharts

## Backend

- FastAPI
- Python
- MongoDB
- Motor (Async MongoDB Driver)
- JWT Authentication
- bcrypt
- ReportLab
- PyPDF
- python-docx

## AI

- OpenRouter API
- Qwen 3 32B (Free)
- OpenAI Python SDK

## Database

MongoDB

---

# System Architecture

## Backend

The backend exposes REST APIs through FastAPI under the `/api` route.

Main responsibilities include:

- User authentication
- Article analysis
- AI communication
- Report generation
- Database operations
- File extraction
- Chat management
- Administrative operations

---

## Frontend

The frontend provides:

- Landing Page
- Authentication
- Dashboard
- Analysis Page
- History
- Trending Analytics
- AI Chat
- Settings
- Admin Panel

---

## Database Collections

- users
- articles
- password_resets
- chat_messages
- feedback

---

# User Roles

## 1. General User

Can:

- Register
- Login
- Analyze articles
- Upload files
- Generate reports
- View history
- Use AI Chat
- Manage favorites

---

## 2. Administrator

Can:

- View users
- Delete users
- View analytics
- Monitor platform usage

---

# Core Features

## Authentication

- Email & Password Registration
- JWT Login
- Password Reset
- User Profile Management

---

## AI News Analysis

Supports:

- Plain Text
- Website URLs
- PDF Files
- DOCX Files
- TXT Files

Returns:

- Prediction
- Confidence
- Credibility Score
- Risk Level
- Summary
- AI Reasoning
- Topic Classification
- Highlighted Suspicious Statements
- Fact-check Recommendations

---

## Explainable AI

Each prediction includes:

- Highlighted article phrases
- Explanation for every highlighted section
- Writing style evaluation
- Bias detection
- Emotional language analysis
- Evidence assessment

---

## Dashboard

Displays:

- Total analyses
- Fake vs Real ratio
- Average credibility
- Confidence trends
- Topic distribution

---

## History

Users can:

- Search analyses
- Filter analyses
- Delete analyses
- Mark favorites
- View previous reports

---

## Reports

Supports exporting:

- PDF Reports
- JSON Reports

---

## Source Reliability

Known news domains receive:

- Trust score
- Bias indicator
- Reliability rating

---

## AI Chat Assistant

The integrated AI assistant can:

- Explain predictions
- Discuss analyzed articles
- Answer follow-up questions
- Maintain conversation history

---

## Trending Analytics

Displays:

- Topic frequency
- Fake vs Real distribution
- Credibility trends

---

## Settings

Users can configure:

- Display Name
- Preferred AI Model
- Theme

---

## Admin Panel

Administrators can:

- View platform statistics
- Manage users
- Delete user accounts

---

# Current Implementation Status

## Completed

- Landing Page
- User Authentication
- JWT Authorization
- AI-powered Article Analysis
- Explainable AI Results
- Dashboard Analytics
- History Management
- Favorites
- AI Chat Assistant
- PDF Report Generation
- JSON Export
- Source Reliability
- Trending Analytics
- Settings
- Admin Panel

---

# Future Enhancements

## High Priority

- Browser Extension
- Docker Deployment
- GitHub Actions CI/CD
- Dark Mode Improvements

---

## Medium Priority

- Google Fact Check API Integration
- Batch CSV Analysis
- Email Service Integration
- Real-time Streaming Responses
- Offline Transformer Models

---

# Non-Functional Requirements

- Responsive Design
- Secure JWT Authentication
- Fast AI Response Time
- Explainable Predictions
- Modular Backend Architecture
- Scalable MongoDB Storage
- Cross-platform Compatibility

---

# Target Users

- Journalists
- Researchers
- Students
- Educators
- Fact-checkers
- General News Readers

---

# Conclusion

TruthLens AI provides an intelligent, explainable, and user-friendly platform for evaluating the credibility of news articles. By combining modern web technologies with open-source Large Language Models through OpenRouter, the system enables users to better understand potential misinformation while promoting media literacy and responsible information consumption.