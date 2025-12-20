const express = require("express");
const {
  submitQuiz,
  getAllHistory,
  getUserHistory,
  getQuizStats,
} = require("../controllers/quizController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.post("/submit", submitQuiz);
router.get("/my-history", getUserHistory);
router.get("/history", authorize("admin"), getAllHistory);
router.get("/stats", authorize("admin"), getQuizStats);

module.exports = router;
