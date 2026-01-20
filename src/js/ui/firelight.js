// Fire Flicker System for The Lighthouse Keeper
// The only fluid animation - fire is alive, everything else is record

const FirelightSystem = {
  isRunning: false,
  elements: [],
  lampElement: null,
  lastFlicker: 0,
  baseIntensity: 1.0,

  // Initialize the firelight system
  init() {
    this.lampElement = document.querySelector('.lighthouse-icon');
    this.elements = document.querySelectorAll('[data-light-source]');

    // Start the flicker loop
    this.isRunning = true;
    this.flickerLoop();

    console.log('FirelightSystem initialized');
  },

  // Main flicker loop - runs constantly
  flickerLoop() {
    if (!this.isRunning) return;

    const now = performance.now();

    // Subtle constant flicker (every frame)
    this.applySubtleFlicker();

    // Occasional larger flicker (random)
    if (Math.random() < 0.02) {
      this.applyLargeFlicker();
    }

    // Very rare dramatic flicker
    if (Math.random() < 0.003) {
      this.applyDramaticFlicker();
    }

    requestAnimationFrame(() => this.flickerLoop());
  },

  // Subtle constant variation
  applySubtleFlicker() {
    const variance = 0.03;
    const flicker = this.baseIntensity + (Math.random() - 0.5) * variance;

    if (this.lampElement) {
      this.lampElement.style.setProperty('--lamp-intensity', flicker);
      this.lampElement.style.filter = `brightness(${flicker})`;
    }

    // Apply to any elements with the lighthouse beam
    const beam = document.getElementById('lighthouse-beam');
    if (beam) {
      beam.style.opacity = 0.85 + (Math.random() * 0.1);
    }
  },

  // Occasional larger flicker
  applyLargeFlicker() {
    const dip = 0.85 + Math.random() * 0.1;

    if (this.lampElement) {
      this.lampElement.style.filter = `brightness(${dip})`;

      // Recover after brief moment
      setTimeout(() => {
        if (this.lampElement) {
          this.lampElement.style.filter = `brightness(${this.baseIntensity})`;
        }
      }, 50 + Math.random() * 100);
    }
  },

  // Dramatic flicker (rare)
  applyDramaticFlicker() {
    const sequence = [0.7, 0.9, 0.75, 0.95, 1.0];
    let i = 0;

    const flash = () => {
      if (i >= sequence.length) return;

      if (this.lampElement) {
        this.lampElement.style.filter = `brightness(${sequence[i]})`;
      }

      const beam = document.getElementById('lighthouse-beam');
      if (beam) {
        beam.style.opacity = sequence[i] * 0.9;
      }

      i++;
      setTimeout(flash, 30 + Math.random() * 40);
    };

    flash();
  },

  // Set base intensity (for tension effects)
  setIntensity(intensity) {
    this.baseIntensity = Math.max(0.5, Math.min(1.2, intensity));
  },

  // Pause the flicker (for cutscenes, etc.)
  pause() {
    this.isRunning = false;
  },

  // Resume flicker
  resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.flickerLoop();
    }
  },

  // Storm mode - more dramatic flickering
  setStormMode(enabled) {
    if (enabled) {
      this.baseIntensity = 0.85;
      // Increase flicker frequency via CSS
      document.body.classList.add('storm-light');
    } else {
      this.baseIntensity = 1.0;
      document.body.classList.remove('storm-light');
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FirelightSystem.init());
} else {
  // Small delay to ensure other elements are ready
  setTimeout(() => FirelightSystem.init(), 100);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FirelightSystem };
}
