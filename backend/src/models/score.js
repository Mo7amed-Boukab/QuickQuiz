const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
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
      selectedOption: {
        type: Number,
        default: -1,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  correctCount: {
    type: Number,
    default: 0,
  },
  timeLimitSeconds: {
    type: Number,
    default: 0,
  },
  timeTakenSeconds: {
    type: Number,
    default: 0,
  },
  quizMetadata: {
    title: {
      type: String,
    },
    themeName: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    timeLimitMinutes: {
      type: Number,
    },
  },
  playedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
