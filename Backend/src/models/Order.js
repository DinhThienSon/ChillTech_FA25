import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    price: Number
});

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"],
        default: "PENDING"
    },
    shippingAddress: String,
    note: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema, "Order");
