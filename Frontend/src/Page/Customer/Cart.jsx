import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  InputNumber,
  Typography,
  Space,
  Divider,
  Image,
  Empty,
} from "antd";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useCart } from "../../Routes/Context/CartContext";

const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      {/* ===== BREADCRUMB ===== */}
      <Text type="secondary">
        <Link to="/">Trang chủ</Link> / Giỏ hàng
      </Text>

      <Title level={2} style={{ marginTop: 12 }}>
        Giỏ hàng của bạn
      </Title>

      {cartItems.length === 0 ? (
        <Empty description="Giỏ hàng trống" />
      ) : (
        <Row gutter={32}>
          {/* ===== LEFT: CART ITEMS ===== */}
          <Col span={16}>
            {cartItems.map(({ product, quantity }) => {
              const price = Number(product.price) || 0;
              const imageSrc = product.imageUrl
                ? `http://localhost:9999${product.imageUrl}`
                : "/no-image.png";

              return (
                <Card
                  key={product._id}
                  style={{ marginBottom: 16, borderRadius: 12 }}
                >
                  <Row align="middle" gutter={16}>
                    {/* IMAGE */}
                    <Col span={4}>
                      <Image
                        src={imageSrc}
                        width={90}
                        preview={false}
                        style={{ borderRadius: 8 }}
                      />
                    </Col>

                    {/* INFO */}
                    <Col span={10}>
                      <Title level={5} style={{ marginBottom: 4 }}>
                        {product.productName}
                      </Title>
                      <Text type="secondary">
                        {product.brand || ""}
                      </Text>

                      <Space style={{ marginTop: 8 }}>
                        <Button
                          size="small"
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              Math.max(1, quantity - 1)
                            )
                          }
                        >
                          −
                        </Button>
                        <InputNumber
                          min={1}
                          value={quantity}
                          onChange={(value) =>
                            updateQuantity(product._id, value)
                          }
                        />
                        <Button
                          size="small"
                          onClick={() =>
                            updateQuantity(product._id, quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </Space>
                    </Col>

                    {/* PRICE */}
                    <Col span={8} style={{ textAlign: "right" }}>
                      <Title level={5} style={{ marginBottom: 4 }}>
                        {(price * quantity).toLocaleString()}₫
                      </Title>
                      <Text type="secondary">
                        {price.toLocaleString()}₫ / sản phẩm
                      </Text>
                    </Col>

                    {/* REMOVE */}
                    <Col span={2} style={{ textAlign: "right" }}>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeFromCart(product._id)}
                      />
                    </Col>
                  </Row>
                </Card>
              );
            })}

            {/* ACTIONS */}
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Link to="/products">
                <Button icon={<ArrowLeftOutlined />}>
                  Tiếp tục mua sắm
                </Button>
              </Link>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={clearCart}
              >
                Xóa tất cả
              </Button>
            </Space>
          </Col>

          {/* ===== RIGHT: SUMMARY ===== */}
          <Col span={8}>
            <Card style={{ borderRadius: 12 }}>
              <Title level={4}>Tóm tắt đơn hàng</Title>

              <Space
                direction="vertical"
                size={12}
                style={{ width: "100%" }}
              >
                <Row justify="space-between">
                  <Text type="secondary">
                    Tạm tính ({cartItems.length} sản phẩm)
                  </Text>
                  <Text>{subtotal.toLocaleString()}₫</Text>
                </Row>

                <Row justify="space-between">
                  <Text type="secondary">Phí vận chuyển</Text>
                  <Text type="success">Tính ở bước thanh toán</Text>
                </Row>

                <Divider />

                <Row justify="space-between">
                  <Title level={5}>Tổng cộng</Title>
                  <Title level={4} style={{ color: "#003a5c" }}>
                    {subtotal.toLocaleString()}₫
                  </Title>
                </Row>

                {/* CHECKOUT */}
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<RightOutlined />}
                  onClick={() => navigate("/checkout")}
                >
                  Tiến hành thanh toán
                </Button>

                {/* COMMITMENTS */}
                <Space direction="vertical">
                  <Text type="secondary">✓ Giao hàng toàn quốc</Text>
                  <Text type="secondary">✓ Thanh toán an toàn</Text>
                  <Text type="secondary">✓ Đổi trả trong 7 ngày</Text>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Cart;
