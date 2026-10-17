// Web Audio API Sound Synthesizer for The Spooky Cauldron
// Zero external assets required - pure mathematical audio synthesis

class SpookyAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playWandChime();
    }
    return this.soundEnabled;
  }

  // Wand chime / Magical sparkle
  playWandChime() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.06);
      
      gain.gain.setValueAtTime(0, now + index * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.45);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now + index * 0.06);
      osc.stop(now + index * 0.06 + 0.5);
    });
  }

  // Cauldron Bubble sound
  playBubble() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    const startFreq = 200 + Math.random() * 250;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.8, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Spooky Owl Hoot sound
  playOwlHoot() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    
    // First hoot
    this.createHoot(now, 480, 0.25);
    // Second hoot (longer)
    this.createHoot(now + 0.35, 440, 0.55);
  }

  createHoot(startTime, freq, duration) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, startTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq - 35, startTime + duration);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // Spell Zap sound (Incendio / Lumos / etc)
  playSpellZap() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.28);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Gringotts Galleon Coin Clink
  playCoinClink() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [1800, 2400].forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.12, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.35);
    });
  }

  // Wardrobe Rattling & Banging
  playWardrobeRattle() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [0, 0.08, 0.15, 0.22, 0.32, 0.40].forEach(timeOffset => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now + timeOffset);

      osc.type = 'square';
      osc.frequency.setValueAtTime(80 + Math.random() * 40, now + timeOffset);

      gain.gain.setValueAtTime(0.2, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.07);
    });
  }

  // Riddikulus Comic Pop & Slide
  playRiddikulusPop() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    // Upward pitch spring sweep
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.38);

    // Chime laughter notes
    [659.25, 880, 1046.5].forEach((freq, idx) => {
      const o = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + 0.28 + idx * 0.06);
      g.gain.setValueAtTime(0.12, now + 0.28 + idx * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.28 + idx * 0.06 + 0.2);
      o.connect(g);
      g.connect(this.audioCtx.destination);
      o.start(now + 0.28 + idx * 0.06);
      o.stop(now + 0.28 + idx * 0.06 + 0.25);
    });
  }
}

window.spookyAudio = new SpookyAudioEngine();
