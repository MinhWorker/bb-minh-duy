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

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: () => number;
  isLastPage: () => boolean;
};

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  limit: 7,
  total: 0,

  setPage: (page) => set({ page }),
  setTotal: (total) => set({ total }),
  nextPage: () => {
    const { page, total, limit } = get();
    const maxPage = Math.ceil(total / limit);
    set({ page: Math.min(page + 1, maxPage) });
  },
  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  totalPages: () => Math.ceil(get().total / get().limit),
  isLastPage: () => get().page >= Math.ceil(get().total / get().limit),
}));
