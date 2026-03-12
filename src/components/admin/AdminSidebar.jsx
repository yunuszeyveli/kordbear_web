// src/components/admin/AdminSidebar.jsx
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Tag,
  Users,
  MessageSquare,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { COLORS, FONTS } from "../../styles/theme";

const MENU_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Ürünler", icon: Package },
  { key: "categories", label: "Kategoriler", icon: Tag },
  { key: "orders", label: "Siparişler", icon: ClipboardList },
  { key: "users", label: "Kullanıcılar", icon: Users },
  { key: "messages", label: "Mesajlar", icon: MessageSquare },
];

export default function AdminSidebar({ activePage, onNavigate }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        background: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* ── LOGO ── */}
      <div
        style={{
          padding: "24px 24px 20px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            background: COLORS.accent,
            clipPath:
              "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: "18px",
              color: COLORS.text,
              letterSpacing: "0.1em",
            }}
          >
            KORDBEAR
          </div>
          <div
            style={{
              fontSize: "10px",
              color: COLORS.accent,
              fontFamily: FONTS.body,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </div>
        </div>
      </div>

      {/* ── MENÜ ── */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {MENU_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = activePage === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: isActive ? COLORS.accent + "22" : "transparent",
                color: isActive ? COLORS.accent : COLORS.textMuted,
                fontSize: "13px",
                fontWeight: isActive ? 700 : 500,
                fontFamily: FONTS.body,
                letterSpacing: "0.04em",
                marginBottom: "4px",
                borderLeft: `2px solid ${isActive ? COLORS.accent : "transparent"}`,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = COLORS.accent + "11";
                  e.currentTarget.style.color = COLORS.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = COLORS.textMuted;
                }
              }}
            >
              <Icon size={17} /> {label}
            </button>
          );
        })}
      </nav>

      {/* ── ALT ── */}
      <div
        style={{
          padding: "16px 12px",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "11px 14px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: COLORS.textMuted,
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: FONTS.body,
            letterSpacing: "0.04em",
            marginBottom: "4px",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.accent + "11";
            e.currentTarget.style.color = COLORS.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = COLORS.textMuted;
          }}
        >
          <ArrowLeft size={17} /> Ana Sayfaya Dön
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "11px 14px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: COLORS.textMuted,
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: FONTS.body,
            letterSpacing: "0.04em",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ef444411";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = COLORS.textMuted;
          }}
        >
          <LogOut size={17} /> Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
