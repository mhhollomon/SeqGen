import { type globalStoreType, type HistorySlice } from "./_types";
import { type StateCreator } from "zustand";

export const createHistorySlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], HistorySlice> = (set, get, store) => ({
    history: [],
    addHistory: (entry) => {
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
        set((state) => ({ ...changes,history: state.history.slice(0, state.history.length - 1) }));
    },

    reset : () => {
        const is = store.getInitialState();
        // Yuck - but do not want to reset the theme
        set({history : [], durations : is.durations, pitches : is.pitches, velocities : is.velocities});
    },
});
