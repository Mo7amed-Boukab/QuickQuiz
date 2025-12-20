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

const importAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: "admin@quickquiz.com" });

        if (adminExists) {
            console.log("⚠ Admin user already exists");
            process.exit();
        }

        await User.create({
            username: "Admin",
            email: "admin@quickquiz.com",
            password: "admin123",
            role: "admin",
        });

        console.log("\n=================================");
        console.log("✓ Admin user created successfully");
        console.log("=================================");
        console.log("Email: admin@quickquiz.com");
        console.log("Password: admin123");
        console.log("=================================\n");
        process.exit();
    } catch (err) {
        console.error("Error creating admin:", err);
        process.exit(1);
    }
};

const deleteAdmin = async () => {
    try {
        await User.deleteMany({ role: "admin" });
        console.log("✓ Admin users deleted");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    deleteAdmin();
} else {
    importAdmin();
}
