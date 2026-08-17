import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Role, School, User } from "../data/mockData"
import { SCHOOLS, USERS } from "../data/mockData"

export type Theme = "light" | "dark"
export type ToastKind = "success" | "warning" | "error" | "info"
export interface ToastItem {
  id: string
  kind: ToastKind
  message: string
}

interface AppContextValue {
  user: User
  role: Role
  theme: Theme
  sidebarCollapsed: boolean
  mobileOpen: boolean
  tenant: School
  toasts: ToastItem[]
  setUser: (user: User) => void
  logout: () => void
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setMobileOpen: (open: boolean) => void
  setTenantId: (id: string) => void
  toast: (kind: ToastKind, message: string) => void
  dismissToast: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("xanaano-theme")
    if (stored === "dark" || stored === "light") return stored
  } catch {
    /* ignore */
  }
  return "light"
}

export function AppProvider({
  user,
  onLogout,
  children,
}: {
  user: User
  onLogout: () => void
  children: ReactNode
}) {
  const [theme, setThemeState] = useState<Theme>(readTheme)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tenantId, setTenantId] = useState(user.schoolId ?? "s1")
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      localStorage.setItem("xanaano-theme", theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const tenant = SCHOOLS.find((s) => s.id === tenantId) ?? SCHOOLS[0]

  const toast = useCallback((kind: ToastKind, message: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, kind, message }])
    window.setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3400,
    )
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      role: user.role,
      theme,
      sidebarCollapsed,
      mobileOpen,
      tenant,
      toasts,
      setUser: () => {},
      logout: onLogout,
      toggleTheme: () =>
        setThemeState((t) => (t === "light" ? "dark" : "light")),
      setTheme: setThemeState,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
      setMobileOpen,
      setTenantId,
      toast,
      dismissToast: (id) =>
        setToasts((prev) => prev.filter((t) => t.id !== id)),
    }),
    [
      user,
      theme,
      sidebarCollapsed,
      mobileOpen,
      tenant,
      toasts,
      onLogout,
      toast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

export function demoUser(role: Role) {
  return USERS.find((u) => u.role === role) ?? USERS[0]
}
