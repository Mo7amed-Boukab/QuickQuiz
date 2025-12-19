const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  playedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
