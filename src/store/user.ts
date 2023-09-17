import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  username: string
  image: string
  onboarded: boolean
}

interface UserTypes {
  user: User | null
  storeUser: (value: User | null) => void
  reset: () => void
}

export const useUser = create<UserTypes>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        storeUser: (value) => set(() => ({ user: value })),
        reset: () => set(() => ({user: null}))
      }),
      { name: 'userStore' }
    )
  )
)