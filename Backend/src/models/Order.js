const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingUnit: {
      type: String,
      enum: ["Giao hàng nhanh", "J&T Express"],
      required: true,
    },

    // 👇 NỘI DUNG CHUYỂN TIỀN
    paymentContent: {
      type: String,
      required: true,
      unique: true, // 🚨 RẤT QUAN TRỌNG
    },

    orderStatus: {
      type: String,
      enum: [
        "Chờ thanh toán",
        "Đang xử lý",
        "Đã thanh toán",
        "Đang giao hàng",
        "Đã giao",
        "Hủy đơn",
      ],
      default: "Chờ thanh toán",
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema, "Order");
