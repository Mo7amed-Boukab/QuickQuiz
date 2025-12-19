const User = require('../models/user');
const TokenBlacklist = require('../models/tokenBlacklist');
const ApiError = require('../utils/ApiError');
const { generateToken } = require('../utils/jwt');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ApiError(400, 'User already exists'));
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            const token = generateToken(user._id, user.role, user.email);
            res.status(201).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            return next(new ApiError(400, 'Invalid user data'));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return next(new ApiError(400, 'Please provide an email and password'));
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new ApiError(401, 'Invalid credentials'));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ApiError(401, 'Invalid credentials'));
        }

        const token = generateToken(user._id, user.role, user.email);

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            username: req.body.username,
            email: req.body.email
        };

        const user = await User.findByIdAndUpdate(req.user.userId, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new ApiError(401, 'Not authorized to access this route'));
        }

        // Add token to blacklist
        await TokenBlacklist.create({ token });

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
