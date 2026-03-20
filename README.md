#  Rate Limited File Uploader API

A production-style Node.js REST API that allows users to upload `.txt` and `.csv` files with built-in rate limiting, streaming file processing, and structured logging.

---

##  Features

-  File upload support using `multipart/form-data`
-  Only allows `.txt` and `.csv` files
-  Rate limiting (max 5 uploads per minute per IP)
-  Streaming file processing (no memory overload)
-  Returns file metadata:
  - File name
  - File size
  - Word count
-  Structured logging using Winston
-  Clean architecture (controller, service, middleware separation)

---

##  Architecture

Client → Express Route → Middleware (Rate Limit + Validation) → Controller → Service (Streaming Processing) → File System

---

##  Project Structure

src/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone "git+https://github.com/ZindumKage/rate-limited-uploader.git"
 
cd rate-limited-uploader
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run the server
```bash
npm run dev
```
Server runs on:  
http://localhost:2000

---

##  API Endpoint

### POST /api/upload

Upload a file using `multipart/form-data`

Form field:
file: <your-file>

---

##  Example Request (cURL)

curl -X POST http://localhost:2000/api/upload \
  -F "file=@sample.txt"

---

##  Example Response

{
  "message": "File uploaded successfully",
  "data": {
    "fileName": "sample.txt",
    "fileSize": 1024,
    "wordCount": 120
  }
}

---

##  Rate Limiting

- Maximum **5 uploads per minute per IP**
- Exceeding limit returns:

HTTP 429 Too Many Requests

---

##  Key Engineering Decisions

- Streaming file processing prevents memory overload for large files
- In-memory rate limiter for simplicity (can be replaced with Redis in production)
- Clear separation of concerns for maintainability
- Winston logging for structured observability

---

##  Deployment

You can deploy this API using:

- Render
- Fly.io
- Railway

---

Live API: https://rate-limited-uploader.onrender.com


##  Author

Stanley Chidi  
Backend Engineer — Golang | Node.js | Distributed Systems
