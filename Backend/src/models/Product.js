const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  category: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
});

module.exports = mongoose.model("Product", productSchema, "Product");
