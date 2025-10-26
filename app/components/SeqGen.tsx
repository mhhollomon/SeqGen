import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { durationSeqAtom, pitchNameSeqAtom, pitchNumberSeqAtom, velocitySeqAtom } from "~/atoms";
import { cn, midiStringToNote } from "~/utils";
import { Dialog } from "radix-ui";
import { durationList, type Duration } from "~/durations";
import DurationSelector from "~/components/durationSelector";
import { InfoTip } from "~/components/infoTip";
import VelocitySelector from "~/components/velocitySelector";


export type SeqGenProps = {
    className?: string
}

export default function SeqGen({ className }: SeqGenProps) {
    const pitchNames = useAtomValue(pitchNameSeqAtom);
    const [pitchNumbers, setPitchNumbers] = useAtom(pitchNumberSeqAtom);
    const [durations, setDurations] = useAtom(durationSeqAtom);
    const [velocity, setVelocity] = useAtom(velocitySeqAtom);

    const [showGenerateModal, setShowGenerateModal] = useState(false);

    function handleAddPitch() {
        console.log("add pitch");
        setPitchNumbers([...pitchNumbers, 200]);
    }

    function handleRemovePitch() {
        console.log("remove pitch");
        if (pitchNumbers.length <= 1) return;
        setPitchNumbers(pitchNumbers.slice(0, pitchNumbers.length - 1));
    }

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
        setVelocity([...velocity, velocity[-1]]);
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

    function handleChangePitch(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
        console.log("-- called");
        if (! ["Enter", "Tab"].includes(event.key) ) {
            return;
        }
        const pitch = event.currentTarget.value;
        console.log(`index: ${index}, pitch: ${pitch}`);
        const pitchNumber = midiStringToNote(pitch);
        if (pitchNumber >= 0) {
            console.log(`pitchNumber: ${pitchNumber}`);
            const newPitches = pitchNumbers.slice();
            newPitches[index] = pitchNumber;
            console.log(`newPitches: ${newPitches}`);
            setPitchNumbers(newPitches);
        }
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
        gridGap: '0.5rem',
        marginRight: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, 5rem)',
        gridTemplateRows: 'repeat(auto-fill, 4rem)',
    };


    return (
        <main className={cn("container d-flex", className)}>
            {/* -- labels -- */}
            <div  style={{height: '16rem', width: '11rem'}}>
                <div style={label_grid_style}>
                    <div className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Pitch<InfoTip>Use the arrow keys to select a pitch</InfoTip></div>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleAddPitch}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-tiny px-0" onClick={handleRemovePitch}><i className="bi bi-caret-down"></i></button>
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
                    {pitchNames.map((pitchName, index) => (
                        <input type="text" onKeyDown={(e) => handleChangePitch(e, index)}
                        key={`${index}-${pitchName}`}
                        className="p-2 border rounded middle-of-row w-5rem"
                        title="R for rest or a pitch and octave - C4 is middle C"
                        pattern="R|([A-Ga-g](b|#)?(-1|0|1|2|3|4))"
                        defaultValue={pitchName} />
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


        </main>
    );



/*     return (
        <main className={cn("container", className)}>
            <div className="container overflow-x-scroll mx-1">
                <div className="gap-2 align-items-center" style={{ display: 'grid', gridTemplateColumns: '6em 2em repeat(auto-fill, minmax(5em, 1fr))' }}>
                    <p className="p-0 m-0 fs-4 fw-bold text-end">Pitch</p>
                    <div className="d-flex flex-column justify-content-center px-0">
                        <button className="btn btn-primary btn-sm" onClick={handleAddPitch}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-sm" onClick={handleRemovePitch}><i className="bi bi-caret-down"></i></button>
                    </div>
                    {pitchNames.map((pitchName, index) => (
                        <input type="text" onKeyDown={(e) => handleChangePitch(e, index)}
                        key={`${index}-${pitchName}`}
                        className="p-2 border rounded"
                        title="R for rest or a pitch and octave - C4 is middle C"
                        pattern="R|([A-Ga-g](b|#)?(-1|0|1|2|3|4))"
                        defaultValue={pitchName} />
                    ))}

                </div>
                <div className="gap-2 align-items-center" style={{ display: 'grid', gridTemplateColumns: '6em 2em repeat(auto-fill, minmax(5em, 1fr))' }}>
                    <p className="p-0 m-0 fs-4 fw-bold text-end">Duration</p>
                    <div className="d-flex flex-column justify-content-center px-0 pt-2">
                        <button className="btn btn-primary btn-sm" onClick={handleAddDuration}><i className="bi bi-caret-up"></i></button>
                        <button className="btn btn-primary btn-sm" onClick={handleRemoveDuration}><i className="bi bi-caret-down"></i></button>
                    </div>
                    {durations.map((dur, index) => (
                        <div key={`${index}-${dur}`} className="p-2 border rounded">{dur}</div>
                    ))}

                </div>
            </div>

            <div className={cn(className, "container align-items-center d-flex")} >
                <div className="row col-3">
                    <div style={label_grid_style}>
                        <p className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Duration</p>
                        <div className="d-flex flex-column justify-content-center px-0 pt-2">
                            <button className="btn btn-primary btn-sm" onClick={handleAddDuration}><i className="bi bi-caret-up"></i></button>
                            <button className="btn btn-primary btn-sm" onClick={handleRemoveDuration}><i className="bi bi-caret-down"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row col-3">
                    <div style={label_grid_style}>
                        <p className="p-0 m-0 fs-4 fw-bold align-content-center text-end pe-1">Duration</p>
                        <div className="d-flex flex-column justify-content-center px-0 pt-2">
                            <button className="btn btn-primary btn-sm" onClick={handleAddDuration}><i className="bi bi-caret-up"></i></button>
                            <button className="btn btn-primary btn-sm" onClick={handleRemoveDuration}><i className="bi bi-caret-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <Dialog.Root open={showGenerateModal} onOpenChange={() => { setShowGenerateModal(!showGenerateModal) }}>
                        <Dialog.Trigger asChild >
                            <button className="btn btn-primary" onClick={handleGenerate}>Generate</button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="align-content-center justify-content-center border dialog-content" >
                                <Dialog.Title>Generated Sequence</Dialog.Title>
                                <Dialog.Description>
                                    <p>{pitchNumbers.join(", ")}</p>
                                    <p>{durations.join(", ")}</p>
                                </Dialog.Description>
                                <Dialog.Close asChild>
                                    <button className="btn btn-primary float-end" aria-label="Close">Close</button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                </div>
            </div>
        </main>
    );
 */

}
