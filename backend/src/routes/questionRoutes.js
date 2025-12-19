const express = require("express");
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.route("/").get(getQuestions).post(authorize("admin"), createQuestion);

router
  .route("/:id")
  .get(authorize("admin"), getQuestion)
  .put(authorize("admin"), updateQuestion)
  .delete(authorize("admin"), deleteQuestion);

module.exports = router;
