'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface StudentAuthState {
  token: string | null
  studentName: string | null
  studentEmail: string | null
  studentId: string | null
  isLoading: boolean
}

interface StudentAuthContextValue extends StudentAuthState {
  login: (token: string, name: string, email: string, id: string, redirectUrl?: string) => void
  logout: () => void
}

const StudentAuthContext = createContext<StudentAuthContextValue | null>(null)

export function StudentAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<StudentAuthState>({
    token: null,
    studentName: null,
    studentEmail: null,
    studentId: null,
    isLoading: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('mna_student_token')
    const studentName = localStorage.getItem('mna_student_name')
    const studentEmail = localStorage.getItem('mna_student_email')
    const studentId = localStorage.getItem('mna_student_id')
    setState({ token, studentName, studentEmail, studentId, isLoading: false })
  }, [])

  const login = useCallback(
    (token: string, name: string, email: string, id: string, redirectUrl?: string) => {
      localStorage.setItem('mna_student_token', token)
      localStorage.setItem('mna_student_name', name)
      localStorage.setItem('mna_student_email', email)
      localStorage.setItem('mna_student_id', id)
      const secure = window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `mna_student_session=1; path=/; max-age=172800; SameSite=Lax${secure}`
      setState({ token, studentName: name, studentEmail: email, studentId: id, isLoading: false })
      router.push(redirectUrl ?? '/student/my-courses')
    },
    [router]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('mna_student_token')
    localStorage.removeItem('mna_student_name')
    localStorage.removeItem('mna_student_email')
    localStorage.removeItem('mna_student_id')
    document.cookie = 'mna_student_session=; path=/; max-age=0'
    setState({ token: null, studentName: null, studentEmail: null, studentId: null, isLoading: false })
    router.push('/student/login')
  }, [router])

  return (
    <StudentAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </StudentAuthContext.Provider>
  )
}

export function useStudentAuthContext() {
  const ctx = useContext(StudentAuthContext)
  if (!ctx) throw new Error('useStudentAuthContext must be used inside StudentAuthProvider')
  return ctx
}
