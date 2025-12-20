const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/user");

// Load env vars
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ email: "admin@quickquiz.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    await User.create({
      username: "Admin",
      email: "admin@quickquiz.com",
      password: "admin123", // Will be hashed by pre-save hook
      role: "admin",
    });
    console.log("---------------------------------");
    console.log("Admin user created successfully");
    console.log("---------------------------------");
    console.log("email: admin@quickquiz.com");
    console.log("password: admin123");
    console.log("---------------------------------");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
