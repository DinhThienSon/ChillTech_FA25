const Order = require("../models/Order");

const getAllOrdersForAdmin = async () => {
  return await Order.find()
    .populate({
      path: "customer",
      select: "customerName",
      populate: {
        path: "account",
        select: "phone email",
      },
    })
    .populate({
      path: "items.product",
      select: "productName",
    })
    .sort({ createdAt: -1 })
    .lean();
};

const STATUS_FLOW = {
  "Chờ thanh toán": ["Hủy đơn"],
  "Đang xử lý": ["Đã thanh toán"],
  "Đã thanh toán": ["Đang giao hàng"],
  "Đang giao hàng": [],
  "Đã giao": [],
  "Hủy đơn": [],
};

const updateOrderStatus = async (orderId, newStatus) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Đơn hàng không tồn tại");
  }

  const currentStatus = order.orderStatus;
  const allowedNextStatuses = STATUS_FLOW[currentStatus];

  // ❌ Trạng thái khóa
  if (!allowedNextStatuses || allowedNextStatuses.length === 0) {
    throw new Error(
      `Đơn hàng đang ở trạng thái '${currentStatus}' không thể thay đổi`
    );
  }

  // ❌ Chuyển sai luật
  if (!allowedNextStatuses.includes(newStatus)) {
    throw new Error(
      `Không thể chuyển từ '${currentStatus}' sang '${newStatus}'`
    );
  }

  // ✅ HỢP LỆ
  order.orderStatus = newStatus;
  await order.save();

  return order;
};

const getOrderByIdForAdmin = async (orderId) => {
  return await Order.findById(orderId)
    .populate({
      path: "customer",
      select: "customerName",
      populate: {
        path: "account",
        select: "email phone",
      },
    })
    .populate({
      path: "items.product",
      select: "productName",
    });
};


module.exports = {
  getAllOrdersForAdmin,
  updateOrderStatus,
  getOrderByIdForAdmin,
};
