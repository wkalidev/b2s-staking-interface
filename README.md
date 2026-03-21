# B2S Staking Interface

[![Mainnet](https://img.shields.io/badge/Network-Stacks%20Mainnet-green)](https://explorer.hiro.so/?chain=mainnet)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Stacks](https://img.shields.io/badge/Stacks-Blockchain-purple)](https://stacks.co/)
[![Builder Rewards](https://img.shields.io/badge/Stacks-Builder%20Rewards%20March%202026-orange)](https://stacks.org)

React interface for staking $B2S tokens with real-time APY calculations — connected to Stacks mainnet.

**[https://base2stacks-tracker.vercel.app](https://base2stacks-tracker.vercel.app)**

---

## 📋 Overview

Standalone React component library for integrating B2S token staking into any Web3 application. Pulls live data from the Hiro Mainnet API and interacts with `b2s-staking-vault-v2` on Stacks mainnet.

---

## ✨ Features

- 🔒 **Secure Staking** — Lock tokens to earn rewards via `b2s-staking-vault-v2`
- 📊 **Real-time APY** — Live yield calculations (12.5% APY)
- 💰 **No Lock-up** — Unstake anytime without penalties
- 📈 **Rewards Dashboard** — Track pending rewards in real time
- ⚡ **Live Holders** — Fetches holder count from Hiro Mainnet API
- 🎨 **Neon Punk UI** — Dark terminal aesthetic with Fira Code

---

## 🚀 Quick Start

### Installation
```bash
npm install @wkalidev/b2s-staking-interface
```

### Basic Usage
```tsx
import { StakingDashboard } from '@wkalidev/b2s-staking-interface'

function App() {
  return (
    <StakingDashboard
      userAddress="SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
      contractAddress="SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96"
      contractName="b2s-staking-vault-v2"
      onStakeSuccess={(amount) => console.log('Staked:', amount)}
      onUnstakeSuccess={(amount) => console.log('Unstaked:', amount)}
    />
  )
}
```

---

## 📦 Components

### `StakingDashboard`
Main component with all staking features.
```tsx
<StakingDashboard
  userAddress={string}
  contractAddress={string}         // default: SP936Y...ARQ96
  contractName={string}            // default: b2s-staking-vault-v2
  onStakeSuccess?: (amount: number) => void
  onUnstakeSuccess?: (amount: number) => void
/>
```

### `StakingCard`
Compact card variant — same features, smaller footprint.
```tsx
<StakingCard
  userAddress={string}
  onStakeSuccess?: (amount: number) => void
  onUnstakeSuccess?: (amount: number) => void
/>
```

### `RewardsDisplay`
Shows current rewards and APY.
```tsx
<RewardsDisplay totalStaked={number} rewards={number} apy={number} />
```

---

## 🔧 Configuration

```javascript
// b2s.config.js
export default {
  network: 'mainnet',
  contracts: {
    staking: 'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96.b2s-staking-vault-v2',
    token:   'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96.b2s-token',
  },
  staking: {
    minAmount: 1,
    maxAmount: 1000000,
    apy: 12.5,
  },
}
```

---

## 📊 APY Calculation

```typescript
import { calculateRewards } from '@wkalidev/b2s-staking-interface'

const rewards = calculateRewards({
  principal: 1000,
  apy: 12.5,
  days: 365,
})
// → 125 $B2S
```

---

## 📖 API Reference

```typescript
function calculateRewards(params: {
  principal: number
  apy: number
  days: number
}): number

function getStakedAmount(
  userAddress: string,
  contractAddress: string
): Promise<number>

function stakeTokens(
  amount: number
): Promise<TransactionResult>
```

---

## 🛠️ Development

```bash
npm install
npm run dev
npm run build
npm test
```

---

## 🔗 Smart Contracts (Mainnet)

**Deployer**: `SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96`

| Contract | Role |
|---|---|
| `b2s-staking-vault-v2` | Staking vault — main contract |
| `b2s-token` | $B2S token balance & supply |
| `b2s-rewards-distributor-v3` | Rewards distribution |

---

## 🔗 Related Repos

| Repo | Description |
|---|---|
| [base2stacks-tracker](https://github.com/wkalidev/base2stacks-tracker) | Main frontend — [live app](https://base2stacks-tracker.vercel.app) |
| [b2s-token-contract](https://github.com/wkalidev/b2s-token-contract) | All Clarity smart contracts |
| [b2s-analytics-dashboard](https://github.com/wkalidev/b2s-analytics-dashboard) | Analytics dashboard |
| [stacks-clarity-toolkit](https://github.com/wkalidev/stacks-clarity-toolkit) | Math & token utilities |

---

## 📜 License

MIT — See [LICENSE](./LICENSE)

## 👨‍💻 Author

**wkalidev (zcodebase)** · [Twitter](https://twitter.com/willycodexwar) · [Farcaster](https://warpcast.com/willywarrior)

---

**Built for #StacksBuilderRewards March 2026 🏆**\n## Staking Tiers\n- 1x base\n- 1.5x (525 blocks)\n- 2x (1050 blocks)\n- 3x (2100 blocks)
