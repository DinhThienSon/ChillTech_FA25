import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <Content>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          width: "100%",
          height: "340px",
          background:
            "linear-gradient(180deg, #0b1c36 0%, #12294a 50%, #0b1c36 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, padding: "0 16px" }}>
          <Title
            level={1}
            style={{
              color: "#fff",
              marginBottom: 16,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            VỀ CHILLTECH
          </Title>

          <Paragraph
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 18,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Hơn 15 năm cung cấp linh kiện điện lạnh chính hãng cho các doanh
            nghiệp trên toàn Việt Nam
          </Paragraph>
        </div>
      </section>
    </Content>
  );
};

export default About;
