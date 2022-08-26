import create from "zustand";

export interface LayoutState {
  isChatExpanded: boolean;
  expandChat: () => void;
}

export const useLayoutStore = create<LayoutState>((set => ({
  isChatExpanded: false,
  expandChat: () => set(state => ({ isChatExpanded: !state.isChatExpanded })),
})));
