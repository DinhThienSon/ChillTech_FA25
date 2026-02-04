const productService = require("../service/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.json({ data: products });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      message: "Không lấy được danh sách sản phẩm",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.json({ data: product });
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    return res.status(500).json({
      message: "Không lấy được sản phẩm",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
