import { concat } from 'radashi';
import { nanoid } from 'nanoid';

/**
 * Concatenates multiple values into a single string, separated by spaces.
 * @param {any} v1 - The first value to concatenate
 * @param {any} v2 - The second value to concatenate
 * @param {any[]} args - Any additional values to concatenate
 * @returns {string} - The concatenated string
 */
export function cn(v1: any, v2: any, ...args: any[]) : string {
    return concat(v1, v2, ...args).join(" ");
}

const ID_LENGTH = 8;
/**
 * Generates a unique identifier string of length 8, using the nanoid library.
 * @returns {string} - The generated identifier string
 */
export function gen_id() {
    return nanoid(ID_LENGTH);
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

