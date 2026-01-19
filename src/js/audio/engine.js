// Audio Engine for The Lighthouse Keeper

const AudioEngine = {
  ctx: null,
  master: null,
  layers: {},
  initialized: false,
  enabled: false,

  // Initialize audio context (must be called from user interaction)
  init() {
    if (this.initialized) return;

    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      this.master.gain.value = 0.7;

      this.createSeaLayer();
      this.createWindLayer();
      this.createDroneLayer();
      this.createTensionLayer();

      this.initialized = true;
      this.enabled = true;

      // Update UI
      this.updateAudioIcon();

    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  },

  // Create sea ambient layer (brown noise)
  createSeaLayer() {
    const bufferSize = 4096;
    const processor = this.ctx.createScriptProcessor(bufferSize, 1, 1);
    let lastOut = 0;

    processor.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Boost signal
      }
    };

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.12;

    // Slow volume modulation for wave rhythm
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    processor.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    this.layers.sea = { processor, filter, gain, lfo };
  },

  // Create wind ambient layer
  createWindLayer() {
    const bufferSize = 4096;
    const processor = this.ctx.createScriptProcessor(bufferSize, 1, 1);

    processor.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.03;

    processor.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    this.layers.wind = { processor, filter, gain };
  },

  // Create lighthouse drone layer
  createDroneLayer() {
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55; // Low A

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 82.5; // E

    const gain = this.ctx.createGain();
    gain.gain.value = 0.03;

    // Slow pitch drift
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 1.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.master);

    osc1.start();
    osc2.start();
    lfo.start();

    this.layers.drone = { osc1, osc2, gain, lfo };
  },

  // Create tension layer (dissonant undertone)
  createTensionLayer() {
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 58; // Slightly detuned from drone

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    const gain = this.ctx.createGain();
    gain.gain.value = 0; // Starts silent

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start();

    this.layers.tension = { osc, filter, gain };
  },

  // Set tension level (0-100)
  setTension(level) {
    if (!this.initialized || !this.enabled) return;

    const normalizedTension = level / 100;

    // Fade in tension layer
    if (this.layers.tension) {
      this.layers.tension.gain.gain.setTargetAtTime(
        normalizedTension * 0.025,
        this.ctx.currentTime,
        1.0
      );
    }

    // Detune drone slightly
    if (this.layers.drone) {
      this.layers.drone.osc2.detune.setTargetAtTime(
        normalizedTension * 15,
        this.ctx.currentTime,
        1.0
      );
    }

    // Increase wind
    if (this.layers.wind) {
      this.layers.wind.gain.gain.setTargetAtTime(
        0.03 + normalizedTension * 0.05,
        this.ctx.currentTime,
        1.0
      );
    }
  },

  // Play entry lock sound
  playEntryLock() {
    if (!this.initialized || !this.enabled) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);

    // Add some texture
    const noise = this.ctx.createOscillator();
    noise.type = 'square';
    noise.frequency.value = 40;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.master);
    noiseGain.connect(this.master);

    osc.start();
    noise.start();
    osc.stop(this.ctx.currentTime + 1.0);
    noise.stop(this.ctx.currentTime + 0.3);
  },

  // Play memory trigger sound
  playMemoryTrigger() {
    if (!this.initialized || !this.enabled) return;

    // Duck other audio briefly
    this.master.gain.setTargetAtTime(0.3, this.ctx.currentTime, 0.5);
    this.master.gain.setTargetAtTime(0.7, this.ctx.currentTime + 3, 1.0);

    // Ethereal tone
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 330; // E4

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    osc.start();
    osc.stop(this.ctx.currentTime + 3.0);

    // Second voice
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 440; // A4

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0, this.ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1);
    gain2.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3.0);

    osc2.connect(filter);

    osc2.start();
    osc2.stop(this.ctx.currentTime + 3.0);
  },

  // Play UI sound
  playUISound(type) {
    if (!this.initialized || !this.enabled) return;

    const sounds = {
      pickup: { freq: 440, duration: 0.1, volume: 0.1 },
      place: { freq: 330, duration: 0.15, volume: 0.12 },
      remove: { freq: 220, duration: 0.1, volume: 0.08 },
      click: { freq: 880, duration: 0.05, volume: 0.06 }
    };

    const sound = sounds[type];
    if (!sound) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = sound.freq;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(sound.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + sound.duration);

    osc.connect(gain);
    gain.connect(this.master);

    osc.start();
    osc.stop(this.ctx.currentTime + sound.duration);
  },

  // Play week transition sound
  playWeekTransition() {
    if (!this.initialized || !this.enabled) return;

    // Musical sting
    const notes = [330, 392, 440]; // E, G, A
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1);

      osc.connect(gain);
      gain.connect(this.master);

      osc.start(startTime);
      osc.stop(startTime + 1);
    });
  },

  // Toggle audio on/off
  toggle() {
    if (!this.initialized) {
      this.init();
      return;
    }

    this.enabled = !this.enabled;

    if (this.enabled) {
      this.ctx.resume();
      this.master.gain.setTargetAtTime(0.7, this.ctx.currentTime, 0.5);
    } else {
      this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }

    this.updateAudioIcon();
  },

  // Update audio button icon
  updateAudioIcon() {
    const icon = document.getElementById('audio-icon');
    if (icon) {
      icon.innerHTML = this.enabled ? '&#128266;' : '&#128264;'; // speaker with/without sound
    }
  },

  // Suspend audio when tab is hidden
  handleVisibilityChange() {
    if (!this.initialized) return;

    if (document.hidden) {
      this.ctx.suspend();
    } else if (this.enabled) {
      this.ctx.resume();
    }
  },

  // Set storm intensity (Week 4)
  setStormIntensity(intensity) {
    if (!this.initialized || !this.enabled) return;

    // Increase wind dramatically
    if (this.layers.wind) {
      this.layers.wind.gain.gain.setTargetAtTime(
        0.1 + intensity * 0.15,
        this.ctx.currentTime,
        0.5
      );
      this.layers.wind.filter.frequency.setTargetAtTime(
        500 + intensity * 500,
        this.ctx.currentTime,
        0.5
      );
    }

    // Add low rumble
    if (intensity > 0.5) {
      this.layers.drone.gain.gain.setTargetAtTime(
        0.05 + intensity * 0.03,
        this.ctx.currentTime,
        0.5
      );
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioEngine };
}
