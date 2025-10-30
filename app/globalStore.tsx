import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { createPitchSlice } from '~/_globalStore/_pitchSlice';
import { type globalStoreType } from '~/_globalStore/_types';


const useGlobalStore = create<globalStoreType>()(
    persist((...a) => ({
        ...createPitchSlice(...a),
    }), {name : "sequence-data", version : 0})
);

export default useGlobalStore;
