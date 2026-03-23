export const BASE_APY = 12.5

export function getMultiplier(lockBlocks: number): number {
  if (lockBlocks >= 2100) return 3.0
  if (lockBlocks >= 1050) return 2.0
  if (lockBlocks >= 525)  return 1.5
  return 1.0
}

export function getAPY(lockBlocks: number): number {
  return BASE_APY * getMultiplier(lockBlocks)
}

export function calcRewards(amount: number, lockBlocks: number, days: number): number {
  return amount * getAPY(lockBlocks) / 100 / 365 * days
}

export const LOCK_OPTIONS = [
  { label: 'No lock', blocks: 0,    apy: 12.5  },
  { label: '1 week',  blocks: 525,  apy: 18.75 },
  { label: '2 weeks', blocks: 1050, apy: 25.0  },
  { label: '1 month', blocks: 2100, apy: 37.5  },
]
