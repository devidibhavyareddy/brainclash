const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "A question must have exactly 4 options.",
      },
      required: true,
    },

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    marks: {
      type: Number,
      default: 1,
    },

    timeLimit: {
      type: Number,
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);