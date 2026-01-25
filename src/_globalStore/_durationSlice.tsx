import { type globalStoreType, type DurationSlice } from "./_types";
import { type StateCreator } from "zustand";

export const createDurationSlice: StateCreator<globalStoreType,
        [['zustand/persist', unknown]], [], DurationSlice> = (set, get) => ({

    durations: [
        1, 1, 1, 1, 1, 1, 1, 1
    ],
    addDuration: (slot : number, side : 'before' | 'after') => {
        if (slot < 0 || slot >= get().durations.length) {
            throw new Error(`Duration Slot ${slot} is out of range`);
        }
        const newItem =  get().durations[slot];
        let newDurations : number[];
        if (side === 'before') {
            if (slot === 0) {
                newDurations = [newItem, ...get().durations];
            } else {
                newDurations = [ ...get().durations.slice(0, slot), newItem, ...get().durations.slice(slot)]
            }
        } else {
            if (slot === get().durations.length - 1) {
                newDurations = [ ...get().durations, newItem];
            } else {
                newDurations = [ ...get().durations.slice(0, slot + 1), newItem, ...get().durations.slice(slot + 1)]
            }
        }
        get().addHistory({ description: `Added Duration ${side} slot ${slot}`, durations: get().durations });
        set((state) => ({ durations: newDurations }));
    },

    updateDuration: (slot, value) => {
        if (slot < 0 || slot >= get().durations.length) {
            throw new Error(`Duration Slot ${slot} is out of range`);
        }
        get().addHistory({ description: `Updated Duration for slot ${slot}`, durations: get().durations });
        set((state) => {
            const newDurations = state.durations.slice();
            newDurations[slot] = value;
            return { durations: newDurations };
        });

    },

    deleteDurationSlot: (slot : number) => {
        if (slot < 0 || slot >= get().durations.length) {
            throw new Error(`Duration Slot ${slot} is out of range`);
        }
        get().addHistory({ description: `Deleted Duration for slot ${slot}`, durations: get().durations });
        set((state) => {
            const newDurations = state.durations.slice();
            newDurations.splice(slot, 1);
            return { durations: newDurations };
        });
    },

});
