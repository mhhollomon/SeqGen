import { useAtom } from "jotai";
import { durationSeqAtom } from "~/atoms";
import { durationList, type Duration } from "~/durations";

export type DurationSelectorProps = {
    index : number;
    dur : Duration;
}

export default function DurationSelector({ index, dur } : DurationSelectorProps) {
    const [durations, setDurations] = useAtom(durationSeqAtom);

    return (
        <select key={`select-${index}`}
            className="form-select p-2 border rounded middle-of-row second-row w-5rem"
            value={dur.id}
            onChange={(e) => {
                const new_value = parseInt(e.currentTarget.value);
                const new_durations = durations.slice();
                new_durations[index] = new_value;
                setDurations(new_durations);
            }}
            aria-label="Duration selection">
        {durationList.map((d) => {
            return (
                <option key={d.id} value={d.id}>{d.name}</option>
            );
        })}
        </select>
    );

}
