# 📩 Pre-Subscription Email API

## 🔗 Endpoint
POST /api/subscribe

---

## 📦 Request Body

Send JSON:

{
  "email": "user@example.com"
}

---

## 📌 Example (Frontend)

fetch("/api/subscribe", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "user@example.com"
  })
});

---

## ✅ Responses

### ✔ Success (New Email)
Status: 201
{
  "message": "Subscribed successfully"
}

### ⚠ Already Exists
Status: 200
{
  "message": "Already subscribed"
}

### ❌ Invalid Email
Status: 400
{
  "message": "Invalid email"
}

### ❌ Server Error
Status: 500
{
  "message": "Server error"
}

---

## 🗄 Database Info

- Database Name: presub_db
- Collection: emails

Stored Format:

{
  "email": "user@example.com",
  "createdAt": "2026-03-22T12:00:00.000Z"
}

---

## 🧪 Testing (Postman / Thunder Client)

- Method: POST
- URL: http://localhost:3000/api/subscribe
- Body: JSON

---

## 🚀 Deployment (Vercel)

After deployment:

https://your-domain.vercel.app/api/subscribe

---

## 📢 Logs

On successful DB connection:
✅ MongoDB Connected Successfully

On error:
❌ Error: <error details>