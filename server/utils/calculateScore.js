const calculateScore = (question, selectedAnswer) => {

    const isCorrect = selectedAnswer === question.correctAnswer;

    return {
        isCorrect,
        marksAwarded: isCorrect ? question.marks : 0
    };

};

module.exports = calculateScore;