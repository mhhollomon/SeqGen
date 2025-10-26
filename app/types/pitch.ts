
export type PitchValue = {
    midiValue : number;
    pitchClass: string;
    octave: number;
}

const REST = -10;
const PITCH_CLASSES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


export class Pitch implements PitchValue {
    midiValue: number = REST;
    pitchClass: string = "R";
    octave: number = 0;

    constructor(midiValue?: number, pitchClass?: string, octave?: number) {
        if (midiValue === undefined) {
            this.setToRest();
            return;
        } else if (pitchClass === undefined) {
            this.midiValue = midiValue;
            if (midiValue === REST) {
                this.pitchClass = "R";
                this.octave = 0;
                return;
            }
            this.pitchClass = PITCH_CLASSES[midiValue % 12];
            this.octave = Math.floor(midiValue / 12) - 1;
            return;
        }
        this.midiValue = midiValue;
        this.pitchClass = pitchClass;
        this.octave = octave ?? 4;
    }

    isRest() : boolean {
        return this.pitchClass === "R";
    }

    toString() : string {
        if (this.pitchClass === "R") return "R";
        return `${this.pitchClass}${this.octave}`;
    }

    setOctave(octave: number) : Pitch {
        const retval = new Pitch(this.midiValue, this.pitchClass, octave);
        retval.calculateMidiValue();
        return retval;
    }

    setPitchClass(pitchClass: string) : Pitch {
        if (pitchClass === "R") {
            console.log("-- setting to rest");
            return new Pitch(REST, "R", 0);
        }
        const retval = new Pitch(this.midiValue, pitchClass, this.octave);
        retval.calculateMidiValue();
        return retval;
    };

    private calculateMidiValue() {
        if (this.pitchClass === "R") {
            this.setToRest();
            return;
        }
        this.midiValue = (this.octave + 1) * 12 + PITCH_CLASSES.indexOf(this.pitchClass);
    };

    private setToRest() {
        this.midiValue = REST;
        this.pitchClass = "R";
        this.octave = 0;
    };
}
