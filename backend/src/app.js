const express = require("express");

const app = express();


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to QuickQuiz API" });
});



module.exports = app;
