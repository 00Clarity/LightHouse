// UI Rendering System for The Lighthouse Keeper

const Renderer = {
  // Initialize UI elements
  init() {
    this.cacheElements();
    this.bindEvents();
  },

  // Cache DOM elements for performance
  cacheElements() {
    this.elements = {
      weekNumber: document.getElementById('week-number'),
      phaseLabel: document.getElementById('phase-label'),
      phaseDisplay: document.querySelector('.phase-display'),
      timeRemaining: document.getElementById('time-remaining'),
      tensionFill: document.getElementById('tension-fill'),
      tensionVignette: document.getElementById('tension-vignette'),
      villagerList: document.getElementById('villager-list'),
      eventTitle: document.getElementById('event-title'),
      eventDescription: document.getElementById('event-description'),
      actionGrid: document.getElementById('action-grid'),
      testimonyContainer: document.getElementById('testimony-container'),
      logWeek: document.getElementById('log-week'),
      entryPreview: document.getElementById('entry-preview'),
      submitBtn: document.getElementById('btn-submit-entry'),
      fragmentList: document.getElementById('fragment-list'),
      slots: {
        tone: document.getElementById('slot-tone'),
        subject: document.getElementById('slot-subject'),
        action: document.getElementById('slot-action'),
        object: document.getElementById('slot-object'),
        context: document.getElementById('slot-context')
      }
    };
    // Debug: log which elements were found
    console.log('cacheElements: Found elements:', {
      villagerList: !!this.elements.villagerList,
      eventTitle: !!this.elements.eventTitle,
      eventDescription: !!this.elements.eventDescription,
      actionGrid: !!this.elements.actionGrid,
      fragmentList: !!this.elements.fragmentList
    });
  },

  // Bind UI events
  bindEvents() {
    // Submit button
    if (this.elements.submitBtn) {
      this.elements.submitBtn.addEventListener('click', () => {
        if (typeof Game !== 'undefined') {
          Game.submitEntry();
        }
      });
    }
  },

  // Update header displays
  updateHeader(state) {
    if (this.elements.weekNumber) {
      this.elements.weekNumber.textContent = state.week;
    }

    if (this.elements.phaseLabel) {
      this.elements.phaseLabel.textContent = state.phase.charAt(0).toUpperCase() + state.phase.slice(1);
    }

    if (this.elements.phaseDisplay) {
      this.elements.phaseDisplay.setAttribute('data-phase', state.phase);
    }

    if (this.elements.timeRemaining) {
      this.elements.timeRemaining.textContent = state.timeRemaining;
    }

    if (this.elements.logWeek) {
      this.elements.logWeek.textContent = `Week ${state.week} Entry`;
    }
  },

  // Update tension meter
  updateTension(tension) {
    if (this.elements.tensionFill) {
      this.elements.tensionFill.style.width = `${tension}%`;

      // Update color based on level
      const level = ConsequenceEngine.getTensionLevel(tension);
      this.elements.tensionFill.parentElement.setAttribute('data-tension', level);
    }

    // Update vignette
    if (this.elements.tensionVignette) {
      const level = ConsequenceEngine.getTensionLevel(tension);
      this.elements.tensionVignette.className = `tension-${level}`;
    }
  },

  // Render villager list
  renderVillagers(villagers, involvedIds = [], completedActions) {
    console.log('renderVillagers called:', { hasElement: !!this.elements.villagerList, villagers, involvedIds });
    if (!this.elements.villagerList) {
      console.warn('renderVillagers: No villagerList element!');
      return;
    }

    // Ensure completedActions is a Set
    const actions = completedActions instanceof Set ? completedActions : new Set();

    const villagerIds = ['marta', 'peter', 'anna', 'tomas', 'lucia', 'simao', 'bela', 'jakub', 'helena'];
    console.log('renderVillagers: Checking Villagers global:', typeof Villagers, Villagers ? Object.keys(Villagers) : 'undefined');

    this.elements.villagerList.innerHTML = villagerIds.map(id => {
      const villager = Villagers[id];
      const stats = villagers[id];
      if (!villager || !stats) return '';

      const isInvolved = involvedIds.includes(id);
      const hasSpoken = actions.has(`talk_${id}_${GameState.week}`) ||
                        actions.has(`final_${id}`);

      const wellbeingPercent = stats.wellbeing;
      const trustPercent = stats.trust;

      return `
        <div class="villager-card family-${villager.family} ${isInvolved ? 'involved' : ''} ${hasSpoken ? 'spoken' : ''}"
             data-villager="${id}"
             tabindex="0"
             role="button"
             aria-label="${villager.name}, ${villager.role}">
          <div class="villager-portrait">${this.getVillagerEmoji(id)}</div>
          <div class="villager-info">
            <div class="villager-name">${villager.name}</div>
            <div class="villager-role">${villager.role}</div>
          </div>
          <div class="villager-stats">
            <div class="stat-bar" title="Wellbeing: ${wellbeingPercent}%">
              <div class="stat-fill wellbeing" style="width: ${wellbeingPercent}%"></div>
            </div>
            <div class="stat-bar" title="Trust: ${trustPercent}%">
              <div class="stat-fill trust" style="width: ${trustPercent}%"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers
    this.elements.villagerList.querySelectorAll('.villager-card').forEach(card => {
      card.addEventListener('click', () => {
        const villagerId = card.dataset.villager;
        this.showVillagerDetail(villagerId);
      });
    });
  },

  // Get emoji representation for villager
  getVillagerEmoji(villagerId) {
    const emojis = {
      marta: '&#128100;',   // bust silhouette (elder)
      peter: '&#9875;',    // anchor (fisherman)
      anna: '&#128138;',   // medical symbol
      tomas: '&#128736;',  // hammer (craftsman)
      lucia: '&#127800;',  // flower
      simao: '&#9764;',    // church/cross
      bela: '&#128016;',   // goat
      jakub: '&#127754;',  // wave
      helena: '&#127863;', // wine glass
      oldSimao: '&#128104;&#8205;&#129459;' // old man
    };
    return emojis[villagerId] || '&#128100;';
  },

  // Show villager detail modal
  showVillagerDetail(villagerId) {
    const villager = Villagers[villagerId];
    const stats = GameState.villagers[villagerId];
    if (!villager || !stats) return;

    if (typeof Modals !== 'undefined') {
      Modals.showVillagerDetail(villager, stats);
    }
  },

  // Render event and investigation options
  renderEvent(event, timeRemaining, completedActions) {
    console.log('renderEvent called:', { event, timeRemaining });
    if (!event) {
      console.warn('renderEvent: No event provided');
      return;
    }

    console.log('renderEvent: Setting title to:', event.title);
    if (this.elements.eventTitle && event.title) {
      this.elements.eventTitle.textContent = event.title;
    }

    console.log('renderEvent: Setting description, hasElement:', !!this.elements.eventDescription, 'descLength:', event.description?.length);
    if (this.elements.eventDescription && event.description) {
      const desc = typeof event.description === 'string' ? event.description : '';
      this.elements.eventDescription.innerHTML = desc.split('\n\n').map(p => `<p>${p}</p>`).join('');
      console.log('renderEvent: Description innerHTML set, length:', this.elements.eventDescription.innerHTML.length);
    }

    console.log('renderEvent: Rendering actions, count:', event.actions?.length);
    if (event.actions) {
      this.renderActions(event.actions, timeRemaining, completedActions);
    }
  },

  // Render investigation action cards
  renderActions(actions, timeRemaining, completedActions) {
    console.log('renderActions called:', { actionsCount: actions?.length, timeRemaining, hasGrid: !!this.elements.actionGrid });
    if (!this.elements.actionGrid) {
      console.warn('renderActions: No actionGrid element!');
      return;
    }
    if (!actions || !Array.isArray(actions)) {
      console.warn('renderActions: Invalid actions array');
      return;
    }

    // Ensure completedActions is a Set
    const completed = completedActions instanceof Set ? completedActions : new Set();

    this.elements.actionGrid.innerHTML = actions.map(action => {
      const isCompleted = completed.has(action.id);
      const canAfford = action.cost <= timeRemaining;
      const isDisabled = isCompleted || !canAfford;

      return `
        <div class="action-card ${isCompleted ? 'completed' : ''} ${isDisabled && !isCompleted ? 'disabled' : ''}"
             data-action="${action.id}"
             data-cost="${action.cost}"
             tabindex="${isDisabled ? '-1' : '0'}"
             role="button"
             aria-disabled="${isDisabled}">
          <div class="action-title">${action.title}</div>
          <div class="action-cost">${action.cost} hour${action.cost > 1 ? 's' : ''}</div>
          <div class="action-description">${action.description}</div>
        </div>
      `;
    }).join('');

    // Add click handlers
    this.elements.actionGrid.querySelectorAll('.action-card:not(.disabled):not(.completed)').forEach(card => {
      card.addEventListener('click', () => {
        const actionId = card.dataset.action;
        if (typeof Game !== 'undefined') {
          Game.performAction(actionId);
        }
      });
    });
  },

  // Show testimony after investigation
  showTestimony(testimony, villager) {
    if (!this.elements.testimonyContainer || !testimony) return;

    this.elements.testimonyContainer.style.display = 'block';
    this.elements.testimonyContainer.innerHTML = `
      <div class="testimony-speaker">
        <div class="testimony-portrait">${villager ? this.getVillagerEmoji(villager.id) : ''}</div>
        <div class="testimony-name">${villager ? villager.name : 'Your observation'}</div>
      </div>
      <blockquote class="testimony-text">${testimony.text}</blockquote>
      <p class="testimony-observation">${testimony.observation}</p>
      ${testimony.fragments ? `
        <div class="fragments-gained">
          <div class="fragments-gained-title">Fragments gathered:</div>
          ${testimony.fragments.map(fragId => {
            const frag = this.getFragmentById(fragId);
            return frag ? `<span class="fragment-preview">"${frag.text}"</span>` : '';
          }).join('')}
        </div>
      ` : ''}
    `;

    // Scroll to testimony
    this.elements.testimonyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // Hide testimony
  hideTestimony() {
    if (this.elements.testimonyContainer) {
      this.elements.testimonyContainer.style.display = 'none';
    }
  },

  // Get fragment by ID from all sources
  getFragmentById(fragId) {
    // Check base fragments
    if (BaseFragments[fragId]) return BaseFragments[fragId];

    // Check week fragments
    for (const weekKey in WeekFragments) {
      if (WeekFragments[weekKey][fragId]) {
        return WeekFragments[weekKey][fragId];
      }
    }
    return null;
  },

  // Render fragment tray
  renderFragments(fragments, usedFragments) {
    if (!this.elements.fragmentList) return;
    if (!fragments || !Array.isArray(fragments)) return;

    // Ensure usedFragments is a Set
    const used = usedFragments instanceof Set ? usedFragments : new Set();

    // Group fragments by type
    const grouped = {
      tone: [],
      subject: [],
      action: [],
      object: [],
      context: []
    };

    fragments.forEach(frag => {
      if (grouped[frag.type]) {
        grouped[frag.type].push(frag);
      }
    });

    // Render all fragments
    let html = '';
    Object.keys(grouped).forEach(type => {
      grouped[type].forEach(frag => {
        const isUsed = used.has(frag.id);
        html += `
          <div class="fragment ${isUsed ? 'used' : ''}"
               data-fragment-id="${frag.id}"
               data-type="${frag.type}"
               draggable="${!isUsed}"
               tabindex="0"
               title="${frag.description || ''}"
               aria-label="${frag.text}">
            "${frag.text}"
          </div>
        `;
      });
    });

    this.elements.fragmentList.innerHTML = html;

    // Initialize drag handlers
    if (typeof FragmentUI !== 'undefined') {
      FragmentUI.initDragHandlers();
    }
  },

  // Update entry slot
  updateSlot(slot, fragment) {
    const slotEl = this.elements.slots[slot];
    if (!slotEl) return;

    const slotContainer = slotEl.parentElement;

    if (fragment) {
      slotEl.textContent = `"${fragment.text}"`;
      slotContainer.classList.add('filled');
    } else {
      slotEl.textContent = '';
      slotContainer.classList.remove('filled');
    }

    this.updateEntryPreview();
  },

  // Clear all entry slots (for week transitions)
  clearEntrySlots() {
    const slotTypes = ['tone', 'subject', 'action', 'object', 'context'];
    slotTypes.forEach(slot => {
      this.updateSlot(slot, null);
    });
  },

  // Update entry preview
  updateEntryPreview() {
    if (!this.elements.entryPreview) return;

    const entry = GameState.current.entry;
    const parts = [];

    if (entry.tone) parts.push(entry.tone.text);
    if (entry.subject) parts.push(entry.subject.text);
    if (entry.action) parts.push(entry.action.text);
    if (entry.object) parts.push(entry.object.text);
    if (entry.context) parts.push(entry.context.text);

    if (parts.length === 0) {
      this.elements.entryPreview.innerHTML = '<em>Compose your entry by dragging fragments into the slots above...</em>';
    } else {
      const text = parts.join(' ').trim();
      this.elements.entryPreview.textContent = text + (text.endsWith('.') ? '' : '.');
    }

    // Update submit button state
    this.updateSubmitButton();
  },

  // Update submit button state
  updateSubmitButton() {
    if (!this.elements.submitBtn) return;

    const entry = GameState.current.entry;
    const canSubmit = entry.subject !== null && entry.action !== null;

    this.elements.submitBtn.disabled = !canSubmit;
  },

  // Show consequence results
  showConsequences(entry, effects) {
    if (typeof Modals !== 'undefined') {
      Modals.showConsequences(entry, effects);
    }
  },

  // Show week transition
  showWeekTransition(week, callback) {
    const transition = document.getElementById('week-transition');
    const weekText = document.getElementById('transition-week');
    const phaseText = document.getElementById('transition-subtext');

    if (!transition || !weekText) {
      if (callback) callback();
      return;
    }

    const weekTitles = {
      1: 'The Disputed Catch',
      2: "The Priest's Fever",
      3: 'The Secret Meetings',
      4: "The Storm's Toll",
      5: 'The Reckoning'
    };

    weekText.textContent = `Week ${week}: ${weekTitles[week] || ''}`;
    if (phaseText) {
      phaseText.textContent = week === 5 ? 'Your final night' : 'A new dawn';
    }

    transition.classList.add('active');

    setTimeout(() => {
      transition.classList.remove('active');
      if (callback) callback();
    }, 3000);
  },

  // Enable rain effect
  enableRain() {
    const container = document.getElementById('rain-container');
    if (!container) return;

    // Clear existing
    container.innerHTML = '';

    // Create raindrops
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.3 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      drop.style.opacity = 0.3 + Math.random() * 0.4;
      container.appendChild(drop);
    }

    container.classList.add('active');
  },

  // Disable rain effect
  disableRain() {
    const container = document.getElementById('rain-container');
    if (container) {
      container.classList.remove('active');
    }
  },

  // Enable fog effect (Week 5)
  enableFog() {
    const fog = document.getElementById('fog-overlay');
    if (fog) {
      fog.classList.add('active');
    }
  },

  // Flash lighthouse beam
  flashBeam() {
    const beam = document.getElementById('lighthouse-beam');
    if (beam) {
      beam.classList.add('flare');
      setTimeout(() => beam.classList.remove('flare'), 500);
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Renderer };
}
