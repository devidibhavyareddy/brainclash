const Quiz = require("../models/Quiz");
const mongoose = require("mongoose");

// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subject,
      difficulty,
      duration,
    } = req.body;

    const categoryValue = category || subject;

    if (!title || !categoryValue || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const quiz = await Quiz.create({
      title,
      description,
      category: categoryValue,
      difficulty,
      duration,
      trainer: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Quiz Created Successfully",
      quiz,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Quizzes of Logged-in Trainer
const getAllQuizzes = async (req, res) => {
  try {
    console.log("========== GET MY QUIZZES ==========");
    console.log("req.user =", req.user);

    const quizzes = await Quiz.find({
      trainer: req.user.userId,
    }).sort({ createdAt: -1 });

    console.log("Quizzes:", quizzes.length);

    res.status(200).json({
      success: true,
      quizzes,
    });

  } catch (error) {

    console.error("GET QUIZZES ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Quiz
const getQuizById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      quiz,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    if (quiz.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      quiz: updatedQuiz,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    if (quiz.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await quiz.deleteOne();

    res.json({
      success: true,
      message: "Quiz deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};