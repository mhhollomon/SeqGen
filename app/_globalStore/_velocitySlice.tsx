import { type globalStoreType, type VelocitySlice } from "./_types";
import { type StateCreator } from "zustand";

export const createVelocitySlice: StateCreator<globalStoreType,
    [['zustand/persist', unknown]], [], VelocitySlice> = (set, get) => ({

    velocities: [
        100, 100, 100, 100, 100, 100, 100, 100
    ],
    addVelocity: () => {
        get().addHistory({ description: "Added Velocity", velocities: get().velocities });
        set((state) => ({ velocities: [...state.velocities, state.velocities[state.velocities.length - 1] ] }));
    },
    removeVelocity: () => {
        get().addHistory({ description: "Removed Velocity", velocities: get().velocities });
        set((state) => ({ velocities: state.velocities.slice(0, state.velocities.length - 1) }));
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
