import { concat } from 'radashi';

export function cn(v1: any, v2: any, ...args: any[]) : string {
    return concat(v1, v2, ...args).join(" ");
}

export function midiNoteToString(note: number): string {
    if (note === 200) return "R";

    const octave = Math.floor(note / 12) - 1;
    const noteName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][note % 12];
    return `${noteName}${octave}`;
}

interface chromatic {
    note: string,
    offset: number
}

 const chromaticScale: chromatic[] = [
        { note: "C", offset: 0 },
        { note: "C#", offset: 1 },
        { note: "Db", offset: 1 },
        { note: "D", offset: 2 },
        { note: "D#", offset: 3 },
        { note: "Eb", offset: 3 },
        { note: "E", offset: 4 },
        { note: "F", offset: 5 },
        { note: "F#", offset: 6 },
        { note: "Gb", offset: 6 },
        { note: "G", offset: 7 },
        { note: "G#", offset: 8 },
        { note: "Ab", offset: 8 },
        { note: "A", offset: 9 },
        { note: "A#", offset: 10 },
        { note: "Bb", offset: 10 },
        { note: "B", offset: 11 },
    ];

export function midiStringToNote(note: string): number {
    note = note.toUpperCase();
    if (note === "R") return 200;
    let index = -1;
    if (note[-2] === "-") {
        index = -2;
    }
    const octave = parseInt(note.slice(index));
    const noteName = note.slice(0, index);
    const noteIndex = chromaticScale.findIndex((n) => n.note === noteName);
    if (noteIndex === -1) {
        console.log(`noteName: ${noteName}, octave: ${octave}, noteIndex: ${noteIndex}`);
        return -1;
    }

    const noteOffset = chromaticScale[noteIndex].offset;

    console.log(`noteName: ${noteName}, octave: ${octave}, noteOffset: ${noteOffset}, noteIndex: ${noteIndex}`);
    return (octave + 1) * 12 + noteOffset;
}


export function gcd(a: number, b: number): number {
  // Ensure positive values for GCD calculation
  a = Math.trunc(Math.abs(a));
  b = Math.trunc(Math.abs(b));

  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Function to calculate the Least Common Multiple (LCM) of two numbers
export function lcm(a: number, b: number): number {
  // Handle edge cases where one or both numbers are zero
  if (a === 0 || b === 0) {
    return 0;
  }
  return Math.trunc(Math.abs(a * b) / gcd(a, b));
}
