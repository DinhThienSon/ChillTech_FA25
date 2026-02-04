const Product = require("../models/Product");

const getAllProducts = async () => {
  return await Product.find({ status: "ACTIVE" }).lean();
};

const getProductById = async (id) => {
  return await Product.findOne({
    _id: id,
    status: "ACTIVE",
  }).lean();
};

module.exports = {
  getAllProducts,
  getProductById,
};
