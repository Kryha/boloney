import { ReactNode } from "react";
import { StateCreator } from "zustand";

export interface UISlice {
  isOverlayVisible: boolean;
  isModalVisible: boolean;
  modalComponentChildren: ReactNode | undefined;
  isContainerVisible: boolean;
  isModalButtonVisible: boolean;

  toggleOverlay: () => void;
  setModalComponentChildren: (component: ReactNode) => void;
  closeModal: () => void;
  toggleModalWithoutContainer: () => void;
  toggleModalWithContainer: () => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,
  modalComponentChildren: undefined,
  isContainerVisible: false,
  isModalButtonVisible: false,

  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
  setModalComponentChildren: (component: ReactNode) => set(() => ({ modalComponentChildren: component })),
  closeModal: () =>
    set(() => ({
      isModalButtonVisible: false,
      isModalVisible: false,
      isOverlayVisible: false,
      isContainerVisible: false,
      modalComponentChildren: undefined,
    })),
  toggleModalWithoutContainer: () =>
    set(({ isOverlayVisible, isModalVisible, isModalButtonVisible }) => ({
      isModalButtonVisible: !isModalButtonVisible,
      isModalVisible: !isModalVisible,
      isOverlayVisible: !isOverlayVisible,
    })),
  toggleModalWithContainer: () =>
    set(({ isOverlayVisible, isModalVisible, isModalButtonVisible, isContainerVisible }) => ({
      isModalButtonVisible: !isModalButtonVisible,
      isModalVisible: !isModalVisible,
      isOverlayVisible: !isOverlayVisible,
      isContainerVisible: !isContainerVisible,
    })),
});
