const Score = require("../models/score");
const Theme = require("../models/theme");
const Question = require("../models/question");
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

// @desc    Get aggregated quiz stats
// @route   GET /api/quiz/stats
// @access  Private/Admin
exports.getQuizStats = async (req, res, next) => {
  try {
    const themes = await Theme.find().lean();

    const stats = await Promise.all(themes.map(async (theme) => {
      const questionCount = await Question.countDocuments({ theme: theme._id });
      const playCount = await Score.countDocuments({ theme: theme._id });
      // Count unique users who played this quiz
      const uniqueUsers = (await Score.distinct('user', { theme: theme._id })).length;

      return {
        _id: theme._id,
        name: theme.name,
        questionCount,
        playCount,
        uniqueUsers
      };
    }));

    res.status(200).json({
      success: true,
      count: stats.length,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
