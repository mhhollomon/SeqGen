import useGlobalStore from "~/globalStore";

export default function History() {
    const { history, undoHistory } = useGlobalStore();

    return (
        <div>
            <button className="btn btn-primary rounded-end-0" disabled={history.length === 0}
                onClick={undoHistory}><i className="bi bi-arrow-counterclockwise"></i>Undo</button>
            <button className="btn btn-primary rounded-start-0" disabled={history.length === 0}
                onClick={() => {}}><i className="bi bi-chevron-down"></i></button>

        </div>
    );
}
