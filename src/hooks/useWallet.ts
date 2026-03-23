import { useState, useEffect } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'

const appConfig  = new AppConfig(['store_write'])
const userSession = new UserSession({ appConfig })

export function useWallet() {
  const [address, setAddress]       = useState('')
  const [connected, setConnected]   = useState(false)
  const [mounted, setMounted]       = useState(false)

  useEffect(() => {
    setMounted(true)
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData()
      setAddress(data.profile.stxAddress.mainnet)
      setConnected(true)
    }
  }, [])

  const connect = () => showConnect({
    appDetails: { name: 'B2S Staking', icon: '/logo.png' },
    redirectTo: '/',
    onFinish: () => {
      const data = userSession.loadUserData()
      setAddress(data.profile.stxAddress.mainnet)
      setConnected(true)
    },
    userSession,
  })

  const disconnect = () => {
    userSession.signUserOut()
    setAddress('')
    setConnected(false)
  }

  return { address, connected, mounted, connect, disconnect }
}
