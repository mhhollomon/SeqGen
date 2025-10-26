export type Duration = {
    id : number
    name: string;
    value: number;
}

export const durationList : Duration[] = [
    {id : 0, name : "16",  value : 1},
    {id : 1, name : "8",   value : 2},
    {id : 2, name : "8-D", value : 3},
    {id : 3, name : "8-T", value : (2*2)/3 },
    {id : 4, name : "q",   value : 4},
    {id : 5, name : "q-D", value : 6},
    {id : 6, name : "q-T", value : (4*2)/3},
    {id : 7, name : "h",   value : 8},
    {id : 8, name : "h-D", value : 12},
    {id : 9, name : "h-T", value : (8*2)/3},
];

export const durationListNames = durationList.map((d) => d.name);

export function durationNameToValue(name: string): number {
    const duration = durationList.find((d) => d.name === name);
    if (!duration) throw new Error(`Unknown duration: ${name}`);
    return duration.value;
}
