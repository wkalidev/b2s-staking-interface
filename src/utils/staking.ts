export interface StakeInfo {
  amount:      number
  lockedAt:    number
  lockBlocks:  number
  multiplier:  number
  unlockBlock: number
}

export function isLocked(info: StakeInfo, currentBlock: number): boolean {
  return currentBlock < info.unlockBlock
}

export function blocksUntilUnlock(info: StakeInfo, currentBlock: number): number {
  return Math.max(0, info.unlockBlock - currentBlock)
}

export function daysUntilUnlock(info: StakeInfo, currentBlock: number): number {
  return blocksUntilUnlock(info, currentBlock) / 144
}

export function getEffectiveAPY(multiplier: number): number {
  return 12.5 * multiplier
}
