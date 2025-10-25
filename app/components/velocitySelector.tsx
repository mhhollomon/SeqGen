import { Popover, Slider } from "radix-ui";
import { useState } from "react";

export type VelocitySelectorProps = {
    slot: number;
    value: number;
    onChange: (slot: number, value: number) => void;
}

export default function VelocitySelector({ slot, value, onChange }: VelocitySelectorProps) {

    const [localValue, setLocalValue] = useState(value);

    function handleCommit(value: number[]) {
        onChange(slot, value[0]);
    }

    return (
        <Popover.Root >
            <Popover.Trigger asChild>
                <button className="p-2 border rounded middle-of-row third-row w-5rem" aria-label="Update dimensions">
                    {value}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <p className="Text" style={{ marginBottom: 10 }}>
                            Velocity
                        </p>
                        <input type="text" readOnly value={localValue} />
                        <form>
                            <Slider.Root className="SliderRoot" defaultValue={[localValue]}
                                onValueChange={(x) => setLocalValue(x[0])}
                                onValueCommit={handleCommit}
                                max={127} min={0} step={1}>
                                <Slider.Track className="SliderTrack">
                                    <Slider.Range className="SliderRange" />
                                </Slider.Track>
                                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                            </Slider.Root>
                        </form>

                    </div>
                    <Popover.Close className="PopoverClose" aria-label="Close">
                        <i className="bi bi-x"></i>
                    </Popover.Close>
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );

}
