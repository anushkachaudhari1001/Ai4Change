# TruthLens AI – Architecture

## 1. High-Level Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                     BROWSER (React 19 SPA)                         │
│                                                                    │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Landing   │  │  Auth    │  │Dashboard │  │ Analyze  │  … pages  │
│  └───────────┘  └──────────┘  └──────────┘  └──────────┘           │
│         │             │              │             │               │
│         └─────────────┴──────────────┴─────────────┘               │
│                     Axios (JWT Authentication)                     │
└──────────────────────────────┬─────────────────────────────────────┘
                               │
                               │ HTTPS (/api/*)
                               ▼
┌────────────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND (Uvicorn)                       │
│                                                                    │
│  API Routes                                                        │
│   • /api/auth/*       User Authentication                          │
│   • /api/analyze      AI-powered Fake News Detection               │
│   • /api/upload       PDF / DOCX / TXT Upload                      │
│   • /api/history/*    Analysis History                             │
│   • /api/analytics    Dashboard Statistics                         │
│   • /api/trending     Trending Topics                              │
│   • /api/source(s)    Source Credibility                           │
│   • /api/chat         AI Assistant                                 │
│   • /api/reports/*    PDF & JSON Report Export                     │
│   • /api/feedback     User Feedback                                │
│   • /api/admin/*      Admin Management                             │
│                                                                    │
│ Middleware                                                         │
│   • CORS                                                           │
│   • JWT Authentication (HTTPBearer)                                │
└──────────────┬──────────────────────────────┬──────────────────────┘
               │                              │
               ▼                              ▼
      ┌───────────────────┐          ┌─────────────────────────┐
      │     MongoDB       │          │     OpenRouter API      │
      │  (Motor Async)    │          │                         │
      │                   │          │   Qwen 3 32B (Free)     │
      │ • users           │          │                         │
      │ • articles        │          │ OpenAI-Compatible API   │
      │ • password_resets │          │                         │
      │ • chat_messages   │          │ Used by:                │
      │ • feedback        │          │ • News Analysis         │
      └───────────────────┘          │ • AI Chat Assistant     │
                                     └─────────────────────────┘
```

---

# 2. Module Responsibilities

## Frontend (`/frontend/src/`)

| Module | Responsibility |
|---------|----------------|
| `App.js` | React Router configuration, protected routes, global providers |
| `lib/api.js` | Axios instance with JWT interceptor and automatic authentication handling |
| `lib/auth.jsx` | Authentication context (login, register, logout, profile management) |
| `components/DashboardLayout.jsx` | Sidebar navigation, header, user profile, floating AI Assistant |
| `components/CredibilityGauge.jsx` | Animated credibility score visualization using Framer Motion |
| `components/AIAssistant.jsx` | Interactive AI chat interface communicating with `/api/chat` |
| `pages/Analyze.jsx` | Text, URL, and File analysis interface with live AI results |
| Other Pages | Dashboard, History, Analytics, Reports, Favorites, Profile, Admin Panel |

---

## Backend (`/backend/server.py`)

The backend is implemented as a single FastAPI application and is logically divided into the following sections:

1. **Application Setup**
   - FastAPI initialization
   - MongoDB connection
   - Environment configuration
   - CORS middleware

2. **Data Models**
   - Pydantic request/response schemas
   - Input validation

3. **Authentication**
   - Password hashing using bcrypt
   - JWT token generation
   - User authentication
   - Admin authorization

4. **AI Processing**
   - Builds structured prompts
   - Sends requests to OpenRouter
   - Receives responses from the selected LLM
   - Extracts and validates JSON output

5. **News Source Analysis**
   - Domain extraction
   - Trusted source lookup
   - Credibility scoring

6. **Document Processing**
   - PDF extraction (PyPDF)
   - DOCX extraction (python-docx)
   - TXT support
   - URL content extraction

7. **API Endpoints**
   - Authentication
   - News Analysis
   - Chat
   - Reports
   - Analytics
   - History
   - Admin

---

# 3. Authentication Flow

```
User
 │
 ▼
POST /api/auth/register
 │
 ▼
Hash password using bcrypt
 │
 ▼
Store user in MongoDB
 │
 ▼
Generate JWT Token
 │
 ▼
Return:
{
  token,
  user
}
 │
 ▼
Frontend stores token
(localStorage)
 │
 ▼
Axios automatically attaches:

Authorization: Bearer <JWT>

to every authenticated request.
```

For every protected API request:

```
JWT Token
      │
      ▼
get_current_user()
      │
      ▼
Verify JWT
      │
      ▼
Fetch user from MongoDB
      │
      ▼
Inject authenticated user into route
```

Admin routes additionally verify:

```
user.role == "admin"
```

before granting access.

---

# 4. News Analysis Workflow

For a complete workflow, refer to **WORKFLOW.md**.

Simplified pipeline:

```
User Input
(Text / URL / PDF / DOCX / TXT)
        │
        ▼
Extract Article Text
        │
        ▼
Generate Structured Prompt
        │
        ▼
OpenRouter API
        │
        ▼
Qwen 3 32B
        │
        ▼
JSON Response
        │
        ▼
extract_json()
        │
        ▼
Validate Output
        │
        ▼
Calculate Source Credibility
        │
        ▼
Store in MongoDB
        │
        ▼
Return Analysis to Frontend
```

---

# 5. Design System

- React 19
- Tailwind CSS
- Framer Motion animations
- Responsive mobile-first design
- Glassmorphism UI
- Blue + Teal design language
- Recharts for dashboard analytics
- Fully responsive layout
- SVG-based credibility gauge
- Interactive AI assistant

---

# 6. Security Model

| Layer | Protection |
|--------|------------|
| Password Storage | bcrypt password hashing |
| Authentication | JWT (HS256) |
| Authorization | HTTPBearer |
| Admin Access | Role-based authorization |
| Input Validation | Pydantic request validation |
| File Uploads | PDF, DOCX and TXT validation |
| Database | UUID identifiers, ObjectId removed from API responses |
| CORS | Configurable using `CORS_ORIGINS` |
| API Security | JWT-protected endpoints |
| Production | HTTPS + Reverse Proxy + Rate Limiting recommended |

---

# 7. AI Stack

| Component | Technology |
|-----------|------------|
| AI Gateway | OpenRouter |
| SDK | OpenAI Python SDK |
| Language Model | Qwen 3 32B (Free) |
| Prompt Engineering | Structured JSON Prompt |
| Response Parsing | Custom JSON Extraction |
| Chat Memory | MongoDB |

---

# 8. Database Collections

| Collection | Purpose |
|------------|---------|
| users | User accounts |
| articles | News analysis history |
| password_resets | Password reset requests |
| chat_messages | AI assistant conversations |
| feedback | User ratings and feedback |

---

# 9. External Services

- OpenRouter API (AI inference)
- MongoDB
- JWT Authentication
- HTTPX (URL fetching)
- ReportLab (PDF reports)
- PyPDF (PDF parsing)
- python-docx (DOCX parsing)