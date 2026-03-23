export const COLORS = {
  primary:  '#00d4ff',
  success:  '#00ff9f',
  warning:  '#ffd700',
  error:    '#ff4444',
  purple:   '#cc00ff',
  muted:    'rgba(255,255,255,0.25)',
  border:   'rgba(255,255,255,0.07)',
  card:     '#0d1120',
  bg:       '#000000',
}

export function getAPYColor(apy: number): string {
  if (apy >= 30) return COLORS.success
  if (apy >= 20) return COLORS.warning
  return COLORS.primary
}

export function getChangeColor(change: number): string {
  return change >= 0 ? COLORS.success : COLORS.error
}
