import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Switch,
  message,
  Image,
  Space,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:9999";

const AddProduct = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [localPreview, setLocalPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== IMAGE RESOLVER (LINK or UPLOAD PATH) ===== */
  const resolveImage = (url) => {
    if (!url) return "";
    if (typeof url !== "string") return "";
    if (url.startsWith("http")) return url;
    const normalized = url.startsWith("/") ? url : `/${url}`;
    return `${API_URL}${normalized}`;
  };

  const imageUrl = Form.useWatch("imageUrl", form);

  const previewSrc = useMemo(() => {
    if (localPreview) return localPreview; // ưu tiên file upload
    return resolveImage(imageUrl);
  }, [localPreview, imageUrl]);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // append các field bình thường (trừ imageUrl sẽ xử lý riêng)
      Object.entries(values).forEach(([key, value]) => {
        if (key === "imageUrl") return;
        if (value !== undefined && value !== null) formData.append(key, value);
      });

      // Nếu có file => gửi file, không gửi imageUrl (để tránh conflict)
      if (file) {
        formData.append("image", file);
      } else {
        // Không có file => gửi imageUrl nếu có
        if (values.imageUrl) formData.append("imageUrl", values.imageUrl);
      }

      await axios.post(`${API_URL}/api/products`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Thêm sản phẩm thành công");
      form.resetFields();
      setFile(null);
      if (localPreview) URL.revokeObjectURL(localPreview);
      setLocalPreview("");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Thêm sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm sản phẩm mới"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
        >
          <Input placeholder="VD: Compressor Danfoss" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: "Nhập danh mục" }]}
        >
          <Input placeholder="VD: Máy nén lạnh, Dây điện, Vật tư lạnh..." />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá (VNĐ)"
          rules={[{ required: true, message: "Nhập giá" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(v) => `₫ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(v) => v.replace(/[₫,\s]/g, "")}
          />
        </Form.Item>

        <Form.Item name="stockQuantity" label="Số lượng tồn kho">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="unit" label="Đơn vị">
          <Input placeholder="VD: cái, mét, kg..." />
        </Form.Item>

        <Form.Item name="wpu" label="Khối lượng (kg / đơn vị)">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          name="featured"
          label="Sản phẩm nổi bật"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider style={{ margin: "12px 0" }} />

        {/* ✅ NHẬP LINK ẢNH / ĐƯỜNG DẪN */}
        <Form.Item
          name="imageUrl"
          label="Link ảnh / Đường dẫn ảnh"
          tooltip='Dán "https://..." hoặc "/uploads/..."'
        >
          <Input placeholder='Ví dụ: https://... hoặc /uploads/abc.jpg' />
        </Form.Item>

        {/* ✅ PREVIEW */}
        <Form.Item label="Xem trước ảnh">
          {previewSrc ? (
            <Image
              src={previewSrc}
              fallback="/no-image.png"
              preview={false}
              width={140}
              height={140}
              style={{ objectFit: "cover", borderRadius: 12 }}
            />
          ) : (
            <div style={{ color: "rgba(0,0,0,0.45)" }}>
              Chưa có ảnh. Dán link hoặc chọn file.
            </div>
          )}
        </Form.Item>

        {/* ✅ UPLOAD FILE */}
        <Form.Item label="Upload ảnh (tuỳ chọn)">
          <Space direction="vertical" style={{ width: "100%" }} size={8}>
            <Upload
              beforeUpload={(f) => {
                setFile(f);
                const url = URL.createObjectURL(f);
                setLocalPreview(url);
                return false;
              }}
              maxCount={1}
              showUploadList
              onRemove={() => {
                setFile(null);
                if (localPreview) URL.revokeObjectURL(localPreview);
                setLocalPreview("");
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>

            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>
              * Nếu chọn file, hệ thống sẽ dùng file (ưu tiên hơn link).
            </div>
          </Space>
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm sản phẩm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProduct;
