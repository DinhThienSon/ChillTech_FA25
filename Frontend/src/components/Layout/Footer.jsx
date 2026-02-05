import { Layout, Row, Col, Space } from "antd";
import {
  FacebookFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

// 👉 đồng bộ với Header
const CONTAINER_WIDTH = 1440;

const AppFooter = () => {
  return (
    <Footer
      style={{
        background: "#fff",
        padding: "40px 0",
      }}
    >
      <Row
        gutter={[32, 32]}
        style={{
          maxWidth: CONTAINER_WIDTH,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Company */}
        <Col xs={24} md={6}>
          <h3>Chill Tech</h3>
          <p>
            Chuyên cung cấp linh kiện điện lạnh chất lượng cao cho các thiết bị
            làm lạnh.
          </p>
          <Space size="middle">
           <a href="https://www.facebook.com/vattudienlanhphuhien?locale=vi_VN"><FacebookFilled style={{ fontSize: 20 }} /></a>
            <MailOutlined style={{ fontSize: 20 }} />
          </Space>
        </Col>

        {/* Categories */}
        <Col xs={24} md={6}>
          <h4>Danh mục</h4>
          <Space direction="vertical">
            <a href="/">Compressor</a>
            <a href="/">Dàn nóng/lạnh</a>
            <a href="/">Van điện tử</a>
            <a href="/">Cảm biến</a>
            <a href="/">Gas lạnh</a>
          </Space>
        </Col>

        {/* Support */}
        <Col xs={24} md={6}>
          <h4>Hỗ trợ</h4>
          <Space direction="vertical">
            <a href="/about">Về chúng tôi</a>
            <a href="/policy">Chính sách bảo hành</a>
            <a href="/return">Chính sách đổi trả</a>
            <a href="/guide">Hướng dẫn mua hàng</a>
            <a href="/faq">Câu hỏi thường gặp</a>
          </Space>
        </Col>

        {/* Contact */}
        <Col xs={24} md={6}>
          <h4>Liên hệ</h4>
          <Space direction="vertical">
            <span>
              <EnvironmentOutlined /> 627 Lê Lai, P.Quang Hưng, Thanh Hóa
            </span>
            <span>
              <PhoneOutlined /> 84+ 0986 215 146
            </span>
            <span>
              <MailOutlined /> info@chilltech.vn
            </span>
          </Space>
        </Col>
      </Row>

      {/* Copyright */}
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          borderTop: "1px solid #f0f0f0",
          paddingTop: 20,
        }}
      >
        © 2025 Chill Tech. Tất cả quyền được bảo lưu.
      </div>
    </Footer>
  );
};

export default AppFooter;
