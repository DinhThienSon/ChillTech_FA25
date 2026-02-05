import {
  Form,
  Input,
  Card,
  Button,
  Divider,
  Image,
  Alert,
  Select,
  List,
  Typography,
  Row,
} from "antd";
import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Routes/Context/CartContext";

const { Option } = Select;
const { Text } = Typography;

const CheckOut = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  /* ================= OSM ADDRESS ================= */
  const [addressQuery, setAddressQuery] = useState("");
  const [addressResults, setAddressResults] = useState([]);
  const debounceRef = useRef(null);

  const searchAddress = (value) => {
    setAddressQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setAddressResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5&accept-language=vi`
        );
        const data = await res.json();
        setAddressResults(data);
      } catch (err) {
        console.error("Lỗi tìm địa chỉ:", err);
      }
    }, 500);
  };

  /* ================= SHIPPING ================= */
  const [shippingUnit, setShippingUnit] = useState(null);

  const totalProductPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + item.quantity * Number(item.product.price || 0),
        0
      ),
    [cartItems]
  );

  const totalWeight = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + item.quantity * Number(item.product.wpu || 0),
        0
      ),
    [cartItems]
  );

  const shippingFee = useMemo(() => {
    if (!shippingUnit || totalWeight === 0) return 0;

    if (shippingUnit === "Giao hàng nhanh") {
      if (totalWeight <= 2) return 18000;
      return 18000 + Math.ceil((totalWeight - 2) / 0.5) * 3500;
    }

    if (shippingUnit === "J&T Express") {
      if (totalWeight <= 1) return 20700;
      return 20700 + Math.ceil((totalWeight - 1) / 0.5) * 4000;
    }

    return 0;
  }, [shippingUnit, totalWeight]);

  const totalAmount = totalProductPrice + shippingFee;

  /* ================= CONFIRM CHECKOUT (ĐÃ FIX) ================= */
  const handleConfirmCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9999/api/checkout/confirm",
        {
          shippingAddress: addressQuery,
          shippingUnit,
          note: "",
        },
        { withCredentials: true }
      );

      // 👉 LẤY ORDER TỪ BACKEND
      const order = res.data.data.order;

      // clear cart frontend
      await clearCart();
console.log("ORDER._id =", order._id, order._id.length);

      // 👉 SANG PAYMENT THEO ORDER ID
      navigate(`/payment/${order._id}`);
    } catch (err) {
      console.error(err);
      alert("Xác nhận thanh toán thất bại");
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        {/* ===== THÔNG TIN NHẬN HÀNG ===== */}
        <Card
          title="Thông tin nhận hàng"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Form layout="vertical">
            <Form.Item label="Tên người / tổ chức nhận hàng">
              <Input placeholder="Nhập tên người hoặc tổ chức nhận hàng" />
            </Form.Item>

            <Form.Item label="Địa chỉ nhận hàng">
              <div style={{ position: "relative" }}>
                <Input
                  placeholder="Nhập địa chỉ (OpenStreetMap – miễn phí)"
                  value={addressQuery}
                  onChange={(e) => searchAddress(e.target.value)}
                />
                {addressResults.length > 0 && (
                  <List
                    size="small"
                    bordered
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      width: "100%",
                      background: "#fff",
                      marginTop: 4,
                      maxHeight: 200,
                      overflowY: "auto",
                    }}
                    dataSource={addressResults}
                    renderItem={(item) => (
                      <List.Item
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setAddressQuery(item.display_name);
                          setAddressResults([]);
                        }}
                      >
                        {item.display_name}
                      </List.Item>
                    )}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input placeholder="Nhập số điện thoại liên hệ" />
            </Form.Item>

            <Form.Item label="Đơn vị vận chuyển">
              <Select
                placeholder="Chọn đơn vị vận chuyển"
                onChange={setShippingUnit}
              >
                <Option value="Giao hàng nhanh">Giao Hàng Nhanh</Option>
                <Option value="J&T Express">J&T Express</Option>
              </Select>
            </Form.Item>

            <Divider />

            <Alert
              type="info"
              showIcon
              message="Lưu ý"
              description="Sau khi xác nhận thanh toán, bạn chỉ được hủy đơn trong vòng 24 giờ trước khi cửa hàng bàn giao hàng cho đơn vị vận chuyển."
            />
          </Form>
        </Card>

        {/* ===== TÓM TẮT ĐƠN HÀNG ===== */}
        <Card title="Tóm tắt đơn hàng" bordered={false}>
          {cartItems.map(({ product, quantity }) => {
            const imageSrc = product.imageUrl
              ? `http://localhost:9999${product.imageUrl}`
              : "/no-image.png";

            return (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Image
                  width={64}
                  src={imageSrc}
                  preview={false}
                  style={{ borderRadius: 8 }}
                />

                <div style={{ flex: 1, marginLeft: 12 }}>
                  <div style={{ fontWeight: 500 }}>
                    {product.productName}
                  </div>
                  <Text type="secondary">
                    SL: {quantity} × {product.wpu}kg
                  </Text>
                  <div style={{ marginTop: 4 }}>
                    {(product.price * quantity).toLocaleString()}₫
                  </div>
                </div>
              </div>
            );
          })}

          <Divider />

          <Row justify="space-between">
            <span>Tạm tính</span>
            <span>{totalProductPrice.toLocaleString()}₫</span>
          </Row>

          <Row justify="space-between" style={{ marginTop: 8 }}>
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString()}₫</span>
          </Row>

          <Row justify="space-between" style={{ marginTop: 8 }}>
            <span>Tổng cân nặng</span>
            <span>{totalWeight.toFixed(2)} kg</span>
          </Row>

          <Divider />

          <Row
            justify="space-between"
            style={{ fontWeight: 600, fontSize: 16 }}
          >
            <span>Tổng thanh toán</span>
            <span>{totalAmount.toLocaleString()}₫</span>
          </Row>

          <Button
            type="primary"
            block
            size="large"
            style={{ marginTop: 24, height: 48 }}
            disabled={cartItems.length === 0 || !shippingUnit}
            onClick={handleConfirmCheckout}
          >
            Xác nhận thanh toán
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CheckOut;
