const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorize("admin"));

router.route("/").get(getUsers);

router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
