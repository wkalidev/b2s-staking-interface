# B2S Staking Interface

React interface for staking $B2S tokens with real-time APY calculations.

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Stacks](https://img.shields.io/badge/Stacks-Blockchain-purple)](https://stacks.co/)

## 📋 Overview

Standalone React component library for integrating B2S token staking into any Web3 application.

## ✨ Features

- 🔒 **Secure Staking** - Lock tokens to earn rewards
- 📊 **Real-time APY** - Live yield calculations
- 💰 **Flexible Terms** - Choose your lock period
- 📈 **Rewards Dashboard** - Track earnings over time
- ⚡ **Fast Unstaking** - Withdraw anytime
- 🎨 **Customizable UI** - Fully themeable components

## 🚀 Quick Start

### Installation
```bash
npm install @b2s/staking-interface
```

### Basic Usage
```tsx
import { StakingDashboard } from '@b2s/staking-interface';

function App() {
  return (
    <StakingDashboard
      userAddress="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
      contractAddress="ST936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96"
      contractName="b2s-token"
    />
  );
}
```

## 📦 Components

### StakingDashboard

Main component with all staking features.
```tsx
<StakingDashboard
  userAddress={string}
  contractAddress={string}
  contractName={string}
  theme?: 'light' | 'dark'
  onStakeSuccess?: (amount: number) => void
  onUnstakeSuccess?: (amount: number) => void
/>
```

### StakeInput

Input component for staking amounts.
```tsx
<StakeInput
  balance={number}
  onStake={(amount) => console.log(amount)}
  minAmount={1}
  maxAmount={balance}
/>
```

### RewardsDisplay

Shows current rewards and APY.
```tsx
<RewardsDisplay
  totalStaked={number}
  rewards={number}
  apy={number}
/>
```

## 🎨 Theming
```tsx
import { ThemeProvider } from '@b2s/staking-interface';

const customTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#06b6d4',
    background: '#1e293b',
    text: '#ffffff',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
};

<ThemeProvider theme={customTheme}>
  <StakingDashboard />
</ThemeProvider>
```

## 🔧 Configuration

Create a `b2s.config.js`:
```javascript
export default {
  network: 'testnet',
  contracts: {
    token: 'ST936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96.b2s-token',
  },
  staking: {
    minAmount: 1,
    maxAmount: 1000000,
    lockPeriods: [7, 30, 90, 180, 365], // days
  },
};
```

## 📊 APY Calculation
```typescript
// Example: Calculate expected rewards
import { calculateRewards } from '@b2s/staking-interface';

const rewards = calculateRewards({
  principal: 1000,
  apy: 12.5,
  days: 365,
});

console.log(rewards); // 125 tokens
```

## 🛠️ Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📖 API Reference

### calculateRewards
```typescript
function calculateRewards(params: {
  principal: number;
  apy: number;
  days: number;
}): number;
```

### getStakedAmount
```typescript
function getStakedAmount(
  userAddress: string,
  contractAddress: string
): Promise<number>;
```

### stakeTokens
```typescript
function stakeTokens(
  amount: number,
  lockPeriod: number
): Promise<TransactionResult>;
```

## 🔗 Related Packages

- [@b2s/token-contract](https://github.com/wkalidev/b2s-token-contract) - Smart contract
- [@b2s/analytics](https://github.com/wkalidev/b2s-analytics-dashboard) - Analytics dashboard
- [base2stacks-tracker](https://github.com/wkalidev/base2stacks-tracker) - Main app

## 🤝 Contributing

See [CONTRIBUTING.md](../base2stacks-tracker/CONTRIBUTING.md)

## 📜 License

MIT License - See [LICENSE](LICENSE)

## 🔗 Links

- [Live Demo](https://wkalidev-base2stacks-tracker.vercel.app)
- [Documentation](https://github.com/wkalidev/b2s-staking-interface/wiki)
- [NPM Package](https://npmjs.com/package/@b2s/staking-interface) (coming soon)

---

**Built for #StacksBuilderRewards 🏆**