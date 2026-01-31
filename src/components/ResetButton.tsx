import useGlobalStore from "~/globalStore";
import * as icons from "~/icons";

export type ResetButtonProps = {
    className : string
}

export default function ResetButton({className }: ResetButtonProps) {
    const { reset } = useGlobalStore();
    return (
        <button className={className} type="button" disabled={false}
            onClick={reset}>{icons.x}Reset</button>
    );
}
