import useGlobalStore from "~/globalStore";
import * as icons from "~/icons"

export default function ExportImport() {
    const { getjson } = useGlobalStore();

    function handleExportClick() {
        const blob = new Blob([getjson()], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sequence.seqgen";
        link.click();
        URL.revokeObjectURL(url);
    }

    function handleFileChoice(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                    const data = JSON.parse(result);
                    const { bpm, pitches, durations, velocities } = data;
                    useGlobalStore.setState({ bpm, pitches, durations, velocities });
                }
            };
            reader.readAsText(file);
            event.target.value = "";
        }
    }

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={handleExportClick}>{icons.download}<span className="ms-1">Export</span></button>

            <label className="btn btn-primary" role="button" htmlFor="importSettings">{icons.upload}<span className="ms-1">Import</span></label>
            <input className="d-none" type="file" id="importSettings" accept=".seqgen" onChange={handleFileChoice} />
        </div>
    );
}
