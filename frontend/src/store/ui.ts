import { StateCreator } from "zustand";
import { OverlayComponent } from "../types";

export interface UISlice {
  isOverlayVisible: boolean;
  isModalVisible: boolean;
  modalComponentChildren?: OverlayComponent;
  isContainerVisible: boolean;
  isModalButtonVisible: boolean;
  isDiceThrown: boolean;
  isDiceStable: boolean;
  isLoadingSpinnerVisible: boolean;

  toggleOverlay: () => void;
  setModalComponentChildren: (component: OverlayComponent) => void;
  closeModal: () => void;
  setModalWithoutContainer: (isVisible: boolean) => void;
  setModalWithContainer: (isVisible: boolean) => void;
  setIsDiceThrown: (isDiceThrown: boolean) => void;
  setIsDiceStable: (isDiceStable: boolean) => void;
  setSpinnerVisibility: (isVisible: boolean) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,
  modalComponentChildren: undefined,
  isContainerVisible: false,
  isModalButtonVisible: false,
  isDiceThrown: false,
  isDiceStable: true,
  isLoadingSpinnerVisible: false,

  toggleOverlay: () => set(({ isOverlayVisible }) => ({ isOverlayVisible: !isOverlayVisible })),
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
  setIsDiceThrown: (isDiceThrown) => set(() => ({ isDiceThrown })),
  setIsDiceStable: (isDiceStable) => set(() => ({ isDiceStable })),
  setSpinnerVisibility: (isVisible: boolean) =>
    set(() => ({
      modalComponentChildren: isVisible ? "sausage-spinner" : undefined,
      isModalVisible: isVisible,
      isOverlayVisible: isVisible,
    })),
});
