import { useState } from "react"
import type { Role, User } from "../data/mockData"
import { Icon } from "../components/Icons"

interface SuperadminLoginPageProps {
  onLogin: (user: User) => void
}

const SUPERADMIN_EMAIL = "harun@gmail.com"
const SUPERADMIN_PASSWORD = "miah123"

const DEMO_ACCOUNTS = [
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

const cardName: Record<string, string> = {
  superadmin: "Harun",
  schooladmin: "Sarah Mitchell",
  teacher: "James Okonkwo",
  parent: "Priya Sharma",
}

const roleMap: Record<string, Role> = {
  "superadmin@xanaano.com": "superadmin",
  "admin@greenvalley.edu": "schooladmin",
  "teacher@greenvalley.edu": "teacher",
  "parent@greenvalley.edu": "parent",
}

const SuperadminLoginPage = ({ onLogin }: SuperadminLoginPageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASSWORD) {
      const user: User = {
        id: "superadmin-1",
        name: "Harun",
        email: SUPERADMIN_EMAIL,
        role: "superadmin",
      }
      onLogin(user)
    } else {
      setError(
        "Invalid credentials. Use superadmin@xanaano.com or check the provided email/password.",
      )
    }
  }

  const quickLogin = (email: string) => {
    const user = DEMO_ACCOUNTS.find((a) => a.email === email)
    if (user) {
      const role = roleMap[email]
      if (role === "superadmin") {
        setShowDemo(true)
      } else {
        onLogin({
          id: `demo-${role}`,
          name: cardName[role],
          email,
          role,
        })
      }
    }
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
            Sign in as Super Admin
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
            Welcome back to Xanaano School Management System
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
              </span>
              <input
                type="password"
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                  <path d="m2 2 20 20" />
                </svg>
              </span>
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

        {/* Demo Accounts */}
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

        {/* Demo role cards (collapsible) */}
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
            {DEMO_ACCOUNTS.map((card) => (
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
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    card.color
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${card.bg}`
                  ;(e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.55)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.04)"
                  ;(e.currentTarget as HTMLElement).style.transform =
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
      </div>
    </div>
  )
}

export default SuperadminLoginPage
