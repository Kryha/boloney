import create from "zustand";

export interface UIState {
  isOverlayVisible: boolean;

  setIsOverlayVisible: (isVisible: boolean) => void;
  toggleOverlay: () => void;
}

export const useUIState = create<UIState>()((set) => ({
  isOverlayVisible: false,

  setIsOverlayVisible: (isVisible: boolean) => set(() => ({ isOverlayVisible: isVisible })),
  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
}));
