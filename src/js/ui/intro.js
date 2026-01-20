// Intro Sequence Controller for The Lighthouse Keeper

const IntroSequence = {
  isPlaying: false,
  currentStep: 0,
  skipCallback: null,
  completeCallback: null,
  timeouts: [],

  // Intro text sequence timing (in milliseconds)
  timing: {
    fadeIn: 500,
    lighthouseRise: 1500,
    lightGlow: 2500,
    beamStart: 3000,
    text1: 3500,
    text2: 5500,
    text3: 7500,
    text4: 9500,
    quote: 11500,
    endSequence: 16000
  },

  // Start the intro sequence
  play(onComplete) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.completeCallback = onComplete;
    this.clearTimeouts();

    const intro = document.getElementById('intro-sequence');
    const skipBtn = document.getElementById('skip-intro');

    if (!intro) {
      // No intro element, skip directly
      if (onComplete) onComplete();
      return;
    }

    // Show intro
    intro.classList.add('active');
    intro.setAttribute('aria-hidden', 'false');

    // Initialize audio for intro
    this.initIntroAudio();

    // Setup skip button
    if (skipBtn) {
      skipBtn.classList.add('visible');
      skipBtn.onclick = () => this.skip();
    }

    // Start the sequence
    this.runSequence();
  },

  // Run the animation sequence
  runSequence() {
    const lighthouse = document.querySelector('.intro-lighthouse');
    const light = document.querySelector('.lighthouse-light');
    const beam = document.querySelector('.intro-beam');
    const text1 = document.getElementById('intro-text-1');
    const text2 = document.getElementById('intro-text-2');
    const text3 = document.getElementById('intro-text-3');
    const text4 = document.getElementById('intro-text-4');
    const quote = document.getElementById('intro-quote');

    // Lighthouse rises
    this.addTimeout(() => {
      if (lighthouse) lighthouse.classList.add('visible');
      this.playSound('wave');
    }, this.timing.lighthouseRise);

    // Light starts glowing
    this.addTimeout(() => {
      if (light) light.classList.add('glow');
      this.playSound('light');
    }, this.timing.lightGlow);

    // Beam starts sweeping
    this.addTimeout(() => {
      if (beam) beam.classList.add('active');
    }, this.timing.beamStart);

    // Text 1: "At the edge of the world, a light burns."
    this.addTimeout(() => {
      if (text1) text1.classList.add('visible');
      this.playSound('text');
    }, this.timing.text1);

    // Text 2: "You are its keeper."
    this.addTimeout(() => {
      if (text1) text1.classList.add('fade-out');
      if (text2) text2.classList.add('visible');
      this.playSound('text');
    }, this.timing.text2);

    // Text 3: "But your true duty is not the flame."
    this.addTimeout(() => {
      if (text2) text2.classList.add('fade-out');
      if (text3) text3.classList.add('visible');
      this.playSound('text');
    }, this.timing.text3);

    // Text 4: "It is the record."
    this.addTimeout(() => {
      if (text3) text3.classList.add('fade-out');
      if (text4) text4.classList.add('visible');
      this.playSound('text');
    }, this.timing.text4);

    // Final quote
    this.addTimeout(() => {
      if (text4) text4.classList.add('fade-out');
      if (quote) quote.classList.add('visible');
      this.playSound('reveal');
    }, this.timing.quote);

    // End sequence
    this.addTimeout(() => {
      this.complete();
    }, this.timing.endSequence);
  },

  // Initialize intro audio
  initIntroAudio() {
    if (typeof AudioEngine !== 'undefined' && !AudioEngine.initialized) {
      AudioEngine.init();
    }

    // Start ambient audio at lower volume for intro
    if (AudioEngine.master) {
      AudioEngine.master.gain.setValueAtTime(0.3, AudioEngine.ctx.currentTime);
    }

    // Play intro music/drone
    this.playIntroMusic();
  },

  // Play intro background music
  playIntroMusic() {
    if (!AudioEngine.ctx || !AudioEngine.initialized) return;

    // Create a haunting intro drone
    const ctx = AudioEngine.ctx;

    // Deep bass drone
    const bassOsc = ctx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.value = 55; // Low A

    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0, ctx.currentTime);
    bassGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3);
    bassGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 10);
    bassGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 16);

    bassOsc.connect(bassGain);
    bassGain.connect(AudioEngine.master);
    bassOsc.start();
    bassOsc.stop(ctx.currentTime + 17);

    // Higher atmospheric tone
    const atmOsc = ctx.createOscillator();
    atmOsc.type = 'sine';
    atmOsc.frequency.value = 220; // A3

    const atmGain = ctx.createGain();
    atmGain.gain.setValueAtTime(0, ctx.currentTime);
    atmGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 5);
    atmGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 12);
    atmGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 16);

    // Add filter for ethereal sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    atmOsc.connect(filter);
    filter.connect(atmGain);
    atmGain.connect(AudioEngine.master);
    atmOsc.start();
    atmOsc.stop(ctx.currentTime + 17);

    // Fifth harmony for richness
    const fifthOsc = ctx.createOscillator();
    fifthOsc.type = 'sine';
    fifthOsc.frequency.value = 82.5; // E2

    const fifthGain = ctx.createGain();
    fifthGain.gain.setValueAtTime(0, ctx.currentTime);
    fifthGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);
    fifthGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 16);

    fifthOsc.connect(fifthGain);
    fifthGain.connect(AudioEngine.master);
    fifthOsc.start();
    fifthOsc.stop(ctx.currentTime + 17);

    this.introOscillators = [bassOsc, atmOsc, fifthOsc];
  },

  // Play sound effect
  playSound(type) {
    if (!AudioEngine.ctx || !AudioEngine.initialized) return;

    const ctx = AudioEngine.ctx;

    switch (type) {
      case 'wave':
        // Ocean wave sound
        this.playWaveSound();
        break;
      case 'light':
        // Light activation sound
        this.playLightSound();
        break;
      case 'text':
        // Subtle text appear sound
        this.playTextSound();
        break;
      case 'reveal':
        // Final reveal sound
        this.playRevealSound();
        break;
    }
  },

  playWaveSound() {
    if (!AudioEngine.ctx) return;
    const ctx = AudioEngine.ctx;

    // White noise burst filtered to sound like a wave
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.5));
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(AudioEngine.master);
    source.start();
  },

  playLightSound() {
    if (!AudioEngine.ctx) return;
    const ctx = AudioEngine.ctx;

    // Warm tone for light activation
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(AudioEngine.master);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  },

  playTextSound() {
    if (!AudioEngine.ctx) return;
    const ctx = AudioEngine.ctx;

    // Subtle chime for text
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 660 + Math.random() * 100;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(AudioEngine.master);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  },

  playRevealSound() {
    if (!AudioEngine.ctx) return;
    const ctx = AudioEngine.ctx;

    // Chord for final reveal
    const frequencies = [330, 440, 550]; // E, A, C# (A major)

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.1 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);

      osc.connect(gain);
      gain.connect(AudioEngine.master);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + 3);
    });
  },

  // Skip the intro
  skip() {
    this.clearTimeouts();
    this.complete();
  },

  // Complete the intro sequence
  complete() {
    if (!this.isPlaying) return;

    const intro = document.getElementById('intro-sequence');

    if (intro) {
      intro.classList.add('fade-out');

      // Wait for fade animation to complete
      setTimeout(() => {
        intro.classList.remove('active', 'fade-out');
        intro.setAttribute('aria-hidden', 'true');
        this.reset();

        // Restore audio volume
        if (AudioEngine.master) {
          AudioEngine.master.gain.setTargetAtTime(0.7, AudioEngine.ctx.currentTime, 0.5);
        }

        if (this.completeCallback) {
          this.completeCallback();
        }
      }, 1500);
    } else {
      this.reset();
      if (this.completeCallback) {
        this.completeCallback();
      }
    }
  },

  // Reset intro state
  reset() {
    this.isPlaying = false;
    this.currentStep = 0;
    this.clearTimeouts();

    // Stop any intro oscillators
    if (this.introOscillators) {
      this.introOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      this.introOscillators = null;
    }

    // Reset all intro elements
    const elements = [
      '.intro-lighthouse',
      '.lighthouse-light',
      '.intro-beam',
      '#intro-text-1',
      '#intro-text-2',
      '#intro-text-3',
      '#intro-text-4',
      '#intro-quote',
      '.skip-intro'
    ];

    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.remove('visible', 'glow', 'active', 'fade-out');
      }
    });
  },

  // Add a timeout to the tracking array
  addTimeout(fn, delay) {
    const id = setTimeout(() => {
      if (this.isPlaying) {
        fn();
      }
    }, delay);
    this.timeouts.push(id);
    return id;
  },

  // Clear all tracked timeouts
  clearTimeouts() {
    this.timeouts.forEach(id => clearTimeout(id));
    this.timeouts = [];
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IntroSequence };
}
