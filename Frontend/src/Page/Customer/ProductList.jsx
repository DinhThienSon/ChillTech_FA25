import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Input,
    Select,
    Button,
    Rate,
    Tag,
    Empty,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Routes/Context/CartContext";
const { Search } = Input;
const { Option } = Select;

const API_URL = "http://localhost:9999";

const ProductList = () => {
    // =============================
    // 🔹 DATA
    // =============================
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useCart();

    // =============================
    // 🔹 FILTER STATE
    // =============================
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    const [category, setCategory] = useState("ALL");

    // =============================
    // 📥 LOAD PRODUCTS + CATEGORY
    // =============================
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`${API_URL}/api/products`);
            const data = res.data.data || [];

            setAllProducts(data);
            setFilteredProducts(data);

            // 🔥 LẤY CATEGORY TỪ DB
            const uniqueCategories = [
                ...new Set(data.map((p) => p.category).filter(Boolean)),
            ];
            setCategories(uniqueCategories);
        };

        fetchProducts();
    }, []);

    // =============================
    // 🔍 FILTER + SORT
    // =============================
    useEffect(() => {
        let data = [...allProducts];

        // SEARCH
        if (search) {
            data = data.filter((p) =>
                p.productName?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // CATEGORY
        if (category !== "ALL") {
            data = data.filter(
                (p) =>
                    p.category &&
                    p.category.trim().toLowerCase() ===
                    category.trim().toLowerCase()
            );
        }

        // SORT
        if (sort === "price_asc") {
            data.sort((a, b) => (a.price || 0) - (b.price || 0));
        }
        if (sort === "price_desc") {
            data.sort((a, b) => (b.price || 0) - (a.price || 0));
        }

        setFilteredProducts(data);
    }, [search, sort, category, allProducts]);

    return (
        <div style={{ padding: 24, maxWidth: 1440, margin: "0 auto" }}>
            {/* ===== TITLE ===== */}
            <h2>Sản phẩm linh kiện điện lạnh</h2>
            <p>Tìm thấy {filteredProducts.length} sản phẩm</p>

            {/* ===== SEARCH + SORT ===== */}
            <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col flex="auto">
                    <Search
                        placeholder="Tìm kiếm sản phẩm..."
                        allowClear
                        onSearch={(value) => setSearch(value)}
                    />
                </Col>
                <Col>
                    <Select
                        value={sort}
                        style={{ width: 160 }}
                        onChange={(value) => setSort(value)}
                    >
                        <Option value="default">Mặc định</Option>
                        <Option value="price_asc">Giá tăng dần</Option>
                        <Option value="price_desc">Giá giảm dần</Option>
                    </Select>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                {/* ===== CATEGORY FILTER ===== */}
                <Col span={5}>
                    <Card title="Danh mục">
                        <Button
                            block
                            type={category === "ALL" ? "primary" : "text"}
                            onClick={() => setCategory("ALL")}
                        >
                            Tất cả
                        </Button>

                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                block
                                type={category === cat ? "primary" : "text"}
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </Card>
                </Col>

                {/* ===== PRODUCT LIST ===== */}
                <Col span={19}>
                    {filteredProducts.length === 0 ? (
                        <Empty description="Không có sản phẩm phù hợp" />
                    ) : (
                        <Row gutter={[24, 24]}>
                            {filteredProducts.map((item) => (
                                <Col span={8} key={item._id}>
                                    <Card
                                        hoverable
                                        cover={
                                            <Link to={`/products/${item._id}`}>
                                                <img
                                                    alt={item.productName}
                                                    src={
                                                        item.imageUrl
                                                            ? `${API_URL}${item.imageUrl}`
                                                            : "/no-image.png"
                                                    }

                                                    style={{
                                                        height: 200,
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Link>
                                        }
                                    >
                                        {item.stockQuantity > 0 ? (
                                            <Tag color="green">Còn hàng</Tag>
                                        ) : (
                                            <Tag color="red">Hết hàng</Tag>
                                        )}

                                        <h4 style={{ marginTop: 10 }}>
                                            <Link
                                                to={`/products/${item._id}`}
                                                style={{
                                                    color: "#000",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {item.productName}
                                            </Link>
                                        </h4>

                                        <h3 style={{ color: "#003a5c" }}>
                                            {item.price
                                                ? item.price.toLocaleString() + "₫"
                                                : "Liên hệ"}
                                        </h3>

                                        <p>Còn {item.stockQuantity} sản phẩm</p>

                                        <Button
                                            type="primary"
                                            block
                                            onClick={() => addToCart(item, 1)}
                                        >
                                            Thêm vào giỏ
                                        </Button>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ProductList;
