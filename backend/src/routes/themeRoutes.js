const express = require("express");
const {
  getThemes,
  createTheme,
  deleteTheme,
} = require("../controllers/themeController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getThemes)
  .post(authenticate, authorize("admin"), createTheme);

router.route("/:id").delete(authenticate, authorize("admin"), deleteTheme);

module.exports = router;
