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
  Image,
  Space,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
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
  const [localPreview, setLocalPreview] = useState(""); // preview cho file upload

  /* ===== IMAGE RESOLVER (LINK or UPLOAD) ===== */
  const resolveImage = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (!url.startsWith("/")) url = "/" + url;
    return `${API_URL}${url}`;
  };

  /* ===== WATCH imageUrl in form (để preview link) ===== */
  const imageUrl = Form.useWatch("imageUrl", form);

  const previewSrc = useMemo(() => {
    // Ưu tiên preview file mới chọn
    if (localPreview) return localPreview;

    // Nếu không có file mới, preview theo imageUrl trong form
    const resolved = resolveImage(imageUrl);
    return resolved || "";
  }, [localPreview, imageUrl]);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        const data = res.data?.data;

        // Set toàn bộ field lên form (bao gồm imageUrl nếu backend trả về)
        form.setFieldsValue(data);

        // reset file preview mỗi lần load sản phẩm
        setFile(null);
        setLocalPreview("");
      } catch {
        message.error("Không tải được sản phẩm");
        navigate("/admin/products");
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /* Cleanup object URL */
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        // tránh append undefined/null gây rác
        const v = values[key];
        if (v !== undefined && v !== null) formData.append(key, v);
      });

      if (file) {
        formData.append("image", file);
      }

      await axios.put(`${API_URL}/api/products/${id}`, formData, {
        withCredentials: true,
      });

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

        <Form.Item
          name="featured"
          label="Sản phẩm nổi bật"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider style={{ margin: "12px 0" }} />

        {/* ===== LINK IMAGE INPUT (để gắn link) ===== */}
        <Form.Item
          name="imageUrl"
          label="Link ảnh (URL) / Đường dẫn ảnh"
          tooltip='Dán link "https://..." hoặc đường dẫn "/uploads/..."'
        >
          <Input placeholder='Ví dụ: https://... hoặc /uploads/abc.jpg' />
        </Form.Item>

        {/* ===== PREVIEW CURRENT / LINK IMAGE ===== */}
        <Form.Item label="Xem trước ảnh">
          {previewSrc ? (
            <Image
              src={previewSrc}
              fallback="/no-image.png"
              preview={false}
              style={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            />
          ) : (
            <div style={{ color: "rgba(0,0,0,0.45)" }}>
              Chưa có ảnh. Hãy dán link hoặc chọn ảnh mới.
            </div>
          )}
        </Form.Item>

        {/* ===== UPLOAD FILE (optional) ===== */}
        <Form.Item label="Ảnh sản phẩm (Upload file)">
          <Space direction="vertical" style={{ width: "100%" }} size={8}>
            <Upload
              beforeUpload={(f) => {
                setFile(f);

                // tạo preview file
                const url = URL.createObjectURL(f);
                setLocalPreview(url);

                return false; // không upload tự động
              }}
              maxCount={1}
              showUploadList={true}
              onRemove={() => {
                setFile(null);
                if (localPreview) URL.revokeObjectURL(localPreview);
                setLocalPreview("");
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
            </Upload>

            <div style={{ color: "rgba(0,0,0,0.45)", fontSize: 12 }}>
              * Nếu bạn chọn file mới, file sẽ được ưu tiên hơn link khi preview.
            </div>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
