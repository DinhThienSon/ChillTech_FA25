import {
  Layout,
  Menu,
  Input,
  Badge,
  Row,
  Col,
  Space,
  message,
  Dropdown,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Routes/Context/AuthContext";
import { useCart } from "../../Routes/Context/CartContext";

const { Header } = Layout;
const { Search } = Input;

const CONTAINER_WIDTH = 1440;
const API_URL = "http://localhost:9999";

const AppHeader = () => {
  const { user, setUser } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      message.success("Đã đăng xuất");
      navigate("/login");
    } catch {
      message.error("Đăng xuất thất bại");
    }
  };

  // ✅ AntD v5 dropdown menu
  const userMenuItems = [
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
      onClick: () => navigate("/account/profile"),
    },
    {
      key: "orders",
      label: "Đơn hàng của tôi",
      onClick: () => navigate("/account/orders"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div style={{ background: "#003a5d", color: "#fff", fontSize: 13 }}>
        <Row
          justify="space-between"
          align="middle"
          style={{
            maxWidth: CONTAINER_WIDTH,
            margin: "0 auto",
            padding: "6px 24px",
          }}
        >
          <Col>
            <Space size="middle">
              <span>
                <PhoneOutlined /> Hotline: 0986 215 146
              </span>
              <span>
                <MailOutlined /> info@chilltech.vn
              </span>
            </Space>
          </Col>

          <Col>
            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space style={{ color: "#fff", cursor: "pointer" }}>
                  <UserOutlined />
                  Xin chào, {user.customerName}
                </Space>
              </Dropdown>
            ) : (
              <Space>
                <Link to="/login" style={{ color: "#fff" }}>
                  Đăng nhập
                </Link>
                <span>|</span>
                <Link to="/register" style={{ color: "#fff" }}>
                  Đăng ký
                </Link>
              </Space>
            )}
          </Col>
        </Row>
      </div>

      {/* MAIN HEADER */}
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: 0,
        }}
      >
        <Row
          align="middle"
          justify="space-between"
          style={{
            maxWidth: CONTAINER_WIDTH,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Col>
            <Link
              to="/"
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#003a5d",
                textDecoration: "none",
              }}
            >
              Chill Tech
            </Link>
          </Col>

          <Col flex="auto" style={{ paddingLeft: 40 }}>
            <Menu
              mode="horizontal"
              style={{ borderBottom: "none" }}
              items={[
                { key: "home", label: <Link to="/">Trang chủ</Link> },
                { key: "products", label: <Link to="/products">Sản phẩm</Link> },
                { key: "about", label: <Link to="/about">Về chúng tôi</Link> },
              ]}
            />
          </Col>

          <Col>
            <Space size="large">
              <Search
                placeholder="Tìm kiếm linh kiện..."
                allowClear
                style={{ width: 280 }}
              />

              <Badge count={totalItems} showZero>
                <ShoppingCartOutlined
                  style={{ fontSize: 22, cursor: "pointer" }}
                  onClick={() => navigate("/cart")}
                />
              </Badge>
            </Space>
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default AppHeader;
