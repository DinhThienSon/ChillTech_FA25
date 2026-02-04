import {
  Layout,
  Menu,
  Input,
  Badge,
  Row,
  Col,
  Space,
  message,
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

  // ===== LOGOUT =====
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

  return (
    <>
      {/* ===== TOP BAR ===== */}
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
              <Space size="middle">
                <Space style={{ color: "#fff" }}>
                  <UserOutlined />
                  Xin chào, {user.customerName}
                </Space>

                <span style={{ color: "#fff" }}>|</span>

                <span
                  onClick={handleLogout}
                  style={{
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Đăng xuất
                </span>
              </Space>
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

      {/* ===== MAIN HEADER ===== */}
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
          {/* LOGO */}
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

          {/* MENU */}
          <Col flex="auto" style={{ paddingLeft: 40 }}>
            <Menu
              mode="horizontal"
              style={{ borderBottom: "none" }}
              items={[
                {
                  key: "home",
                  label: <Link to="/">Trang chủ</Link>,
                },
                {
                  key: "products",
                  label: <Link to="/products">Sản phẩm</Link>,
                },
                {
                  key: "category",
                  label: "Danh mục",
                },
                {
                  key: "about",
                  label: "Về chúng tôi",
                },
                {
                  key: "contact",
                  label: "Liên hệ",
                },
              ]}
            />
          </Col>

          {/* SEARCH + CART */}
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
