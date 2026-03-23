export function isValidAddress(address: string): boolean {
  return /^S[PM][0-9A-Z]{38,39}$/.test(address)
}

export function isPositiveNumber(value: string): boolean {
  const n = parseFloat(value)
  return !isNaN(n) && n > 0
}

export function isValidLockBlocks(blocks: number): boolean {
  return [0, 525, 1050, 2100].includes(blocks)
}

export function validateStakeInput(amount: string, balance: number): string | null {
  if (!isPositiveNumber(amount)) return 'Enter a valid amount'
  if (parseFloat(amount) > balance) return 'Insufficient balance'
  return null
}
