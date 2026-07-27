const Session = require("../models/Session");
const Question = require("../models/Question");
const Participant = require("../models/Participant");
const { getIO } = require("../socket/socket");

const startQuestion = async (sessionId) => {

    const io = getIO();

    const session = await Session.findById(sessionId);

    if (!session) return;

    const questions = await Question.find({
        quiz: session.quiz
    }).sort({ createdAt: 1 });

    const currentIndex = session.currentQuestionIndex;

    // Quiz finished
    if (currentIndex >= questions.length) {

        session.status = "completed";
        session.endedAt = new Date();

        await session.save();

        await Participant.updateMany(
            {
                session: sessionId,
                status: "approved"
            },
            {
                status: "completed",
                completedAt: new Date()
            }
        );

        io.to(sessionId).emit("quizEnded");

        return;
    }

    const question = questions[currentIndex];

    session.currentQuestionStartTime = new Date();

    await session.save();

    io.to(sessionId).emit("newQuestion", {

        question: {

            _id: question._id,
            questionText: question.questionText,
            options: question.options,
            marks: question.marks,
            timeLimit: question.timeLimit

        }

    });

    setTimeout(async () => {

        session.currentQuestionIndex++;

        await session.save();

        startQuestion(sessionId);

    }, question.timeLimit * 1000);

};

module.exports = {
    startQuestion
};