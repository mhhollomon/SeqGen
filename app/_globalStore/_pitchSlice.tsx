import { type globalStoreType, type PitchSlice } from "./_types";
import { type StateCreator } from "zustand";
import { Pitch, type PitchValue } from "~/types/pitch";

export const createPitchSlice: StateCreator<globalStoreType,
        [['zustand/persist', unknown]], [], PitchSlice> = (set, get) => ({

    pitches: [
        new Pitch(64), new Pitch(62), new Pitch(60),
        new Pitch(62), new Pitch(64),
        new Pitch(64), new Pitch(64), new Pitch()
    ],
    addPitch: (slot : number, side : 'before' | 'after') => {
        if (slot < 0 || slot >= get().pitches.length) {
            throw new Error(`Velocity Slot ${slot} is out of range`);
        }
        const newItem =  get().pitches[slot];
        let newValues : PitchValue[];
        if (side === 'before') {
            if (slot === 0) {
                newValues = [newItem, ...get().pitches];
            } else {
                newValues = [ ...get().pitches.slice(0, slot), newItem, ...get().pitches.slice(slot)]
            }
        } else {
            if (slot === get().pitches.length - 1) {
                newValues = [ ...get().pitches, newItem];
            } else {
                newValues = [ ...get().pitches.slice(0, slot + 1), newItem, ...get().pitches.slice(slot + 1)]
            }
        }
        get().addHistory({ description: `Added Pitch ${side} slot ${slot}`, pitches: get().pitches });
        set((state) => ({ pitches: newValues }));
    },

    deletePitchSlot: (slot : number) => {
        if (slot < 0 || slot >= get().pitches.length) {
            throw new Error(`Pitch Slot ${slot} is out of range`);
        }
        get().addHistory({ description: `Deleted Pitch for slot ${slot}`, pitches: get().pitches });
        set((state) => {
            const newPitches = state.pitches.slice();
            newPitches.splice(slot, 1);
            return { pitches: newPitches };
        });
    },

    updatePitch: (slot, value) => {
        if (slot < 0 || slot >= get().pitches.length) {
            throw new Error(`Pitch Slot ${slot} is out of range`);
        }
        get().addHistory({ description: `Updated Pitch for slot ${slot}`, pitches: get().pitches });
        set((state) => {
            const newPitches = state.pitches.slice();
            newPitches[slot] = new Pitch(value);
            return { pitches: newPitches }
        });

    },
});
