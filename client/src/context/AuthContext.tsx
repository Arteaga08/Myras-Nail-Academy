'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthState {
  token: string | null
  adminName: string | null
  adminEmail: string | null
}

interface AuthContextValue extends AuthState {
  login: (token: string, name: string, email: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'mna_admin_token'
const STORAGE_NAME = 'mna_admin_name'
const STORAGE_EMAIL = 'mna_admin_email'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    adminName: null,
    adminEmail: null,
  })

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY)
    const adminName = localStorage.getItem(STORAGE_NAME)
    const adminEmail = localStorage.getItem(STORAGE_EMAIL)
    if (token) {
      setAuth({ token, adminName, adminEmail })
    }
    setIsLoading(false)
  }, [])

  function login(token: string, name: string, email: string) {
    localStorage.setItem(STORAGE_KEY, token)
    localStorage.setItem(STORAGE_NAME, name)
    localStorage.setItem(STORAGE_EMAIL, email)
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `mna_session=1; path=/; max-age=${60 * 60 * 12}; SameSite=Lax${secure}`
    setAuth({ token, adminName: name, adminEmail: email })
    router.push('/dashboard')
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_NAME)
    localStorage.removeItem(STORAGE_EMAIL)
    document.cookie = 'mna_session=; path=/; max-age=0'
    setAuth({ token: null, adminName: null, adminEmail: null })
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  return ctx
}
