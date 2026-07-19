# TruthLens AI – Database Schema

**Database Engine:** MongoDB (accessed using the asynchronous `motor` driver)

**Database Name:** Configured using the `DB_NAME` environment variable.

---

# Conventions

- Every document contains a **string** `id` field generated using `uuid.uuid4()`. This serves as the public primary key.
- MongoDB's native `_id` (`ObjectId`) is retained internally but is **never returned** by the API (`{"_id": 0}` projection or `pop("_id", None)`).
- All timestamps are stored as **ISO-8601 UTC strings**, making them JSON serializable.
- AI-generated analysis is performed using an **OpenRouter-compatible Large Language Model (LLM)**.
- Recommended production indexes:
  - `users.email` (Unique)
  - `articles.user_id + created_at`
  - `articles.topics`
  - `chat_messages.session_id`

---

# Collections

---

## 1. `users`

Stores all registered users.

The first registered account is automatically promoted to the **Admin** role.

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Public primary key |
| email | string | Unique email address |
| name | string | Display name |
| password | string | bcrypt hash (never returned by API) |
| role | string | `admin`, `analyst`, or `user` |
| auth_provider | string | `local` or `google` |
| picture | string / null | Google profile image |
| theme | string | `light`, `dark`, or `system` |
| default_model | string | Default AI model (e.g. `qwen/qwen3-32b:free`) |
| created_at | ISO Date String | Registration timestamp |

---

## 2. `articles`

Stores every article analyzed through either:

- `/api/analyze`
- `/api/upload`

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Article ID |
| user_id | string | References `users.id` |
| headline | string | Optional article title |
| text | string | Article text (max 10,000 chars) |
| url | string | Source URL (optional) |
| filename | string | Present only for uploaded files |
| favorite | boolean | User favorite status |
| created_at | ISO Date String | Analysis timestamp |
| source | object / null | Source credibility information |
| prediction | string | `real` or `fake` |
| confidence | integer | Confidence percentage (50–99) |
| credibility_score | integer | Score between 0–100 |
| risk_level | string | `low`, `medium`, or `high` |
| summary | string | AI-generated summary |
| reasoning | string | AI explanation |
| factors | object | Individual credibility metrics |
| highlights | array | Flagged phrases with explanations |
| topics | array | Detected news categories |
| recommendations | array | Suggested fact-checking steps |
| suspicious_statements | array | Potential misinformation claims |
| time_taken_sec | float | AI response time |
| model_used | string | AI model used for analysis |

### Example `source`

```json
{
  "domain": "reuters.com",
  "score": 95,
  "trust": "Trusted",
  "bias": "Center",
  "known": true,
  "historical_fake_rate": 5
}
```

### Example `factors`

```json
{
  "writing_style": 88,
  "headline_quality": 90,
  "source_reputation": 95,
  "language_complexity": 82,
  "evidence_presence": 88,
  "bias": 25,
  "emotional_language": 15,
  "historical_reliability": 92
}
```

---

## 3. `password_resets`

Stores temporary password reset tokens.

| Field | Type | Description |
|-------|------|-------------|
| token | string (UUID) | Reset token |
| user_id | string | References `users.id` |
| created_at | ISO Date String | Token creation time |
| used | boolean | Indicates whether token has been used |

> **Production Recommendation:** Add a TTL index to automatically delete expired tokens after one hour.

---

## 4. `chat_messages`

Stores conversation history between users and the AI assistant.

Each document represents one interaction.

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Message ID |
| session_id | string | Conversation identifier |
| user_id | string | References `users.id` |
| user_message | string | User's message |
| ai_response | string | AI-generated reply |
| article_id | string / null | Linked article (optional) |
| created_at | ISO Date String | Timestamp |

---

## 5. `feedback`

Stores user feedback for analyzed articles.

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Feedback ID |
| user_id | string | References `users.id` |
| article_id | string | References `articles.id` |
| rating | integer | Rating (1–5) |
| comment | string | Optional feedback |
| created_at | ISO Date String | Timestamp |

---

# Sample Article Document

```json
{
  "id": "1a2b3c-xyz",
  "user_id": "u-uuid",
  "headline": "SHOCKING: Miracle Cure Big Pharma Hides!",
  "text": "BREAKING! In a stunning revelation...",
  "url": "",
  "favorite": false,
  "created_at": "2026-02-06T12:34:56.789+00:00",
  "source": null,
  "prediction": "fake",
  "confidence": 96,
  "credibility_score": 15,
  "risk_level": "high",
  "summary": "The article contains sensational language and unsupported medical claims.",
  "reasoning": "Multiple misinformation indicators were detected, including emotional language, lack of evidence, and unreliable sourcing.",
  "factors": {
    "writing_style": 25,
    "headline_quality": 10,
    "source_reputation": 20,
    "language_complexity": 15,
    "evidence_presence": 5,
    "bias": 90,
    "emotional_language": 95,
    "historical_reliability": 10
  },
  "highlights": [
    {
      "phrase": "SHOCKING",
      "category": "clickbait",
      "reason": "Sensational trigger word"
    }
  ],
  "topics": [
    "health"
  ],
  "recommendations": [
    "Verify the claim using trusted health organizations.",
    "Check whether peer-reviewed research supports the claim.",
    "Compare reports from multiple reliable news sources."
  ],
  "suspicious_statements": [
    "One miracle cure changes everything."
  ],
  "time_taken_sec": 2.31,
  "model_used": "qwen/qwen3-32b:free"
}
```

---

# Recommended MongoDB Indexes

```javascript
db.users.createIndex({ email: 1 }, { unique: true });

db.articles.createIndex({ user_id: 1, created_at: -1 });

db.articles.createIndex({ topics: 1 });

db.articles.createIndex({ prediction: 1 });

db.chat_messages.createIndex({ session_id: 1, created_at: 1 });

db.password_resets.createIndex(
    { created_at: 1 },
    { expireAfterSeconds: 3600 }
);
```

---

# Notes

- UUIDs are used instead of exposing MongoDB ObjectIds.
- Passwords are securely hashed using **bcrypt**.
- Authentication is handled using **JWT**.
- AI analysis is generated through the **OpenRouter API** using an **OpenRouter-compatible LLM** (default: `qwen/qwen3-32b:free`).
- Chat conversations are permanently stored for each user session.
- MongoDB indexes listed above are recommended for production deployments.