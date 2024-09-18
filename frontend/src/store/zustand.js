import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      users: [],
      user: null,
      updateUser: null,
      setUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({ user: null }),
      removeUpdateUser: () => set({ updateUser: null }),
      setUsers: (newUsers) => set({ users: newUsers }),
      setUpdateUser: (newUpdateUser) => set({ updateUser: newUpdateUser }),
    }),
  {
    name: 'user-storage'
  }
)
);

export default useStore;
