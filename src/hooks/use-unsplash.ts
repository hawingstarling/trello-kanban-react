import { create } from 'zustand';

type UnsplashState = {
  isOpen: boolean;
  onSelect?: (url: string) => void;
};

type UnsplashAction = {
  onOpen: (callback?: (url: string) => void) => void;
  onClose: () => void;
};

type UnsplashStore = UnsplashState & UnsplashAction;

export const useUnsplash = create<UnsplashStore>((set, get) => ({
  isOpen: false,
  onSelect: undefined,
  onOpen: (callback?: (url: string) => void) => set({ isOpen: true, onSelect: callback }),
  onClose: () => set({ isOpen: false, onSelect: undefined }),
}));
