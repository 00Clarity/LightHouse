// Week Transition System for The Lighthouse Keeper
// Plays dynamic animations between weeks based on player choices

const WeekTransition = {
  isPlaying: false,
  onComplete: null,
  audioContext: null,

  timing: {
    fadeIn: 500,
    backgroundReveal: 1000,
    silhouetteRise: 1500,
    tensionShow: 2000,
    weekTextShow: 2500,
    consequencesStart: 3500,
    consequenceInterval: 1200,
    endSequence: 8000
  },

  // Play transition to a new week
  play(week, state, callback) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.onComplete = callback;

    const container = document.getElementById('week-transition-sequence');
    if (!container) {
      console.warn('Week transition container not found');
      if (callback) callback();
      return;
    }

    // Generate dynamic content based on state
    const narrative = this.generateNarrative(week, state);

    // Setup the transition
    this.setupTransition(container, week, state, narrative);

    // Show container
    container.style.display = 'flex';
    container.setAttribute('aria-hidden', 'false');

    // Run the sequence
    this.runSequence(container, week, narrative);

    // Setup skip button
    const skipBtn = container.querySelector('.transition-skip');
    if (skipBtn) {
      skipBtn.onclick = () => this.skip();
    }

    // Play transition audio
    this.playTransitionAudio(week, state.story.tension);
  },

  // Setup transition elements
  setupTransition(container, week, state, narrative) {
    // Set background based on week
    const bg = container.querySelector('.transition-background');
    bg.className = 'transition-background';

    if (week <= 3) {
      bg.classList.add('dawn');
    } else if (week === 4) {
      bg.classList.add('dusk');
    } else {
      bg.classList.add('night');
    }

    // Setup tension bar
    const tensionFill = container.querySelector('.transition-tension-fill');
    if (tensionFill) {
      tensionFill.style.width = '0%';
      tensionFill.dataset.target = state.story.tension;
    }

    // Set week text
    const weekText = container.querySelector('.transition-week-text');
    if (weekText) {
      weekText.textContent = `Week ${week}`;
      weekText.style.opacity = '0';
    }

    // Set subtitle based on week
    const subtitle = container.querySelector('.transition-subtitle');
    if (subtitle) {
      subtitle.textContent = this.getWeekSubtitle(week, state);
      subtitle.style.opacity = '0';
    }

    // Setup consequences
    const consequenceList = container.querySelector('.transition-consequence-list');
    if (consequenceList) {
      consequenceList.innerHTML = '';
      narrative.consequences.forEach((cons, i) => {
        const div = document.createElement('div');
        div.className = `transition-consequence ${cons.type}`;
        div.style.opacity = '0';
        div.style.transform = 'translateX(-20px)';
        div.innerHTML = `<span class="consequence-text">${cons.text}</span>`;
        consequenceList.appendChild(div);
      });
    }

    // Add storm overlay for week 4+
    const stormOverlay = container.querySelector('.transition-storm-overlay');
    if (stormOverlay) {
      stormOverlay.style.opacity = week >= 4 ? '1' : '0';
    }
  },

  // Run the animation sequence
  runSequence(container, week, narrative) {
    const bg = container.querySelector('.transition-background');
    const silhouette = container.querySelector('.transition-silhouette');
    const tensionContainer = container.querySelector('.transition-tension-container');
    const tensionFill = container.querySelector('.transition-tension-fill');
    const weekText = container.querySelector('.transition-week-text');
    const subtitle = container.querySelector('.transition-subtitle');
    const consequences = container.querySelectorAll('.transition-consequence');

    // Fade in background
    setTimeout(() => {
      bg.classList.add('visible');
    }, this.timing.fadeIn);

    // Rise silhouette
    setTimeout(() => {
      silhouette.classList.add('visible');
    }, this.timing.silhouetteRise);

    // Show tension bar
    setTimeout(() => {
      tensionContainer.classList.add('visible');
      // Animate tension fill
      const targetTension = parseInt(tensionFill.dataset.target) || 20;
      tensionFill.style.transition = 'width 1.5s ease-out';
      tensionFill.style.width = `${targetTension}%`;
    }, this.timing.tensionShow);

    // Show week text
    setTimeout(() => {
      weekText.style.transition = 'opacity 0.8s ease-out';
      weekText.style.opacity = '1';
    }, this.timing.weekTextShow);

    // Show subtitle
    setTimeout(() => {
      subtitle.style.transition = 'opacity 0.8s ease-out';
      subtitle.style.opacity = '1';
    }, this.timing.weekTextShow + 500);

    // Show consequences one by one
    consequences.forEach((cons, i) => {
      setTimeout(() => {
        cons.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        cons.style.opacity = '1';
        cons.style.transform = 'translateX(0)';
      }, this.timing.consequencesStart + (i * this.timing.consequenceInterval));
    });

    // Calculate end time based on number of consequences
    const endTime = this.timing.consequencesStart +
      (consequences.length * this.timing.consequenceInterval) + 2000;

    // End sequence
    setTimeout(() => {
      this.complete();
    }, Math.max(endTime, this.timing.endSequence));
  },

  // Generate narrative based on game state
  generateNarrative(week, state) {
    const consequences = [];
    const story = state.story;

    if (week === 2) {
      // Consequences from Week 1
      if (story.catchVerdict === 'peter') {
        consequences.push({
          type: 'negative',
          text: 'Peter broods over your judgment. His trust in the village wanes.'
        });
      } else if (story.catchVerdict === 'tomas') {
        consequences.push({
          type: 'negative',
          text: 'Tomas feels wronged by your record. Resentment builds.'
        });
      } else if (story.catchVerdict === 'neutral') {
        consequences.push({
          type: 'neutral',
          text: 'Your neutral record satisfies no one. Questions linger.'
        });
      }

      if (story.talkedToPeter1 && story.talkedToTomas1) {
        consequences.push({
          type: 'positive',
          text: 'You listened to both sides. The village respects your thoroughness.'
        });
      }

      if (story.consultedMarta1) {
        consequences.push({
          type: 'neutral',
          text: 'Marta remembers your visit. She watches you more carefully now.'
        });
      }
    }

    if (week === 3) {
      // Consequences from Week 2
      if (story.secretRevealed) {
        consequences.push({
          type: 'negative',
          text: 'The secret you uncovered spreads through whispers.'
        });
      }

      if (story.documentsFound) {
        consequences.push({
          type: 'neutral',
          text: 'The old documents trouble your sleep. What else lies buried?'
        });
      }

      if (story.priestConfided) {
        consequences.push({
          type: 'positive',
          text: 'The priest\'s confidence weighs on you. Sacred trust is a burden.'
        });
      }

      if (story.tension > 40) {
        consequences.push({
          type: 'negative',
          text: 'Tension rises in the village. Eyes follow you as you walk.'
        });
      }
    }

    if (week === 4) {
      // Consequences from Week 3
      if (story.luciaExposed) {
        consequences.push({
          type: 'negative',
          text: 'Lucia\'s shame is now public record. She cannot meet your eyes.'
        });
      } else if (story.luciaProtected) {
        consequences.push({
          type: 'positive',
          text: 'Your discretion protected Lucia. She nods to you in gratitude.'
        });
      }

      if (story.luciaRomanceBlessed) {
        consequences.push({
          type: 'positive',
          text: 'Young love blooms under your blessing. Hope stirs.'
        });
      }

      if (story.tension > 60) {
        consequences.push({
          type: 'negative',
          text: 'Storm clouds gather, mirroring the village mood.'
        });
      }
    }

    if (week === 5) {
      // Consequences from Week 4
      if (story.blamedTomas) {
        consequences.push({
          type: 'negative',
          text: 'Tomas stands accused by your record. The village turns on him.'
        });
      } else if (story.blamedPeter) {
        consequences.push({
          type: 'negative',
          text: 'Peter faces judgment. Your words sealed his fate.'
        });
      } else if (story.blamedNoOne) {
        consequences.push({
          type: 'neutral',
          text: 'No one bears blame in your record. Some call it mercy. Others, cowardice.'
        });
      }

      if (story.sabotageAlleged) {
        consequences.push({
          type: 'negative',
          text: 'Accusations of sabotage poison the air. Trust is shattered.'
        });
      }

      // Final week intro
      consequences.push({
        type: 'neutral',
        text: 'This is your final entry. What truth will you leave behind?'
      });
    }

    // Add fallback if no consequences
    if (consequences.length === 0) {
      consequences.push({
        type: 'neutral',
        text: 'A new week dawns. The village stirs.'
      });
    }

    // Limit to 4 consequences max
    return {
      consequences: consequences.slice(0, 4)
    };
  },

  // Get subtitle for each week
  getWeekSubtitle(week, state) {
    const subtitles = {
      1: 'The Disputed Catch',
      2: 'Whispers in the Chapel',
      3: 'Forbidden Affections',
      4: 'The Storm\'s Toll',
      5: 'The Final Record'
    };

    // Override with dynamic subtitle based on state
    if (week === 4 && state.story.tension > 60) {
      return 'The Gathering Storm';
    }
    if (week === 5 && state.story.tension > 80) {
      return 'The Reckoning';
    }

    return subtitles[week] || 'A New Week';
  },

  // Play transition audio
  playTransitionAudio(week, tension) {
    try {
      // Use existing AudioEngine if available
      if (typeof AudioEngine !== 'undefined' && AudioEngine.context) {
        this.audioContext = AudioEngine.context;
      } else {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = this.audioContext;
      const now = ctx.currentTime;

      // Create master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.3, now + 1);
      masterGain.connect(ctx.destination);

      // Base frequency shifts based on week (gets darker)
      const baseFreq = 80 - (week * 8); // 72 -> 40 Hz

      // Deep drone
      const drone = ctx.createOscillator();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(baseFreq, now);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.4, now);
      drone.connect(droneGain);
      droneGain.connect(masterGain);
      drone.start(now);

      // Tension-based dissonance
      if (tension > 40) {
        const dissonance = ctx.createOscillator();
        dissonance.type = 'sawtooth';
        dissonance.frequency.setValueAtTime(baseFreq * 1.5 + (tension / 10), now);

        const dissonanceGain = ctx.createGain();
        dissonanceGain.gain.setValueAtTime(tension / 500, now);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200 + tension * 2, now);

        dissonance.connect(filter);
        filter.connect(dissonanceGain);
        dissonanceGain.connect(masterGain);
        dissonance.start(now);

        // Stop dissonance
        dissonance.stop(now + 7);
      }

      // Week 4+ storm sounds
      if (week >= 4) {
        this.playStormSound(ctx, masterGain, now);
      }

      // Bell chime for new week
      setTimeout(() => {
        this.playBellChime(ctx, masterGain, week);
      }, this.timing.weekTextShow);

      // Fade out and cleanup
      masterGain.gain.linearRampToValueAtTime(0, now + 7.5);
      drone.stop(now + 8);

    } catch (e) {
      console.warn('Transition audio failed:', e);
    }
  },

  // Play storm sounds for week 4+
  playStormSound(ctx, masterGain, now) {
    // Wind-like noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const windNoise = ctx.createBufferSource();
    windNoise.buffer = noiseBuffer;
    windNoise.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(400, now);
    windFilter.Q.setValueAtTime(0.5, now);

    // Modulate wind
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.3, now);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(200, now);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.15, now);

    windNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    lfo.start(now);
    windNoise.start(now);
    windNoise.stop(now + 7);
    lfo.stop(now + 7);
  },

  // Play bell chime
  playBellChime(ctx, masterGain, week) {
    const now = ctx.currentTime;

    // Bell frequencies (gets lower each week)
    const bellFreq = 800 - (week * 80);

    const bell = ctx.createOscillator();
    bell.type = 'sine';
    bell.frequency.setValueAtTime(bellFreq, now);

    const bellGain = ctx.createGain();
    bellGain.gain.setValueAtTime(0.4, now);
    bellGain.gain.exponentialRampToValueAtTime(0.01, now + 3);

    // Add harmonics
    const harmonic = ctx.createOscillator();
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(bellFreq * 2.4, now);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.15, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.01, now + 2);

    bell.connect(bellGain);
    bellGain.connect(masterGain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(masterGain);

    bell.start(now);
    harmonic.start(now);
    bell.stop(now + 3);
    harmonic.stop(now + 2);
  },

  // Skip the transition
  skip() {
    this.complete();
  },

  // Complete the transition
  complete() {
    if (!this.isPlaying) return;

    const container = document.getElementById('week-transition-sequence');
    if (container) {
      container.style.transition = 'opacity 0.5s ease-out';
      container.style.opacity = '0';

      setTimeout(() => {
        container.style.display = 'none';
        container.style.opacity = '1';
        container.setAttribute('aria-hidden', 'true');

        // Reset all elements
        this.resetElements(container);
      }, 500);
    }

    this.isPlaying = false;

    if (this.onComplete) {
      const callback = this.onComplete;
      this.onComplete = null;
      setTimeout(callback, 600);
    }
  },

  // Reset all transition elements
  resetElements(container) {
    const bg = container.querySelector('.transition-background');
    const silhouette = container.querySelector('.transition-silhouette');
    const tensionContainer = container.querySelector('.transition-tension-container');

    if (bg) bg.classList.remove('visible', 'dawn', 'dusk', 'night');
    if (silhouette) silhouette.classList.remove('visible');
    if (tensionContainer) tensionContainer.classList.remove('visible');
  }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WeekTransition };
}
