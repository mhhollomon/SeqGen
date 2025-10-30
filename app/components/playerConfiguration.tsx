import { Dialog } from "radix-ui";

import { useEffect, useState } from "react";
import useGlobalStore from "~/globalStore";

export default function PlayerConfiguration() {
    const { bpm: globalBpm, setBpm: setGlobalBpm } = useGlobalStore();

    const [localBpm, setLocalBpm] = useState(globalBpm);
    const [show, setShow] = useState(false);

    function closeAndCommit() {
        setGlobalBpm(localBpm);
        setShow(false);
    }

    useEffect(() => {
        setLocalBpm(globalBpm);
    }, [globalBpm, show])

    return (<>
        <Dialog.Root open={show}>
            <Dialog.Trigger asChild >
                <button className="btn btn-info ms-2" onClick={()=>setShow(true)}><i className="bi bi-gear"></i></button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="align-content-center justify-content-center border dialog-content" >
                    <Dialog.Title>Configure Playback</Dialog.Title>
                    <Dialog.Description asChild>
                        <div>
                            <form>
                                <label htmlFor="playerBPM" className="form-label pb-0 mb-0 mt-2">BPM</label>
                                <input id="playerBPM" type="number" className="form-control" value={localBpm} onChange={(e) => setLocalBpm(Number(e.target.value))} />
                            </form>
                        </div>
                    </Dialog.Description>
                    <hr />

                    <button className="btn btn-primary" onClick={() => closeAndCommit()} aria-label="Okay">Okay</button>
                    <Dialog.Close asChild>
                        <button className="btn btn-secondary float-end" aria-label="Close" onClick={()=>setShow(false)}>Close</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    </>);
    return (
        <button className="btn btn-info ms-2">
            <i className="bi bi-gear"></i>
        </button>
    );
}
