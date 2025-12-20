const Theme = require("../models/theme");
const ApiError = require("../utils/ApiError");

// @desc    Get all themes
// @route   GET /api/themes
// @access  Public
exports.getThemes = async (req, res, next) => {
  try {
    const themes = await Theme.find();

    res.status(200).json({
      success: true,
      count: themes.length,
      data: themes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new theme
// @route   POST /api/themes
// @access  Private/Admin
exports.createTheme = async (req, res, next) => {
  try {
    const theme = await Theme.create(req.body);

    res.status(201).json({
      success: true,
      data: theme,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete theme
// @route   DELETE /api/themes/:id
// @access  Private/Admin
exports.deleteTheme = async (req, res, next) => {
  try {
    const theme = await Theme.findById(req.params.id);

    if (!theme) {
      return next(
        new ApiError(404, `Theme not found with id of ${req.params.id}`)
      );
    }

    await theme.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update theme
// @route   PUT /api/themes/:id
// @access  Private/Admin
exports.updateTheme = async (req, res, next) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!theme) {
      return next(
        new ApiError(404, `Theme not found with id of ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      data: theme,
    });
  } catch (error) {
    next(error);
  }
};
