'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ToastProvider } from '@/components/ui/Toast'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="flex h-dvh overflow-hidden">
        <Sidebar
          isMobileOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar onToggleNav={() => setIsMobileNavOpen((open) => !open)} />
          <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
