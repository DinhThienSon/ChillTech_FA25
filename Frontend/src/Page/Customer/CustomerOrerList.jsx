import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Divider,
  Image,
  Spin,
  Empty,
  Tag,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const API_URL = "http://localhost:9999";

const statusColorMap = {
  "Chờ thanh toán": "orange",
  "Đang xử lý": "blue",
  "Đã thanh toán": "cyan",
  "Đang giao hàng": "geekblue",
  "Đã giao": "green",
  "Hủy đơn": "red",
};

export default function CustomerOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/orders/me`,
          { withCredentials: true }
        );
        setOrders(res.data.data || []);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirmDelivered = async (orderId) => {
    try {
      await axios.patch(
        `${API_URL}/api/orders/${orderId}/confirm-delivered`,
        {},
        { withCredentials: true }
      );

      // cập nhật UI ngay
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, orderStatus: "Đã giao" }
            : o
        )
      );

      message.success("Xác nhận đã giao hàng thành công");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Không thể xác nhận đơn hàng"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div
        style={{
          width: "60vw",
          minWidth: 600,
          maxWidth: 1000,
          margin: "40px auto",
        }}
      >
        <Title level={2}>Your Orders</Title>
        <Empty description="Bạn chưa có đơn hàng nào" />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "60vw",
        minWidth: 700,
        maxWidth: 1100,
        margin: "40px auto",
      }}
    >
      <Title level={2}>Your Orders</Title>
      <Text type="secondary">
        Kiểm tra trạng thái đơn hàng và xem lại các sản phẩm đã mua.
      </Text>

      <Divider />

      {orders.map((order) => (
        <Card
          key={order._id}
          style={{
            marginBottom: 32,
            borderRadius: 14,
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          {/* ===== ORDER HEADER ===== */}
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ fontSize: 15 }}>
                Order #{order._id.slice(-6).toUpperCase()}
              </Text>
              <Text type="secondary" style={{ marginLeft: 12 }}>
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </Text>
            </Col>

            <Col>
              <Tag color={statusColorMap[order.orderStatus]}>
                {order.orderStatus}
              </Tag>
            </Col>
          </Row>

          <Divider />

          {/* ===== ORDER ITEMS ===== */}
          {order.items.map((item, index) => (
            <Row
              key={index}
              gutter={24}
              align="middle"
              style={{
                marginBottom: 16,
                background: "#fafafa",
                padding: 16,
                borderRadius: 12,
              }}
            >
              <Col>
                <Image
                  width={120}
                  height={120}
                  src={
                    item.product?.imageUrl
                      ? `http://localhost:9999${item.product.imageUrl}`
                      : "/no-image.png"
                  }
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    border: "1px solid #eee",
                  }}
                  preview={false}
                />
              </Col>

              <Col flex="auto">
                <Title level={5} style={{ marginBottom: 6 }}>
                  {item.product?.productName}
                </Title>
                <Text type="secondary">
                  Số lượng: {item.quantity}
                </Text>
                <br />
                <Text strong style={{ fontSize: 15 }}>
                  {item.price.toLocaleString()} đ
                </Text>
              </Col>

              <Col>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(`/products/${item.product?._id}`)
                  }
                >
                  Mua lại
                </Button>
              </Col>
            </Row>
          ))}

          <Divider />

          {/* ===== ORDER FOOTER ===== */}
          <Row justify="space-between" align="middle">
            <Col>
              <Text>
                Đơn vị vận chuyển:{" "}
                <strong>{order.shippingUnit}</strong>
              </Text>
            </Col>

            <Col>
              {order.orderStatus === "Đang giao hàng" && (
                <Button
                  type="primary"
                  onClick={() =>
                    handleConfirmDelivered(order._id)
                  }
                >
                  Xác nhận đã giao
                </Button>
              )}
            </Col>

            <Col>
              <Text strong style={{ fontSize: 16 }}>
                Tổng tiền: {order.totalAmount.toLocaleString()} đ
              </Text>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
}
