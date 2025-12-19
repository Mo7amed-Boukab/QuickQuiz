const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const authRoutes = require("./routes/authRoutes");
const themeRoutes = require("./routes/themeRoutes");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to QuickQuiz API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/themes", themeRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
