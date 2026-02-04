import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        unique: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "BANKING", "MOMO", "VNPAY"]
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
        default: "PENDING"
    },
    transactionCode: String,
    paidAt: Date
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema, "Payment");
