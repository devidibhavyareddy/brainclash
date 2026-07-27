const mongoose = require("mongoose");
const Session = require("../models/Session");
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");
const { getIO } = require("../socket/socket");
const Question = require("../models/Question");
const Response = require("../models/Response");
const { startQuestion } = require("../utils/quizEngine");
const generateGamePin = require("../utils/generateGamePin");

// Start Quiz
const startQuiz = async (req, res) => {
  try {

    const { quizId } = req.body;

    if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz id",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }
    if (quiz.trainer?.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot start another trainer's quiz."
      });
    }

    let gamePin;
    let existingSession;

    // Ensure unique Game PIN
    do {
      gamePin = generateGamePin();
      existingSession = await Session.findOne({
        gamePin,
        status: { $ne: "completed" },
      });
    } while (existingSession);

    const session = await Session.create({
      quiz: quizId,
      trainer: req.user.userId,
      gamePin,
      status: "waiting",
      startedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Quiz session created successfully",
      session,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Student Join Quiz
const joinQuiz = async (req, res) => {
  try {
    const { gamePin } = req.body;

    // Check if session exists
    const session = await Session.findOne({
      gamePin,
      status: "waiting",
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Invalid Game PIN",
      });
    }

    // Check session status
    if (session.status !== "waiting") {
      return res.status(400).json({
        success: false,
        message: "This quiz is no longer accepting participants.",
      });
    }

    // Check if student already joined
    const existingParticipant = await Participant.findOne({
      session: session._id,
      student: req.user.userId,
    });

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: "You have already requested to join this quiz.",
      });
    }

    // Create participant
    const participant = await Participant.create({
      session: session._id,
      student: req.user.userId,
      status: "waiting",
      joinedAt: new Date(),
    });

    // (Temporary) Keep this until we refactor Session model
    if (!session.waitingStudents.includes(req.user.userId)) {
      session.waitingStudents.push(req.user.userId);
      await session.save();
    }

    // Notify trainer
    const io = getIO();

    io.to(session._id.toString()).emit("studentJoined", {
      studentId: req.user.userId,
      participantId: participant._id,
      message: "A student requested to join the quiz.",
    });

    res.status(201).json({
      success: true,
      message: "Join request sent successfully.",
      participant,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Waiting Students
const getWaitingStudents = async (req, res) => {
  try {

    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session id",
      });
    }

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check trainer ownership
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this session.",
      });
    }

    // Get waiting students
   // Waiting students
const waitingStudents = await Participant.find({
  session: sessionId,
  status: "waiting",
}).populate("student", "name email");

// Approved students
const approvedStudents = await Participant.find({
  session: sessionId,
  status: "approved",
}).populate("student", "name email");

