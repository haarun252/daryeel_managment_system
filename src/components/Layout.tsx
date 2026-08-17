import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import ToastStack from './Toast'
import { useApp } from '../context/AppContext'

interface LayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  title: string
  children: ReactNode
}

export default function Layout({ currentPage, onNavigate, title, children }: LayoutProps) {
  const { sidebarCollapsed } = useApp()
  const width = sidebarCollapsed ? 76 : 260

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div style={{ width, flexShrink: 0, transition: 'width 0.2s ease' }} className="sidebar-spacer" />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <TopNav onNavigate={onNavigate} title={title} />
        <main style={{ flex: 1, padding: '22px 22px 40px' }}>{children}</main>
      </div>
      <ToastStack />
    </div>
  )
}
