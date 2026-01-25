import { type globalStoreType, type ThemeSlice } from "./_types";
import { type StateCreator } from "zustand";

export const createThemeSlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], ThemeSlice> = (set) => ({
    theme: "light",
    setTheme: (newTheme) => {
        set({ theme : newTheme });
    }
});
