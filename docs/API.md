# TruthLens AI – REST API Reference

**Base URL**: `${REACT_APP_BACKEND_URL}/api`

**Authentication**

All endpoints except:

- `/auth/register`
- `/auth/login`
- `/auth/google`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/`

require the following header:

```
Authorization: Bearer <token>
```

**Content Type**

- All requests and responses use `application/json` unless otherwise specified.
- `/upload` uses `multipart/form-data`.
- `/reports/{id}/pdf` returns `application/pdf`.

---

## Error Format

```json
{
  "detail": "Human-readable error message"
}
```

Common HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 502 | AI Response Parsing Failed |

---

# Authentication

## POST `/api/auth/register`

Creates a new user account.

> The first registered user is automatically assigned the **admin** role.

### Request

```json
{
  "email": "user@example.com",
  "password": "minimum6characters",
  "name": "Jane Doe"
}
```

### Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Jane Doe",
    "role": "user",
    "auth_provider": "local",
    "theme": "light",
    "default_model": "Qwen 3 32B",
    "created_at": "2026-02-06T00:00:00Z"
  }
}
```

---

## POST `/api/auth/login`

### Request

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Response

Same as Register.

---

## POST `/api/auth/google`

Authenticates a user using Google OAuth.

If the user does not already exist, a new account is created automatically.

### Request

```json
{
  "session_id": "<google-session-id>"
}
```

### Response

Same as Login.

---

## POST `/api/auth/forgot-password`

### Request

```json
{
  "email": "user@example.com"
}
```

### Development Response

```json
{
  "ok": true,
  "reset_token": "uuid",
  "message": "Use this token to reset your password."
}
```

> In production the reset token should be emailed rather than returned.

---

## POST `/api/auth/reset-password`

### Request

```json
{
  "token": "reset-token",
  "new_password": "newpassword"
}
```

### Response

```json
{
  "ok": true
}
```

---

## GET `/api/auth/me`

Returns the currently authenticated user's profile.

---

## PUT `/api/auth/profile`

Updates profile settings.

### Request

```json
{
  "name": "Jane Doe",
  "default_model": "Qwen 3 32B",
  "theme": "light"
}
```

---

# AI Analysis

## POST `/api/analyze`

Analyzes an article using the configured AI model.

The backend supports:

- Direct article text
- News URL
- AI-powered credibility analysis

### Request

```json
{
  "headline": "Optional headline",
  "text": "Article body",
  "url": "https://example.com/article",
  "model": "Qwen 3 32B"
}
```

If `url` is supplied and `text` is empty, the backend automatically downloads and extracts the article content.

### Response

Returns an **Analysis Object**.

---

## POST `/api/upload`

Uploads and analyzes:

- PDF
- DOCX
- TXT

### Form Fields

| Field | Required |
|--------|----------|
| file | Yes |
| headline | No |

Returns an **Analysis Object**.

---

# Analysis Object

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "headline": "...",
  "text": "...",
  "url": "...",
  "filename": "article.pdf",
  "created_at": "2026-02-06T12:34:56Z",
  "favorite": false,

  "source": {
    "domain": "reuters.com",
    "score": 95,
    "trust": "Trusted",
    "bias": "Center",
    "known": true,
    "historical_fake_rate": 5
  },

  "prediction": "real",
  "confidence": 92,
  "credibility_score": 87,
  "risk_level": "low",

  "summary": "...",

  "reasoning": "...",

  "factors": {
    "writing_style": 88,
    "headline_quality": 90,
    "source_reputation": 95,
    "language_complexity": 82,
    "evidence_presence": 88,
    "bias": 25,
    "emotional_language": 15,
    "historical_reliability": 92
  },

  "highlights": [
    {
      "phrase": "...",
      "category": "clickbait",
      "reason": "..."
    }
  ],

  "topics": [
    "technology"
  ],

  "recommendations": [
    "Verify using trusted sources."
  ],

  "suspicious_statements": [
    "..."
  ],

  "time_taken_sec": 2.1,

  "model_used": "Qwen 3 32B"
}
```

---

# History

## GET `/api/history`

Returns previous analyses.

Optional query parameters:

- q
- prediction
- favorite
- topic
- limit

---

## GET `/api/history/{id}`

Returns one analysis.

---

## DELETE `/api/history/{id}`

Deletes an analysis.

---

## POST `/api/history/{id}/favorite`

Toggles favorite status.

---

# Analytics

## GET `/api/analytics`

Returns dashboard analytics including:

- Total analyses
- Real/Fake counts
- Average credibility
- Timeline
- Topic distribution
- Confidence histogram

---

## GET `/api/trending`

Returns trending topics across recent analyses.

---

# Source Ratings

## GET `/api/sources`

Returns all supported news sources with credibility scores.

---

## GET `/api/source-rating`

```
GET /api/source-rating?url=https://example.com/article
```

Returns credibility information for the supplied domain.

---

# Reports

## GET `/api/reports/{id}/pdf`

Downloads the PDF report.

---

## GET `/api/reports/{id}/json`

Returns the complete JSON analysis.

---

# AI Chat

## POST `/api/chat`

Interactive AI assistant for discussing analyzed articles.

### Request

```json
{
  "message": "Why is this article suspicious?",
  "article_id": "optional",
  "session_id": "optional"
}
```

### Response

```json
{
  "response": "AI explanation...",
  "session_id": "chat-user-id"
}
```

The assistant uses the configured **OpenRouter-compatible AI model** (currently **Qwen 3 32B**) together with article context to answer follow-up questions.

---

# Feedback

## POST `/api/feedback`

### Request

```json
{
  "article_id": "uuid",
  "rating": 5,
  "comment": "Helpful analysis."
}
```

---

# Admin

All Admin endpoints require the authenticated user to have the **admin** role.

## GET `/api/admin/users`

Returns all registered users.

---

## GET `/api/admin/stats`

Returns overall platform statistics.

---

## DELETE `/api/admin/users/{user_id}`

Deletes a user and all associated analyses.

The currently logged-in administrator cannot delete their own account.

---

# Rate Limiting

No application-level rate limiting is implemented.

For production deployments, rate limiting should be configured through a reverse proxy such as Nginx, Apache, Cloudflare, or an API Gateway.

---

# OpenAPI Documentation

FastAPI automatically generates API documentation.

| Endpoint | URL |
|-----------|-----|
| Swagger UI | `${BACKEND_URL}/docs` |
| ReDoc | `${BACKEND_URL}/redoc` |
| OpenAPI JSON | `${BACKEND_URL}/openapi.json` |

---

# AI Provider

TruthLens AI uses:

- **OpenRouter API**
- **Qwen 3 32B (Free)** (default)
- Compatible with any OpenAI-compatible model supported by OpenRouter by changing the configured model name.