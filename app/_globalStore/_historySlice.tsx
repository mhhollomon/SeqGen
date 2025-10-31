import { gen_id } from "~/utils";
import { type globalStoreType, type HistorySlice } from "./_types";
import { type StateCreator } from "zustand";

export const createHistorySlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], HistorySlice> = (set, get, store) => ({
    history: [],
    addHistory: (entry) => {
        entry.id = gen_id();
        set((state) => ({ history: [...state.history, entry] }));
    },
    undoHistory: () => {
        if (get().history.length === 0) {
            return {};
        }
        const entry = get().history[get().history.length - 1];
        let changes = {};
        if (entry.durations) {
            changes = { ...changes, durations: entry.durations };
        }
        if (entry.pitches) {
            changes = { ...changes, pitches: entry.pitches };
        }
        if (entry.velocities) {
            changes = { ...changes, velocities: entry.velocities };
        }
        if (entry.bpm) {
            changes = { ...changes, bpm: entry.bpm };
        }
        set((state) => ({ ...changes, history: state.history.slice(0, state.history.length - 1) }));
    },

    reset : () => {
        const is = store.getInitialState();
        // Yuck - but do not want to reset the theme
        set({history : [], durations : is.durations, pitches : is.pitches, velocities : is.velocities});
    },

    // This isn't really history, but I didn't want to create another slice for it
    getjson : () => {
        return JSON.stringify({ pitches : get().pitches, durations : get().durations, velocities : get().velocities,bpm : get().bpm});
    }
});
