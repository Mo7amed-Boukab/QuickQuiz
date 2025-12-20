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
} = require("../controllers/quizController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

// Quiz CRUD routes
router.route("/")
  .get(getQuizzes)
  .post(authorize("admin"), createQuiz);

router.route("/:id")
  .get(getQuiz)
  .put(authorize("admin"), updateQuiz)
  .delete(authorize("admin"), deleteQuiz);

// Other quiz actions
router.post("/submit", submitQuiz);
router.get("/my-history", getUserHistory);
router.get("/history", authorize("admin"), getAllHistory);
router.get("/stats", authorize("admin"), getQuizStats);

module.exports = router;
