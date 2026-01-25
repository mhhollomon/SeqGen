
export type PitchValue = {
    midiValue: number;
    pitchClass: string;
    octave: number;
}

const REST = -10;
const PITCH_CLASSES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


export class Pitch implements PitchValue {
    midiValue: number = REST;
    pitchClass: string = "R";
    octave: number = 0;

    constructor(midiValue?: number | PitchValue, pitchClass?: string, octave?: number) {
        if (midiValue === undefined) {
            this.setToRest();
            return;
        } else if (typeof midiValue === "object") {
            this.midiValue = midiValue.midiValue;
            this.pitchClass = midiValue.pitchClass;
            this.octave = midiValue.octave;
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
    clone(): Pitch {
        console.log(`clone: ${JSON.stringify(this)}`);
        return new Pitch(this.midiValue, this.pitchClass, this.octave);
    }

    isRest(): boolean {
        return this.pitchClass === "R";
    }

    toString(): string {
        if (this.pitchClass === "R") return "R";
        return `${this.pitchClass}${this.octave}`;
    }

    setOctave(octave: number): Pitch {
        const retval = new Pitch(this.midiValue, this.pitchClass, octave);
        retval.calculateMidiValue();
        return retval;
    }

    setPitchClass(pitchClass: string): Pitch {
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

export const PitchFrequencyMap: { [index: string]: number[] } = {
    'B#':  [8.18, 16.35, 32.70, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186], //0
    'C':   [8.18, 16.35, 32.70, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186], //0
    'C#':  [8.66, 17.32, 34.65, 69.3, 138.6, 277.2, 554.4, 1109, 2217, 4435],  //1
    'Db':  [8.66, 17.32, 34.65, 69.3, 138.6, 277.2, 554.4, 1109, 2217, 4435],  //1
    'Cx':  [9.18, 18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699], //2
    'D':   [9.18, 18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699],  //2
    'Ebb': [9.18, 18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699], //2
    'D#':  [9.72, 19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978], //3
    'Eb':  [9.72, 19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978], //3
    'Dx':  [10.30, 20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274], //4
    'E':   [10.30, 20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274], //4
    'Fb':  [10.30, 20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274], //4
    'E#':  [10.91, 21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588], //5
    'F':   [10.91, 21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588], //5
    'F#':  [11.56, 23.12, 46.25, 92.5, 185, 370, 740, 1480, 2960, 5920], //6
    'Gb':  [11.56, 23.12, 46.25, 92.5, 185, 370, 740, 1480, 2960, 5920], //6
    'Fx':  [12.25, 24.5, 49, 98, 196, 392, 784, 1568, 3136, 6272], //7
    'G':   [12.25, 24.5, 49, 98, 196, 392, 784, 1568, 3136, 6272], //7
    'Abb': [12.25, 24.5, 49, 98, 196, 392, 784, 1568, 3136, 6272], //7
    'G#':  [12.98, 25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645], //8
    'Ab':  [12.98, 25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645], //8
    'Gx':  [13.75, 27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040], //9
    'A':   [13.75,27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040], //9
    'Bbb': [13.75, 27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040], //9
    'A#':  [14.57, 29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459], //10
    'Bb':  [14.57,29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459], //10
    'Ax':  [15.43, 30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902], //11
    'B':   [15.43, 30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902], //11
    'Cb':  [15.43, 30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902], //11
}
