import { Badge } from '../ui/badge'

function StatusBadge({
  status,
}: {
  status: 'approved' | 'pending' | 'rejected'
}) {
  const map: Record<string, string> = {
    pending: 'bg-warning/20 text-warning-foreground',
    approved: 'bg-success/20 text-success-foreground',
    rejected: 'bg-destructive/15 text-destructive',
  }
  return (
    <Badge
      variant="outline"
      className={`border-transparent capitalize ${map[status] ?? ''}`}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
