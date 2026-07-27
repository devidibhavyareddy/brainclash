const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Response = require("../models/Response");
const Participant = require("../models/Participant");

// Add Question
const getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const questions = await Question.find({ quiz: quizId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addQuestion = async (req, res) => {
  try {

    const {
      quizId,
      questionText,
      options,
      correctAnswer,
      marks,
      timeLimit,
    } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    const question = await Question.create({
      quiz: quizId,
      questionText,
      options,
      correctAnswer,
      marks,
      timeLimit,
    });

    // Update quiz statistics
    quiz.totalQuestions += 1;
    quiz.totalMarks += marks || 1;

    await quiz.save();

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      question,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const submitAnswer = async (req, res) => {
  try {

    const {
      sessionId,
      questionId,
      selectedAnswer
    } = req.body;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    let marks = 0;
    let isCorrect = false;

    if (selectedAnswer === question.correctAnswer) {
      isCorrect = true;
      marks = question.marks;
    }

    await Response.create({
      session: sessionId,
      quiz: question.quiz,
      question: questionId,
      student: req.user.userId,
      selectedAnswer,
      isCorrect,
      marksAwarded: marks,
    });

    const participant = await Participant.findOne({
      session: sessionId,
      student: req.user.userId,
    });

    if (participant) {

      participant.totalMarks += marks;

      if (isCorrect) {
        participant.correctAnswers += 1;
      } else {
        participant.wrongAnswers += 1;
      }

      await participant.save();
    }

    res.json({
      success: true,
      correct: isCorrect,
      marksAwarded: marks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
    addQuestion,
    submitAnswer,
    getQuestionsByQuiz
};