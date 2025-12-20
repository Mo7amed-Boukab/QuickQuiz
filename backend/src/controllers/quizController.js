const Score = require("../models/score");
const Theme = require("../models/theme");
const Question = require("../models/question");
const Quiz = require("../models/quiz");
const ApiError = require("../utils/ApiError");

// @desc    Get all quizzes
// @route   GET /api/quiz
// @access  Public
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().populate("theme", "name");

    // Add question count to each quiz
    const quizzesWithCount = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await Question.countDocuments({ quiz: quiz._id });
        return { ...quiz.toObject(), questionCount };
      })
    );

    res.status(200).json({
      success: true,
      count: quizzesWithCount.length,
      data: quizzesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quiz
// @route   GET /api/quiz/:id
// @access  Public
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("theme", "name");

    if (!quiz) {
      return next(
        new ApiError(404, `Quiz not found with id of ${req.params.id}`)
      );
    }

    const questionCount = await Question.countDocuments({ quiz: quiz._id });

    res.status(200).json({
      success: true,
      data: { ...quiz.toObject(), questionCount },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new quiz
// @route   POST /api/quiz
// @access  Private/Admin
exports.createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quiz
// @route   PUT /api/quiz/:id
// @access  Private/Admin
exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return next(
        new ApiError(404, `Quiz not found with id of ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quiz/:id
// @access  Private/Admin
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return next(
        new ApiError(404, `Quiz not found with id of ${req.params.id}`)
      );
    }

    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a quiz score
// @route   POST /api/quiz/submit
// @access  Private
exports.submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers = [], timeTakenSeconds = 0 } = req.body;

    if (!quizId) {
      return next(ApiError.badRequest("Quiz ID is required"));
    }

    const quiz = await Quiz.findById(quizId).populate("theme", "name");

    if (!quiz) {
      return next(
        ApiError.notFound(
          `Quiz not found with id of ${req.params.id || quizId}`
        )
      );
    }

    const quizQuestions = await Question.find({ quiz: quizId }).lean();

    if (!quizQuestions.length) {
      return next(ApiError.badRequest("No questions available for this quiz"));
    }

    const normalizedAnswers = quizQuestions.map((question) => {
      const providedAnswer = answers.find((ans) => {
        const providedId = ans.question?.toString?.() ?? ans.question;
        return providedId?.toString() === question._id.toString();
      });

      const selectedOption =
        typeof providedAnswer?.selectedOption === "number"
          ? providedAnswer.selectedOption
          : -1;

      const correctIndex = question.options.findIndex((opt) => opt.isCorrect);
      const isCorrect = selectedOption === correctIndex;

      return {
        question: question._id,
        selectedOption,
        isCorrect,
      };
    });

    const correctCount = normalizedAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const totalQuestions = quizQuestions.length;
    const computedScore = correctCount * 10; // 10 points per correct answer

    const quizTimeLimitSeconds = (quiz.timeLimit || 0) * 60;
    const sanitizedTimeTaken = Math.min(
      Math.max(0, timeTakenSeconds),
      quizTimeLimitSeconds || timeTakenSeconds
    );

    const newScore = await Score.create({
      user: req.user.userId,
      quiz: quizId,
      score: computedScore,
      totalQuestions,
      answers: normalizedAnswers,
      correctCount,
      timeLimitSeconds: quizTimeLimitSeconds,
      timeTakenSeconds: sanitizedTimeTaken,
      quizMetadata: {
        title: quiz.title,
        difficulty: quiz.difficulty,
        timeLimitMinutes: quiz.timeLimit,
        themeName: quiz.theme ? quiz.theme.name : undefined,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        _id: newScore._id,
        quizId: quiz._id,
        quizTitle: quiz.title,
        themeName: quiz.theme ? quiz.theme.name : undefined,
        difficulty: quiz.difficulty,
        score: computedScore,
        correctCount,
        totalQuestions,
        timeLimitSeconds: quizTimeLimitSeconds,
        timeTakenSeconds: sanitizedTimeTaken,
        percentage: totalQuestions
          ? Math.round((correctCount / totalQuestions) * 100)
          : 0,
        answers: normalizedAnswers,
        playedAt: newScore.playedAt,
      },
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
      .populate({
        path: "quiz",
        select: "title theme",
        populate: { path: "theme", select: "name" },
      })
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
      .populate({
        path: "quiz",
        select: "title theme",
        populate: { path: "theme", select: "name" },
      })
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
    const quizzes = await Quiz.find().populate("theme", "name").lean();

    const stats = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await Question.countDocuments({ quiz: quiz._id });
        const playCount = await Score.countDocuments({ quiz: quiz._id });
        // Count unique users who played this quiz
        const uniqueUsers = (await Score.distinct("user", { quiz: quiz._id }))
          .length;

        return {
          _id: quiz._id,
          title: quiz.title,
          theme: quiz.theme ? quiz.theme.name : "Unknown",
          difficulty: quiz.difficulty,
          questionCount,
          playCount,
          uniqueUsers,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: stats.length,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
