import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  Space,
  Divider,
  Tag,
  Result,
  Spin,
  message,
} from "antd";
import {
  BankOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import qrImage from "../../assets/payment_qr.png";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Title, Text } = Typography;

const Paid = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ======================
     LOAD ORDER
  ====================== */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9999/api/orders/${orderId}`,
          { withCredentials: true }
        );
        setOrder(res.data.data);
      } catch (err) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* ======================
     MARK AS PROCESSING + NAVIGATE HOME
  ====================== */
  const handleMarkProcessing = async () => {
    try {
      setUpdating(true);

      await axios.put(
        `http://localhost:9999/api/orders/${order._id}/processing`,
        {},
        { withCredentials: true }
      );

      message.success("Đã ghi nhận thanh toán, đơn hàng đang được xử lý");

      // 👉 QUAY VỀ TRANG CHỦ
      navigate("/");
    } catch (err) {
      message.error("Không thể cập nhật trạng thái đơn hàng");
    } finally {
      setUpdating(false);
    }
  };

  /* ======================
     LOADING
  ====================== */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  /* ======================
     NOT FOUND
  ====================== */
  if (!order) {
    return (
      <Result
        status="404"
        title="Không tìm thấy đơn hàng"
        subTitle="Đơn hàng không tồn tại hoặc bạn không có quyền truy cập"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Quay về trang chủ
          </Button>
        }
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Row gutter={24}>
          {/* ================= LEFT ================= */}
          <Col span={12}>
            <Card bordered={false} style={{ borderRadius: 16 }}>
              <Space align="center" size={12}>
                <BankOutlined style={{ fontSize: 28, color: "#1677ff" }} />
                <div>
                  <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
                    Thông tin tài khoản
                  </Title>
                  <Text type="secondary">Chuyển khoản ngân hàng</Text>
                </div>
              </Space>

              <Divider />

              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Chủ tài khoản</Text>
                  <div style={{ fontWeight: 600 }}>
                    CT TNHH ĐIỆN LẠNH PHÚ HIỀN
                  </div>
                </div>

                <div>
                  <Text type="secondary">Số tài khoản</Text>
                  <div>113690217979</div>
                </div>

                <div>
                  <Text type="secondary">Ngân hàng</Text>
                  <div>VietinBank – CN Thanh Hóa</div>
                </div>

                {/* ===== NOTICE ===== */}
                <Card
                  bordered={false}
                  style={{
                    background: "#fff7e6",
                    borderRadius: 12,
                    border: "1px solid #ffd591",
                  }}
                >
                  <Text strong style={{ color: "#fa8c16" }}>
                    Lưu ý
                  </Text>
                  <div style={{ marginTop: 4, color: "#ad6800", fontSize: 14 }}>
                    Nếu bạn không ghi đúng <b>nội dung chuyển khoản</b>, hệ thống
                    sẽ không xác nhận được giao dịch và thanh toán của bạn sẽ
                    không được ghi nhận. Vui lòng liên hệ hotline hoặc fanpage
                    để được hỗ trợ.
                  </div>
                </Card>

                {/* ===== PAYMENT CONTENT ===== */}
                <Card
                  bordered={false}
                  style={{ background: "#e6f4ff", borderRadius: 12 }}
                >
                  <Text type="secondary">Nội dung chuyển tiền</Text>

                  <Space
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1677ff",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {order.paymentContent}
                    </Text>

                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() =>
                        navigator.clipboard.writeText(order.paymentContent)
                      }
                    >
                      Sao chép
                    </Button>
                  </Space>
                </Card>

                <Tag color="blue">{order.orderStatus}</Tag>
              </Space>
            </Card>
          </Col>

          {/* ================= RIGHT ================= */}
          <Col span={12}>
            <Card bordered={false} style={{ borderRadius: 16, textAlign: "center" }}>
              <Space align="center" size={12}>
                <QrcodeOutlined style={{ fontSize: 28, color: "#1677ff" }} />
                <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
                  Quét mã QR
                </Title>
              </Space>

              <Divider />

              <div
                style={{
                  background: "#f9fafb",
                  padding: 16,
                  borderRadius: 12,
                  display: "inline-block",
                }}
              >
                <img src={qrImage} alt="QR Payment" style={{ width: 260 }} />
              </div>

              <Divider />

              <Title level={5}>Số tiền cần thanh toán</Title>
              <Title style={{ color: "#1677ff", margin: 0 }}>
                {order.totalAmount.toLocaleString()}₫
              </Title>

              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={updating}
                disabled={order.orderStatus !== "Chờ thanh toán"}
                onClick={handleMarkProcessing}
                style={{
                  marginTop: 24,
                  height: 46,
                  background: "#1677ff",
                  borderColor: "#1677ff",
                  fontWeight: 600,
                }}
              >
                Tôi đã chuyển khoản
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Paid;
