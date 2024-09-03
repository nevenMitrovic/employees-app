import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      users: [],
      user: null,
      setUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({ user: null }),
      setUsers: (newUsers) => set({ users: newUsers })
    }),
  {
    name: 'user-storage'
  }
)
);

export default useStore;
