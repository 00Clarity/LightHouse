// State Management System for The Lighthouse Keeper

const GameState = {
  // Core progress
  week: 1,
  phase: 'dawn', // dawn, day, dusk, night
  timeRemaining: 4, // Investigation hours available

  // Villager states
  villagers: {
    marta: { wellbeing: 60, trust: 50 },
    peter: { wellbeing: 65, trust: 45 },
    anna: { wellbeing: 70, trust: 65 },
    tomas: { wellbeing: 55, trust: 40 },
    lucia: { wellbeing: 70, trust: 50 },
    simao: { wellbeing: 60, trust: 55 },
    bela: { wellbeing: 65, trust: 60 },
    jakub: { wellbeing: 70, trust: 45 },
    helena: { wellbeing: 65, trust: 50 },
    oldSimao: { wellbeing: 50, trust: 55 }
  },

  // Story flags
  story: {
    // Week 1
    catchVerdict: null, // "peter" | "tomas" | "neutral" | "damaging"
    talkedToPeter1: false,
    talkedToTomas1: false,
    consultedMarta1: false,
    examinedEvidence1: false,

    // Week 2
    secretRevealed: false,
    documentsFound: false,
    priestConfided: false,
    talkedToAnna2: false,
    visitedPriest2: false,
    confrontedMarta2: false,
    searchedChapel2: false,

    // Week 3
    luciaExposed: false,
    luciaProtected: false,
    luciaRomanceBlessed: false,
    talkedToLucia3: false,
    talkedToTomas3: false,
    heardMarta3: false,
    observedThem3: false,

    // Week 4
    blamedTomas: false,
    blamedPeter: false,
    blamedNoOne: false,
    sabotageAlleged: false,
    annaTestified: false,
    heardPeter4: false,
    heardTomas4: false,
    askedAnna4: false,
    examinedRope4: false,

    // Week 5
    wroteAboutSelf: false,
    signedLog: null, // true = signed, false = unsigned, null = not decided
    finalMarta: false,
    finalTomas: false,
    finalLucia: false,
    finalSimao: false,
    wroteAboutSelf5: false,

    // Cumulative
    tension: 20,
    truthCount: 0,
    mercyCount: 0,
    selfServingCount: 0
  },

  // Keeper memories unlocked
  memories: {
    firstRecord: false,
    theAccused: false,
    theWife: false,
    theEvidence: false,
    theName: false
  },

  // Current week state
  current: {
    fragments: [],
    usedFragments: new Set(),
    completedActions: new Set(),
    entry: {
      tone: null,
      subject: null,
      action: null,
      object: null,
      context: null
    }
  },

  // Complete log of all entries
  log: [],

  // UI state
  ui: {
    selectedVillager: null,
    activeModal: null,
    audioEnabled: false,
    reducedMotion: false
  }
};

