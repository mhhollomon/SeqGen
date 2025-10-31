import { type globalStoreType, type PlaybackSlice } from "./_types";
import { type StateCreator } from "zustand";

export const createPlaybackSlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], PlaybackSlice> = (set, get) => ({
    bpm: 120,
    setBpm: (bpm) => {
        get().addHistory({ description: `Updated BPM to ${bpm}`, bpm : bpm });
        set({ bpm });
    }
});
