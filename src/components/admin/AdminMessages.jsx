// src/components/admin/AdminMessages.jsx
import { useState, useEffect } from "react";
import {
  MessageSquare,
  Trash2,
  MailOpen,
  Mail,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Send,
  Check,
} from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import api from "../../utils/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replying, setReplying] = useState(null);
  const [replySent, setReplySent] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");
      setMessages(res.data.messages);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)),
      );
    } catch {}
  };

  const handleReply = async (id) => {
    if (!replyText[id]?.trim()) return;
    setReplying(id);
    try {
      const res = await api.put(`/contact/${id}/reply`, {
        reply: replyText[id],
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? res.data.contact : m)),
      );
      setReplySent(id);
      setTimeout(() => setReplySent(null), 3000);
    } catch {
    } finally {
      setReplying(null);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/contact/${deleteTargetId}`);
      setMessages((prev) => prev.filter((m) => m._id !== deleteTargetId));
      setExpanded(null);
    } catch {
    } finally {
      setDeleteTargetId(null);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading)
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
          Mesajlar yükleniyor...
        </p>
      </div>
    );

  return (
    <div>
      {/* ── SİLME MODAL ── */}
      {deleteTargetId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              padding: "36px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#ef444422",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <AlertTriangle size={26} color="#ef4444" />
            </div>
            <h3
              style={{
                fontFamily: FONTS.display,
                fontSize: "22px",
                color: COLORS.text,
                letterSpacing: "0.03em",
                marginBottom: "10px",
              }}
            >
              MESAJI SİL
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: COLORS.textMuted,
                fontFamily: FONTS.body,
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              Bu mesajı silmek istediğinize emin misiniz? Bu işlem geri
              alınamaz.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteTargetId(null)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textMuted,
                  padding: "12px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: FONTS.body,
                  letterSpacing: "0.06em",
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
                VAZGEÇ
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  border: "none",
                  color: COLORS.white,
                  padding: "12px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: FONTS.body,
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Trash2 size={14} /> EVET, SİL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Başlık */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "36px",
              color: COLORS.text,
              letterSpacing: "0.03em",
            }}
          >
            MESAJLAR
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
              marginTop: "4px",
            }}
          >
            {messages.length} mesaj • {unreadCount} okunmamış
          </p>
        </div>
        {unreadCount > 0 && (
          <div
            style={{
              background: COLORS.accent,
              color: COLORS.white,
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: FONTS.body,
            }}
          >
            {unreadCount} Yeni
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
            padding: "64px",
            textAlign: "center",
          }}
        >
          <MessageSquare
            size={48}
            color={COLORS.border}
            style={{ marginBottom: "16px" }}
          />
          <p style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
            Henüz mesaj yok.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {messages.map((msg) => (
            <div
              key={msg._id}
              style={{
                background: COLORS.surface,
                border: `1px solid ${expanded === msg._id ? COLORS.accent + "55" : msg.isRead ? COLORS.border : COLORS.accent + "33"}`,
                borderRadius: "6px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Özet Satırı */}
              <div
                onClick={() => {
                  setExpanded(expanded === msg._id ? null : msg._id);
                  if (!msg.isRead) handleMarkRead(msg._id);
                }}
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
                    gap: "14px",
                    flex: 1,
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    {msg.isRead ? (
                      <MailOpen size={18} color={COLORS.textMuted} />
                    ) : (
                      <Mail size={18} color={COLORS.accent} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: msg.isRead ? 500 : 700,
                          color: COLORS.text,
                          fontFamily: FONTS.body,
                        }}
                      >
                        {msg.fullName}
                      </span>
                      {!msg.isRead && (
                        <span
                          style={{
                            fontSize: "10px",
                            background: COLORS.accent,
                            color: COLORS.white,
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontFamily: FONTS.body,
                            fontWeight: 700,
                          }}
                        >
                          YENİ
                        </span>
                      )}
                      {msg.reply && (
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
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong style={{ color: COLORS.text }}>
                        {msg.subject}
                      </strong>{" "}
                      — {msg.message}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
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
                    {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <p style={metaLabel}>E-POSTA</p>
                      <p style={metaValue}>{msg.email}</p>
                    </div>
                    <div>
                      <p style={metaLabel}>TELEFON</p>
                      <p style={metaValue}>{msg.phone || "—"}</p>
                    </div>
                    <div>
                      <p style={metaLabel}>TARİH</p>
                      <p style={metaValue}>
                        {new Date(msg.createdAt).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <p style={metaLabel}>MESAJ</p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: COLORS.text,
                        fontFamily: FONTS.body,
                        lineHeight: 1.8,
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "4px",
                        padding: "16px",
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>

                  {/* Mevcut cevap */}
                  {msg.reply && (
                    <div
                      style={{
                        marginBottom: "20px",
                        background: "#22c55e11",
                        border: "1px solid #22c55e33",
                        borderRadius: "4px",
                        padding: "16px",
                      }}
                    >
                      <p
                        style={{
                          ...metaLabel,
                          color: "#22c55e",
                          marginBottom: "8px",
                        }}
                      >
                        MEVCUT CEVAP —{" "}
                        {new Date(msg.repliedAt).toLocaleString("tr-TR")}
                      </p>
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
                    </div>
                  )}

                  {/* Cevap Formu */}
                  <div style={{ marginBottom: "16px" }}>
                    <p style={metaLabel}>
                      {msg.reply ? "CEVABI GÜNCELLE" : "CEVAP YAZ"}
                    </p>
                    <textarea
                      rows={4}
                      value={replyText[msg._id] || ""}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [msg._id]: e.target.value,
                        }))
                      }
                      placeholder="Cevabınızı yazın..."
                      style={{
                        width: "100%",
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "4px",
                        padding: "12px 16px",
                        color: COLORS.text,
                        fontSize: "14px",
                        fontFamily: FONTS.body,
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {replySent === msg._id && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "12px",
                        padding: "10px 14px",
                        background: "#22c55e11",
                        border: "1px solid #22c55e33",
                        borderRadius: "4px",
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
                        Cevap gönderildi!
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleReply(msg._id)}
                      disabled={replying === msg._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: COLORS.accent,
                        border: "none",
                        color: COLORS.white,
                        padding: "10px 20px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 700,
                        fontFamily: FONTS.body,
                        letterSpacing: "0.06em",
                        transition: "opacity 0.2s",
                        opacity: replying === msg._id ? 0.7 : 1,
                      }}
                    >
                      <Send size={13} />{" "}
                      {msg.reply ? "GÜNCELLE" : "CEVAP GÖNDER"}
                    </button>
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkRead(msg._id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "transparent",
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.textMuted,
                          padding: "10px 16px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "12px",
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
                        <MailOpen size={13} /> Okundu İşaretle
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTargetId(msg._id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "transparent",
                        border: "1px solid #ef444433",
                        color: "#ef4444",
                        padding: "10px 16px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontFamily: FONTS.body,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#ef444411")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <Trash2 size={13} /> Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const metaLabel = {
  fontSize: "10px",
  fontWeight: 700,
  color: COLORS.textMuted,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "4px",
  fontFamily: FONTS.body,
};
const metaValue = {
  fontSize: "13px",
  color: COLORS.text,
  fontFamily: FONTS.body,
};
