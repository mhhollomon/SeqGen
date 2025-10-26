import { atom } from "jotai";
import { Pitch } from "~/types/pitch";
import { midiNoteToString } from "~/utils";

import { durationList } from "~/types/durations";

// ---- THEME SUPPORT ----
export const themes = ["light", "dark"];

export const themeIndexAtom = atom(0);

export const themeAtom = atom(
    (get) => themes[get(themeIndexAtom)],
);

// --- SEQUENCE SUPPORT ---

// ---------- PITCH ------------ //
// Midi note number
export const pitchSeqAtom = atom<Pitch[]>([
    new Pitch(64), new Pitch(62), new Pitch(60),
    new Pitch(62), new Pitch(64),
    new Pitch(64), new Pitch(64), new Pitch()]);
// Read only Name
export const pitchNameSeqAtom = atom<string[]>(
    (get) => get(pitchSeqAtom).map((p) => p.toString())
);
// Read only length
export const pitchSeqCountAtom = atom<number>(
    (get) => get(pitchSeqAtom).length
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
