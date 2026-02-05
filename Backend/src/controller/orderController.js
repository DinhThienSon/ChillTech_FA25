const orderService = require("../service/orderService");

const getAdminOrders = async (req, res) => {
  try {
    // 🔒 Chỉ ADMIN
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    const orders = await orderService.getAllOrdersForAdmin();

    return res.status(200).json({
      message: "Lấy danh sách đơn hàng thành công",
      data: orders,
    });
  } catch (error) {
    console.error("GET ADMIN ORDERS ERROR:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    // 🔒 Chỉ ADMIN
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Không có quyền thao tác" });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Thiếu trạng thái mới" });
    }

    const order = await orderService.updateOrderStatus(orderId, status);

    return res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Không thể cập nhật trạng thái đơn hàng",
    });
  }
  
};
const getAdminOrderById = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    const { orderId } = req.params;

    const order = await orderService.getOrderByIdForAdmin(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    return res.json({
      message: "Lấy chi tiết đơn hàng thành công",
      data: order,
    });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports = {
  getAdminOrders,
  updateOrderStatus,
  getAdminOrderById
  
};
