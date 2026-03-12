// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
  { label: "Ürünler", path: "/products" },
  { label: "Hakkımızda", path: "/about" },
  { label: "Nasıl Üretiyoruz?", path: "/how-it-works" },
  { label: "İletişim", path: "/contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(13,13,13,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* ── LOGO ── */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              background: COLORS.accent,
              clipPath:
                "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: "24px",
              letterSpacing: "0.12em",
              color: COLORS.text,
            }}
          >
            KORDBEAR
          </span>
        </Link>

        {/* ── NAV LİNKLER ── */}
        
        <div style={{ display: "flex", gap: "32px" }}>
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: COLORS.textMuted,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.text)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.textMuted)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── SAĞ BUTONLAR ── */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {user ? (
            <>
              {/* Admin linki */}
              {user.role === "admin" && (
                <Link to="/admin" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "transparent",
                      border: `1px solid ${COLORS.border}`,
                      color: COLORS.accent,
                      padding: "8px 14px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      fontFamily: FONTS.body,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = COLORS.accent;
                      e.currentTarget.style.color = COLORS.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = COLORS.accent;
                    }}
                  >
                    <LayoutDashboard size={14} />
                    ADMIN
                  </button>
                </Link>
              )}

              {/* Kullanıcı adı */}
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "3px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                  }}
                >
                  <User size={14} color={COLORS.textMuted} />
                  <span
                    style={{
                      fontSize: "13px",
                      color: COLORS.text,
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                    }}
                  >
                    {user.name}
                  </span>
                </div>
              </Link>

              {/* Çıkış */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textMuted,
                  padding: "8px 14px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  fontFamily: FONTS.body,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ef4444";
                  e.currentTarget.style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.color = COLORS.textMuted;
                }}
              >
                <LogOut size={14} />
                ÇIKIŞ
              </button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textMuted,
                  padding: "8px 14px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  fontFamily: FONTS.body,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.text;
                  e.currentTarget.style.color = COLORS.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.color = COLORS.textMuted;
                }}
              >
                <User size={14} />
                GİRİŞ YAP
              </button>
            </Link>
          )}

          {/* ── SEPET ── */}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: COLORS.accent,
                border: "none",
                color: COLORS.white,
                padding: "8px 18px",
                borderRadius: "3px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                fontFamily: FONTS.body,
                position: "relative",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <ShoppingCart size={16} />
              SEPET
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-7px",
                    right: "-7px",
                    background: COLORS.white,
                    color: COLORS.accent,
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
