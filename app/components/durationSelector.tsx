import { Select } from "radix-ui";
import useGlobalStore from "~/globalStore";
import { type Duration } from "~/types/durations";

export type DurationSelectorProps = {
    slot: number;
    list: Duration[];
    value: Duration;
    onChange: (key: number, value: number) => void;
}

export default function DurationSelector({ slot, list, value, onChange }: DurationSelectorProps) {

    const { deleteDurationSlot } = useGlobalStore();
    return (
        <div className="d-flex flex-column align-items-center second-row" style={{ height: '4rem' }}>
            <div className="text-center d-flex flex-row justify-content-between w-5rem align-items-start p-0 m-0" style={{ height: '1.0rem' }}>
            </div>

            <Select.Root value={String(value.id)} onValueChange={(x) => {
                onChange(slot, Number(x));
            }}>
                <Select.Trigger className="bg-body border rounded w-5rem" aria-label="Duration selector" style={{ height: '2.0rem' }}>
                    <Select.Value />
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
            <a role="button" aria-label="Remove current Duration slot" className="p-0 m-0 w-5em"
                onClick={() => deleteDurationSlot(slot)} style={{ height: '1.0rem' }}><i className="bi bi-dash fade-in"></i></a>

        </div>
    );

}
