const express = require("express");
const customerController = require("../controller/customerController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
const checkoutController = require("../controller/checkoutController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadProductImage = require("../middleware/uploadProductImage");
const orderController = require("../controller/orderController");
const dashboardController = require("../controller/dashboardController");
const router = express.Router();

const initAPIRoutes = (app) => {
  /* ===== AUTH ===== */
  router.post("/auth/register", customerController.handleRegisterCustomer);
  router.post("/auth/login", authController.login);
  router.post("/auth/logout", authController.logout);
  router.get("/auth/me", authController.me);

  /* ===== PRODUCTS – USER ===== */
  router.get(
    "/products/public",
    productController.getPublicProducts
  );

  /* ===== PRODUCTS – ADMIN ===== */
  router.get(
    "/admin/products",
    authMiddleware,
    productController.getAdminProducts
  );

  router.get(
    "/products/:id",
    productController.getProductById
  );

  router.post(
    "/products",
    authMiddleware,
    uploadProductImage.single("image"),
    productController.createProduct
  );

  router.put(
    "/products/:id",
    authMiddleware,
    uploadProductImage.single("image"),
    productController.updateProduct
  );

  router.put(
    "/products/:id/toggle-status",
    authMiddleware,
    productController.toggleProductStatus
  );

  /* ===== CART ===== */
  router.get("/cart", authMiddleware, cartController.getMyCart);
  router.post("/cart", authMiddleware, cartController.addToCart);
  router.put("/cart", authMiddleware, cartController.updateQuantity);
  router.delete("/cart/:productId", authMiddleware, cartController.removeItem);
  router.delete("/cart", authMiddleware, cartController.clearCart);

  /* ===== CHECKOUT ===== */
  router.post(
    "/checkout/confirm",
    authMiddleware,
    checkoutController.confirmCheckout
  );
  router.get(
    "/orders/:orderId",
    authMiddleware,
    checkoutController.getOrderById
  );
  router.put(
    "/orders/:orderId/processing",
    authMiddleware,
    checkoutController.markOrderProcessing
  );

  router.get(
  "/admin/orders",
  authMiddleware,
  orderController.getAdminOrders
);

router.put(
  "/admin/orders/:orderId/status",
  authMiddleware,
  orderController.updateOrderStatus
);

router.get(
  "/admin/orders/:orderId",
  authMiddleware,
  orderController.getAdminOrderById
);
router.get(
  "/admin/customers",
  authMiddleware,
  customerController.getAdminCustomers
);

router.get(
  "/admin/customers/:id",
  authMiddleware,
  customerController.getAdminCustomerDetail
);
router.get(
  "/admin/dashboard",
  authMiddleware,
  dashboardController.getDashboard
);


  return app.use("/api", router);
};

module.exports = { initAPIRoutes };
