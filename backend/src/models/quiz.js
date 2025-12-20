const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a quiz title"],
        trim: true,
        maxlength: [100, "Title can not be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [500, "Description can not be more than 500 characters"],
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    timeLimit: {
        type: Number, // In minutes
        required: [true, "Please add a time limit"],
        default: 10,
        min: 1,
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Cascade delete questions and scores when a quiz is deleted
quizSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        const Question = require('./question');
        const Score = require('./score');

        // Delete all questions associated with this quiz
        await Question.deleteMany({ quiz: this._id });

        // Delete all scores associated with this quiz
        await Score.deleteMany({ quiz: this._id });

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Quiz", quizSchema);
