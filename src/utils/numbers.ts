export function formatLarge(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toFixed(2)
}

export function formatPercent(n: number, showSign = false): string {
  const sign = showSign && n > 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}
