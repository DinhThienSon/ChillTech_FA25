import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../Routes/Context/CartContext";

import {
    Row,
    Col,
    Image,
    Breadcrumb,
    Rate,
    Button,
    InputNumber,
    Tag,
    Space,
    Spin,
    Typography,
} from "antd";
import {
    ShoppingCartOutlined,
    TruckOutlined,
    SafetyCertificateOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const API_URL = "http://localhost:9999";

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/products/${id}`)
            .then((res) => setProduct(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Spin style={{ display: "block", margin: "100px auto" }} />;
    }

    if (!product) return null;

    // ===== FIX GIÁ: null / undefined -> 0 =====
    const price = Number(product.price) || 0;

    // ===== FIX ẢNH =====
    const imageSrc = product.imageUrl
        ? `${API_URL}${product.imageUrl}`
        : "/no-image.png";

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
            {/* ===== BREADCRUMB ===== */}
            <Breadcrumb style={{ marginBottom: 24 }}>
                <Breadcrumb.Item>
                    <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/products">Sản phẩm</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product.productName}</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={56}>
                {/* ===== LEFT: IMAGE ===== */}
                <Col span={13}>
                    <Image
                        src={imageSrc}
                        preview={false}
                        style={{
                            borderRadius: 12,
                            background: "#fff",
                            padding: 16,
                        }}
                    />

                    <Space style={{ marginTop: 12 }}>
                        <Image width={72} src={imageSrc} preview={false} />
                        <Image width={72} src={imageSrc} preview={false} />
                        <Image width={72} src={imageSrc} preview={false} />
                    </Space>
                </Col>

                {/* ===== RIGHT: INFO ===== */}
                <Col span={11}>
                    <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Space>
                            <Tag>{product.category}</Tag>
                            <Tag>SKU: {product._id.slice(-6)}</Tag>
                        </Space>

                        <Title level={3} style={{ margin: 0 }}>
                            {product.productName}
                        </Title>

                        <Space>
                            <Rate allowHalf defaultValue={4.5} />
                            <Text type="secondary">(24 đánh giá)</Text>
                        </Space>

                        {/* ===== PRICE ===== */}
                        <Title level={2} style={{ color: "#003a5c", margin: 0 }}>
                            {price.toLocaleString()}₫
                        </Title>

                        {/* ===== STOCK ===== */}
                        <Text>
                            Tình trạng:{" "}
                            {product.stockQuantity > 0 ? (
                                <Text type="success">
                                    Còn {product.stockQuantity} sản phẩm
                                </Text>
                            ) : (
                                <Text type="danger">Hết hàng</Text>
                            )}
                        </Text>

                        {/* ===== QUANTITY ===== */}
                        <Space align="center">
                            <Text>Số lượng:</Text>
                            <InputNumber
                                min={1}
                                max={product.stockQuantity}
                                value={quantity}
                                onChange={setQuantity}
                            />
                            <Text strong>
                                Tổng: {(price * quantity).toLocaleString()}₫
                            </Text>
                        </Space>

                        {/* ===== BUTTONS ===== */}
                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => addToCart(product, quantity)}
                        >
                            Thêm vào giỏ hàng
                        </Button>


                        <Button size="large" block>
                            Mua ngay
                        </Button>

                        {/* ===== COMMITMENTS ===== */}
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col span={8} style={{ textAlign: "center" }}>
                                <TruckOutlined />
                                <div>Giao hàng toàn quốc</div>
                            </Col>
                            <Col span={8} style={{ textAlign: "center" }}>
                                <SafetyCertificateOutlined />
                                <div>Bảo hành chính hãng</div>
                            </Col>
                            <Col span={8} style={{ textAlign: "center" }}>
                                <SyncOutlined />
                                <div>Đổi trả 7 ngày</div>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;
