const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/QuizArenaDB");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed. Retrying in 5 seconds...", error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;