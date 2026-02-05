import { Card, Descriptions, Button, Tag } from "antd";
import { useAuth } from "../../Routes/Context/AuthContext";

const CustomerProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div style={{ padding: 24 }}>Vui lòng đăng nhập</div>;
  }

  const customer = user.customer || {};

  const genderMap = {
    MALE: "Nam",
    FEMALE: "Nữ",
    OTHER: "Khác",
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <Card
        title="Hồ sơ khách hàng"
        extra={<Button type="primary">Chỉnh sửa</Button>}
      >
        <Descriptions column={2} bordered>
          {/* ===== CUSTOMER ===== */}
          <Descriptions.Item label="Họ và tên">
            {customer.customerName || "Chưa cập nhật"}
          </Descriptions.Item>

          <Descriptions.Item label="Giới tính">
            {genderMap[customer.gender] || "Chưa cập nhật"}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ" span={2}>
            {customer.address || "Chưa cập nhật"}
          </Descriptions.Item>

          {/* ===== ACCOUNT ===== */}
          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            {user.phone || "Chưa cập nhật"}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            {user.status === "ACTIVE" ? (
              <Tag color="green">Hoạt động</Tag>
            ) : (
              <Tag color="red">Bị khóa</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Vai trò">
            {user.role === "CUSTOMER" ? "Khách hàng" : "Quản trị"}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo tài khoản" span={2}>
            {new Date(user.createdAt).toLocaleDateString("vi-VN")}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default CustomerProfile;
