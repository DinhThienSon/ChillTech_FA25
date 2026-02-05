import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9999";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // =========================
  // FETCH FEATURED PRODUCTS
  // =========================
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/public`);
        const result = await response.json();

        if (result.data) {
          // Lấy 4 sản phẩm đầu tiên làm nổi bật
          setProducts(result.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // =========================
  // ICON SVG
  // =========================
  const IconArrow = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );

  const IconShield = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52c41a" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  const IconCart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );

  return (
    <div style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "#0b1c36" }}>
      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.row}>
            <div style={styles.colContent}>
              <h1 style={styles.title}>
                Linh Kiện Điện Lạnh <br />
                <span style={{ color: "#1890ff" }}>Chất Lượng Cao</span>
              </h1>

              <p style={styles.description}>
                Chuyên cung cấp linh kiện chính hãng cho tủ lạnh, máy lạnh, máy giặt.
                Uy tín hàng đầu, giao hàng toàn quốc nhanh chóng.
              </p>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.btnPrimary}
                  onClick={() => navigate("/products")}
                >
                  Xem sản phẩm <IconArrow />
                </button>

                <button
                  style={styles.btnSecondary}
                  onClick={() => {
                    const footer = document.getElementById("footer");
                    footer?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Liên hệ ngay
                </button>

              </div>

              <div style={styles.statsRow}>
                <div>
                  <div style={styles.statValue}>5000+</div>
                  <div style={styles.statLabel}>Sản phẩm</div>
                </div>
                <div>
                  <div style={styles.statValue}>15+</div>
                  <div style={styles.statLabel}>Năm nghề</div>
                </div>
                <div>
                  <div style={styles.statValue}>99%</div>
                  <div style={styles.statLabel}>Hài lòng</div>
                </div>
              </div>
            </div>

            <div style={styles.colImage}>
              <div style={styles.imageWrapper}>
                <img src="chilltech.png" alt="ChillTech" style={styles.mainImg} />

                <div style={styles.badgeTop}>
                  <div style={styles.iconCircle}><IconShield /></div>
                  <div>
                    <strong>Chính hãng 100%</strong>
                    <div style={{ fontSize: 12, color: "#666" }}>Bảo hành uy tín</div>
                  </div>
                </div>

                <div style={styles.badgeBottom}>
                  <IconCheck />
                  <span>Giao hàng nhanh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section style={styles.featuredSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Sản Phẩm Nổi Bật</h2>
            <div style={styles.underline}></div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              Đang tải sản phẩm...
            </div>
          ) : (
            <div style={styles.productGrid}>
              {products.map((item) => (
                <div key={item._id} style={styles.productCard}>
                  <div style={styles.imgBox}>
                    <img
                      src={
                        item.imageUrl
                          ? `${API_URL}${item.imageUrl}`
                          : "placeholder.png"
                      }
                      alt={item.productName}
                      style={styles.productImg}
                    />
                  </div>

                  <div>
                    <h3 style={styles.productName}>{item.productName}</h3>
                    <div style={styles.productPrice}>
                      {item.price?.toLocaleString()} <small>VNĐ</small>
                    </div>

                    <button
                      style={styles.addToCartBtn}
                      onClick={() => navigate(`/products/${item._id}`)}
                    >
                      <IconCart /> Mua ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ================= STYLES (GIỮ NGUYÊN) =================
const styles = {
  hero: {
    background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f9f0ff 100%)",
    padding: "60px 20px",
  },
  container: { maxWidth: "1200px", margin: "0 auto" },
  row: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" },
  colContent: { flex: "1 1 500px" },
  colImage: { flex: "1 1 400px", display: "flex", justifyContent: "center" },
  title: { fontSize: "clamp(32px,5vw,56px)", fontWeight: 800 },
  description: { fontSize: 18, color: "#4b5563", marginBottom: 40 },
  buttonGroup: { display: "flex", gap: 16, marginBottom: 48 },
  btnPrimary: { padding: "14px 28px", background: "#1890ff", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
  btnSecondary: { padding: "14px 28px", background: "#fff", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer" },
  statsRow: { display: "flex", gap: 32, borderTop: "1px solid #e5e7eb", paddingTop: 32 },
  statValue: { fontSize: 28, fontWeight: 700, color: "#1890ff" },
  statLabel: { fontSize: 14, color: "#6b7280" },
  imageWrapper: { position: "relative", maxWidth: 480, background: "#f3f4f6", borderRadius: 32 },
  mainImg: { width: "100%", borderRadius: 32 },
  badgeTop: { position: "absolute", top: -15, right: -10, background: "#fff", padding: "10px 15px", borderRadius: 12, display: "flex", gap: 10 },
  iconCircle: { width: 35, height: 35, background: "#e6f7ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  badgeBottom: { position: "absolute", bottom: 20, left: -10, background: "#fff", padding: "8px 16px", borderRadius: 100, display: "flex", gap: 8 },
  featuredSection: { padding: "80px 20px" },
  sectionHeader: { textAlign: "center", marginBottom: 48 },
  sectionTitle: { fontSize: 32, fontWeight: 700 },
  underline: { width: 50, height: 4, background: "#1890ff", margin: "0 auto" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 25 },
  productCard: { border: "1px solid #eee", borderRadius: 16, padding: 15, textAlign: "center" },
  imgBox: { height: 200, display: "flex", alignItems: "center", justifyContent: "center" },
  productImg: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  productName: { fontSize: 17, height: 40, overflow: "hidden" },
  productPrice: { fontSize: 20, fontWeight: 700, color: "#1890ff", marginBottom: 15 },
  addToCartBtn: { width: "100%", padding: 10, background: "#0b1c36", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
};

export default HomePage;
