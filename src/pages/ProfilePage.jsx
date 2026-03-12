// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Package,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowLeft,
  LogOut,
  Star,
  MessageSquare,
  MailOpen,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../utils/api";
import Spinner from "../components/ui/Spinner";

const STATUS_COLORS = {
  beklemede: "#f59e0b",
  hazırlanıyor: "#3b82f6",
  kargoda: "#8b5cf6",
  "teslim edildi": "#22c55e",
};

const TABS = [
  { key: "orders", label: "Sipariş Geçmişi", icon: Package },
  { key: "messages", label: "Mesajlarım", icon: MessageSquare },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
    fetchMessages();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my");
      setOrders(res.data.orders);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact/my");
      setMessages(res.data.messages);
    } catch {
      setMessages([]);
    }
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.email) return;
    setSaving(true);
    setError("");
    try {
      const res = await api.put("/auth/profile", formData);
      login({ ...user, ...res.data.user });
      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Güncelleme başarısız");
    } finally {
      setSaving(false);
    }
  };

  const unreadMessages = messages.filter((m) => m.reply && !m.replyRead).length;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        {/* ── GERİ BUTONU ── */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: COLORS.textMuted,
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: FONTS.body,
            letterSpacing: "0.05em",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={14} /> Geri Dön
        </button>

        {/* ── BAŞLIK ── */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "11px",
              color: COLORS.accent,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "10px",
              fontFamily: FONTS.body,
            }}
          >
            HESABIM
          </p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(40px, 6vw, 64px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            PROFİLİM
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* ── SOL — PROFİL BİLGİLERİ ── */}
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "28px",
              position: "sticky",
              top: "90px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: COLORS.accent + "33",
                border: `2px solid ${COLORS.accent}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "28px",
                  color: COLORS.accent,
                  letterSpacing: "0.05em",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            {!editMode ? (
              <>
                <h2
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "24px",
                    color: COLORS.text,
                    letterSpacing: "0.03em",
                    marginBottom: "4px",
                  }}
                >
                  {user?.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "8px",
                  }}
                >
                  <Mail size={13} color={COLORS.textMuted} />
                  <p
                    style={{
                      fontSize: "13px",
                      color: COLORS.textMuted,
                      fontFamily: FONTS.body,
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background:
                      user?.role === "admin"
                        ? COLORS.accent + "22"
                        : COLORS.border + "44",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    marginBottom: "24px",
                  }}
                >
                  {user?.role === "admin" && (
                    <Star
                      size={11}
                      color={COLORS.accent}
                      fill={COLORS.accent}
                    />
                  )}
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color:
                        user?.role === "admin"
                          ? COLORS.accent
                          : COLORS.textMuted,
                      fontFamily: FONTS.body,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {user?.role === "admin" ? "Admin" : "Kullanıcı"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFormData({ name: user?.name, email: user?.email });
                    setEditMode(true);
                  }}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text,
                    padding: "10px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    fontFamily: FONTS.body,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.color = COLORS.text;
                  }}
                >
                  <User size={13} /> PROFİLİ DÜZENLE
                </button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>AD SOYAD</label>
                  <div style={{ position: "relative" }}>
                    <User
                      size={14}
                      color={COLORS.textMuted}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      style={{ ...inputStyle, paddingLeft: "36px" }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>E-POSTA</label>
                  <div style={{ position: "relative" }}>
                    <Mail
                      size={14}
                      color={COLORS.textMuted}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      style={{ ...inputStyle, paddingLeft: "36px" }}
                    />
                  </div>
                </div>
                {error && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#ef4444",
                      marginBottom: "12px",
                      fontFamily: FONTS.body,
                    }}
                  >
                    {error}
                  </p>
                )}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    style={{
                      flex: 1,
                      background: saving ? COLORS.border : COLORS.accent,
                      border: "none",
                      color: COLORS.white,
                      padding: "10px",
                      borderRadius: "3px",
                      cursor: saving ? "not-allowed" : "pointer",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: FONTS.body,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    {saving ? (
                      <>
                        <Spinner size={13} /> KAYDEDİLİYOR...
                      </>
                    ) : (
                      <>
                        <Check size={13} /> KAYDET
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setError("");
                    }}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: `1px solid ${COLORS.border}`,
                      color: COLORS.textMuted,
                      padding: "10px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontFamily: FONTS.body,
                    }}
                  >
                    İPTAL
                  </button>
                </div>
              </>
            )}

            {saved && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  background: "#22c55e11",
                  border: "1px solid #22c55e33",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Check size={13} color="#22c55e" />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#22c55e",
                    fontFamily: FONTS.body,
                  }}
                >
                  Profil güncellendi!
                </span>
              </div>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid #ef444433",
                color: "#ef4444",
                padding: "10px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "12px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ef444411")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <LogOut size={13} /> ÇIKIŞ YAP
            </button>
          </div>

          {/* ── SAĞ ── */}
          <div>
            {/* Tab Butonları */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setExpanded(null);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    fontFamily: FONTS.body,
                    transition: "all 0.2s",
                    background:
                      activeTab === key ? COLORS.accent : "transparent",
                    border: `1px solid ${activeTab === key ? COLORS.accent : COLORS.border}`,
                    color: activeTab === key ? COLORS.white : COLORS.textMuted,
                    position: "relative",
                  }}
                >
                  <Icon size={14} /> {label}
                  {key === "messages" && unreadMessages > 0 && (
                    <span
                      style={{
                        background: "#22c55e",
                        color: COLORS.white,
                        borderRadius: "10px",
                        padding: "1px 7px",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {unreadMessages}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ── SİPARİŞ GEÇMİŞİ ── */}
            {activeTab === "orders" && (
              <>
                {loading ? (
                  <div style={{ textAlign: "center", padding: "48px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        border: `3px solid ${COLORS.border}`,
                        borderTop: `3px solid ${COLORS.accent}`,
                        borderRadius: "50%",
                        margin: "0 auto 12px",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p
                      style={{
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                        fontSize: "13px",
                      }}
                    >
                      Yükleniyor...
                    </p>
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    style={{
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "6px",
                      padding: "48px",
                      textAlign: "center",
                    }}
                  >
                    <Package
                      size={48}
                      color={COLORS.border}
                      style={{ marginBottom: "16px" }}
                    />
                    <p
                      style={{
                        fontSize: "15px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                        marginBottom: "20px",
                      }}
                    >
                      Henüz siparişiniz yok.
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      style={{
                        background: COLORS.accent,
                        border: "none",
                        color: COLORS.white,
                        padding: "12px 28px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        fontFamily: FONTS.body,
                      }}
                    >
                      ALIŞVERİŞE BAŞLA →
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        style={{
                          background: COLORS.surface,
                          border: `1px solid ${expanded === order._id ? COLORS.accent + "55" : COLORS.border}`,
                          borderRadius: "6px",
                          overflow: "hidden",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <div
                          onClick={() =>
                            setExpanded(
                              expanded === order._id ? null : order._id,
                            )
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px 20px",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "4px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 700,
                                  color: COLORS.text,
                                  fontFamily: FONTS.body,
                                }}
                              >
                                #{order._id.slice(-8).toUpperCase()}
                              </span>
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color:
                                    STATUS_COLORS[order.status] ||
                                    COLORS.textMuted,
                                  background:
                                    (STATUS_COLORS[order.status] ||
                                      COLORS.textMuted) + "22",
                                  padding: "3px 10px",
                                  borderRadius: "20px",
                                  fontFamily: FONTS.body,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: COLORS.textMuted,
                                fontFamily: FONTS.body,
                              }}
                            >
                              {new Date(order.createdAt).toLocaleDateString(
                                "tr-TR",
                              )}{" "}
                              •{" "}
                              {order.items.reduce((s, i) => s + i.quantity, 0)}{" "}
                              ürün
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: FONTS.display,
                                fontSize: "20px",
                                color: COLORS.accent,
                                letterSpacing: "0.05em",
                              }}
                            >
                              ₺{order.totalPrice + (order.shippingPrice || 0)}
                            </span>
                            {expanded === order._id ? (
                              <ChevronUp size={16} color={COLORS.textMuted} />
                            ) : (
                              <ChevronDown size={16} color={COLORS.textMuted} />
                            )}
                          </div>
                        </div>

                        {expanded === order._id && (
                          <div
                            style={{
                              borderTop: `1px solid ${COLORS.border}`,
                              padding: "16px 20px",
                              background: COLORS.surfaceHover,
                            }}
                          >
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: COLORS.textMuted,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                marginBottom: "12px",
                                fontFamily: FONTS.body,
                              }}
                            >
                              ÜRÜNLER
                            </p>
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "8px 0",
                                  borderTop:
                                    i > 0
                                      ? `1px solid ${COLORS.border}`
                                      : "none",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      background: COLORS.border + "44",
                                      borderRadius: "4px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <Package
                                      size={16}
                                      color={COLORS.textMuted}
                                    />
                                  </div>
                                  <div>
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        color: COLORS.text,
                                        fontFamily: FONTS.body,
                                      }}
                                    >
                                      {item.name}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "11px",
                                        color: COLORS.textMuted,
                                        fontFamily: FONTS.body,
                                      }}
                                    >
                                      x{item.quantity} • ₺{item.price} / adet
                                    </p>
                                  </div>
                                </div>
                                <span
                                  style={{
                                    fontFamily: FONTS.body,
                                    fontSize: "14px",
                                    color: COLORS.accent,
                                    fontWeight: 700,
                                  }}
                                >
                                  ₺{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                            <div
                              style={{
                                borderTop: `1px solid ${COLORS.border}`,
                                marginTop: "12px",
                                paddingTop: "12px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: COLORS.textMuted,
                                  fontFamily: FONTS.body,
                                }}
                              >
                                Kargo:{" "}
                                {order.shippingPrice === 0
                                  ? "Ücretsiz"
                                  : `₺${order.shippingPrice}`}
                              </p>
                              <div style={{ textAlign: "right" }}>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: COLORS.textMuted,
                                    fontFamily: FONTS.body,
                                    marginBottom: "2px",
                                  }}
                                >
                                  TOPLAM
                                </p>
                                <p
                                  style={{
                                    fontFamily: FONTS.display,
                                    fontSize: "20px",
                                    color: COLORS.accent,
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  ₺
                                  {order.totalPrice +
                                    (order.shippingPrice || 0)}
                                </p>
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: "16px",
                                padding: "14px",
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: "4px",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  color: COLORS.textMuted,
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  marginBottom: "8px",
                                  fontFamily: FONTS.body,
                                }}
                              >
                                TESLİMAT ADRESİ
                              </p>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: COLORS.text,
                                  fontFamily: FONTS.body,
                                  lineHeight: 1.6,
                                }}
                              >
                                {order.shippingAddress?.fullName} •{" "}
                                {order.shippingAddress?.phone}
                                <br />
                                {order.shippingAddress?.district},{" "}
                                {order.shippingAddress?.city}
                                <br />
                                {order.shippingAddress?.address}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── MESAJLARIM ── */}
            {activeTab === "messages" && (
              <div>
                {messages.length === 0 ? (
                  <div
                    style={{
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "6px",
                      padding: "48px",
                      textAlign: "center",
                    }}
                  >
                    <MessageSquare
                      size={48}
                      color={COLORS.border}
                      style={{ marginBottom: "16px" }}
                    />
                    <p
                      style={{
                        fontSize: "15px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                        marginBottom: "20px",
                      }}
                    >
                      Henüz mesaj göndermediniz.
                    </p>
                    <button
                      onClick={() => navigate("/contact")}
                      style={{
                        background: COLORS.accent,
                        border: "none",
                        color: COLORS.white,
                        padding: "12px 28px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        fontFamily: FONTS.body,
                      }}
                    >
                      MESAJ GÖNDER →
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        style={{
                          background: COLORS.surface,
                          border: `1px solid ${expanded === msg._id ? COLORS.accent + "55" : COLORS.border}`,
                          borderRadius: "6px",
                          overflow: "hidden",
                          transition: "border-color 0.2s",
                        }}
                      >
                        {/* Özet */}
                        <div
                          onClick={() =>
                            setExpanded(expanded === msg._id ? null : msg._id)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px 20px",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              flex: 1,
                            }}
                          >
                            <div style={{ flexShrink: 0 }}>
                              {msg.reply ? (
                                <MailOpen size={18} color="#22c55e" />
                              ) : (
                                <MessageSquare
                                  size={18}
                                  color={COLORS.textMuted}
                                />
                              )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  marginBottom: "2px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: COLORS.text,
                                    fontFamily: FONTS.body,
                                  }}
                                >
                                  {msg.subject}
                                </span>
                                {msg.reply ? (
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      background: "#22c55e22",
                                      color: "#22c55e",
                                      padding: "2px 8px",
                                      borderRadius: "10px",
                                      fontFamily: FONTS.body,
                                      fontWeight: 700,
                                    }}
                                  >
                                    CEVAPLANDI
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      background: COLORS.border + "44",
                                      color: COLORS.textMuted,
                                      padding: "2px 8px",
                                      borderRadius: "10px",
                                      fontFamily: FONTS.body,
                                      fontWeight: 700,
                                    }}
                                  >
                                    BEKLEMEDE
                                  </span>
                                )}
                              </div>
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: COLORS.textMuted,
                                  fontFamily: FONTS.body,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {msg.message}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              flexShrink: 0,
                              marginLeft: "16px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                color: COLORS.textMuted,
                                fontFamily: FONTS.body,
                              }}
                            >
                              {new Date(msg.createdAt).toLocaleDateString(
                                "tr-TR",
                              )}
                            </span>
                            {expanded === msg._id ? (
                              <ChevronUp size={16} color={COLORS.textMuted} />
                            ) : (
                              <ChevronDown size={16} color={COLORS.textMuted} />
                            )}
                          </div>
                        </div>

                        {/* Detay */}
                        {expanded === msg._id && (
                          <div
                            style={{
                              borderTop: `1px solid ${COLORS.border}`,
                              padding: "20px 24px",
                              background: "#0D0D0D",
                            }}
                          >
                            {/* Gönderilen mesaj */}
                            <p style={metaLabel}>GÖNDERDİĞİNİZ MESAJ</p>
                            <div
                              style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: "4px",
                                padding: "14px 16px",
                                marginBottom: "20px",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: COLORS.text,
                                  fontFamily: FONTS.body,
                                  lineHeight: 1.8,
                                }}
                              >
                                {msg.message}
                              </p>
                              <p
                                style={{
                                  fontSize: "11px",
                                  color: COLORS.textMuted,
                                  fontFamily: FONTS.body,
                                  marginTop: "8px",
                                }}
                              >
                                {new Date(msg.createdAt).toLocaleString(
                                  "tr-TR",
                                )}
                              </p>
                            </div>

                            {/* Admin cevabı */}
                            {msg.reply ? (
                              <>
                                <p style={{ ...metaLabel, color: "#22c55e" }}>
                                  KORDBEAR'DAN CEVAP
                                </p>
                                <div
                                  style={{
                                    background: "#22c55e11",
                                    border: "1px solid #22c55e33",
                                    borderRadius: "4px",
                                    padding: "14px 16px",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      color: COLORS.text,
                                      fontFamily: FONTS.body,
                                      lineHeight: 1.8,
                                    }}
                                  >
                                    {msg.reply}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "11px",
                                      color: "#22c55e",
                                      fontFamily: FONTS.body,
                                      marginTop: "8px",
                                    }}
                                  >
                                    {new Date(msg.repliedAt).toLocaleString(
                                      "tr-TR",
                                    )}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div
                                style={{
                                  background: COLORS.accent + "11",
                                  border: `1px solid ${COLORS.accent}33`,
                                  borderRadius: "4px",
                                  padding: "12px 16px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "13px",
                                    color: COLORS.accent,
                                    fontFamily: FONTS.body,
                                  }}
                                >
                                  Mesajınız inceleniyor. En kısa sürede cevap
                                  verilecektir.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#888880",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "8px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
};
const inputStyle = {
  width: "100%",
  background: "#0D0D0D",
  border: "1px solid #2A2A2A",
  borderRadius: "3px",
  padding: "12px 16px",
  color: "#F0EDE8",
  fontSize: "14px",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};
const metaLabel = {
  fontSize: "10px",
  fontWeight: 700,
  color: COLORS.textMuted,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "8px",
  fontFamily: FONTS.body,
};
