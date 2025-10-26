import MidiWriter from 'midi-writer-js';
import { sleep } from 'radashi';
import { Pitch } from "~/types/pitch";

export function generateMidi(pitches : Pitch[], durations : number[], velocities : number[], bpm : number) : string {

    console.log(`pitches : ${pitches.length}, durations : ${durations.length}, velocities : ${velocities.length} bpm : ${bpm}`);
    console.log(`durations: ${JSON.stringify(durations)}`);
    const track = new MidiWriter.Track();
    track.setTempo(bpm);
    track.setTimeSignature(4, 4, 24, 8);

    let index = 0;
    let pitchIndex = 0;
    let durationIndex = 0;
    let velocityIndex = 0;
    let keepGoing = true;
    let restDuration : number = 0;

    function updateIndex() {
        index++;
        pitchIndex = index % pitches.length;
        durationIndex = index % durations.length;
        velocityIndex = index % velocities.length;

        if (pitchIndex === 0 && durationIndex === 0 && velocityIndex === 0) {
            console.log("setting keepGoing to false - all indices are 0");
            keepGoing = false;
        }

        if (index > 500) {
            console.log("setting keepGoing to false - index > 500");
            keepGoing = false;
            sleep(1000);
        }

    }

    while (keepGoing) {

        console.log(`index: ${index}, pitchIndex: ${pitchIndex}, durationIndex: ${durationIndex}, velocityIndex: ${velocityIndex}`);

        const pitch = pitches[pitchIndex];

        // 16th note is currently our foundation. So need to multiply by 32
        // to get to ticks (128/beat)
        const durationTicks = Math.trunc(durations[durationIndex] * 32);

        if (pitch.isRest()) {
            restDuration += durationTicks;
            updateIndex();
            continue;
        }

        const midiPitch = pitch.midiValue;
        //I use the MIDI range of 0-127. The write uses 0-100 so need to convert.
        const velocity = velocities[velocityIndex]*100/127;

        let waitProp = {};
        if (restDuration > 0) {
            waitProp = {wait : 'T' + String(restDuration)};
            restDuration = 0;
        }

        console.log(`midiPitch: ${midiPitch}, velocity: ${velocity}, durationTicks: ${durationTicks}, waitProp: ${JSON.stringify(waitProp)}`);

        track.addEvent(new MidiWriter.NoteEvent({
                pitch : midiPitch,
                velocity : velocity,
                duration : 'T' + String(durationTicks),
                sequential : true,
                ...waitProp,
            }));

        updateIndex();
    }

    return (new MidiWriter.Writer(track)).dataUri();

}
