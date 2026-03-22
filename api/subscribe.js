import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

// ✅ Allowed Origins
const allowedOrigins = [
  "https://www.byteastra.in",
  "http://localhost:3000",
  "http://localhost:3001",
];

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI in .env");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);

  global._mongoClientPromise = client.connect().then((client) => {
    console.log("✅ MongoDB Connected Successfully");
    return client;
  });
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  const origin = req.headers.origin;

  // ✅ Handle CORS
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const client = await clientPromise;
    const db = client.db("presub_db");

    const existing = await db.collection("emails").findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    await db.collection("emails").insertOne({
      email,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Subscribed successfully" });

  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
