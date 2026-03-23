export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60)   return `${mins}m ago`
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
  return `${Math.floor(mins / 1440)}d ago`
}

export function blocksToTime(blocks: number): string {
  const mins = blocks * 10
  if (mins < 60)   return `${mins} minutes`
  if (mins < 1440) return `${Math.floor(mins / 60)} hours`
  return `${Math.floor(mins / 1440)} days`
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
