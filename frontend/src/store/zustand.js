import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  setUser: (newUser) => set(({ user: newUser })),
  removeUser: () => set({ user: null }),
}))

export default useStore