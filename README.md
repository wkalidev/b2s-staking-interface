# B2S Staking Interface

React component library for $B2S token staking on Stacks mainnet.

[![CI](https://github.com/wkalidev/b2s-staking-interface/actions/workflows/ci.yml/badge.svg)](https://github.com/wkalidev/b2s-staking-interface/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Network:** Stacks Mainnet
**Contract:** SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96.b2s-staking-vault-v2

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
      contractAddress="SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96"
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

## Development
```bash
npm install && npm run dev
```

## License

MIT — Built for #StacksBuilderRewards March 2026 🏆
