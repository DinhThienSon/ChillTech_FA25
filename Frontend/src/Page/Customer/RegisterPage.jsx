import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Select,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const API_URL = "http://localhost:9999";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        customerName: values.customerName,
        address: values.address,
        gender: values.gender,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };

      await axios.post(`${API_URL}/api/auth/register`, payload);

      message.success("Đăng ký thành công");

      // redirect sau 1s để user thấy message
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      message.error(
        error.response?.data?.message || "Đăng ký thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card style={{ width: 420, borderRadius: 8 }}>
        <Title level={3}>Đăng ký tài khoản</Title>
        <Text type="secondary">
          Tạo tài khoản mới để mua sắm linh kiện điện lạnh
        </Text>

        <Form
          layout="vertical"
          style={{ marginTop: 24 }}
          onFinish={onFinish}
        >
          {/* CUSTOMER */}
          <Form.Item
            label="Họ và tên"
            name="customerName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
              <Option value="OTHER">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>

          {/* ACCOUNT */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, v) =>
                  v
                    ? Promise.resolve()
                    : Promise.reject("Bạn phải đồng ý điều khoản"),
              },
            ]}
          >
            <Checkbox>
              Tôi đồng ý với <Link to="/terms">điều khoản dịch vụ</Link>
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ height: 40 }}
          >
            Đăng ký
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
