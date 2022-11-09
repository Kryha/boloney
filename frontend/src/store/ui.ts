import { ReactNode } from "react";
import { StateCreator } from "zustand";

export interface UISlice {
  isOverlayVisible: boolean;
  isModalVisible: boolean;
  modalComponent: ReactNode | undefined;
  isContainerVisible: boolean;
  isButtonVisible: boolean;
  isOverviewVisible: boolean;

  setIsOverlayVisible: (isVisible: boolean) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  toggleOverlay: () => void;
  setModalComponent: (component: ReactNode) => void;
  setIsContainerVisible: (isVisible: boolean) => void;
  setIsButtonVisible: (isVisible: boolean) => void;
  setIsOverviewVisible: (isVisible: boolean) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,
  modalComponent: undefined,
  isContainerVisible: false,
  isButtonVisible: false,
  isOverviewVisible: true,

  setIsOverlayVisible: (isVisible: boolean) => set(() => ({ isOverlayVisible: isVisible })),
  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
  setIsModalVisible: (isVisible: boolean) => set(() => ({ isModalVisible: isVisible })),
  setModalComponent: (component: ReactNode) => set(() => ({ modalComponent: component })),
  setIsContainerVisible: (isVisible: boolean) => set(() => ({ isContainerVisible: isVisible })),
  setIsButtonVisible: (isVisible: boolean) => set(() => ({ isButtonVisible: isVisible })),
  setIsOverviewVisible: (isVisible: boolean) => set(() => ({ isOverviewVisible: isVisible })),
});
