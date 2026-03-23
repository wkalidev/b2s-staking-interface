const APP_URL = 'https://base2stacks-tracker.vercel.app'

export function getStakeShareText(amount: number, apy: number): string {
  return `💰 Just staked ${amount} $B2S on Base2Stacks!\n📈 Earning ${apy}% APY\n👉 ${APP_URL}\n#B2S #Stacks #DeFi`
}

export function getUnstakeShareText(amount: number): string {
  return `🎉 Just unstaked ${amount} $B2S from Base2Stacks!\n💰 Rewards earned!\n👉 ${APP_URL}\n#B2S #Stacks`
}

export function twitterUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}

export function farcasterUrl(text: string): string {
  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`
}
