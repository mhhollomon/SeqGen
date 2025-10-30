import type { PitchValue } from "~/types/pitch";

export interface PitchSlice {
    pitches: PitchValue[],
    addPitch: () => void,
    removePitch: () => void,
    updatePitch: (slot: number, value: number) => void
}

export interface DurationSlice {
    durations: number[],
    addDuration: () => void,
    removeDuration: () => void,
    updateDuration: (slot: number, value: number) => void
}

export interface VelocitySlice {
    velocities: number[],
    addVelocity: () => void,
    removeVelocity: () => void,
    updateVelocity: (slot: number, value: number) => void
}

export interface HistoryEntry {
    description: string,
    pitches?: PitchSlice['pitches'],
    durations?: DurationSlice['durations'],
    velocities?: VelocitySlice['velocities'],
}

export interface HistorySlice {
    history: HistoryEntry[],
    addHistory: (entry : HistoryEntry) => void,
    undoHistory: () => void
    reset: () => void
}

export interface ThemeSlice {
    theme: string,
    setTheme: (theme: string) => void
}

export type globalStoreType = PitchSlice &
        DurationSlice & VelocitySlice &
        HistorySlice & ThemeSlice;

