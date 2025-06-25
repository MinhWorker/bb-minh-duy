import { create } from "zustand";

type SidebarState = {
  isShown: boolean;
  hide: () => void;
  show: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isShown: false,
  hide: () => set({ isShown: false }),
  show: () => set({ isShown: true })
}))
