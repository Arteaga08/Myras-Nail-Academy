'use client'

import { ToastProvider } from '@/components/ui/Toast'
import { StudentTopbar } from './StudentTopbar'

export function StudentShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex h-dvh flex-col overflow-hidden">
        <StudentTopbar />
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-rose-50 via-nude-50 to-nude-100 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
