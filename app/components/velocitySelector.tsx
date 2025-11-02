import { Popover, Slider } from "radix-ui";
import { useEffect, useState } from "react";

type mousePositionType = {
    x: number;
    y: number;
    ts : number;
};

function useConditionalMouseMove(isEnabled = true, onMouseUp?: (pos : mousePositionType) => void) {
    const [mousePosition, setMousePosition] = useState<mousePositionType>({ x: 0, y: 0, ts:0 });

    function handleMouseMove (event : MouseEvent){
        console.log(`mouseMove on ${event.target} ${event.clientX} ${event.clientY}`, );
        setMousePosition({ x: event.clientX, y: event.clientY, ts : event.timeStamp});
    };

    function handleMouseUp(e: MouseEvent) {
        console.log(`mouseUp on ${e.target}`);
        onMouseUp && onMouseUp({ x: e.clientX, y: e.clientY, ts : e.timeStamp});
    }

    useEffect(() => {
        console.log(`useConditionalMouseMove useEffect: isEnabled = ${isEnabled}`);
        // Only add the event listener if isEnabled is true
        if (isEnabled) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isEnabled]); // Rerun the effect when isEnabled changes

    return mousePosition;
}
export type VelocitySelectorProps = {
    slot: number;
    value: number;
    onChange: (slot: number, value: number) => void;
}

export default function VelocitySelector({ slot, value, onChange }: VelocitySelectorProps) {

    const [localValue, setLocalValue] = useState(value);
    const [startPosition, setStartPosition] = useState<mousePositionType>({ x: 1, y: 1, ts : 0 });
    const [isDragging, setIsDragging] = useState(false);

    const mousePosition = useConditionalMouseMove(isDragging, mouseUp);

    function computeDragValue( newPos : mousePositionType = mousePosition) {
        let temp = isDragging && (newPos.y > 0)?  Math.trunc(value + (startPosition.y - newPos.y)/2.0) : value;
        temp = temp < 0 ? 0 : temp;
        temp = temp > 127 ? 127 : temp;
        return temp;
    }
    const dragValue = computeDragValue();

    function mouseUp(lastPos : mousePositionType ) {
        console.log(`mouseUp on ${lastPos.ts} startPosition.ts: ${startPosition.ts}`);
        setIsDragging(false);
        if (lastPos.ts - startPosition.ts  > 100) {
            const newValue = computeDragValue(lastPos);
            console.log(`mouseUp calling onChange with ${newValue}`);
            onChange(slot, newValue);
        }
    }

    function handleCommit(value: number[]) {
        onChange(slot, value[0]);
    }

    function StartDrag(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log(`mouseDown on ${e.target}`);
        setStartPosition({ x: e.clientX, y: e.clientY, ts : e.timeStamp });
        setIsDragging(true);
    }

    return (
        <Popover.Root >
            <Popover.Trigger asChild>
                <button className="bg-body p-2 border rounded middle-of-row third-row w-5rem" aria-label="Set Velocity"
                    onMouseDown={(e) => StartDrag(e)}
                    >
                    {isDragging ? dragValue : value}
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
