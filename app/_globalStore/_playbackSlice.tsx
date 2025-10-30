import { type globalStoreType, type PlaybackSlice } from "./_types";
import { type StateCreator } from "zustand";

export const createPlaybackSlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], PlaybackSlice> = (set) => ({
    bpm: 120,
    setBpm: (bpm) => {
        set({ bpm });
    }
});
