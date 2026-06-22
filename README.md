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

## Available Hooks

```typescript
import {
  useStakePosition,
  useCurrentBlock,
  usePendingRewards,
} from '@wkalidev/b2s-staking'
```

## Development

```bash
npm install && npm run dev
```

## Smart Contracts (Mainnet)

**Deployer:** `SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N`

| Contract | Description |
|----------|-------------|
| `b2s-staking-vault-v2` | Staking vault, 12.5%–37.5% APY, lock multipliers |
| `b2s-staking-vault-v3` | Latest staking vault |
| `b2s-token-v4` | SIP-010 $B2S token |
| `b2s-rewards-distributor` | Daily reward distribution |

## Related Repos

| Repo | Description |
|------|-------------|
| [base2stacks-tracker](https://github.com/wkalidev/base2stacks-tracker) | Main DeFi platform — [live app](https://base2stacks-tracker.vercel.app) |
| [b2s-token-contract](https://github.com/wkalidev/b2s-token-contract) | SDK & Clarity contracts — [@wkalidev/b2s-contracts](https://www.npmjs.com/package/@wkalidev/b2s-contracts) |
| [b2s-analytics-dashboard](https://github.com/wkalidev/b2s-analytics-dashboard) | Analytics dashboard components |
| [b2s-nft-badges](https://github.com/wkalidev/b2s-nft-badges) | 567 NFT badge assets and hooks |
| [stacks-clarity-toolkit](https://github.com/wkalidev/stacks-clarity-toolkit) | Clarity dev toolkit — [@wkalidev/stacks-clarity-toolkit](https://www.npmjs.com/package/@wkalidev/stacks-clarity-toolkit) |

## License

MIT — Built for #StacksBuilderRewards May 2026