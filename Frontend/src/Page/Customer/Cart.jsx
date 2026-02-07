import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
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
  Tag,
  theme,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useCart } from "../../Routes/Context/CartContext";

const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.product.price) || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const pageWrap = {
    background: `radial-gradient(1200px 600px at 15% -10%, ${token.colorPrimaryBg} 0%, transparent 55%),
                 radial-gradient(900px 450px at 100% 0%, ${token.colorInfoBg} 0%, transparent 55%),
                 linear-gradient(180deg, ${token.colorFillSecondary} 0%, ${token.colorBgLayout} 58%, ${token.colorBgLayout} 100%)`,
    minHeight: "calc(100vh - 64px)",
    padding: "28px 0 56px",
  };

  const container = { maxWidth: 1200, margin: "0 auto", padding: "0 16px" };

  const cardBase = {
    borderRadius: 18,
    boxShadow: token.boxShadowTertiary,
    background: token.colorBgContainer,
  };

  if (cartItems.length === 0) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          <Text type="secondary">
            <Link to="/">Trang chủ</Link> {" / "} Giỏ hàng
          </Text>

          <div style={{ marginTop: 14 }}>
            <Title level={2} style={{ margin: 0 }}>
              Giỏ hàng
            </Title>
            <Text type="secondary">Chưa có sản phẩm nào trong giỏ.</Text>
          </div>

          <Card bordered={false} style={{ ...cardBase, maxWidth: 560, margin: "28px auto 0" }} bodyStyle={{ padding: 22 }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>Giỏ hàng trống</div>
                  <div style={{ color: token.colorTextSecondary, marginTop: 4 }}>
                    Hãy thêm sản phẩm để tiếp tục mua sắm.
                  </div>
                </div>
              }
            />
            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              style={{ width: "100%", height: 48, borderRadius: 12, fontWeight: 700 }}
              onClick={() => navigate("/products")}
            >
              Tiếp tục mua sắm
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={container}>
        {/* Breadcrumb */}
        <Text type="secondary">
          <Link to="/">Trang chủ</Link> {" / "} <span>Giỏ hàng</span>
        </Text>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Giỏ hàng của bạn
            </Title>
            <Text type="secondary">
              {cartItems.length} sản phẩm • Kiểm tra số lượng trước khi thanh toán
            </Text>
          </div>

          <Space wrap>
            <Button
              icon={<ReloadOutlined />}
              style={{ borderRadius: 12 }}
              onClick={() => window.location.reload()}
            >
              Làm mới
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              style={{ borderRadius: 12 }}
              onClick={clearCart}
            >
              Xóa tất cả
            </Button>
          </Space>
        </div>

        <div style={{ height: 18 }} />

        <Row gutter={[24, 24]}>
          {/* LEFT: Items */}
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={14} style={{ width: "100%" }}>
              {cartItems.map(({ product, quantity }) => {
                const price = Number(product.price) || 0;
                const imageSrc = product.imageUrl
                  ? `http://localhost:9999${product.imageUrl}`
                  : "/no-image.png";

                return (
                  <Card
                    key={product._id}
                    bordered={false}
                    style={{
                      ...cardBase,
                      overflow: "hidden",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                    bodyStyle={{ padding: 16 }}
                  >
                    <Row gutter={[16, 12]} align="middle">
                      {/* Image */}
                      <Col xs={24} sm={6} md={5}>
                        <div
                          style={{
                            width: "100%",
                            maxWidth: 120,
                            height: 120,
                            borderRadius: 16,
                            overflow: "hidden",
                            background: token.colorFillSecondary,
                            border: `1px solid ${token.colorBorderSecondary}`,
                          }}
                        >
                          <Image
                            src={imageSrc}
                            preview={false}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Col>

                      {/* Info */}
                      <Col xs={24} sm={18} md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <div style={{ minWidth: 0 }}>
                            <Title level={5} style={{ margin: 0, lineHeight: 1.35 }}>
                              {product.productName}
                            </Title>

                            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                              {product.brand ? (
                                <Tag
                                  bordered={false}
                                  style={{
                                    borderRadius: 999,
                                    marginRight: 0,
                                    padding: "2px 10px",
                                    background: token.colorFillSecondary,
                                  }}
                                >
                                  {product.brand}
                                </Tag>
                              ) : null}

                              {product.category ? (
                                <Tag
                                  bordered={false}
                                  style={{
                                    borderRadius: 999,
                                    marginRight: 0,
                                    padding: "2px 10px",
                                    background: token.colorFillSecondary,
                                  }}
                                >
                                  {product.category}
                                </Tag>
                              ) : null}
                            </div>
                          </div>

                          <Tooltip title="Xóa">
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => removeFromCart(product._id)}
                              style={{ borderRadius: 12 }}
                            />
                          </Tooltip>
                        </div>

                        <div
                          style={{
                            marginTop: 14,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <Text type="secondary">Số lượng</Text>

                          <Space.Compact>
                            <Button
                              onClick={() => updateQuantity(product._id, Math.max(1, quantity - 1))}
                              disabled={quantity <= 1}
                              style={{ borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                            >
                              −
                            </Button>

                            <InputNumber
                              min={1}
                              value={quantity}
                              controls={false}
                              onChange={(value) => updateQuantity(product._id, value)}
                              style={{ width: 78, textAlign: "center" }}
                            />

                            <Button
                              onClick={() => updateQuantity(product._id, quantity + 1)}
                              style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12 }}
                            >
                              +
                            </Button>
                          </Space.Compact>

                          <Text type="secondary" style={{ marginLeft: "auto" }}>
                            {price.toLocaleString()}₫ / sp
                          </Text>
                        </div>
                      </Col>

                      {/* Price */}
                      <Col xs={24} md={7} style={{ textAlign: "right" }}>
                        <Text style={{ fontSize: 20, fontWeight: 900, color: token.colorPrimary }}>
                          {(price * quantity).toLocaleString()}₫
                        </Text>
                        <div>
                          <Text type="secondary">Tạm tính</Text>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                );
              })}

              <div style={{ paddingTop: 6 }}>
                <Link to="/products">
                  <Button icon={<ArrowLeftOutlined />} style={{ borderRadius: 12 }}>
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </Space>
          </Col>

          {/* RIGHT: Summary */}
          <Col xs={24} lg={8}>
            <div style={{ position: "sticky", top: 92 }}>
              <Card bordered={false} style={cardBase} bodyStyle={{ padding: 18 }}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
                  Tóm tắt đơn hàng
                </Title>

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Row justify="space-between">
                    <Text type="secondary">Tạm tính</Text>
                    <Text style={{ fontWeight: 800 }}>{subtotal.toLocaleString()}₫</Text>
                  </Row>

                  <Row justify="space-between">
                    <Text type="secondary">Vận chuyển</Text>
                    <Text type="secondary" style={{ fontWeight: 700 }}>
                      Tính ở bước thanh toán
                    </Text>
                  </Row>

                  <Divider style={{ margin: "8px 0" }} />

                  <Row justify="space-between" align="middle">
                    <Text style={{ fontWeight: 900, fontSize: 15 }}>Tổng cộng</Text>
                    <Text style={{ fontWeight: 900, fontSize: 24, color: token.colorPrimary }}>
                      {subtotal.toLocaleString()}₫
                    </Text>
                  </Row>

                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<RightOutlined />}
                    style={{ height: 50, borderRadius: 14, fontWeight: 800 }}
                    onClick={() => navigate("/checkout")}
                  >
                    Tiến hành thanh toán
                  </Button>

                  <Divider style={{ margin: "10px 0" }} />

                  <Space direction="vertical" size={10} style={{ width: "100%" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <SafetyCertificateOutlined style={{ color: token.colorTextSecondary }} />
                      <Text type="secondary">Thanh toán an toàn</Text>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <CarOutlined style={{ color: token.colorTextSecondary }} />
                      <Text type="secondary">Giao hàng toàn quốc</Text>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <ReloadOutlined style={{ color: token.colorTextSecondary }} />
                      <Text type="secondary">Đổi trả linh hoạt</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
