import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Gọi API từ Backend (giữ nguyên logic Controller của bạn)
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('/api/products'); 
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

  // --- Các Icon SVG Thuần (Không cần thư viện) ---
  const IconArrow = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
  const IconShield = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
  const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52c41a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
  const IconCart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#0b1c36', margin: 0 }}>
      
      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.row}>
            {/* Cột trái: Nội dung */}
            <div style={styles.colContent}>
              <h1 style={styles.title}>
                Linh Kiện Điện Lạnh <br />
                <span style={{ color: '#1890ff' }}>Chất Lượng Cao</span>
              </h1>
              <p style={styles.description}>
                Chuyên cung cấp linh kiện chính hãng cho tủ lạnh, máy lạnh, máy giặt. 
                Uy tín hàng đầu, giao hàng toàn quốc nhanh chóng.
              </p>
              
              <div style={styles.buttonGroup}>
                <button style={styles.btnPrimary}>
                  Xem sản phẩm <IconArrow />
                </button>
                <button style={styles.btnSecondary}>Liên hệ ngay</button>
              </div>

              <div style={styles.statsRow}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>5000+</div>
                  <div style={styles.statLabel}>Sản phẩm</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>15+</div>
                  <div style={styles.statLabel}>Năm nghề</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>99%</div>
                  <div style={styles.statLabel}>Hài lòng</div>
                </div>
              </div>
            </div>

            {/* Cột phải: Hình ảnh */}
            <div style={styles.colImage}>
              <div style={styles.imageWrapper}>
                <img src="chilltech.png" alt="ChillTech" style={styles.mainImg} />
                
                {/* Badge: Chính hãng */}
                <div style={styles.badgeTop}>
                  <div style={styles.iconCircle}><IconShield /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Chính hãng 100%</strong>
                    <span style={{ fontSize: '12px', color: '#666' }}>Bảo hành uy tín</span>
                  </div>
                </div>

                {/* Badge: Giao hàng */}
                <div style={styles.badgeBottom}>
                  <IconCheck />
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>Giao hàng nhanh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      <section style={styles.featuredSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Sản Phẩm Nổi Bật</h2>
            <div style={styles.underline}></div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải sản phẩm...</div>
          ) : (
            <div style={styles.productGrid}>
              {products.map((item) => (
                <div key={item._id} style={styles.productCard}>
                  <div style={styles.imgBox}>
                    <img src={item.image || 'placeholder.png'} alt={item.name} style={styles.productImg} />
                  </div>
                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>{item.name}</h3>
                    <div style={styles.productPrice}>
                      {item.price?.toLocaleString()} <small>VNĐ</small>
                    </div>
                    <button style={styles.addToCartBtn}>
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

// --- Styles Object (CSS-in-JS) ---
const styles = {
  hero: {
    background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f9f0ff 100%)',
    padding: '60px 20px',
    overflow: 'hidden'
  },
  container: { maxWidth: '1200px', margin: '0 auto' },
  row: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' },
  colContent: { flex: '1 1 500px' },
  colImage: { flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' },
  title: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, margin: '0 0 24px 0' },
  description: { fontSize: '18px', color: '#4b5563', marginBottom: '40px', maxWidth: '500px' },
  buttonGroup: { display: 'flex', gap: '16px', marginBottom: '48px' },
  btnPrimary: { padding: '14px 28px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  btnSecondary: { padding: '14px 28px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' },
  statsRow: { display: 'flex', gap: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '32px' },
  statValue: { fontSize: '28px', fontWeight: 700, color: '#1890ff' },
  statLabel: { color: '#6b7280', fontSize: '14px' },
  imageWrapper: { position: 'relative', width: '100%', maxWidth: '480px', background: '#f3f4f6', borderRadius: '32px' },
  mainImg: { width: '100%', borderRadius: '32px' },
  badgeTop: { position: 'absolute', top: '-15px', right: '-10px', background: '#fff', padding: '10px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' },
  iconCircle: { width: '35px', height: '35px', background: '#e6f7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badgeBottom: { position: 'absolute', bottom: '20px', left: '-10px', background: '#fff', padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  featuredSection: { padding: '80px 20px' },
  sectionHeader: { textAlign: 'center', marginBottom: '48px' },
  sectionTitle: { fontSize: '32px', fontWeight: 700, margin: '0 0 10px 0' },
  underline: { width: '50px', height: '4px', background: '#1890ff', margin: '0 auto' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' },
  productCard: { border: '1px solid #eee', borderRadius: '16px', padding: '15px', textAlign: 'center', transition: '0.2s' },
  imgBox: { height: '200px', marginBottom: '15px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  productImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  productName: { fontSize: '17px', margin: '0 0 10px 0', height: '40px', overflow: 'hidden' },
  productPrice: { fontSize: '20px', fontWeight: 700, color: '#1890ff', marginBottom: '15px' },
  addToCartBtn: { width: '100%', padding: '10px', background: '#0b1c36', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }
};

export default HomePage;