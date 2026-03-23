export const LOCK_OPTIONS = [
  { blocks: 0,    label: 'Flexible',  multiplier: 1.0, apy: 12.5  },
  { blocks: 525,  label: '1 Week',    multiplier: 1.5, apy: 18.75 },
  { blocks: 1050, label: '2 Weeks',   multiplier: 2.0, apy: 25.0  },
  { blocks: 2100, label: '1 Month',   multiplier: 3.0, apy: 37.5  },
]

export function getLockLabel(blocks: number): string {
  return LOCK_OPTIONS.find(o => o.blocks === blocks)?.label || 'Unknown'
}

export function getMultiplierLabel(blocks: number): string {
  const opt = LOCK_OPTIONS.find(o => o.blocks === blocks)
  return opt ? `${opt.multiplier}x` : '1x'
}
