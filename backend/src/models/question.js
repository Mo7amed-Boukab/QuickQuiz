const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  question: {
    type: String,
    required: [true, "Please add question text"],
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
