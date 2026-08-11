const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");

console.log(
  "Gemini API key loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// ========================================
// Middleware
// ========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// Health Check
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeCraft API is running",
  });
});

// ========================================
// API Routes
// ========================================

app.use("/api/ai", aiRoutes);

// ========================================
// 404 Handler
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================================
// Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
});

// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {
  console.log(
    `ResumeCraft server running on http://localhost:${PORT}`
  );
});