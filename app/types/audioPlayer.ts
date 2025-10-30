
// Note: These are not actually times but decay constants.
const attackTime = 0.02;
const decayTime = 0.03;
const releaseConstant = 0.03;

const releaseScaleFactor = 0.06;

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

    playNote(frequency : number, duration : number /* in ms */, gain : number = 1.0) {
        console.log(`playNote frequency: ${frequency}, duration: ${duration}`);
        const releaseTime = releaseConstant * ( duration/(releaseScaleFactor*1000));
        console.log(`playNote frequency: ${frequency}, duration: ${duration} gain: ${gain}, releaseTime: ${releaseTime}`);
        const now = this.audio.currentTime;
        this.oscillator.frequency.setValueAtTime(frequency, now);
        this.topGain.gain.setValueAtTime(0, now);
        this.topGain.gain.setTargetAtTime(gain, now, attackTime);
        this.topGain.gain.setTargetAtTime(gain * 0.60, now+attackTime, decayTime);
        this.topGain.gain.setTargetAtTime(0, now+attackTime+decayTime, releaseTime);

    }

    stop() {
        const now = this.audio.currentTime;
        this.topGain.gain.setValueAtTime(0, now);
    }
}
