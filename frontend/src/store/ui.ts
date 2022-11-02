import { StateCreator } from "zustand";

export interface UISlice {
  isOverlayVisible: boolean;
  isModalVisible: boolean;

  setIsOverlayVisible: (isVisible: boolean) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  toggleOverlay: () => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,

  setIsOverlayVisible: (isVisible: boolean) => set(() => ({ isOverlayVisible: isVisible })),
  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
  setIsModalVisible: (isVisible: boolean) => set(() => ({ isModalVisible: isVisible })),
});
