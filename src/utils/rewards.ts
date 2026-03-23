export const DAILY_REWARD   = 5
export const BLOCKS_PER_DAY = 144

export function calcDailyEarnings(stakedAmount: number, apy: number): number {
  return stakedAmount * apy / 100 / 365
}

export function calcMonthlyEarnings(stakedAmount: number, apy: number): number {
  return stakedAmount * apy / 100 / 12
}

export function calcYearlyEarnings(stakedAmount: number, apy: number): number {
  return stakedAmount * apy / 100
}

export function calcCompoundedAPY(apy: number, compoundsPerYear: number): number {
  return (Math.pow(1 + apy / 100 / compoundsPerYear, compoundsPerYear) - 1) * 100
}
