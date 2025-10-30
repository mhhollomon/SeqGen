import { cn } from "~/utils";
import { durationList } from "~/types/durations";
import DurationSelector from "~/components/durationSelector";
import { InfoTip } from "~/components/infoTip";
import VelocitySelector from "~/components/velocitySelector";
import PitchSelector from "~/components/pitchSelector";
import GenerateMidiDialog from "~/components/generateMidiDialog";
import useGlobalStore from '~/globalStore';
import { Pitch } from "~/types/pitch";
import History from "~/components/history";

export type SeqGenProps = {
    className?: string
}

export default function SeqGen({ className }: SeqGenProps) {
    const pitches = useGlobalStore((state) => state.pitches);
    const addPitch = useGlobalStore((state) => state.addPitch);
    const removePitch = useGlobalStore((state) => state.removePitch);
    const updatePitch = useGlobalStore((state) => state.updatePitch);

    const durations = useGlobalStore((state) => state.durations);
    const addDuration = useGlobalStore((state) => state.addDuration);
    const removeDuration = useGlobalStore((state) => state.removeDuration);
    const updateDuration = useGlobalStore((state) => state.updateDuration);

    const velocities = useGlobalStore((state) => state.velocities);
    const addVelocity = useGlobalStore((state) => state.addVelocity);
    const removeVelocity = useGlobalStore((state) => state.removeVelocity);
    const updateVelocity = useGlobalStore((state) => state.updateVelocity);


    const label_grid_style = { display: 'grid',
        gridTemplateColumns: '8rem 1.5rem',
        gridTemplateRows: 'repeat(auto-fill, 4rem)',
        gridGap: '0.5rem',
        borderRight : '3px solid black',
        marginBottom: '1rem',
    };
    const grid_style = {
        display: 'grid',
        gridGap: '1rem',
        marginRight: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, 5rem)',
        gridTemplateRows: 'repeat(auto-fill, 4rem)',
    };


    return (
        <main className={cn("container d-flex flex-column", className)}>
            <section className="SettingsSection row mt-4">
                <div className="col">
                    <History />
                </div>
            </section>


            <section className="SequenceSection d-flex">
            {/* -- labels -- */}
            <div  style={{height: '16rem', width: '11rem'}}>
                <div style={label_grid_style}>
                    <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Pitch<InfoTip>Each box is a selector. Click to change the pitch</InfoTip></div>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-tiny px-0" onClick={addPitch}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={removePitch}><i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
                <div style={label_grid_style}>
                    <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Duration<InfoTip>Each box is a selector. Click to change the duration.</InfoTip></div>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-tiny px-0" onClick={addDuration}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={removeDuration}><i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
                <div style={label_grid_style}>
                    <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Velocity<InfoTip>Each box turns into a slider. Click to change the velocity.</InfoTip></div>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-tiny px-0" onClick={addVelocity}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={removeVelocity}><i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
            </div>

            <div  className="col flex-grow overflow-hidden pe-5">
                <div className="w-100 overflow-x-scroll mx-1 ps-1" style={grid_style}>
                    {pitches.map((pitch, index) =>{
                        const pitchObj = new Pitch(pitch);
                        return (
                        <PitchSelector key={`${index}-${pitchObj.midiValue}`} slot={index} pitch={pitchObj} onChange={updatePitch} />
                    )})}


                    {durations.map((dur, index) => {
                        const dur_obj = durationList[dur];
                        return <DurationSelector key={`${index}-${dur}`} slot={index}
                                    list={durationList} value={dur_obj} onChange={updateDuration} />
                    })}


                    {velocities.map((vel, index) => (
                        <VelocitySelector key={`${index}-${vel}`} slot={index} value={vel} onChange={updateVelocity} />
                    ))}
                </div>



            </div>

            </section>

            <section className="ActionSection row mt-4">
                <div className="col">
                    <GenerateMidiDialog />
                </div>
            </section>


        </main>
    );


}
