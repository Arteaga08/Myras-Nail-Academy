const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('mna_admin_token')
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string>),
  }

  if (!skipAuth) {
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers })

  if (res.status === 401 && !skipAuth) {
    // Token expirado o inválido — limpiar sesión y redirigir
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mna_admin_token')
      localStorage.removeItem('mna_admin_name')
      localStorage.removeItem('mna_admin_email')
      document.cookie = 'mna_session=; path=/; max-age=0'
      window.location.href = '/login'
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

  // 204 No Content
  if (res.status === 204) return undefined as T

  return res.json() as Promise<T>
}

/** Fetcher compatible con SWR — usa un cast genérico para que SWR infiera el tipo */
export function swrFetcher<T = unknown>(path: string): Promise<T> {
  return apiFetch<T>(path)
}
