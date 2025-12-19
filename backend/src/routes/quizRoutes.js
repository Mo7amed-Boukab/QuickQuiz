const express = require("express");
const {
  submitQuiz,
  getAllHistory,
  getUserHistory,
} = require("../controllers/quizController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.post("/submit", submitQuiz);
router.get("/my-history", getUserHistory);
router.get("/history", authorize("admin"), getAllHistory);

module.exports = router;
