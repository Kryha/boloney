import { StateCreator } from "zustand";

export interface UISlice {
  isOverlayVisible: boolean;

  setIsOverlayVisible: (isVisible: boolean) => void;
  toggleOverlay: () => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,

  setIsOverlayVisible: (isVisible: boolean) => set(() => ({ isOverlayVisible: isVisible })),
  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
});
