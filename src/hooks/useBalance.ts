import { useState, useEffect } from 'react'

const HIRO     = 'https://api.mainnet.hiro.so'
const CONTRACT = 'SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N'

export function useBalance(address: string) {
  const [stx, setStx]     = useState(0)
  const [b2s, setB2s]     = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    fetch(`${HIRO}/extended/v1/address/${address}/balances`)
      .then(r => r.json())
      .then(d => {
        setStx(Number(d.stx?.balance || 0) / 1_000_000)
        const ft  = d.fungible_tokens || {}
        const key = Object.keys(ft).find(k => k.includes('b2s-token'))
        setB2s(key ? Number(ft[key].balance || 0) / 1_000_000 : 0)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [address])

  return { stx, b2s, loading }
}
