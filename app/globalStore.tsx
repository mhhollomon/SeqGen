import { create } from 'zustand';
import { Pitch } from '~/types/pitch';

type State = {
    pitches : Pitch[],
}

type Action = {
    addPitch : () => void,
    removePitch : () => void,
    updatePitch : (slot : number, value : number) => void,
}

const STORE = create<State & Action>()((set) => ({
    pitches :  [new Pitch(64), new Pitch(62), new Pitch(60),
    new Pitch(62), new Pitch(64),
    new Pitch(64), new Pitch(64), new Pitch()],

    addPitch : () =>
        set((state) => {
            if (state.pitches.length === 0) {
                return { pitches: [new Pitch()] }
            }
            return { pitches: [...state.pitches, state.pitches[state.pitches.length-1].clone()] }
        }
    ),

    removePitch : () => set((state) => {
        if (state.pitches.length <= 1)
            return {};
        return {pitches: state.pitches.slice(0, state.pitches.length - 1)}
    }),

    updatePitch : (slot : number, value : number) => set((state) => {

        if (slot >= state.pitches.length) {
            throw new Error(`Pitch Slot ${slot} is out of range`);
        }
        const newPitches = state.pitches.slice();
        newPitches[slot] = new Pitch(value);
        return { pitches: newPitches }
    }),
}));

export default STORE;
