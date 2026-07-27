const Response = require("../models/Response");
const Participant = require("../models/Participant");
const Question = require("../models/Question");
const Session = require("../models/Session");

// =========================
// Submit Response
// =========================
const submitResponse = async (req, res) => {
    try {

        const { sessionId, questionId, selectedAnswer } = req.body;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const alreadyAnswered = await Response.findOne({
            session: sessionId,
            question: questionId,
            student: req.user.userId
        });

        if (alreadyAnswered) {
            return res.status(400).json({
                success: false,
                message: "You have already answered this question."
            });
        }

       const calculateScore = require("../utils/calculateScore");

const { isCorrect, marksAwarded } =
    calculateScore(question, selectedAnswer);

        await Response.create({
            session: sessionId,
            quiz: session.quiz,
            question: questionId,
            student: req.user.userId,
            selectedAnswer,
            isCorrect,
            marksAwarded
        });

        const participant = await Participant.findOne({
            session: sessionId,
            student: req.user.userId
        });

        if (participant) {

            if (isCorrect) {

                participant.correctAnswers += 1;
                participant.totalMarks += question.marks;

            } else {

                participant.wrongAnswers += 1;

            }

            await participant.save();

        }

        res.status(200).json({
            success: true,
            message: "Answer submitted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Get My Previous Results
// =========================
const getMyResults = async (req, res) => {

    try {

        const results = await Participant.find({
            student: req.user.userId,
            status: "completed"
        })
        .populate("session")
        .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            results
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    submitResponse,
    getMyResults
};