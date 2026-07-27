const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "waiting",
        "approved",
        "rejected",
        "completed"
      ],
      default: "waiting",
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    correctAnswers: {
      type: Number,
      default: 0,
    },

    wrongAnswers: {
      type: Number,
      default: 0,
    },

    joinedAt: Date,

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);