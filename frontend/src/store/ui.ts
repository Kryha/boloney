import { StateCreator } from "zustand";
import { OverlayComponent } from "../types";

export interface UISlice {
  isOverlayVisible: boolean;
  isModalVisible: boolean;
  modalComponentChildren?: OverlayComponent;
  isContainerVisible: boolean;
  isModalButtonVisible: boolean;
  isLoadingSpinnerVisible: boolean;
  isPlayerReady: boolean;

  setModalComponentChildren: (component: OverlayComponent) => void;
  closeModal: () => void;
  setModalWithoutContainer: (isVisible: boolean) => void;
  setModalWithContainer: (isVisible: boolean) => void;
  setSpinnerVisibility: (isVisible: boolean) => void;
  setPlayerReady: (isReady: boolean) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,
  modalComponentChildren: undefined,
  isContainerVisible: false,
  isModalButtonVisible: false,
  isLoadingSpinnerVisible: false,
  isPlayerReady: false,

  setModalComponentChildren: (component: OverlayComponent) => set(() => ({ modalComponentChildren: component })),
  closeModal: () =>
    set(() => ({
      isModalButtonVisible: false,
      isModalVisible: false,
      isOverlayVisible: false,
      isContainerVisible: false,
      modalComponentChildren: undefined,
    })),
  setModalWithoutContainer: (isVisible) =>
    set(() => ({
      isModalButtonVisible: isVisible,
      isModalVisible: isVisible,
      isOverlayVisible: isVisible,
    })),
  setModalWithContainer: (isVisible) =>
    set(() => ({
      isModalButtonVisible: isVisible,
      isModalVisible: isVisible,
      isOverlayVisible: isVisible,
      isContainerVisible: isVisible,
    })),
  setSpinnerVisibility: (isVisible: boolean) =>
    set(() => ({
      modalComponentChildren: isVisible ? "sausage-spinner" : undefined,
      isModalVisible: isVisible,
      isOverlayVisible: isVisible,
    })),
  setPlayerReady: (isReady) => set(() => ({ isPlayerReady: isReady })),
});
