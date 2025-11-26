import { type globalStoreType, type VelocitySlice } from "./_types";
import { type StateCreator } from "zustand";

export const createVelocitySlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], VelocitySlice> = (set, get) => ({

    velocities: [
        100, 100, 100, 100, 100, 100, 100, 100
    ],
    addVelocity: (slot : number, side : 'before' | 'after') => {
        if (slot < 0 || slot >= get().velocities.length) {
            throw new Error(`Velocity Slot ${slot} is out of range`);
        }
        const newItem =  get().velocities[slot];
        let newValues : number[];
        if (side === 'before') {
            if (slot === 0) {
                newValues = [newItem, ...get().velocities];
            } else {
                newValues = [ ...get().velocities.slice(0, slot), newItem, ...get().velocities.slice(slot)]
            }
        } else {
            if (slot === get().velocities.length - 1) {
                newValues = [ ...get().velocities, newItem];
            } else {
                newValues = [ ...get().velocities.slice(0, slot + 1), newItem, ...get().velocities.slice(slot + 1)]
            }
        }
        get().addHistory({ description: `Added Velocity ${side} slot ${slot}`, velocities: get().velocities });
        set((state) => ({ velocities: newValues }));
    },
    deleteVelocitySlot: (slot : number) => {
        if (slot < 0 || slot >= get().velocities.length) {
            throw new Error(`Velocity Slot ${slot} is out of range`);
        }
        get().addHistory({ description: `Deleted Velocity for slot ${slot}`, velocities: get().velocities });
        set((state) => {
            const newVelocities = state.velocities.slice();
            newVelocities.splice(slot, 1);
            return { velocities: newVelocities };
        });
    },
    updateVelocity: (slot, value) => {
        get().addHistory({ description: `Updated Velocity for slot ${slot}`, velocities: get().velocities });
        if (slot < 0 || slot >= get().velocities.length) {
            throw new Error(`Velocity Slot ${slot} is out of range`);
        }
        set((state) => {
            const newVelocities = state.velocities.slice();
            newVelocities[slot] = value;
            return { velocities: newVelocities };
        });

    },
});
