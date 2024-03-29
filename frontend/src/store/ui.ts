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
  isShufflingPlayers: boolean;
  timerTimeInSeconds: number;
  isSidebarVisible: boolean;
  masterVolume: number;
  cookieConsent: boolean;
  askedForConsent: boolean;

  setModalComponentChildren: (component: OverlayComponent) => void;
  closeModal: () => void;
  setModalWithoutContainer: (isVisible: boolean) => void;
  setModalWithContainer: (isVisible: boolean) => void;
  showModal: (component: OverlayComponent) => void;
  hideModal: () => void;
  setSpinnerVisibility: (isVisible: boolean) => void;
  setPlayerReady: (isReady: boolean) => void;
  setTimerTimeInSeconds: (timeInSeconds: number) => void;
  setIsSidebarVisible: (isVisible: boolean) => void;
  setShufflingPlayers: (isShuffling: boolean) => void;
  setMasterVolume: (masterVolume: number) => void;
  setCookieConsent: (consent: boolean) => void;
  setAskedForConsent: (consent: boolean) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isOverlayVisible: false,
  isModalVisible: false,
  modalComponentChildren: undefined,
  isContainerVisible: false,
  isModalButtonVisible: false,
  isLoadingSpinnerVisible: false,
  isPlayerReady: false,
  isShufflingPlayers: false,
  timerTimeInSeconds: 0,
  isSidebarVisible: false,
  masterVolume: 0.5,
  cookieConsent: false,
  askedForConsent: false,

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
  showModal: (component: OverlayComponent) =>
    set(() => ({
      modalComponentChildren: component,
      isModalButtonVisible: true,
      isModalVisible: true,
      isOverlayVisible: true,
    })),
  hideModal: () =>
    set({
      isModalButtonVisible: false,
      isModalVisible: false,
      isOverlayVisible: false,
      isContainerVisible: false,
    }),
  setSpinnerVisibility: (isVisible: boolean) =>
    set(() => ({
      isLoadingSpinnerVisible: isVisible,
    })),
  setPlayerReady: (isReady) => set(() => ({ isPlayerReady: isReady })),
  setTimerTimeInSeconds: (timeInSeconds) => set(() => ({ timerTimeInSeconds: timeInSeconds })),
  setIsSidebarVisible: (isVisible: boolean) => set(() => ({ isSidebarVisible: isVisible })),
  setShufflingPlayers: (isShufflingPlayers) => set(() => ({ isShufflingPlayers: isShufflingPlayers })),
  setMasterVolume: (masterVolume: number) => set(() => ({ masterVolume: masterVolume })),
  setCookieConsent: (consent: boolean) => set(() => ({ cookieConsent: consent })),
  setAskedForConsent: (consent: boolean) => set(() => ({ askedForConsent: consent })),
});