res.status(200).json({
  success: true,
  waitingStudents,
  approvedStudents,
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Approve Student
const approveStudent = async (req, res) => {
  try {

    const { sessionId, studentId } = req.body;

    // Check session
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check trainer ownership
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to approve students for this session.",
      });
    }

    // Find participant
    const participant = await Participant.findOne({
      session: sessionId,
      student: studentId,
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Student join request not found.",
      });
    }

    // Prevent approving twice
    if (participant.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Student is already approved.",
      });
    }

    // Prevent approving rejected students
    if (participant.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Student has already been rejected.",
      });
    }

    // Update participant
    participant.status = "approved";

    await participant.save();

    // Notify student
    const io = getIO();

    io.to(studentId).emit("studentApproved", {
      sessionId,
      studentId,
      message: "Trainer approved your request.",
    });

    res.status(200).json({
      success: true,
      message: "Student approved successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/// Reject Student
const rejectStudent = async (req, res) => {
  try {

    const { sessionId, studentId } = req.body;

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check trainer ownership
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject students for this session.",
      });
    }

    // Find participant
    const participant = await Participant.findOne({
      session: sessionId,
      student: studentId,
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Student join request not found.",
      });
    }

    // Prevent rejecting twice
    if (participant.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Student has already been rejected.",
      });
    }

    // Prevent rejecting approved students
    if (participant.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Student has already been approved.",
      });
    }

    // Update participant status
    participant.status = "rejected";
    await participant.save();

    // Notify student
    const io = getIO();

    io.to(studentId).emit("studentRejected", {
      sessionId,
      studentId,
      message: "Your request has been rejected by the trainer."
    });

    res.status(200).json({
      success: true,
      message: "Student rejected successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Start Live Quiz
const startLiveQuiz = async (req, res) => {
  try {

    const { sessionId } = req.body;

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check trainer ownership
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to start this quiz.",
      });
    }

    // Prevent starting twice
    if (session.status === "live") {
      return res.status(400).json({
        success: false,
        message: "Quiz is already live.",
      });
    }

    if (session.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Quiz has already ended.",
      });
    }

    // Check approved students
    const approvedStudents = await Participant.find({
      session: sessionId,
      status: "approved",
    });

    if (approvedStudents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No approved students to start the quiz.",
      });
    }

    // Update session
    session.status = "live";
    session.currentQuestionIndex = 0;
    session.startedAt = new Date();

    await session.save();

    // Notify all approved students
    const io = getIO();

    io.to(sessionId).emit("quizStarted", {
      sessionId,
      message: "Quiz has started.",
    });

    // Start automatic question engine
    await startQuestion(sessionId);

    res.status(200).json({
      success: true,
      message: "Quiz started successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// End Quiz
const endQuiz = async (req, res) => {
  try {

    const { sessionId } = req.body;

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check trainer ownership
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to end this quiz.",
      });
    }

    // Prevent ending twice
    if (session.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Quiz has already been completed.",
      });
    }

    // Update session
    session.status = "completed";
    session.endedAt = new Date();

    await session.save();

    // Mark all approved participants as completed
    await Participant.updateMany(
      {
        session: sessionId,
        status: "approved",
      },
      {
        $set: {
          status: "completed",
        },
      }
    );

    // Notify all students
    const io = getIO();

    io.to(sessionId).emit("quizEnded", {
      sessionId,
      message: "The trainer has ended the quiz.",
    });

    res.status(200).json({
      success: true,
      message: "Quiz ended successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Student Result
const getStudentResult = async (req, res) => {
  try {

    const { sessionId } = req.params;

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Student's participation record
    const participant = await Participant.findOne({
      session: sessionId,
      student: req.user.userId,
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    // Calculate total possible marks
    const questions = await Question.find({
      quiz: session.quiz,
    });

    const totalPossibleMarks = questions.reduce(
      (sum, question) => sum + question.marks,
      0
    );

    // Calculate percentage
    const percentage =
      totalPossibleMarks > 0
        ? ((participant.totalMarks / totalPossibleMarks) * 100).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      result: {
        totalMarks: participant.totalMarks,
        totalPossibleMarks,
        correctAnswers: participant.correctAnswers,
        wrongAnswers: participant.wrongAnswers,
        percentage: `${percentage}%`,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Leaderboard
const getLeaderboard = async (req, res) => {
  try {

    const { sessionId } = req.params;

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Only the trainer who created the session can view the leaderboard
    if (session.trainer.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this leaderboard.",
      });
    }

    // Get completed participants
    const participants = await Participant.find({
      session: sessionId,
      status: "completed",
    })
      .populate("student", "name email")
      .sort({ totalMarks: -1, correctAnswers: -1 });

    // Generate rank
    const leaderboard = participants.map((participant, index) => ({
      rank: index + 1,
      studentId: participant.student._id,
      name: participant.student.name,
      email: participant.student.email,
      totalMarks: participant.totalMarks,
      correctAnswers: participant.correctAnswers,
      wrongAnswers: participant.wrongAnswers,
    }));

    res.status(200).json({
      success: true,
      totalParticipants: leaderboard.length,
      leaderboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  startQuiz,
  joinQuiz,
  getWaitingStudents,
  approveStudent,
  rejectStudent,
  startLiveQuiz,
  endQuiz,
  getStudentResult,
  getLeaderboard,
};