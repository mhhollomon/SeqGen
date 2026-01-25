import { cn } from "~/utils";
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


    const label_grid_style = {
        display: 'grid',
        gridTemplateColumns: '8rem',
        gridTemplateRows: 'repeat(auto-fill, 4rem)',
        gridGap: '0.5rem',
        borderRight: '3px solid black',
        marginBottom: '1rem',
    };
    const grid_style = {
        display: 'grid',
        gridGap: '1rem 0.5rem',
        marginRight: '1rem',
        gridTemplateColumns: '0.5rem repeat(auto-fill, 5rem 0.5rem)',
        gridTemplateRows: '4rem 4rem 4rem 0.25rem',
    };

    const item_div_classes = "d-flex flex-column justify-content-center align-items-center";


    return (
        <main className={cn("container d-flex flex-column", className)}>
            <section className="SettingsSection row mt-4">
                <div className="col-3">
                    <History />
                </div>
                <div className="col-6 justify-content-center d-flex">
                    <ExportImport />
                </div>
                <div className="col-3">
                    <ResetButton />
                </div>
            </section>


            <section className="SequenceSection d-flex mt-4">
                {/* -- labels -- */}
                <div style={{ height: '16rem', width: '9rem' }}>
                    <div style={label_grid_style}>
                        <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Pitch<InfoTip>Each box is a selector. Click to change the pitch</InfoTip></div>
                    </div>
                    <div style={label_grid_style}>
                        <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Duration<InfoTip>Each box is a selector. Click to change the duration.</InfoTip></div>
                    </div>
                    <div style={label_grid_style}>
                        <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Velocity<InfoTip>Each box turns into a slider. Click to change the velocity.</InfoTip></div>
                    </div>
                </div>

                <div className="col flex-grow overflow-hidden pe-5">
                    <div className="w-100 overflow-x-scroll overflow-y-hidden mx-1 ps-1" style={grid_style}>
                        <div className="first-row align-content-center fade-in"
                            onClick={x => addPitch(0, 'before')}>+</div>
                        {pitches.map((pitch, index) => {
                            const pitchObj = new Pitch(pitch);
                            const classes = cn(item_div_classes, "first-row", highlightSlot(index, pitches.length) ? 'highlighted' : '');
                            return <>
                                <div key={`${index}-${pitchObj.midiValue}`} className={classes}>
                                    <PitchSelector key={`${index}-${pitchObj.midiValue}`} slot={index} pitch={pitchObj}
                                        onChange={updatePitch} />
                                </div>
                                <div className="first-row align-content-center fade-in"
                                    onClick={x => addPitch(index, 'after')}>+</div>
                            </>
                        })}


                        <div className="second-row align-content-center fade-in"
                            onClick={x => addDuration(0, 'before')}>+</div>
                        {durations.map((dur, dur_index) => {
                            const dur_obj = durationList[dur];
                            const classes = cn(item_div_classes, "second-row", highlightSlot(dur_index, durations.length) ? 'highlighted' : '');
                            return <>
                            <div key={`${dur_index}-${dur}`} className={classes}>
                                <DurationSelector key={`${dur_index}-${dur}`} slot={dur_index}
                                    list={durationList} value={dur_obj} onChange={updateDuration} />
                            </div>
                            <div className="second-row align-content-center fade-in"
                                onClick={x => addDuration(dur_index, 'after')}>+</div>
                            </>

                        })}

                        <div role="button" className="third-row align-content-center fade-in"
                            onClick={x => addVelocity(0, 'before')}>+</div>
                        {velocities.map((vel, vel_index) => {
                            const classes = cn(item_div_classes, "third-row", highlightSlot(vel_index, velocities.length) ? 'highlighted' : '');
                            return <>
                                <div key={`${vel_index}-${vel}`} className={classes}>
                                    <VelocitySelector key={`${vel_index}-${vel}`} slot={vel_index} value={vel}
                                        onChange={updateVelocity} />
                                </div>
                                <div role="button" className="third-row align-content-center justify-items-center fade-in"
                                    onClick={x => addVelocity(vel_index, 'after')}>+</div>


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
