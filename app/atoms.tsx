import { atom } from "jotai";
import { midiNoteToString } from "~/utils";

import { durationList } from "~/durations";

// ---- THEME SUPPORT ----
export const themes = ["light", "dark"];

export const themeIndexAtom = atom(0);

export const themeAtom = atom(
    (get) => themes[get(themeIndexAtom)],
);

// --- SEQUENCE SUPPORT ---

// ---------- PITCH ------------ //
// Midi note number
export const pitchNumberSeqAtom = atom<number[]>([64, 62, 60, 62, 64, 64, 64, 200]);
// Read only Name
export const pitchNameSeqAtom = atom<string[]>(
    (get) => get(pitchNumberSeqAtom).map(midiNoteToString)
);
// Read only length
export const pitchSeqCountAtom = atom<number>(
    (get) => get(pitchNumberSeqAtom).length
);

// ---------- DURATION ------------ //
export const durationSeqAtom = atom<number[]>([1, 1, 1, 1, 1, 1, 1, 1]);

export const durationSeqNameAtom = atom<string[]>(
    (get) => get(durationSeqAtom).map((d) => durationList[d].name)
)
export const durationSeqCountAtom = atom<number>(
    (get) => get(durationSeqAtom).length
)

// ---------- VELOCITY ------------ //
export const velocitySeqAtom = atom<number[]>([100, 100, 100, 100, 100, 100, 100, 100]);
export const velocitySeqCountAtom = atom<number>(
    (get) => get(velocitySeqAtom).length
)
