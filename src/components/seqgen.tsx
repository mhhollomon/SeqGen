import { cn } from "~/utils";
import './seqgen.css';
import { durationList } from "~/types/durations";
import DurationSelector from "~/components/durationSelector";
import { InfoTip } from "~/components/infoTip";
import VelocitySelector from "~/components/velocity/velocitySelector";
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

    const playIndex = useAtomValue(indexAtom);
    const playing = useAtomValue(playingAtom);

    function highlightSlot(slot: number, length: number) {
        return playing && playIndex % length === slot;
    }

    /*
     * LAYOUT
     * 1. Settings - Grid (one row, 3 columns)
     *    1.1 History
     *    1.2 Export/Import
     *    1.3 Reset
     * 2. Tracks - Flexbox (one row, 2 columns)
     *    2.1 Labels - Grid (3 rows, 1 column)
     *    2.2 Tracks - Grid (3 rows, 1 column)
     *        2.2.1 Pitch Row - Flexbox (1 row, n columns)
     *        2.2.2 Duration Row - Flexbox (1 row, n columns)
     *        2.2.3 Velocity Row - Flexbox (1 row, n columns)
     * 3. Player
     *
     *
     *
     *
     *
     */

    return (
        <main className={cn("seqgen-ui", className)}>
            <section className="seqgen-ui__settings">
                <History />
                <ExportImport />
                <div className="seqgen-ui__reset">
                    <ResetButton />
                </div>
            </section>


            <section className="seqgen-ui__tracks">
                {/* -- labels -- */}
                <div className="seqgen_ui__track-label-grid">
                    <div className="seqgen-ui__track-label">Pitch</div>
                    <div className="seqgen-ui__track-label">Duration</div>
                    <div className="seqgen-ui__track-label">Velocity</div>
                </div>

                <div className="seqgen-ui__track">
                    <div className="seqgen-ui__track-grid">
                        <div className="first-row align-content-center fade-in"
                            onClick={() => addPitch(0, 'before')}>+</div>
                        {pitches.map((pitch, index) => {
                            const pitchObj = new Pitch(pitch);
                            const classes = cn("x", "first-row", highlightSlot(index, pitches.length) ? 'highlighted' : '');
                            return <>
                                <div key={`${index}-${pitchObj.midiValue}`} className={classes}>
                                    <PitchSelector key={`${index}-${pitchObj.midiValue}`} slot={index} pitch={pitchObj}
                                        onChange={updatePitch} />
                                </div>
                                <div className="first-row align-content-center fade-in"
                                    onClick={() => addPitch(index, 'after')}>+</div>
                            </>
                        })}


                        <div className="second-row align-content-center fade-in"
                            onClick={() => addDuration(0, 'before')}>+</div>
                        {durations.map((dur, dur_index) => {
                            const dur_obj = durationList[dur];
                            const classes = cn("x", "second-row", highlightSlot(dur_index, durations.length) ? 'highlighted' : '');
                            return <>
                            <div key={`${dur_index}-${dur}`} className={classes}>
                                <DurationSelector key={`${dur_index}-${dur}`} slot={dur_index}
                                    list={durationList} value={dur_obj} onChange={updateDuration} />
                            </div>
                            <div className="second-row align-content-center fade-in"
                                onClick={() => addDuration(dur_index, 'after')}>+</div>
                            </>

                        })}

                        <div role="button" className="third-row align-content-center fade-in"
                            onClick={() => addVelocity(0, 'before')}>+</div>
                        {velocities.map((vel, vel_index) => {
                            const classes = cn("x", "third-row", highlightSlot(vel_index, velocities.length) ? 'highlighted' : '');
                            return <>
                                <div key={`${vel_index}-${vel}`} className={classes}>
                                    <VelocitySelector key={`${vel_index}-${vel}`} slot={vel_index} value={vel}
                                        onChange={updateVelocity} />
                                </div>
                                <div role="button" className="third-row align-content-center justify-items-center fade-in"
                                    onClick={() => addVelocity(vel_index, 'after')}>+</div>


                            </>
                        })}
                    </div>



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
