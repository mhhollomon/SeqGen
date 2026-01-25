import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import { createDurationSlice } from '~/_globalStore/_durationSlice';
import { createPitchSlice } from '~/_globalStore/_pitchSlice';
import { createVelocitySlice } from '~/_globalStore/_velocitySlice';
import { createHistorySlice } from '~/_globalStore/_historySlice';
import { createThemeSlice } from '~/_globalStore/_themeSlice';
import { createPlaybackSlice } from '~/_globalStore/_playbackSlice';

import { type globalStoreType } from '~/_globalStore/_types';

const useGlobalStore = create<globalStoreType>()(
    persist((...a) => ({
        ...createPitchSlice(...a),
        ...createDurationSlice(...a),
        ...createVelocitySlice(...a),
        ...createHistorySlice(...a),
        ...createThemeSlice(...a),
        ...createPlaybackSlice(...a),
    }), {name : "seq-gen-data", version : 0})
);

export default useGlobalStore;
