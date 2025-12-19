const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d', // Automatically delete after 30 days (should match JWT_EXPIRE)
    },
});

tokenBlacklistSchema.statics.isBlacklisted = async function (token) {
    const count = await this.countDocuments({ token });
    return count > 0;
};

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
