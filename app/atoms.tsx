import { atom } from "jotai";

import { durationList } from "~/types/durations";

// ---- THEME SUPPORT ----
export const themes = ["light", "dark"];

export const themeIndexAtom = atom(0);

export const themeAtom = atom(
    (get) => themes[get(themeIndexAtom)],
);

// --- SEQUENCE SUPPORT ---


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
