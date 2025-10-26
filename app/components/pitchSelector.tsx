import { Popover } from "radix-ui";
import { useState } from "react";
import type { Pitch } from "~/types/pitch";

export type PitchSelectorProps = {
    slot: number;
    pitch: Pitch;
    onChange: (slot: number, value: number) => void;
}

export default function PitchSelector({ slot, pitch, onChange }: PitchSelectorProps) {
    const [localValue, setLocalValue] = useState(pitch);
    const [show, setShow] = useState(false);

    function closeAndCommit() {
        onChange(slot, localValue.midiValue);
        setShow(false);
    }

    function handleOctaveChange(value: number) {
        console.log(`handleOctaveChange == value: ${value}`);
        const newPitch = localValue.setOctave(value);
        console.log(`octave newPitch: ${JSON.stringify(newPitch)}`);
        setLocalValue(newPitch);
    }

    function handlePitchChange(value: string) {
        console.log(`handlePitchChange == value: ${value}`);
        const newPitch = localValue.setPitchClass(value);
        console.log(`pitchClass newPitch: ${JSON.stringify(newPitch)}`);
        setLocalValue(newPitch);
    }

    return (
        <Popover.Root modal={true} open={show} onOpenChange={setShow}>
            <Popover.Trigger asChild>
                <button className="btn-bg p-2 border rounded middle-of-row" aria-label="Select pitch">
                    {pitch.toString()}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <p className="Text" style={{ marginBottom: 10 }}>
                            Select Pitch
                        </p>
                        <form>
                            <label htmlFor="pitch" className="form-label pe-2">Pitch</label>
                            <input id="pitch" type="text" readOnly value={localValue.toString()} />
                        </form>
                        <OctaveSelector value={localValue.octave} onValueChange={handleOctaveChange}/>
                        <table className="p-2">
                            <tbody>
                            <tr>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("C")}>C</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("C#")}>C#</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("D")}>D</button></td>
                            </tr>
                            <tr>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("D#")}>D#</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("E")}>E</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("F")}>F</button></td>
                            </tr>
                            <tr>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("F#")}>F#</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("G")}>G</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("G#")}>G#</button></td>
                            </tr>
                            <tr>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("A")}>A</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("A#")}>A#</button></td>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("B")}>B</button></td>
                            </tr>
                            <tr>
                                <td><button className="btn-bg p-2 border rounded middle-of-row" onClick={() => handlePitchChange("R")}>Rest</button></td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                    <hr/>
                    <button className="btn btn-success" onClick={closeAndCommit}>Ok</button>
                    <button className="btn btn-danger float-end" onClick={() => setShow(false)}>Cancel</button>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

export type OctaveSelectorProps = {
    value: number;
    onValueChange: (value: number) => void
}
export function OctaveSelector({value, onValueChange}: OctaveSelectorProps) {
    return (<>
        <form>
        <label htmlFor="octave" className="form-label pe-2">Octave</label>
        <select id="octave" value={value} onChange={(e) => onValueChange(Number(e.target.value))}>
            <option value="-1">-1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
        </form>
    </>);
}
