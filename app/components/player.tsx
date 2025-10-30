import useGlobalStore from "~/globalStore";

import { useRef, useEffect, useState } from "react";
import { Pitch, PitchFrequencyMap } from "~/types/pitch";
import { durationList } from "~/types/durations";
import PlayerConfiguration from "~/components/playerConfiguration";
import { AudioPlayer } from "~/types/audioPlayer";


function getInterval(BPM: number) { return 60000 / (BPM * 8); }

async function playTone(player : AudioPlayer | null, pitch: Pitch, velocity: number, duration: number) {
    if (player === null) {
        console.log("ac is null");
        return;
    }
    const frequency = PitchFrequencyMap[pitch.pitchClass][pitch.octave + 1];
    player.playNote(frequency, duration);

    if (player.audio.state === "suspended") {
        await player.audio.resume();
    }

    //console.log(`pitch: ${JSON.stringify(pitch)}, velocity: ${velocity}`);
}

export default function Player() {
    const { pitches, durations, velocities, bpm } = useGlobalStore();

    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(0);

    const playerRef = useRef<AudioPlayer | null>(null);

    const durationIndex = index % durations.length;
    const velocityIndex = index % velocities.length;
    const pitchIndex = index % pitches.length;

    useEffect(() => {
        if (playerRef.current === null) {
            playerRef.current = new AudioPlayer(new AudioContext());
        }
        return () => {
            playerRef.current?.stop();
            playerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!playing) {
            playerRef.current?.stop();
            return;
        }
        const durationIndex = index % durations.length;
        const velocityIndex = index % velocities.length;
        const pitchIndex = index % pitches.length;

        let newIndex = index + 1;
        if (index !== 0 && durationIndex === 0 && velocityIndex === 0 && pitchIndex === 0) {
            newIndex = 0;
        }
        const timeout_value = durationList[durations[durationIndex]].value * getInterval(bpm);
        const pitchToPlay = new Pitch(pitches[pitchIndex]);
        if (! pitchToPlay.isRest()) {
            playTone(playerRef.current, pitchToPlay,
                velocities[velocityIndex], timeout_value/2);
        }
        console.log(` index: ${index}, timeout: ${timeout_value}`);
        const timeout = setTimeout(() => setIndex(newIndex), timeout_value);

        return () => {
            clearTimeout(timeout);
        };

    }, [playing, index]);

    function handleClick(newPlaying: boolean) {
        setPlaying(newPlaying);
    }



    return (
        <>
            <div className="d-inline col-1"></div>
            <div>
                <button className="btn btn-primary ms-3" aria-description="Rewind" onClick={() => { setIndex(0); setPlaying(false) }}><i className="bi bi-chevron-bar-left"></i></button>
                <button className="btn btn-primary ms-1" aria-description="Play/Pause" onClick={() => handleClick(!playing)}>{playing ? <i className="bi bi-pause"></i> : <i className="bi bi-chevron-right"></i>}</button>
                <PlayerConfiguration />
                <div className={"ms-3"}>
                    <span className="mx-1">{index}</span>
                    <span className="mx-1">{new Pitch(pitches[pitchIndex]).toString()}</span>
                    <span className="mx-1">{durationList[durations[durationIndex]].name}</span>
                    <span className="mx-1">{velocities[velocityIndex]}</span>
                </div>
            </div>
        </>
    );
}
