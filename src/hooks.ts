import { useState, useEffect, useCallback } from 'react'

const HIRO_API = 'https://api.mainnet.hiro.so'
const CONTRACT = 'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96'

export function useStakePosition(address: string) {
  const [position, setPosition] = useState<{
    amount: number
    lockBlocks: number
    startBlock: number
    unlockBlock: number
    apy: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const fetch_ = useCallback(async () => {
    if (!address) return
    try {
      const res = await fetch(
        `${HIRO_API}/v2/contracts/call-read/${CONTRACT}/b2s-staking-vault-v2/get-stake-info`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender: address, arguments: [] }) }
      )
      const data = await res.json()
      setPosition(data.result ?? null)
    } catch { setPosition(null) }
    finally { setLoading(false) }
  }, [address])

  useEffect(() => { fetch_() }, [fetch_])
  return { position, loading, refetch: fetch_ }
}

export function useCurrentBlock() {
  const [block, setBlock] = useState(0)
  useEffect(() => {
    fetch(`${HIRO_API}/extended/v1/blocks?limit=1`)
      .then(r => r.json())
      .then(d => setBlock(d.results?.[0]?.height ?? 0))
      .catch(() => {})
  }, [])
  return block
}

export function usePendingRewards(address: string) {
  const [rewards, setRewards] = useState(0)
  useEffect(() => {
    if (!address) return
    fetch(`${HIRO_API}/v2/contracts/call-read/${CONTRACT}/b2s-staking-vault-v2/get-pending-rewards`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: address, arguments: [] }) })
      .then(r => r.json())
      .then(d => setRewards(Number(d.result ?? 0) / 1_000_000))
      .catch(() => {})
  }, [address])
  return rewards
}
