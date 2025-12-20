const Question = require("../models/question");
const ApiError = require("../utils/ApiError");

// @desc    Get all questions
// @route   GET /api/questions
// @access  Private/Admin
exports.getQuestions = async (req, res, next) => {
  try {
    let query;

    if (req.query.quizId) {
      query = Question.find({ quiz: req.query.quizId });
    } else {
      query = Question.find();
    }

    const questions = await query.populate("quiz", "title");

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Private/Admin
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "quiz",
      "title"
    );

    if (!question) {
      return next(
        new ApiError(404, `Question not found with id of ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new question
// @route   POST /api/questions
// @access  Private/Admin
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Admin
exports.updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return next(
        new ApiError(404, `Question not found with id of ${req.params.id}`)
      );
    }

    question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(
        new ApiError(404, `Question not found with id of ${req.params.id}`)
      );
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
