
import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
    // Add other UI states here as needed
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));
