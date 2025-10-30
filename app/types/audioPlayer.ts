
// Note: These are actually times but decay constants.
const attackTime = 0.02;
const decayTime = 0.04;
const releaseTime = 0.1;

export class AudioPlayer {
    audio: AudioContext;
    topGain : GainNode;
    oscillator : OscillatorNode;
    constructor(audio: AudioContext) {
        console.log("AudioPlayer created");
        this.audio = audio;
        this.oscillator = this.audio.createOscillator();
        this.topGain = this.audio.createGain();
        this.oscillator.connect(this.topGain);
        this.topGain.connect(this.audio.destination);
        this.oscillator.type = "sine";
        this.oscillator.start();
    }

    playNote(frequency : number, duration : number) {
        console.log(`playNote frequency: ${frequency}, duration: ${duration}`);
        const now = this.audio.currentTime;
        this.oscillator.frequency.setValueAtTime(frequency, now);
        this.topGain.gain.setValueAtTime(0, now);
        this.topGain.gain.setTargetAtTime(1, now, attackTime);
        this.topGain.gain.setTargetAtTime(0.60, now+attackTime, decayTime);
        this.topGain.gain.setTargetAtTime(0, now+attackTime+decayTime, releaseTime);

    }

    stop() {
        const now = this.audio.currentTime;
        this.topGain.gain.setValueAtTime(0, now);
    }
}
