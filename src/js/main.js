// Main Game Controller for The Lighthouse Keeper
console.log('=== LIGHTHOUSE KEEPER SCRIPT LOADED ===');

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Global Error:', msg, 'at line', lineNo, error);
  return false;
};

const Game = {
  currentEvent: null,

  // Initialize the game
  init() {
    console.log('The Lighthouse Keeper - Initializing...');

    // Initialize renderer
    console.log('Calling Renderer.init()...');
    Renderer.init();
    console.log('Renderer.init() complete. Elements:', Object.keys(Renderer.elements || {}));

    // Add modal styles
    Modals.addModalStyles();

    // Setup event listeners
    this.setupEventListeners();

    // Check for save game
    if (StateManager.hasSave()) {
      document.getElementById('btn-continue').style.display = 'block';
    }

    // Show start screen
    document.getElementById('start-screen').style.display = 'flex';

    console.log('Initialization complete.');
  },

  // Setup global event listeners
  setupEventListeners() {
    // New game button
    document.getElementById('btn-new-game').addEventListener('click', () => {
      this.startNewGame();
    });

    // Continue button
    document.getElementById('btn-continue').addEventListener('click', () => {
      this.continueGame();
    });

    // Audio toggle
    document.getElementById('btn-audio').addEventListener('click', () => {
      AudioEngine.toggle();
    });

    // Handle visibility change for audio
    document.addEventListener('visibilitychange', () => {
      AudioEngine.handleVisibilityChange();
    });

    // State change listeners
    StateManager.on('tensionUpdate', (tension) => {
      Renderer.updateTension(tension);
      AudioEngine.setTension(tension);
    });

    StateManager.on('villagerUpdate', () => {
      this.refreshVillagers();
    });

    StateManager.on('fragmentAdded', (fragment) => {
      FragmentUI.addFragmentWithAnimation(fragment);
    });

    StateManager.on('weekChange', (week) => {
      this.onWeekChange(week);
    });

    StateManager.on('gameEnd', () => {
      this.onGameEnd();
    });
  },

  // Start a new game
  startNewGame() {
    // Hide start screen
    document.getElementById('start-screen').style.display = 'none';

    // Play intro sequence
    IntroSequence.play(() => {
      // After intro, start the game
      this.actuallyStartNewGame();
    });
  },

  // Actually start the new game (after intro)
  actuallyStartNewGame() {
    // Clear any existing save
    StateManager.clearSave();

    // Reset state
    StateManager.reset();

    // Show game container
    document.getElementById('game-container').style.display = 'grid';

    // Initialize audio on first user interaction (if not already by intro)
    if (!AudioEngine.initialized) {
      AudioEngine.init();
    }

    // Start Week 1
    this.startWeek(1);
  },

  // Continue saved game
  continueGame() {
    if (StateManager.load()) {
      // Hide start screen
      document.getElementById('start-screen').style.display = 'none';

      // Play intro sequence
      IntroSequence.play(() => {
        // After intro, continue the game
        this.actuallyContinueGame();
      });
    }
  },

  // Actually continue the game (after intro)
  actuallyContinueGame() {
    // Show game container
    document.getElementById('game-container').style.display = 'grid';

    // Initialize audio (if not already by intro)
    if (!AudioEngine.initialized) {
      AudioEngine.init();
    }

    // Restore game state
    const state = StateManager.getState();
    this.startWeek(state.week, false); // Don't show transition
  },

  // Start a specific week
  startWeek(week, showTransition = true) {
    console.log('startWeek called with week:', week);
    const state = StateManager.getState();
    console.log('startWeek: state.week =', state.week, 'state.story =', state.story);

    // Get event for this week
    this.currentEvent = StorySystem.getCurrentEvent(week, state.story, state.villagers);
    console.log('startWeek: currentEvent =', this.currentEvent);

    if (showTransition && week > 1) {
      Renderer.showWeekTransition(week, () => {
        this.renderWeek();
      });
      AudioEngine.playWeekTransition();
    } else {
      this.renderWeek();
    }

    // Week-specific effects
    if (week === 4) {
      Renderer.enableRain();
      AudioEngine.setStormIntensity(0.7);
    } else {
      Renderer.disableRain();
    }

    if (week === 5) {
      Renderer.enableFog();
    }

    // Save state
    StateManager.save();
  },

  // Render current week's content
  renderWeek() {
    try {
      console.log('renderWeek: Starting...');
      const state = StateManager.getState();
      console.log('renderWeek: Got state', { week: state.week, hasEvent: !!this.currentEvent });

      // Update header
      Renderer.updateHeader(state);

      // Update tension
      Renderer.updateTension(state.story.tension);

      // Render villagers
      const involvedIds = this.currentEvent ? this.currentEvent.involvedVillagers : [];
      console.log('renderWeek: Rendering villagers', { involvedIds });
      Renderer.renderVillagers(state.villagers, involvedIds, state.current.completedActions);

      // Render event
      console.log('renderWeek: Rendering event', {
        hasEvent: !!this.currentEvent,
        title: this.currentEvent?.title,
        hasActions: !!this.currentEvent?.actions,
        actionsCount: this.currentEvent?.actions?.length
      });
      Renderer.renderEvent(this.currentEvent, state.timeRemaining, state.current.completedActions);

      // Hide testimony
      Renderer.hideTestimony();

      // Load available fragments
      const fragments = getAvailableFragments(state.week, state.story);
      console.log('renderWeek: Got fragments', { count: fragments?.length });
      state.current.fragments = fragments;
      Renderer.renderFragments(fragments, state.current.usedFragments);

      // Update entry preview
      Renderer.updateEntryPreview();
      console.log('renderWeek: Complete');
    } catch (error) {
      console.error('renderWeek ERROR:', error);
    }
  },

  // Refresh villager display
  refreshVillagers() {
    const state = StateManager.getState();
    const involvedIds = this.currentEvent ? this.currentEvent.involvedVillagers : [];
    Renderer.renderVillagers(state.villagers, involvedIds, state.current.completedActions);
  },

  // Perform an investigation action
  performAction(actionId) {
    const state = StateManager.getState();
    const action = getAction(state.week, actionId);

    if (!action) return;
    if (action.cost > state.timeRemaining) return;
    if (state.current.completedActions.has(actionId)) return;

    // Use time
    StateManager.useTime(action.cost);

    // Mark action complete
    StateManager.completeAction(actionId);

    // Set story flag
    if (action.flag) {
      StateManager.setStoryFlag(action.flag, true);
    }

    // Check for memory trigger
    const memoryId = MemorySystem.checkTrigger(actionId, state.week, state.story);
    if (memoryId && !state.memories[memoryId]) {
      StateManager.unlockMemory(memoryId);
    }

    // Get testimony
    let testimony = action.testimony;

    // For Week 5, generate dynamic testimony
    if (state.week === 5 && action.requiresState) {
      testimony = StorySystem.getCurrentEvent(5, state.story, state.villagers)
        .actions.find(a => a.id === actionId)?.testimony;
    }

    // Get villager if applicable
    const villager = action.villager ? Villagers[action.villager] : null;

    // Show testimony
    if (testimony) {
      Renderer.showTestimony(testimony, villager);

      // Add fragments from testimony
      if (testimony.fragments) {
        testimony.fragments.forEach(fragId => {
          const frag = Renderer.getFragmentById(fragId);
          if (frag) {
            StateManager.addFragment({ ...frag });
          }
        });

        // Re-render fragments
        const newState = StateManager.getState();
        Renderer.renderFragments(newState.current.fragments, newState.current.usedFragments);
      }

      // Show memory if triggered
      if (memoryId && !state.memories[memoryId]) {
        setTimeout(() => {
          MemorySystem.showMemory(memoryId);
        }, 1500);
      }
    }

    // Update UI
    const newState = StateManager.getState();
    Renderer.updateHeader(newState);
    Renderer.renderActions(
      this.currentEvent.actions,
      newState.timeRemaining,
      newState.current.completedActions
    );
    this.refreshVillagers();

    // Play sound
    AudioEngine.playUISound('click');

    // Save
    StateManager.save();
  },

  // Submit the current entry
  submitEntry() {
    const state = StateManager.getState();
    const entry = state.current.entry;

    // Check if entry is complete
    if (!entry.subject || !entry.action) {
      return;
    }

    // Compose entry text
    const entryText = StateManager.composeEntryText();

    // Calculate consequences
    const effects = ConsequenceEngine.calculateConsequences(entry, state.week, state.story);

    // Apply effects
    ConsequenceEngine.applyEffects(effects, StateManager);

    // Submit entry to log
    StateManager.submitEntry();

    // Show consequences
    Renderer.showConsequences(entryText, effects);

    // Save
    StateManager.save();
  },

  // Progress after entry submission
  progressAfterEntry() {
    const state = StateManager.getState();

    // Week 5 special handling - signature choice
    if (state.week === 5) {
      Modals.showSignatureChoice((signed) => {
        StateManager.setStoryFlag('signedLog', signed);
        StateManager.save();

        // Show Bela's dialogue
        this.showBelaFinal(() => {
          // Then show ending
          this.showEnding();
        });
      });
      return;
    }

    // Advance to next week
    StateManager.advanceWeek();
  },

  // Handle week change
  onWeekChange(week) {
    this.startWeek(week);
  },

  // Show Bela's final dialogue
  showBelaFinal(callback) {
    const state = StateManager.getState();
    const belaDialogue = generateBelaDialogue(state.story);

    const content = `
      <div class="bela-final">
        <div class="bela-portrait" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
          ${Renderer.getVillagerEmoji('bela')}
        </div>
        <p class="bela-intro" style="text-align: center; color: var(--sea-foam); margin-bottom: 1rem;">
          After you submit your final entry, Bela comes to the lighthouse.
        </p>
        <blockquote style="font-style: italic; line-height: 1.8;">
          ${belaDialogue.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </blockquote>
        <p class="bela-observation" style="color: var(--sea-foam); margin-top: 1rem; font-size: 0.875rem;">
          ${belaDialogue.observation}
        </p>
        <button class="modal-btn" id="bela-continue" style="display: block; margin: 1.5rem auto 0;">Continue</button>
      </div>
    `;

    Modals.show("Bela's Visit", content, false);

    document.getElementById('bela-continue').addEventListener('click', () => {
      Modals.close();
      setTimeout(callback, 500);
    });
  },

  // Handle game end
  onGameEnd() {
    this.showEnding();
  },

  // Show ending
  showEnding() {
    const state = StateManager.getState();

    // Calculate ending
    const ending = StorySystem.calculateEnding(state.story, state.villagers);
    const endingText = StorySystem.generateEndingText(ending);

    // Show ending modal
    Modals.showEnding(ending, endingText);

    // Play ending music
    AudioEngine.playWeekTransition();
  },

  // Restart the game
  restart() {
    location.reload();
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== DOMContentLoaded fired, calling Game.init() ===');
  try {
    Game.init();
  } catch (e) {
    console.error('CRITICAL: Game.init() failed:', e);
    document.body.innerHTML = '<div style="color:red;padding:20px;font-size:18px;">Error initializing game: ' + e.message + '<br><br>Check the browser console (F12) for details.</div>';
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Game };
}
