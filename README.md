# B2S Staking Interface

React component library for $B2S token staking on Stacks mainnet.

[![CI](https://github.com/wkalidev/b2s-staking-interface/actions/workflows/ci.yml/badge.svg)](https://github.com/wkalidev/b2s-staking-interface/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Network:** Stacks Mainnet  
**Contract:** `SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N.b2s-staking-vault-v2`

## Installation

```bash
npm install @wkalidev/b2s-staking
```

## Usage

```typescript
import { StakingDashboard } from '@wkalidev/b2s-staking'

function App() {
  return (
    <StakingDashboard
      userAddress="SP..."
      contractAddress="SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N"
      contractName="b2s-staking-vault-v2"
    />
  )
}
```

## APY Reference

| Lock Period | Blocks | APY |
|-------------|--------|-----|
| No lock | 0 | 12.5% |
| ~3.5 days | 525+ | 18.75% |
| ~7 days | 1050+ | 25% |
| ~14 days | 2100+ | 37.5% |

## Hooks disponibles

```typescript
import {
  useStaking,
  useVault,
  usePendingRewards,
  useAPYHistory,
  useMultiplier,
  useUnlockBlock,
  useStakingHistory,
  useClaimRewards,
  useCompound,
} from '@wkalidev/b2s-staking'
```

## Development

```bash
npm install && npm run dev
```

## Related

- [base2stacks-tracker](https://base2stacks-tracker.vercel.app) — live DeFi platform
- [@wkalidev/b2s-contracts](https://www.npmjs.com/package/@wkalidev/b2s-contracts) — contract SDK

## License

MIT — Built for #StacksBuilderRewards May 2026 🏆