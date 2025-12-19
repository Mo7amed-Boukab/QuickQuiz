const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a theme name"],
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Theme", themeSchema);
