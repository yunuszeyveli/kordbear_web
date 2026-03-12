// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../styles/theme";

const FOOTER_LINKS = [
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", path: "/about" },
      { label: "Nasıl Üretiyoruz?", path: "/how-it-works" },
      { label: "İletişim", path: "/contact" },
    ],
  },
  {
    title: "Destek",
    links: [
      { label: "S.S.S.", path: "/faq" },
      { label: "Kargo & İade", path: "/shipping-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        padding: "56px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── ÜST KISIM ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Marka */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  background: COLORS.accent,
                  clipPath:
                    "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "20px",
                  letterSpacing: "0.12em",
                  color: COLORS.text,
                }}
              >
                KORDBEAR
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: COLORS.textMuted,
                lineHeight: 1.8,
                maxWidth: "240px",
                fontFamily: FONTS.body,
              }}
            >
              3D baskı teknolojisiyle özel tasarım ürünler üreten Türk markası.
            </p>
          </div>

          {/* Link Kolonları */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: COLORS.text,
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  fontFamily: FONTS.body,
                }}
              >
                {col.title}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: "block",
                    color: COLORS.textMuted,
                    textDecoration: "none",
                    fontSize: "13px",
                    marginBottom: "10px",
                    fontFamily: FONTS.body,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = COLORS.text)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = COLORS.textMuted)
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ── ALT KISIM ── */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            © 2026 Kordbear. Tüm hakları saklıdır.
          </p>

          {/* Gizlilik & Kullanım Koşulları — tıklanabilir */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link
              to="/privacy-policy"
              style={{
                fontSize: "12px",
                color: COLORS.textMuted,
                textDecoration: "none",
                fontFamily: FONTS.body,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.text)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.textMuted)}
            >
              Gizlilik Politikası
            </Link>
            <span style={{ fontSize: "12px", color: COLORS.border }}>·</span>
            <Link
              to="/terms"
              style={{
                fontSize: "12px",
                color: COLORS.textMuted,
                textDecoration: "none",
                fontFamily: FONTS.body,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.text)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.textMuted)}
            >
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
