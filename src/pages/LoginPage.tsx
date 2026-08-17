import { useState } from "react"
import type { User } from "../data/mockData"
import { USERS } from "../data/mockData"
import { Icon } from "../components/Icons"

interface LoginPageProps {
  onLogin: (user: User) => void
}

const ROLE_CARDS = [
  {
    role: "superadmin" as const,
    label: "Super Admin",
    desc: "Platform-level management",
    color: "#2563eb",
    bg: "#dbeafe",
    email: "superadmin@xanaano.com",
  },
  {
    role: "schooladmin" as const,
    label: "School Admin",
    desc: "Green Valley Academy",
    color: "#0369a1",
    bg: "#e0f2fe",
    email: "admin@greenvalley.edu",
  },
  {
    role: "teacher" as const,
    label: "Teacher",
    desc: "Grade 7 Mathematics",
    color: "#0f766e",
    bg: "#ccfbf1",
    email: "teacher@greenvalley.edu",
  },
  {
    role: "parent" as const,
    label: "Parent",
    desc: "Ethan & Mason's parent",
    color: "#7c3aed",
    bg: "#f3e8ff",
    email: "parent@greenvalley.edu",
  },
]

/* ---------- tiny inline SVG icons ---------- */
const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const EyeOffIcon = ({
  onClick,
  style,
}: {
  onClick: () => void
  style?: React.CSSProperties
}) => (
  <svg
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
)

const EyeIcon = ({
  onClick,
  style,
}: {
  onClick: () => void
  style?: React.CSSProperties
}) => (
  <svg
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const LoginArrowIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1e293b"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
)

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = USERS.find((u) => u.email === email)
    if (user) {
      onLogin(user)
    } else {
      setError("Invalid credentials. Use one of the demo accounts below.")
    }
  }

  const quickLogin = (email: string) => {
    const user = USERS.find((u) => u.email === email)
    if (user) onLogin(user)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Full-bleed cloud background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Soft gradient overlay so the card pops */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(224,242,254,0.25) 0%, rgba(240,249,255,0.15) 40%, rgba(255,255,255,0.10) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Brand mark top-left ── */}
      <div
        style={{
          position: "fixed",
          top: 24,
          left: 28,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(37,99,235,0.30)",
          }}
        >
          <span
            style={{
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            X
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#0f172a",
            letterSpacing: "-0.3px",
          }}
        >
          Xanaano
        </span>
      </div>

      {/* ── Main content wrapper ── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 440,
          padding: "24px 20px",
        }}
      >
        {/* Decorative arc behind the card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,0.18)",
            pointerEvents: "none",
          }}
        />

        {/* ── Glassmorphic login card ── */}
        <div
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.06), 0 1.5px 6px rgba(0,0,0,0.03)",
            padding: "40px 36px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle gradient sheen at top of card */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background:
                "linear-gradient(180deg, rgba(219,234,254,0.35) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "rgba(241,245,249,0.85)",
                border: "1px solid rgba(226,232,240,0.6)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginArrowIcon />
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              textAlign: "center",
              margin: "0 0 6px",
              letterSpacing: "-0.4px",
            }}
          >
            Sign in with email
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              textAlign: "center",
              margin: "0 0 28px",
              lineHeight: 1.5,
            }}
          >
            Welcome back to Xanaano School
            <br />
            Management System
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                }}
              >
                <EmailIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "13px 14px 13px 42px",
                  border: "1px solid rgba(226,232,240,0.7)",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "#0f172a",
                  background: "rgba(255,255,255,0.6)",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#93c5fd"
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(59,130,246,0.10)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 8 }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                }}
              >
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 42px",
                  border: "1px solid rgba(226,232,240,0.7)",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "#0f172a",
                  background: "rgba(255,255,255,0.6)",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#93c5fd"
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(59,130,246,0.10)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                }}
              >
                {showPassword ? (
                  <EyeIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeOffIcon onClick={() => setShowPassword(true)} />
                )}
              </span>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: 20 }}>
              <button
                type="button"
                style={{
                  fontSize: 13,
                  color: "#2563eb",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "rgba(254,226,226,0.85)",
                  color: "#dc2626",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  marginBottom: 16,
                  backdropFilter: "blur(8px)",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px 20px",
                borderRadius: 12,
                border: "none",
                background: "#1e293b",
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "background 0.2s, transform 0.1s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f172a"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1e293b"
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.985)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              Get Started
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              margin: "24px 0 20px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "repeating-linear-gradient(90deg, #cbd5e1 0px, #cbd5e1 4px, transparent 4px, transparent 8px)",
              }}
            />
            <span
              style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}
            >
              Or sign in with
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "repeating-linear-gradient(90deg, #cbd5e1 0px, #cbd5e1 4px, transparent 4px, transparent 8px)",
              }}
            />
          </div>

          {/* Demo quick-login toggle */}
          <button
            type="button"
            onClick={() => setShowDemo(!showDemo)}
            style={{
              width: "100%",
              padding: "11px 16px",
              borderRadius: 12,
              border: "1px solid rgba(226,232,240,0.7)",
              background: "rgba(255,255,255,0.5)",
              color: "#475569",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.8)"
              e.currentTarget.style.borderColor = "#93c5fd"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.5)"
              e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)"
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Demo Accounts — click to sign in
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showDemo ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* ── Demo role cards (collapsible) ── */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: showDemo ? 280 : 0,
            opacity: showDemo ? 1 : 0,
            transition: "max-height 0.35s ease, opacity 0.25s ease",
            width: "100%",
            marginTop: showDemo ? 16 : 0,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {ROLE_CARDS.map((card) => (
              <button
                key={card.role}
                onClick={() => quickLogin(card.email)}
                style={{
                  background: "rgba(255,255,255,0.70)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    card.color
                    ; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${card.bg}`
                    ; (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.55)"
                    ; (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.04)"
                    ; (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)"
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon.Profile />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1e293b",
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      marginTop: 1,
                    }}
                  >
                    {card.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 12,
            color: "rgba(100,116,139,0.7)",
          }}
        >
          © 2026 Xanaano · All rights reserved
        </div>
      </div>

      {/* ── Global keyframe for fade-in ── */}
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Apply to the main card wrapper */
        div[data-login-card] {
          animation: loginFadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
