const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/db");
const { initializeSocket } = require("./socket/socket");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const responseRoutes = require("./routes/responseRoutes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// ===============================
// CORS Configuration
// ===============================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Routes
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QuizArena Backend is Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/responses", responseRoutes);

// ===============================
// Error Handling
// ===============================
app.use(notFound);
app.use(errorHandler);

// ===============================
// HTTP + Socket.IO
// ===============================
const server = http.createServer(app);

initializeSocket(server);

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});