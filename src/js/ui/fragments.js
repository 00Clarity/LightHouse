// Fragment Drag-and-Drop System for The Lighthouse Keeper

const FragmentUI = {
  draggedFragment: null,
  draggedElement: null,

  // Initialize drag handlers on all fragments
  initDragHandlers() {
    const fragments = document.querySelectorAll('.fragment:not(.used)');
    const slots = document.querySelectorAll('.entry-slot');

    // Fragment drag start
    fragments.forEach(frag => {
      frag.addEventListener('dragstart', this.handleDragStart.bind(this));
      frag.addEventListener('dragend', this.handleDragEnd.bind(this));

      // Keyboard support
      frag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleKeyboardSelect(frag);
        }
      });
    });

    // Slot drop handlers
    slots.forEach(slot => {
      slot.addEventListener('dragover', this.handleDragOver.bind(this));
      slot.addEventListener('dragleave', this.handleDragLeave.bind(this));
      slot.addEventListener('drop', this.handleDrop.bind(this));

      // Keyboard support
      slot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleKeyboardPlace(slot);
        }
      });

      // Click to remove
      slot.addEventListener('click', (e) => {
        if (slot.classList.contains('filled')) {
          this.handleSlotClick(slot);
        }
      });
    });
  },

  // Handle drag start
  handleDragStart(e) {
    const fragId = e.target.dataset.fragmentId;
    this.draggedFragment = this.getFragmentById(fragId);
    this.draggedElement = e.target;

    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', fragId);

    // Play sound
    if (typeof AudioEngine !== 'undefined' && AudioEngine.playUISound) {
      AudioEngine.playUISound('pickup');
    }
  },

  // Handle drag end
  handleDragEnd(e) {
    e.target.classList.remove('dragging');
    this.draggedFragment = null;
    this.draggedElement = null;

    // Remove drag-over from all slots
    document.querySelectorAll('.entry-slot').forEach(slot => {
      slot.classList.remove('drag-over');
    });
  },

  // Handle drag over slot
  handleDragOver(e) {
    e.preventDefault();
    const slot = e.currentTarget;
    const acceptedType = slot.dataset.accepts;

    // Check if fragment type matches slot
    if (this.draggedFragment && this.draggedFragment.type === acceptedType) {
      e.dataTransfer.dropEffect = 'move';
      slot.classList.add('drag-over');
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
  },

  // Handle drag leave slot
  handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  },

  // Handle drop on slot
  handleDrop(e) {
    e.preventDefault();
    const slot = e.currentTarget;
    slot.classList.remove('drag-over');

    const fragId = e.dataTransfer.getData('text/plain');
    const fragment = this.getFragmentById(fragId);
    const slotType = slot.dataset.slot;

    if (fragment && fragment.type === slot.dataset.accepts) {
      // Place fragment in slot
      StateManager.placeFragment(slotType, fragment);

      // Update UI
      Renderer.updateSlot(slotType, fragment);
      this.markFragmentUsed(fragId, true);

      // Play sound
      if (typeof AudioEngine !== 'undefined' && AudioEngine.playUISound) {
        AudioEngine.playUISound('place');
      }

      // Check for memory trigger
      const memoryId = checkMemoryTrigger(fragId);
      if (memoryId && !GameState.memories[memoryId]) {
        StateManager.unlockMemory(memoryId);
        MemorySystem.showMemory(memoryId);
      }
    }
  },

  // Handle keyboard selection of fragment
  handleKeyboardSelect(fragEl) {
    const fragId = fragEl.dataset.fragmentId;
    const fragment = this.getFragmentById(fragId);

    if (!fragment) return;

    // Find matching slot
    const slots = document.querySelectorAll('.entry-slot');
    let targetSlot = null;

    slots.forEach(slot => {
      if (slot.dataset.accepts === fragment.type && !slot.classList.contains('filled')) {
        targetSlot = slot;
      }
    });

    if (targetSlot) {
      const slotType = targetSlot.dataset.slot;
      StateManager.placeFragment(slotType, fragment);
      Renderer.updateSlot(slotType, fragment);
      this.markFragmentUsed(fragId, true);

      // Play sound
      if (typeof AudioEngine !== 'undefined' && AudioEngine.playUISound) {
        AudioEngine.playUISound('place');
      }
    }
  },

  // Handle keyboard placement into slot
  handleKeyboardPlace(slot) {
    // If slot is filled, remove fragment
    if (slot.classList.contains('filled')) {
      this.handleSlotClick(slot);
    }
  },

  // Handle clicking a filled slot to remove fragment
  handleSlotClick(slot) {
    const slotType = slot.dataset.slot;
    const fragment = GameState.current.entry[slotType];

    if (fragment) {
      // Remove from state
      StateManager.removeFragment(slotType);

      // Update UI
      Renderer.updateSlot(slotType, null);
      this.markFragmentUsed(fragment.id, false);

      // Play sound
      if (typeof AudioEngine !== 'undefined' && AudioEngine.playUISound) {
        AudioEngine.playUISound('remove');
      }
    }
  },

  // Mark fragment as used/unused in the tray
  markFragmentUsed(fragId, isUsed) {
    const fragEl = document.querySelector(`.fragment[data-fragment-id="${fragId}"]`);
    if (fragEl) {
      if (isUsed) {
        fragEl.classList.add('used');
        fragEl.setAttribute('draggable', 'false');
      } else {
        fragEl.classList.remove('used');
        fragEl.setAttribute('draggable', 'true');
      }
    }
  },

  // Get fragment by ID
  getFragmentById(fragId) {
    // Check current available fragments
    const available = GameState.current.fragments;
    let found = available.find(f => f.id === fragId);
    if (found) return found;

    // Check base fragments
    if (BaseFragments[fragId]) return { ...BaseFragments[fragId] };

    // Check week fragments
    for (const weekKey in WeekFragments) {
      if (WeekFragments[weekKey][fragId]) {
        return { ...WeekFragments[weekKey][fragId] };
      }
    }

    return null;
  },

  // Clear all slots
  clearAllSlots() {
    const slotTypes = ['tone', 'subject', 'action', 'object', 'context'];
    slotTypes.forEach(slotType => {
      const fragment = GameState.current.entry[slotType];
      if (fragment) {
        StateManager.removeFragment(slotType);
        Renderer.updateSlot(slotType, null);
        this.markFragmentUsed(fragment.id, false);
      }
    });
  },

  // Add new fragment with animation
  addFragmentWithAnimation(fragment) {
    StateManager.addFragment(fragment);

    // Re-render fragments
    const fragments = getAvailableFragments(GameState.week, GameState.story);
    GameState.current.fragments.forEach(f => {
      if (!fragments.find(af => af.id === f.id)) {
        fragments.push(f);
      }
    });

    Renderer.renderFragments(fragments, GameState.current.usedFragments);

    // Find and animate the new fragment
    const newFragEl = document.querySelector(`.fragment[data-fragment-id="${fragment.id}"]`);
    if (newFragEl) {
      newFragEl.classList.add('fragment-new');
      setTimeout(() => newFragEl.classList.remove('fragment-new'), 300);
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FragmentUI };
}
