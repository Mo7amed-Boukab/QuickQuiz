const express = require("express");
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getAllHistory,
  getUserHistory,
  getQuizStats,
  getLeaderboard,
} = require("../controllers/quizController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

// Other quiz actions
router.get("/leaderboard", getLeaderboard);
router.post("/submit", submitQuiz);
router.get("/my-history", getUserHistory);
router.get("/history", authorize("admin"), getAllHistory);
router.get("/stats", authorize("admin"), getQuizStats);

// Quiz CRUD routes
router.route("/").get(getQuizzes).post(authorize("admin"), createQuiz);

router
  .route("/:id")
  .get(getQuiz)
  .put(authorize("admin"), updateQuiz)
  .delete(authorize("admin"), deleteQuiz);

module.exports = router;
