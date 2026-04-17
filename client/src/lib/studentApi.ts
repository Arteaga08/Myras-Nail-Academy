const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getStudentToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('mna_student_token')
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean
}

export async function studentApiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string>),
  }

  if (!skipAuth) {
    const token = getStudentToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers })

  if (res.status === 401 && !skipAuth) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mna_student_token')
      localStorage.removeItem('mna_student_name')
      localStorage.removeItem('mna_student_email')
      localStorage.removeItem('mna_student_id')
      document.cookie = 'mna_student_session=; path=/; max-age=0'
      window.location.href = '/student/login'
    }
    throw new Error('Sesión expirada')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body?.message ?? `Error ${res.status}`
    const err = new Error(message) as Error & { status: number; body: unknown }
    err.status = res.status
    err.body = body
    throw err
  }

  if (res.status === 204) return undefined as T

  return res.json() as Promise<T>
}

export function studentSwrFetcher<T = unknown>(path: string): Promise<T> {
  return studentApiFetch<T>(path)
}
