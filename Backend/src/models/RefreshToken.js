const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    tokenHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isRevoked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema, "RefreshToken");
