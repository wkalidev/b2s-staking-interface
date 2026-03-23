import { useState, useEffect, useCallback } from 'react'
import { callReadOnlyFunction, cvToJSON, uintCV } from '@stacks/transactions'
import { StacksMainnet } from '@stacks/network'

const network  = new StacksMainnet()
const CONTRACT = 'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96'

export function useMultiplier(lockBlocks: number) {
  const [multiplier, setMultiplier] = useState(100)
  const [loading, setLoading]       = useState(false)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    try {
      const result = await callReadOnlyFunction({
        network,
        contractAddress: CONTRACT,
        contractName:    'b2s-staking-vault-v2',
        functionName:    'get-multiplier-for',
        functionArgs:    [uintCV(lockBlocks)],
        senderAddress:   CONTRACT,
      })
      const val = cvToJSON(result).value?.value
      setMultiplier(val ? Number(val) : 100)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [lockBlocks])

  useEffect(() => { fetch_() }, [fetch_])
  return { multiplier: multiplier / 100, loading }
}
