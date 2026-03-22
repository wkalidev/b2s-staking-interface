export interface StakePosition {
  amount: number
  lockBlocks: number
  startBlock: number
  unlockBlock: number
  apy: number
  estimatedYearlyRewards: number
}

export interface LockTier {
  label: string
  blocks: number
  multiplier: number
  apy: number
}

export const LOCK_TIERS: LockTier[] = [
  { label: 'No lock',  blocks: 0,    multiplier: 1,   apy: 12.5  },
  { label: '~3.5 days', blocks: 525,  multiplier: 1.5, apy: 18.75 },
  { label: '~7 days',  blocks: 1050, multiplier: 2,   apy: 25    },
  { label: '~14 days', blocks: 2100, multiplier: 3,   apy: 37.5  },
]

export interface StakingDashboardProps {
  userAddress: string
  contractAddress?: string
  contractName?: string
  theme?: 'light' | 'dark'
  onStakeSuccess?: (amount: number) => void
  onUnstakeSuccess?: (amount: number) => void
}

export interface RewardsInfo {
  pending: number
  totalClaimed: number
  lastClaimBlock: number
  canClaimNow: boolean
}
