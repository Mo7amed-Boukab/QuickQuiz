const Score = require("../models/score");
const ApiError = require("../utils/ApiError");

// @desc    Submit a quiz score
// @route   POST /api/quiz/submit
// @access  Private
exports.submitQuiz = async (req, res, next) => {
  try {
    const { themeId, score, totalQuestions, answers } = req.body;

    const newScore = await Score.create({
      user: req.user.userId,
      theme: themeId,
      score,
      totalQuestions,
      answers,
    });

    res.status(201).json({
      success: true,
      data: newScore,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all scores (History)
// @route   GET /api/quiz/history
// @access  Private/Admin
exports.getAllHistory = async (req, res, next) => {
  try {
    const history = await Score.find()
      .populate("user", "username email")
      .populate("theme", "name")
      .sort("-playedAt");

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user scores
// @route   GET /api/quiz/my-history
// @access  Private
exports.getUserHistory = async (req, res, next) => {
  try {
    const history = await Score.find({ user: req.user.userId })
      .populate("theme", "name")
      .sort("-playedAt");

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