// State management functions
const StateManager = {
  // Get current state (returns reference - be careful with mutation)
  getState() {
    return GameState;
  },

  // Update villager stats
  updateVillager(villagerId, stat, delta) {
    if (GameState.villagers[villagerId]) {
      GameState.villagers[villagerId][stat] = Math.max(0, Math.min(100,
        GameState.villagers[villagerId][stat] + delta
      ));
      this.emit('villagerUpdate', { villagerId, stat, value: GameState.villagers[villagerId][stat] });
    }
  },

  // Set story flag
  setStoryFlag(flag, value) {
    if (flag in GameState.story) {
      GameState.story[flag] = value;
      this.emit('storyFlagUpdate', { flag, value });
    }
  },

  // Update tension
  updateTension(delta) {
    GameState.story.tension = Math.max(0, Math.min(100, GameState.story.tension + delta));
    this.emit('tensionUpdate', GameState.story.tension);
  },

  // Add fragment to current collection
  addFragment(fragment) {
    if (!GameState.current.fragments.find(f => f.id === fragment.id)) {
      GameState.current.fragments.push(fragment);
      this.emit('fragmentAdded', fragment);
    }
  },

  // Place fragment in entry slot
  placeFragment(slot, fragment) {
    if (fragment && GameState.current.entry[slot] !== undefined) {
      // Remove from previous slot if exists
      Object.keys(GameState.current.entry).forEach(s => {
        if (GameState.current.entry[s]?.id === fragment.id) {
          GameState.current.entry[s] = null;
        }
      });

      GameState.current.entry[slot] = fragment;
      GameState.current.usedFragments.add(fragment.id);
      this.emit('fragmentPlaced', { slot, fragment });
    }
  },

  // Remove fragment from slot
  removeFragment(slot) {
    const fragment = GameState.current.entry[slot];
    if (fragment) {
      GameState.current.usedFragments.delete(fragment.id);
      GameState.current.entry[slot] = null;
      this.emit('fragmentRemoved', { slot, fragment });
    }
  },

  // Mark investigation action as complete
  completeAction(actionId) {
    GameState.current.completedActions.add(actionId);
    this.emit('actionCompleted', actionId);
  },

  // Use time for investigation
  useTime(hours) {
    GameState.timeRemaining = Math.max(0, GameState.timeRemaining - hours);
    this.emit('timeUpdate', GameState.timeRemaining);
    return GameState.timeRemaining;
  },

  // Unlock memory
  unlockMemory(memoryId) {
    if (memoryId in GameState.memories && !GameState.memories[memoryId]) {
      GameState.memories[memoryId] = true;
      this.emit('memoryUnlocked', memoryId);
      return true;
    }
    return false;
  },

  // Submit entry and advance
  submitEntry() {
    const entry = { ...GameState.current.entry };
    const composedText = this.composeEntryText();

    GameState.log.push({
      week: GameState.week,
      entry: entry,
      text: composedText,
      timestamp: Date.now()
    });

    this.emit('entrySubmitted', { entry, text: composedText });
    return { entry, text: composedText };
  },

  // Compose entry text from fragments
  composeEntryText() {
    const e = GameState.current.entry;
    const parts = [];

    if (e.tone) parts.push(e.tone.text);
    if (e.subject) parts.push(e.subject.text);
    if (e.action) parts.push(e.action.text);
    if (e.object) parts.push(e.object.text);
    if (e.context) parts.push(e.context.text);

    return parts.join(' ').trim() + '.';
  },

  // Check if entry is complete
  isEntryComplete() {
    const e = GameState.current.entry;
    return e.subject !== null && e.action !== null;
  },

  // Advance to next phase
  advancePhase() {
    const phases = ['dawn', 'day', 'dusk', 'night'];
    const currentIndex = phases.indexOf(GameState.phase);

    if (currentIndex < phases.length - 1) {
      GameState.phase = phases[currentIndex + 1];
    } else {
      // Move to next week
      this.advanceWeek();
    }

    this.emit('phaseChange', GameState.phase);
  },

  // Advance to next week
  advanceWeek() {
    if (GameState.week < 5) {
      GameState.week++;
      GameState.phase = 'dawn';
      GameState.timeRemaining = 4;
      GameState.current = {
        fragments: [],
        usedFragments: new Set(),
        completedActions: new Set(),
        entry: {
          tone: null,
          subject: null,
          action: null,
          object: null,
          context: null
        }
      };
      this.emit('weekChange', GameState.week);
    } else {
      this.emit('gameEnd');
    }
  },

  // Reset game
  reset() {
    Object.assign(GameState, {
      week: 1,
      phase: 'dawn',
      timeRemaining: 4,
      villagers: {
        marta: { wellbeing: 60, trust: 50 },
        peter: { wellbeing: 65, trust: 45 },
        anna: { wellbeing: 70, trust: 65 },
        tomas: { wellbeing: 55, trust: 40 },
        lucia: { wellbeing: 70, trust: 50 },
        simao: { wellbeing: 60, trust: 55 },
        bela: { wellbeing: 65, trust: 60 },
        jakub: { wellbeing: 70, trust: 45 },
        helena: { wellbeing: 65, trust: 50 },
        oldSimao: { wellbeing: 50, trust: 55 }
      },
      story: {
        catchVerdict: null,
        talkedToPeter1: false,
        talkedToTomas1: false,
        consultedMarta1: false,
        examinedEvidence1: false,
        secretRevealed: false,
        documentsFound: false,
        priestConfided: false,
        talkedToAnna2: false,
        visitedPriest2: false,
        confrontedMarta2: false,
        searchedChapel2: false,
        luciaExposed: false,
        luciaProtected: false,
        luciaRomanceBlessed: false,
        talkedToLucia3: false,
        talkedToTomas3: false,
        heardMarta3: false,
        observedThem3: false,
        blamedTomas: false,
        blamedPeter: false,
        blamedNoOne: false,
        sabotageAlleged: false,
        annaTestified: false,
        heardPeter4: false,
        heardTomas4: false,
        askedAnna4: false,
        examinedRope4: false,
        wroteAboutSelf: false,
        signedLog: null,
        finalMarta: false,
        finalTomas: false,
        finalLucia: false,
        finalSimao: false,
        wroteAboutSelf5: false,
        tension: 20,
        truthCount: 0,
        mercyCount: 0,
        selfServingCount: 0
      },
      memories: {
        firstRecord: false,
        theAccused: false,
        theWife: false,
        theEvidence: false,
        theName: false
      },
      current: {
        fragments: [],
        usedFragments: new Set(),
        completedActions: new Set(),
        entry: {
          tone: null,
          subject: null,
          action: null,
          object: null,
          context: null
        }
      },
      log: [],
      ui: {
        selectedVillager: null,
        activeModal: null,
        audioEnabled: false,
        reducedMotion: false
      }
    });
    this.emit('gameReset');
  },

  // Simple event system
  _listeners: {},

  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  },

  off(event, callback) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
    }
  },

  emit(event, data) {
    if (this._listeners[event]) {
      this._listeners[event].forEach(callback => callback(data));
    }
  },

  // Save/Load (localStorage)
  save() {
    const saveData = {
      ...GameState,
      current: {
        ...GameState.current,
        usedFragments: Array.from(GameState.current.usedFragments),
        completedActions: Array.from(GameState.current.completedActions)
      }
    };
    localStorage.setItem('lighthouseKeeper_save', JSON.stringify(saveData));
  },

  load() {
    const saved = localStorage.getItem('lighthouseKeeper_save');
    if (saved) {
      const data = JSON.parse(saved);
      data.current.usedFragments = new Set(data.current.usedFragments);
      data.current.completedActions = new Set(data.current.completedActions);
      Object.assign(GameState, data);
      this.emit('gameLoaded');
      return true;
    }
    return false;
  },

  hasSave() {
    return localStorage.getItem('lighthouseKeeper_save') !== null;
  },

  clearSave() {
    localStorage.removeItem('lighthouseKeeper_save');
  }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameState, StateManager };
}
