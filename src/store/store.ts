import { create } from 'zustand'

interface StateTypes {
  notif: number
  addStatusNotif: (value: number) => void
  resetNotif: () => void
}

export const useStore = create<StateTypes>()((set) => ({
  notif: 0,
  addStatusNotif: (value: number) => set(() => ({notif: value})),
  resetNotif: () => set(() => ({notif: 0}))
}))