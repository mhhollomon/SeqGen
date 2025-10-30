import useGlobalStore from "~/globalStore";

export default function History() {
    const { history, undoHistory, reset } = useGlobalStore((state) => state);

    return (
        <div>
            <button className="btn btn-primary" disabled={history.length === 0}
                onClick={undoHistory}><i className="bi bi-arrow-counterclockwise me-1"></i>Undo</button>
            <button className="btn btn-warning ms-2 float-end" disabled={history.length === 0}
                onClick={reset}><i className="bi bi-x me-1"></i>Reset</button>
        </div>
    );
}
