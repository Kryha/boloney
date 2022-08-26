import create from "zustand";

export interface LayoutState {
  isChatToggled: boolean;
  toggleChat: () => void;
}

export const useLayoutStore = create<LayoutState>((set => ({
  isChatToggled: false,
  toggleChat: () => set(state => ({ isChatToggled: !state.isChatToggled })),
})));
