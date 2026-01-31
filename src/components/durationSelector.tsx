import { Select } from "radix-ui";
import { type Duration } from "~/types/durations";
import * as icons from "~/icons";
import { cn } from "~/utils";
import './durationSelector.css'

export type DurationSelectorProps = {
    slot: number;
    list: Duration[];
    value: Duration;
    className?: string
    onChange: (key: number, value: number) => void;
}

export default function DurationSelector({ slot, list, value, className, onChange }: DurationSelectorProps) {

    return (
        <Select.Root value={String(value.id)} onValueChange={(x) => {
            onChange(slot, Number(x));
        }}>
            <Select.Trigger className={cn("duration-sel__button", className)} aria-label="Duration selector">
                <Select.Value />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                        {icons.chevronUp}
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
                                            {icons.check}
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                );
                            })}
                        </Select.Group>

                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                        {icons.chevronDown}
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );

}
