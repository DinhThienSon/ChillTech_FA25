const express = require("express");
const customerController = require("../controller/customerController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const initAPIRoutes = (app) => {
  // ===== AUTH =====
  router.post("/auth/register", customerController.handleRegisterCustomer);
  router.post("/auth/login", authController.login);
  router.post("/auth/logout", authController.logout);
  router.get("/auth/me", authController.me);

  // ===== PRODUCTS =====
  router.get("/products", productController.getProducts);
  router.get("/products/:id", productController.getProductById);

  // ===== CART (LOGIN REQUIRED) =====
  router.get("/cart", authMiddleware, cartController.getMyCart);
  router.post("/cart", authMiddleware, cartController.addToCart);
  router.put("/cart", authMiddleware, cartController.updateQuantity);
  router.delete("/cart/:productId", authMiddleware, cartController.removeItem);
  router.delete("/cart", authMiddleware, cartController.clearCart);

  return app.use("/api", router);
};

module.exports = { initAPIRoutes };
