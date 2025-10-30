import type { PitchValue } from "~/types/pitch";

export interface PitchSlice {
    pitches: PitchValue[],
    addPitch: () => void,
    removePitch: () => void,
    updatePitch: (slot: number, value: number) => void
}

export type globalStoreType = PitchSlice;

