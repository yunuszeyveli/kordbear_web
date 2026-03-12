// src/components/admin/AdminUsers.jsx
import { useState, useEffect } from "react";
import { Trash2, ShieldCheck, ShieldOff, Users } from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch {
      setError("Kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Rol güncellenemedi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Silinemedi");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: `3px solid ${COLORS.border}`,
            borderTop: `3px solid ${COLORS.accent}`,
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
          Yükleniyor...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── BAŞLIK ── */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "40px",
            color: COLORS.text,
            letterSpacing: "0.03em",
          }}
        >
          KULLANICILAR
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: COLORS.textMuted,
            fontFamily: FONTS.body,
            marginTop: "8px",
          }}
        >
          Toplam {users.length} kullanıcı
        </p>
      </div>

      {/* ── SİLME ONAYI ── */}
      {deleteId && (
        <div
          style={{
            background: "#ef444411",
            border: "1px solid #ef444433",
            borderRadius: "6px",
            padding: "16px 24px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: COLORS.text,
              fontFamily: FONTS.body,
            }}
          >
            Bu kullanıcıyı silmek istediğinize emin misiniz?
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => handleDelete(deleteId)}
              style={{
                background: "#ef4444",
                border: "none",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Trash2 size={13} /> SİL
            </button>
            <button
              onClick={() => setDeleteId(null)}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                padding: "8px 20px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: FONTS.body,
              }}
            >
              İPTAL
            </button>
          </div>
        </div>
      )}

      {/* ── KULLANICI TABLOSU ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {/* Başlık */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 200px 100px 160px 80px",
            padding: "12px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.surfaceHover,
          }}
        >
          {["KULLANICI", "E-POSTA", "ROL", "KAYIT TARİHİ", "İŞLEM"].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: COLORS.textMuted,
                  letterSpacing: "0.12em",
                  fontFamily: FONTS.body,
                }}
              >
                {h}
              </div>
            ),
          )}
        </div>

        {/* Satırlar */}
        {users.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <Users
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz kullanıcı yok.</p>
          </div>
        ) : (
          users.map((user, i) => {
            const isCurrentUser = user._id === currentUser?._id;
            return (
              <div
                key={user._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 200px 100px 160px 80px",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                  transition: "background 0.15s",
                  opacity: isCurrentUser ? 0.6 : 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = COLORS.surfaceHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* İsim */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        user.role === "admin"
                          ? COLORS.accent + "33"
                          : COLORS.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color:
                          user.role === "admin"
                            ? COLORS.accent
                            : COLORS.textMuted,
                        fontFamily: FONTS.body,
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
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
                      {user.name}
                      {isCurrentUser && (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "10px",
                            color: COLORS.accent,
                            fontWeight: 400,
                          }}
                        >
                          (sen)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* E-posta */}
                <span
                  style={{
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  {user.email}
                </span>

                {/* Rol */}
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: FONTS.body,
                      color:
                        user.role === "admin"
                          ? COLORS.accent
                          : COLORS.textMuted,
                      background:
                        user.role === "admin"
                          ? COLORS.accent + "22"
                          : COLORS.border + "44",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {user.role === "admin" ? "Admin" : "Kullanıcı"}
                  </span>
                </div>

                {/* Tarih */}
                <span
                  style={{
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                </span>

                {/* İşlemler */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {!isCurrentUser && (
                    <>
                      {/* Rol Değiştir */}
                      <button
                        onClick={() =>
                          handleRoleChange(
                            user._id,
                            user.role === "admin" ? "user" : "admin",
                          )
                        }
                        title={
                          user.role === "admin" ? "Kullanıcı yap" : "Admin yap"
                        }
                        style={{
                          background: "transparent",
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.textMuted,
                          padding: "6px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = COLORS.accent;
                          e.currentTarget.style.color = COLORS.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = COLORS.border;
                          e.currentTarget.style.color = COLORS.textMuted;
                        }}
                      >
                        {user.role === "admin" ? (
                          <ShieldOff size={13} />
                        ) : (
                          <ShieldCheck size={13} />
                        )}
                      </button>

                      {/* Sil */}
                      <button
                        onClick={() => setDeleteId(user._id)}
                        style={{
                          background: "transparent",
                          border: "1px solid #ef444433",
                          color: "#ef4444",
                          padding: "6px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#ef444411")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
