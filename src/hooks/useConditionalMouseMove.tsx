import { useEffect, useState } from "react";

export type mousePositionType = {
    x: number;
    y: number;
    ts : number;
};

export function useConditionalMouseMove(isEnabled = true, onMouseUp?: (pos : mousePositionType) => void) {
    const [mousePosition, setMousePosition] = useState<mousePositionType>({ x: 0, y: 0, ts:0 });

    function handleMouseMove (event : MouseEvent){
        console.log(`mouseMove on ${event.target} ${event.clientX} ${event.clientY}`, );
        setMousePosition({ x: event.clientX, y: event.clientY, ts : event.timeStamp});
    };

    function handleMouseUp(e: MouseEvent) {
        console.log(`mouseUp on ${e.target}`);
        e.stopPropagation();
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
