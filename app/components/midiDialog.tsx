import { useAtomValue } from "jotai";
import { Dialog } from "radix-ui";
import { useRef, useState } from "react";
import { durationSeqAtom, velocitySeqAtom } from "~/atoms";
import { generateMidi } from "~/midifile";
import { durationList } from "~/types/durations";
import  STORE from "~/globalStore";

export default function MidiDialog() {

    const pitches = STORE((state) => state.pitches);
    const durations = useAtomValue(durationSeqAtom);
    const velocity = useAtomValue(velocitySeqAtom);

    const nameRef = useRef<HTMLInputElement>(null);

    const [bpm, setBpm] = useState(120);

    function generateFile() {
        const durationValues = durations.map((d) => durationList[d].value);
        const midi = generateMidi(pitches, durationValues, velocity, bpm);
        const fileName = nameRef.current?.value ?? "my_midi.mid";
        const link = document.createElement("a");
        link.href = midi;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(midi);
    }

    return (<>
        <Dialog.Root >
            <Dialog.Trigger asChild >
                <button className="btn btn-primary" >Generate</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="align-content-center justify-content-center border dialog-content" >
                    <Dialog.Title>Generate Midi</Dialog.Title>
                    <Dialog.Description asChild>
                        <div>
                        <form>
                        <label htmlFor="midiName" className="form-label pb-0 mb-0">File Name</label>
                        <input id="midiName" type="text" className="form-control" defaultValue="my_midi.mid" ref={nameRef} />
                        <label htmlFor="midiBPM" className="form-label pb-0 mb-0 mt-2">BPM</label>
                        <input id="midiBPM" type="number" className="form-control" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} />
                        </form>
                        </div>
                    </Dialog.Description>
                    <hr/>

                    <button className="btn btn-primary" aria-label="Generate" onClick={generateFile}>Generate</button>
                    <Dialog.Close asChild>
                        <button className="btn btn-secondary float-end" aria-label="Close">Close</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    </>);
}
