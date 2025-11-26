import VelocitySlider from "~/components/velocity/velocitySlider";
import useGlobalStore from "~/globalStore";

export type VelocitySelectorProps = {
    slot: number;
    value: number;
    onChange: (slot: number, value: number) => void;
}

export default function VelocitySelector({ slot, value, onChange }: VelocitySelectorProps) {

    const { deleteVelocitySlot } = useGlobalStore();

    return (
        <div className="d-flex flex-column align-items-center third-row" style={{height: '4rem'}}>
            <div className="text-center d-flex flex-row justify-content-between w-5rem align-items-start p-0 m-0" style={{height: '1.0rem'}}>
            </div>
            <VelocitySlider slot={slot} value={value} onChange={onChange} />
            <a role="button" aria-label="Remove current velocity slot" className="p-0 m-0 w-5em"
                onClick={() => deleteVelocitySlot(slot)} style={{ height: '1.0rem'}}><i className="bi bi-dash fade-in"></i></a>
        </div>
    )
}
