# TruthLens AI – Troubleshooting

This document lists common issues you may encounter while running TruthLens AI locally or in production, along with their solutions.

---

# Authentication

## `401 Invalid credentials`

**Cause**
- Incorrect email or password.

**Solution**
- Verify your login credentials.
- Register a new account if the database was reset.
- Ensure the user exists in the `users` collection.

---

## `Missing token`

**Cause**
- No JWT token was sent with the request.

**Solution**
- Login again.
- Verify that `localStorage.tl_token` exists in your browser.
- Ensure the frontend attaches the Authorization header.

---

## `Invalid token`

**Cause**
- JWT has expired or is invalid.

**Solution**
- Login again to obtain a fresh token.
- Make sure `JWT_SECRET` has not changed after generating tokens.

---

## First user is not Admin

**Cause**
- The database was manually modified or seeded.

**Solution**

Run the following command inside MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Replace the email with the appropriate administrator account.

---

# AI Analysis

## `500 Internal Server Error`

**Cause**
- An unexpected backend exception occurred.

**Solution**

- Check the backend terminal for the complete traceback.
- Restart the FastAPI server.
- Verify that all environment variables are configured correctly.

---

## `AI parsing failed`

**Cause**
- The AI model returned invalid or incomplete JSON.

**Solution**

- Retry the analysis.
- Ensure the AI model is available.
- Verify that the system prompt has not been modified.

---

## `OPENROUTER_API_KEY missing`

**Cause**
- The API key was not loaded.

**Solution**

Verify your `.env` contains:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Restart the backend after editing `.env`.

---

## `401 Unauthorized` from OpenRouter

**Cause**
- Invalid API key.

**Solution**

- Verify the API key.
- Generate a new API key from your OpenRouter account if necessary.

---

## `402 Payment Required`

**Cause**
- The selected AI model requires credits.

**Solution**

- Switch to a free model.
- Or add credits to your OpenRouter account.

---

## `404 Model Not Found`

Example:

```
This model is unavailable for free.
```

**Cause**

The selected model is no longer free.

**Solution**

Replace it with another free model.

Example:

```python
model="qwen/qwen3-32b"
```

---

## Analysis takes longer than expected

**Cause**

- Large articles
- Slow internet connection
- High OpenRouter traffic

**Solution**

- Reduce article length.
- Retry after a few seconds.

---

## `Article text too short`

**Cause**

The submitted article contains fewer than 30 characters.

**Solution**

Paste more content or upload a document.

---

## URL Analysis Fails

**Cause**

Some news websites block automated requests.

**Solution**

- Copy and paste the article text instead.
- Verify that the URL is publicly accessible.

---

## Unsupported File Type

Supported formats:

- PDF
- DOCX
- TXT

Convert unsupported files before uploading.

---

# Database

## MongoDB Connection Failed

**Cause**

Incorrect MongoDB URL.

**Solution**

Verify:

```env
MONGO_URL=...
DB_NAME=...
```

Ensure MongoDB is running.

---

## History is Empty

**Cause**

History is user-specific.

**Solution**

Login using the same account used during analysis.

---

## ObjectId Serialization Error

Example:

```
ObjectId is not JSON serializable
```

**Solution**

Exclude MongoDB's `_id` field:

```python
{"_id": 0}
```

or

```python
document.pop("_id", None)
```

before returning API responses.

---

# Frontend

## Blank White Screen

**Solution**

1. Open Browser Developer Tools.
2. Check the Console tab.
3. Fix the first JavaScript error displayed.

---

## Failed API Requests

Verify:

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

Restart the frontend after changing `.env`.

---

## AI Chat Doesn't Respond

Check:

- Backend server is running.
- OpenRouter API key is valid.
- JWT token is attached.
- `/api/chat` returns HTTP 200.

---

## Dashboard Charts Are Empty

Charts require analyzed articles.

Analyze a few articles first.

---

# Backend

## Backend Doesn't Start

Check the terminal for errors.

Common causes:

- Missing `.env`
- Missing environment variables
- MongoDB not running
- Syntax errors

---

## Backend Returns 404

Example:

```
GET /
404 Not Found
```

This is normal.

The API is available under:

```
http://127.0.0.1:8000/api/
```

Swagger documentation:

```
http://127.0.0.1:8000/docs
```

---

# Deployment

## CORS Error

Ensure:

```env
CORS_ORIGINS=http://localhost:3000
```

or

```env
CORS_ORIGINS=https://yourdomain.com
```

Restart the backend afterwards.

---

## Environment Variables Not Loading

After modifying `.env`, always restart the backend.

Example:

```bash
uvicorn server:app --reload
```

---

# Useful Commands

## Start Backend

```bash
cd backend

uvicorn server:app --reload
```

---

## Start Frontend

```bash
cd frontend

npm start
```

---

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Open Swagger

```
http://127.0.0.1:8000/docs
```

---

## Open Frontend

```
http://localhost:3000
```

---

# Reporting Issues

When reporting a bug, include:

1. Operating System
2. Python Version
3. Node.js Version
4. Browser
5. Error Message
6. Backend Terminal Output
7. Browser Console Errors
8. Steps to Reproduce

Providing this information makes debugging significantly faster.

---

# Support

If an issue persists:

- Verify your `.env` configuration.
- Ensure MongoDB is running.
- Restart both backend and frontend.
- Confirm your OpenRouter API key is valid.
- Test the API using Swagger before testing the frontend.