import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export interface AuditLog {
  _id: string
  adminId: { _id: string; name: string; email: string }
  action: string
  module: string
  targetId: string | null
  details: unknown
  ip: string | null
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function useAuditLogs(page = 1, limit = 50) {
  const { data, error, isLoading } = useSWR<{
    status: string
    data: AuditLog[]
    pagination: Pagination
  }>(`/api/admin/audit?page=${page}&limit=${limit}`, swrFetcher)

  return {
    logs: data?.data ?? [],
    pagination: data?.pagination ?? null,
    isLoading,
    error,
  }
}
