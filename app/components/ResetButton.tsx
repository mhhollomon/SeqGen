import useGlobalStore from "~/globalStore";

export default function ResetButton() {
    const { reset } = useGlobalStore();
    return (
        <button className="btn btn-warning ms-2 float-end" disabled={false}
            onClick={reset}><i className="bi bi-x me-1"></i>Reset</button>
    );
}
