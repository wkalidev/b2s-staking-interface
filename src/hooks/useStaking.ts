import { useState, useEffect, useCallback } from 'react'

const HIRO = 'https://api.mainnet.hiro.so'
const CONTRACT = 'SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N'

export function useStaking(address: string) {
  const [stakedAmount, setStakedAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    if (!address) return
    setLoading(true)
    try {
      const res = await fetch(
        `${HIRO}/extended/v1/address/${address}/transactions?limit=20`
      )
      const data = await res.json()
      const stakeTxs = (data.results || []).filter(
        (tx: any) => tx.contract_call?.function_name === 'stake'
      )
      setStakedAmount(stakeTxs.length)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [address])

  useEffect(() => {
    fetchData()
    const i = setInterval(fetchData, 30000)
    return () => clearInterval(i)
  }, [fetchData])

  return { stakedAmount, loading, refetch: fetchData }
}
