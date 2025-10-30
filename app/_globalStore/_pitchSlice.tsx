import { type globalStoreType, type PitchSlice } from "./_types";
import { type StateCreator } from "zustand";
import { Pitch } from "~/types/pitch";

export const createPitchSlice: StateCreator<globalStoreType,
        [['zustand/persist', unknown]], [], PitchSlice> = (set, get) => ({

    pitches: [
        new Pitch(64), new Pitch(62), new Pitch(60),
        new Pitch(62), new Pitch(64),
        new Pitch(64), new Pitch(64), new Pitch()
    ],
    addPitch: () => {
        const lastPitch = get().pitches[get().pitches.length - 1];
        const newPitch = new Pitch(lastPitch.midiValue);
        set((state) => ({ pitches: [...state.pitches, newPitch ] }));
    },
    removePitch: () => {
        set((state) => ({ pitches: state.pitches.slice(0, state.pitches.length - 1) }));
    },
    updatePitch: (slot, value) => {
        if (slot < 0 || slot >= get().pitches.length) {
            throw new Error(`Pitch Slot ${slot} is out of range`);
        }
        set((state) => {
            const newPitches = state.pitches.slice();
            newPitches[slot] = new Pitch(value);
            return { pitches: newPitches }
        });

    },
});
