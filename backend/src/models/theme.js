const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a theme name"],
    unique: true,
    trim: true,
  },
});

// Cascade delete quizzes when a theme is deleted
themeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const Quiz = require('./quiz');
    await Quiz.deleteMany({ theme: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Theme", themeSchema);
