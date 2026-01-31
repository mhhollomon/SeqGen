import { cn } from "~/utils";
import './seqgen.css';
import { durationList } from "~/types/durations";
import DurationSelector from "~/components/durationSelector";
// import { InfoTip } from "~/components/infoTip";
import VelocitySelector from "~/components/velocitySelector";
import PitchSelector from "~/components/pitchSelector";
import GenerateMidiDialog from "~/components/generateMidiDialog";
import useGlobalStore from '~/globalStore';
import { Pitch } from "~/types/pitch";
import History from "~/components/history";
import Player from "~/components/player";
import { indexAtom, playingAtom } from "~/atoms";
import { useAtomValue } from "jotai";
import ResetButton from "~/components/ResetButton";
import ExportImport from "~/components/exportImport";

export type SeqGenProps = {
    className?: string
}

export default function SeqGen({ className }: SeqGenProps) {

    const { pitches, addPitch, updatePitch } = useGlobalStore();
    const { durations, addDuration, updateDuration } = useGlobalStore();
    const { velocities, addVelocity, updateVelocity } = useGlobalStore();
    const { deletePitchSlot, deleteDurationSlot, deleteVelocitySlot } = useGlobalStore();

    const playIndex = useAtomValue(indexAtom);
    const playing = useAtomValue(playingAtom);

    function highlightSlot(slot: number, length: number) {
        return playing && playIndex % length === slot;
    }

    /*
     * LAYOUT
     * 1. Top Actions (section)- Grid (one row, 3 columns)
     *    1.1 History
     *    1.2 Export/Import
     *    1.3 Reset
     * 2. Lanes - Flexbox (one row, 2 columns)
     *    2.1 Labels - Grid (3 rows, 1 column)
     *    2.2 Tracks - Grid (3 rows, n column)
     *        2.2.1 Pitch Row  (1st row, n columns)
     *        2.2.2 Duration Row  (2nd row, n columns)
     *        2.2.3 Velocity Row  (3rd row, n columns)
     * 3. Player
     *
     *
     *
     *
     *
     */

    return (
        <main className={cn("seqgen-ui", className)}>
            <section className="top-actions">
                <History />
                <ExportImport />
                <ResetButton className="top-actions__reset" />
            </section>


            <section className="lanes">
                {/* -- labels -- */}
                <div className="lanes__label-wrapper">
                    <div className="lanes__label">Pitch</div>
                    <div className="lanes__label">Duration</div>
                    <div className="lanes__label">Velocity</div>
                </div>

                <div className="lanes__tracks-wrapper">

                    {/* PITCH LANE */}

                    {/* Add value to the start of the pitch lane */}
                    <div className="lanes__add-value pitch-lane lanes__add-value--first"
                        onClick={() => addPitch(0, 'before')}>+</div>

                    {pitches.map((pitch, index) => {
                        const pitchObj = new Pitch(pitch);
                        const classes = cn("lanes__value", "pitch-lane", highlightSlot(index, pitches.length) ? 'highlighted' : '');
                        return <>
                            <div key={`${index}-${pitchObj.midiValue}`} className={classes}>
                                {/* pitch */}
                                <PitchSelector key={`${index}-${pitchObj.midiValue}`} slot={index} pitch={pitchObj}
                                    className="value-place" onChange={updatePitch} />

                                {/* remove current slot */}
                                <a role="button" aria-label="Remove current pitch slot" className="remove-button remove-value-place"
                                    onClick={() => deletePitchSlot(index)}>&mdash;</a>

                                {/* Add new slot to right */}
                                <div className="lanes__add-value add-value-place"
                                    onClick={() => addPitch(index, 'after')}>+</div>
                            </div>
                        </>
                    })}


                    {/* DURATION LANE */}

                    {/* Add value to the start of the duration lane */}
                    <div className="lanes__add-value duration-lane lanes__add-value--first"
                        onClick={() => addDuration(0, 'before')}>+</div>

                    {durations.map((dur, index) => {
                        const dur_obj = durationList[dur];
                        const classes = cn("lanes__value", "duration-lane", highlightSlot(index, durations.length) ? 'highlighted' : '');
                        return <>
                            <div key={`${index}-${dur}`} className={classes}>

                                {/* duration */}
                                <DurationSelector key={`${index}-${dur}`} slot={index}
                                    className="value-place"
                                    list={durationList} value={dur_obj} onChange={updateDuration} />

                                {/* remove current slot */}
                                <a role="button" aria-label="Remove current duration slot" className="remove-button remove-value-place"
                                    onClick={() => deleteDurationSlot(index)}>&mdash;</a>

                                {/* Add new slot to right */}
                                <div className="lanes__add-value add-value-place"
                                    onClick={() => addDuration(index, 'after')}>+</div>

                            </div>
                        </>

                    })}


                    {/* VELOCITY LANE */}

                    {/* Add value to the start of the velocity lane */}
                    <div role="button" className="lanes__add-value velocity-lane lanes__add-value--first"
                        onClick={() => addVelocity(0, 'before')}>+</div>

                    {velocities.map((vel, index) => {
                        const classes = cn("lanes__value", "velocity-lane", highlightSlot(index, velocities.length) ? 'highlighted' : '');
                        return <>
                            <div key={`${index}-${vel}`} className={classes}>
                                <VelocitySelector key={`${index}-${vel}`} slot={index} value={vel}
                                    className="value-place"
                                    onChange={updateVelocity} />

                                {/* remove current slot */}
                                <a role="button" aria-label="Remove current velocity slot" className="remove-button remove-value-place"
                                    onClick={() => deleteVelocitySlot(index)}>&mdash;</a>

                                {/* Add new slot to right */}
                                <div className="lanes__add-value add-value-place"
                                    onClick={() => addVelocity(index, 'after')}>+</div>
                            </div>

                        </>
                    })}
                </div>

            </section>

            <section className="ActionSection row mt-4 d-flex w-100">
                <div className="col-2">
                    <GenerateMidiDialog />
                </div>
                <div className="col-4">
                    <Player />
                </div>
            </section>


        </main>
    );


}
