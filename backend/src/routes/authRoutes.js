const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);
router.put("/profile", authenticate, updateProfile);

module.exports = router;
