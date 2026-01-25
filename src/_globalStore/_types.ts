import type { PitchValue } from "~/types/pitch";

export interface PitchSlice {
    pitches: PitchValue[],
    addPitch: (slot : number, side : 'before' | 'after') => void,
    deletePitchSlot: (slot: number) => void,
    updatePitch: (slot: number, value: number) => void
}

export interface DurationSlice {
    durations: number[],
    addDuration: (slot : number, side : 'before' | 'after') => void,
    deleteDurationSlot: (slot: number) => void,
    updateDuration: (slot: number, value: number) => void
}

export interface VelocitySlice {
    velocities: number[],
    addVelocity: (slot : number, side : 'before' | 'after') => void,
    deleteVelocitySlot: (slot: number) => void,
    updateVelocity: (slot: number, value: number) => void
}

export interface HistoryEntry {
    description: string,
    pitches?: PitchSlice['pitches'],
    durations?: DurationSlice['durations'],
    velocities?: VelocitySlice['velocities'],
    bpm?: number,
    id? : string,
}

export interface HistorySlice {
    history: HistoryEntry[],
    addHistory: (entry : HistoryEntry) => void;
    undoHistory: () => void;
    undoHistoryById: (id : string|undefined) => void;
    reset: () => void;
    getjson: () => string;
}

export interface ThemeSlice {
    theme: string,
    setTheme: (theme: string) => void
}

export interface PlaybackSlice {
    bpm: number,
    setBpm: (bpm: number) => void
}

export type globalStoreType = PitchSlice &
        DurationSlice & VelocitySlice &
        HistorySlice & ThemeSlice & PlaybackSlice;

