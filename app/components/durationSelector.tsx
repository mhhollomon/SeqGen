import { useAtom } from "jotai";
import { durationSeqAtom } from "~/atoms";
import { durationList, type Duration } from "~/durations";

export type DurationSelectorProps = {
    slot : number;
    list : Duration[];
    value : Duration;
    onChange : (key : number, value : number) => void;
}

export default function DurationSelector({ slot, list, value, onChange } : DurationSelectorProps) {

    return (
        <select key={`select-${slot}`}
            className="form-select p-2 border rounded middle-of-row second-row w-5rem"
            value={value.id}
            onChange={(e) => {
                const new_value = parseInt(e.currentTarget.value);
                onChange(slot, new_value);
            }}
            aria-label="Duration selection">
        {list.map((d) => {
            return (
                <option key={d.id} value={d.id}>{d.name}</option>
            );
        })}
        </select>
    );

}
