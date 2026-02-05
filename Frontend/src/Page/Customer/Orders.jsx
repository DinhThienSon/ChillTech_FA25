import { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  message,
  Card,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9999";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ===== FETCH ORDERS =====
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/orders/my-orders`,
        { withCredentials: true }
      );
      setOrders(res.data.data || []);
    } catch (err) {
      message.error("Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===== CANCEL ORDER =====
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/${orderId}/cancel`,
        {},
        { withCredentials: true }
      );
      message.success("Đã hủy đơn hàng");
      fetchOrders();
    } catch {
      message.error("Không thể hủy đơn");
    }
  };

  // ===== STATUS TAG =====
  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <Tag color="orange">Chờ xác nhận</Tag>;
      case "CONFIRMED":
        return <Tag color="blue">Đã xác nhận</Tag>;
      case "SHIPPING":
        return <Tag color="cyan">Đang giao</Tag>;
      case "COMPLETED":
        return <Tag color="green">Hoàn thành</Tag>;
      case "CANCELLED":
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // ===== TABLE COLUMNS =====
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id.slice(-6).toUpperCase(),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (price) =>
        price?.toLocaleString() + "₫",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() =>
              navigate(`/account/orders/${record._id}`)
            }
          >
            Chi tiết
          </Button>

          {record.status === "PENDING" && (
            <Button
              danger
              size="small"
              onClick={() =>
                handleCancelOrder(record._id)
              }
            >
              Hủy đơn
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
      <Card title="Đơn hàng của tôi">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={orders}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default CustomerOrders;
