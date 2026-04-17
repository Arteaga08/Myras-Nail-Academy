'use client'

import { useState } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getStudentToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('mna_student_token')
}

export function useCertificateDownload() {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function downloadCertificate(enrollmentId: string, courseTitle: string) {
    setDownloading(true)
    setError(null)

    try {
      const token = getStudentToken()
      const res = await fetch(
        `${BASE_URL}/api/enrollments/${enrollmentId}/certificate`,
        {
          method: 'GET',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      )

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? `Error ${res.status}`)
      }

      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href     = url
      link.download = `certificado-${courseTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al descargar el certificado')
    } finally {
      setDownloading(false)
    }
  }

  return { downloadCertificate, downloading, error }
}
