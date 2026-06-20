'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { StoreMeta } from '@/types/domain'
import { getStore } from '../dashboard/_actions/store'

interface StoreContextValue {
  store: StoreMeta | null
  isLoading: boolean
}

const StoreContext = createContext<StoreContextValue>({ store: null, isLoading: true })

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<StoreMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStore().then((s) => {
      setStore(s)
      setIsLoading(false)
    })
  }, [])

  return (
    <StoreContext.Provider value={{ store, isLoading }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
