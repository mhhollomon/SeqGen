import { useAtom } from "jotai";
import { Select } from "radix-ui";
import { durationSeqAtom } from "~/atoms";
import { durationList, type Duration } from "~/durations";

export type DurationSelectorProps = {
    slot : number;
    list : Duration[];
    value : Duration;
    onChange : (key : number, value : number) => void;
}

export default function DurationSelector({ slot, list, value, onChange } : DurationSelectorProps) {
    console.log(`slot: ${slot}, value: ${JSON.stringify(value)}`);
    return (
	<Select.Root value={String(value.id)} onValueChange={(x) => {
        onChange(slot, Number(x));
    }}>
		<Select.Trigger className="SelectTrigger btn-bg p-2 border rounded middle-of-row second-row w-5rem" aria-label="Duration selector">
			<Select.Value className="btn-primary"/>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content className="SelectContent">
				<Select.ScrollUpButton className="SelectScrollButton">
					<i className="bi bi-chevron-up"></i>
				</Select.ScrollUpButton>
				<Select.Viewport className="SelectViewport">
					<Select.Group>
                        {list.map((d) => {
                            return (
                                <Select.Item className="SelectItem"
                                        key={`item-${d.id}`} value={String(d.id)}
                                        data-state={d.id === value.id ? "checked" : "unchecked"}>
                                    <Select.ItemText>{d.name}</Select.ItemText>
                                    <Select.ItemIndicator className="SelectItemIndicator">
                                        <i className="bi bi-check"></i>
                                    </Select.ItemIndicator>
                                </Select.Item>
                            );
                        })}
					</Select.Group>

				</Select.Viewport>
				<Select.ScrollDownButton className="SelectScrollButton">
				<i className="bi bi-chevron-down"></i>
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

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
