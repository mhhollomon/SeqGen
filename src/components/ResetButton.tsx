import useGlobalStore from "~/globalStore";
import * as icons from "~/icons";

export default function ResetButton() {
    const { reset } = useGlobalStore();
    return (
        <button className="btn btn-warning ms-2 float-end" disabled={false}
            onClick={reset}>{icons.x}Reset</button>
    );
}
