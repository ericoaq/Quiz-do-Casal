/**
 * Pure Web Audio API Romantic Synthesizer
 * Plays a warm, soothing romantic chord progression and arpeggiator in a loop.
 * Zero network dependencies - 100% immune to CORS, iframe sandboxing, and hotlink blockages.
 */

interface SynthNote {
  frequency: number;
  beat: number;      // Beat number in our 16-beat grid
  duration: number;  // Duration of note in beats
  volume: number;    // Sub-volume scale (0.0 to 1.0)
}

export class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private bpm = 88; // Sweet, slow tempo for a romantic vibe
  private currentBeat = 0;
  private beatsInLoop = 16;
  private lookAheadMs = 250.0;
  private scheduleIntervalMs = 100.0;
  private schedulerTimerId: any = null;
  private nextNoteTime = 0.0;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  // Custom composed romantic sequence (warm bass, soft chords, elegant melody line)
  private notesList: SynthNote[] = [
    // === CHORD 1: Cmaj7 (Beats 0-3) ===
    // Bass line
    { frequency: 130.81, beat: 0, duration: 3.5, volume: 0.6 }, // C3
    // Arpeggiando
    { frequency: 261.63, beat: 0, duration: 1.5, volume: 0.35 }, // C4
    { frequency: 329.63, beat: 0.5, duration: 1.5, volume: 0.35 }, // E4
    { frequency: 392.00, beat: 1.0, duration: 1.5, volume: 0.35 }, // G4
    { frequency: 493.88, beat: 1.5, duration: 1.5, volume: 0.35 }, // B4
    // Soft Melody
    { frequency: 523.25, beat: 2.0, duration: 1.5, volume: 0.45 }, // C5
    { frequency: 587.33, beat: 2.5, duration: 1.0, volume: 0.4 }, // D5
    { frequency: 659.25, beat: 3.0, duration: 1.5, volume: 0.45 }, // E5

    // === CHORD 2: Fmaj7 (Beats 4-7) ===
    // Bass line
    { frequency: 174.61, beat: 4, duration: 3.5, volume: 0.6 }, // F3
    // Arpeggiando
    { frequency: 349.23, beat: 4, duration: 1.5, volume: 0.35 }, // F4
    { frequency: 440.00, beat: 4.5, duration: 1.5, volume: 0.35 }, // A4
    { frequency: 523.25, beat: 5.0, duration: 1.5, volume: 0.35 }, // C5
    { frequency: 659.25, beat: 5.5, duration: 1.5, volume: 0.35 }, // E5
    // Soft Melody
    { frequency: 698.46, beat: 6.0, duration: 1.5, volume: 0.45 }, // F5
    { frequency: 587.33, beat: 6.5, duration: 1.0, volume: 0.4 }, // D5
    { frequency: 523.25, beat: 7.0, duration: 1.5, volume: 0.45 }, // C5

    // === CHORD 3: Am7 (Beats 8-11) ===
    // Bass line
    { frequency: 110.00, beat: 8, duration: 3.5, volume: 0.6 }, // A2
    // Arpeggiando
    { frequency: 220.00, beat: 8, duration: 1.5, volume: 0.35 }, // A3
    { frequency: 261.63, beat: 8.5, duration: 1.5, volume: 0.35 }, // C4
    { frequency: 329.63, beat: 9.0, duration: 1.5, volume: 0.35 }, // E4
    { frequency: 392.00, beat: 9.5, duration: 1.5, volume: 0.35 }, // G4
    // Soft Melody
    { frequency: 440.00, beat: 10.0, duration: 1.5, volume: 0.45 }, // A4
    { frequency: 493.88, beat: 10.5, duration: 1.0, volume: 0.4 }, // B4
    { frequency: 523.25, beat: 11.0, duration: 1.5, volume: 0.45 }, // C5

    // === CHORD 4: G7sus4 -> G7 (Beats 12-15) ===
    // Bass line
    { frequency: 98.00, beat: 12, duration: 3.5, volume: 0.6 }, // G2
    // Arpeggiando
    { frequency: 196.00, beat: 12, duration: 1.5, volume: 0.35 }, // G3
    { frequency: 246.94, beat: 12.5, duration: 1.5, volume: 0.35 }, // B3
    { frequency: 293.66, beat: 13.0, duration: 1.5, volume: 0.35 }, // D4
    { frequency: 392.00, beat: 13.5, duration: 1.5, volume: 0.35 }, // G4
    // Soft Melody
    { frequency: 349.23, beat: 14.0, duration: 1.0, volume: 0.4 }, // F4
    { frequency: 293.66, beat: 14.5, duration: 1.0, volume: 0.4 }, // D4
    { frequency: 246.94, beat: 15.0, duration: 1.5, volume: 0.45 }, // B3
  ];

  public start() {
    if (this.isPlaying) return;

    try {
      // Lazy initialization of active AudioContext on explicit user tap
      const AudioCtxClass = (window.AudioContext || (window as any).webkitAudioContext);
      this.ctx = new AudioCtxClass();

      // Ensure AudioContext is unlocked
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;

      // 1. Setup Filters & Effects to make standard waves sound round, cozy, and dreamy
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 850; // Keeps everything round and warm (no high end pierce)
      this.filterNode.Q.value = 1.0;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.55, this.ctx.currentTime); // Sweet balanced volume

      // 2. Setup Ambient Dream Echo Delay for beautiful tail resonance (retro music box vibe)
      this.delayNode = this.ctx.createDelay(1.5);
      this.delayNode.delayTime.value = 0.51; // 510ms delay offsets
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.value = 0.35; // 35% echo decays

      // Cross-connect delay feedback loop
      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);

      // Create wet/dry matrix
      // Filter -> Master
      this.filterNode.connect(this.masterGain);
      // Filter -> Delay -> Master
      this.filterNode.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);

      // Connect Master to Speakers
      this.masterGain.connect(this.ctx.destination);

      // 3. Kickoff the scheduler
      this.currentBeat = 0;
      this.nextNoteTime = this.ctx.currentTime + 0.05;
      
      this.schedulerTimerId = setInterval(() => {
        this.scheduler();
      }, this.scheduleIntervalMs);

    } catch (e) {
      console.error("Failed to initialize Romantic Synthesizer Web Audio API:", e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.schedulerTimerId) {
      clearInterval(this.schedulerTimerId);
      this.schedulerTimerId = null;
    }
    
    // Safely tear down Nodes so no stray sounds leak
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch (e) {}
      this.masterGain = null;
    }

    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduler() {
    if (!this.ctx) return;

    // Loop through schedules in the current sliding window
    while (this.nextNoteTime < this.ctx.currentTime + (this.lookAheadMs / 1000.0)) {
      this.scheduleBeat(this.currentBeat, this.nextNoteTime);
      this.advanceBeat();
    }
  }

  private advanceBeat() {
    const secondsPerBeat = 60.0 / this.bpm / 2.0; // We resolve 1/8 notes, so each beat unit is a 0.5 step
    this.nextNoteTime += secondsPerBeat;

    // Cycle loop
    this.currentBeat = (this.currentBeat + 1) % (this.beatsInLoop * 2); // 32 subdivisions of 0.5 beat
  }

  private scheduleBeat(beatIndexSub: number, absolutePlayTime: number) {
    if (!this.ctx || !this.filterNode) return;

    // Current scheduled beat position in loop beats (0.0 to 15.5)
    const matchingBeat = beatIndexSub * 0.5;

    // Collect all notes matching this timing
    const currentNotes = this.notesList.filter(n => Math.abs(n.beat - matchingBeat) < 0.01);

    currentNotes.forEach(note => {
      this.playTone(note.frequency, absolutePlayTime, note.duration * (60.0 / this.bpm), note.volume);
    });
  }

  private playTone(freq: number, start: number, duration: number, noteVolume: number) {
    if (!this.ctx || !this.filterNode) return;

    try {
      // 1. Use double oscillators for complex woody warmth:
      // Oscillator 1: Sine (Warm body)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, start);

      // Oscillator 2: Triangle (Sweet wooden pluck resonance, tuned perfectly)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, start);

      const oscGain = this.ctx.createGain();
      // Fast Attack response, decay tail, gentle click elimination
      oscGain.gain.setValueAtTime(0.0001, start);
      oscGain.gain.linearRampToValueAtTime(0.4 * noteVolume, start + 0.015);
      oscGain.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.02);

      // Connect nodes
      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(this.filterNode);

      // Play and auto kill/tear down to prevent memory leaks
      osc1.start(start);
      osc1.stop(start + duration);
      osc2.start(start);
      osc2.stop(start + duration);
    } catch (err) {
      console.warn("Error playing synthesized tone:", err);
    }
  }
}
