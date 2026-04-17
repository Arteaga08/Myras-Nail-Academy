import { Badge } from '@/components/ui/Badge'

const actionConfig: Record<string, { label: string; color: 'success' | 'info' | 'error' | 'neutral' }> = {
  CREATE: { label: 'CREATE', color: 'success' },
  UPDATE: { label: 'UPDATE', color: 'info' },
  DELETE: { label: 'DELETE', color: 'error' },
}

export function AuditActionBadge({ action }: { action: string }) {
  const config = actionConfig[action.toUpperCase()] ?? { label: action, color: 'neutral' as const }
  return <Badge color={config.color}>{config.label}</Badge>
}
