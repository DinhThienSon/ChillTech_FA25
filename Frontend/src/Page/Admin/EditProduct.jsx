import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:9999";
const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        form.setFieldsValue(res.data.data);
      } catch {
        message.error("Không tải được sản phẩm");
        navigate("/admin/products");
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(values).forEach((key) =>
        formData.append(key, values[key])
      );

      if (file) {
        formData.append("image", file);
      }

      await axios.put(
        `${API_URL}/api/products/${id}`,
        formData,
        { withCredentials: true }
      );

      message.success("Cập nhật sản phẩm thành công");
      navigate("/admin/products");
    } catch (err) {
      message.error(err.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open
      title="Chỉnh sửa sản phẩm"
      okText="Lưu thay đổi"
      cancelText="Hủy"
      onCancel={() => navigate("/admin/products")}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
          <Select>
            <Option value="Compressor">Compressor</Option>
            <Option value="Dàn nóng/lạnh">Dàn nóng/lạnh</Option>
            <Option value="Relay & Timer">Relay & Timer</Option>
          </Select>
        </Form.Item>

        <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="stockQuantity" label="Số lượng tồn kho">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="unit" label="Đơn vị">
          <Input />
        </Form.Item>

        <Form.Item name="wpu" label="Khối lượng (kg / đơn vị)">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="featured" label="Sản phẩm nổi bật" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
