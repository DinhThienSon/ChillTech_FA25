const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        unique: true
    },
    adminName: String
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema, "Admin");