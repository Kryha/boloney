import create from "zustand";

export interface LayoutState {
  isChatToggled: boolean;
  toggleChat: () => void;
  isHistoryToggled: boolean;
  toggleHistory: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isChatToggled: true,
  isHistoryToggled: true,
  toggleChat: () => set((state) => ({ isChatToggled: !state.isChatToggled })),
  toggleHistory: () => set((state) => ({ isHistoryToggled: !state.isHistoryToggled })),
}));
