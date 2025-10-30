import { type globalStoreType, type DurationSlice } from "./_types";
import { type StateCreator } from "zustand";

export const createDurationSlice: StateCreator<globalStoreType,
        [['zustand/persist', unknown]], [], DurationSlice> = (set, get) => ({

    durations: [
        1, 1, 1, 1, 1, 1, 1, 1
    ],
    addDuration: () => {
        get().addHistory({ description: "Added Duration", durations: get().durations });
        set((state) => ({ durations: [...state.durations, state.durations[state.durations.length - 1] ] }));
    },
    removeDuration: () => {
        get().addHistory({ description: "Removed Duration", durations: get().durations });
        set((state) => ({ durations: state.durations.slice(0, state.durations.length - 1) }));
    },
    updateDuration: (slot, value) => {
        get().addHistory({ description: `Updated Duration for slot ${slot}`, durations: get().durations });
        if (slot < 0 || slot >= get().durations.length) {
            throw new Error(`Duration Slot ${slot} is out of range`);
        }
        set((state) => {
            const newDurations = state.durations.slice();
            newDurations[slot] = value;
            return { durations: newDurations };
        });

    },
});
