import { useState } from "react";
import { Card, Form, Input, Button, Checkbox, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Routes/Context/AuthContext";


const { Title, Text } = Typography;
const API_URL = "http://localhost:9999";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchMe } = useAuth(); // 👈 QUAN TRỌNG

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/auth/login`,
        values,
        { withCredentials: true }
      );

      await fetchMe(); // 👈 CẬP NHẬT CONTEXT NGAY

      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 420 }}>
        <Title level={3}>Đăng nhập</Title>
        <Text type="secondary">Đăng nhập để tiếp tục</Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            <Link to="/forgot-password" style={{ float: "right" }}>Quên mật khẩu?</Link>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
