export const BLOCK_TIME = 600
export const BLOCKS_PER_DAY = 144
export const BASE_APY = 12.5

export function calcApy(lockBlocks: number): number {
  if (lockBlocks >= 2100) return BASE_APY * 3
  if (lockBlocks >= 1050) return BASE_APY * 2
  if (lockBlocks >= 525)  return BASE_APY * 1.5
  return BASE_APY
}

export function calcProjectedRewards(amount: number, lockBlocks: number, durationBlocks = 52_560): number {
  const apy = calcApy(lockBlocks)
  return amount * (apy / 100) * (durationBlocks / 52_560)
}

export function blocksToTime(blocks: number): string {
  const secs = blocks * BLOCK_TIME
  const days = Math.floor(secs / 86400)
  const hours = Math.floor((secs % 86400) / 3600)
  const mins = Math.floor((secs % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

export function estimateUnlockDate(currentBlock: number, unlockBlock: number): Date {
  const remaining = Math.max(0, unlockBlock - currentBlock)
  return new Date(Date.now() + remaining * BLOCK_TIME * 1000)
}

export function formatB2S(amount: number, decimals = 2): string {
  return `${amount.toFixed(decimals)} $B2S`
}

export function microToB2S(micro: number | bigint): number {
  return Number(micro) / 1_000_000
}

export function b2sToMicro(amount: number): bigint {
  return BigInt(Math.round(amount * 1_000_000))
}
