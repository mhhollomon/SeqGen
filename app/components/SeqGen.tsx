import { useAtom } from "jotai";
import { useState } from "react";
import { durationSeqAtom, velocitySeqAtom } from "~/atoms";
import { cn } from "~/utils";
import { durationList } from "~/types/durations";
import DurationSelector from "~/components/durationSelector";
import { InfoTip } from "~/components/infoTip";
import VelocitySelector from "~/components/velocitySelector";
import PitchSelector from "~/components/pitchSelector";
import MidiDialog from "~/components/midiDialog";
import STORE from '~/globalStore';
import { useStore } from "zustand";

export type SeqGenProps = {
    className?: string
}

export default function SeqGen({ className }: SeqGenProps) {
    const pitches = useStore(STORE, (state) => state.pitches);
    const addPitch = useStore(STORE, (state) => state.addPitch);
    const removePitch = useStore(STORE, (state) => state.removePitch);
    const updatePitch = useStore(STORE, (state) => state.updatePitch);


    const [durations, setDurations] = useAtom(durationSeqAtom);
    const [velocity, setVelocity] = useAtom(velocitySeqAtom);

    const [showGenerateModal, setShowGenerateModal] = useState(false);


    function handleAddDuration() {
        console.log("add duration");
        const new_value = durations.at(-1);
        console.log(`new_value: ${new_value}`);
        setDurations([...durations, durations.at(-1) ?? 0]);
    }

    function handleRemoveDuration() {
        console.log("remove duration");
        if (durations.length <= 1) return;
        setDurations(durations.slice(0, -1));
    }

    function handleChangeDuration(slot: number, value: number) {
        console.log(`handleChangeDuration == key: ${slot}, value: ${value}`);
        const newDurations = durations.slice();
        newDurations[slot] = value;
        setDurations(newDurations);
    }

    function handleAddVelocity() {
        console.log("add velocity");
        setVelocity([...velocity, velocity.at(-1) ?? 100]);
    }

    function handleRemoveVelocity() {
        console.log("remove velocity");
        if (velocity.length <= 1) return;
        setVelocity(velocity.slice(0, -1));
    }

    function handleChangeVelocity(slot: number, value: number) {
        console.log(`handleChangeVelocity == slot: ${slot}, value: ${value}`);
        const newVelocity = velocity.slice();
        newVelocity[slot] = value;
        setVelocity(newVelocity);
    }

    function handleGenerate() {
        setShowGenerateModal(true);
    }


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
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleAddDuration}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleRemoveDuration}><i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
                <div style={label_grid_style}>
                    <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Velocity<InfoTip>Each box turns into a slider. Click to change the velocity.</InfoTip></div>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleAddVelocity}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleRemoveVelocity}><i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
            </div>

            <div  className="col flex-grow overflow-hidden pe-5">
                <div className="w-100 overflow-x-scroll mx-1 ps-1" style={grid_style}>
                    {pitches.map((pitch, index) => (
                        <PitchSelector key={`${index}-${pitch}`} slot={index} pitch={pitch} onChange={updatePitch} />
                    ))}


                    {durations.map((dur, index) => {
                        const dur_obj = durationList[dur];
                        return <DurationSelector key={`${index}-${dur}`} slot={index}
                                    list={durationList} value={dur_obj} onChange={handleChangeDuration} />
                    })}


                    {velocity.map((vel, index) => (
                        <VelocitySelector key={`${index}-${vel}`} slot={index} value={vel} onChange={handleChangeVelocity} />
                    ))}
                </div>



            </div>

            </section>

            <section className="ActionSection row mt-4">
                <div className="col">
                    <MidiDialog />
                </div>
            </section>


        </main>
    );


}
