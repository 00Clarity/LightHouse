// Modal System for The Lighthouse Keeper

const Modals = {
  activeModal: null,

  // Show villager detail modal
  showVillagerDetail(villager, stats) {
    const content = `
      <div class="villager-detail">
        <div class="villager-detail-header">
          <div class="villager-detail-portrait">${Renderer.getVillagerEmoji(villager.id)}</div>
          <div class="villager-detail-info">
            <h3 class="villager-detail-name">${villager.name}</h3>
            <div class="villager-detail-meta">
              <span class="villager-age">Age ${villager.age}</span>
              <span class="villager-family family-${villager.family}">${villager.family}</span>
              <span class="villager-role-detail">${villager.role}</span>
            </div>
          </div>
        </div>

        <div class="villager-detail-stats">
          <div class="stat-row">
            <span class="stat-label">Wellbeing</span>
            <div class="stat-bar-large">
              <div class="stat-fill wellbeing" style="width: ${stats.wellbeing}%"></div>
            </div>
            <span class="stat-value">${stats.wellbeing}%</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Trust in You</span>
            <div class="stat-bar-large">
              <div class="stat-fill trust" style="width: ${stats.trust}%"></div>
            </div>
            <span class="stat-value">${stats.trust}%</span>
          </div>
        </div>

        <div class="villager-detail-description">
          <p>${villager.description.visible}</p>
        </div>

        <div class="villager-detail-dialogue">
          <p class="dialogue-quote">"${getDialogue(villager.id, stats.trust)}"</p>
        </div>
      </div>
    `;

    this.show('Villager', content);
  },

  // Show consequence modal after entry submission
  showConsequences(entryText, effects) {
    const consequenceModal = document.getElementById('consequence-modal');
    const entryEl = document.getElementById('consequence-entry');
    const effectsEl = document.getElementById('consequence-effects');
    const continueBtn = document.getElementById('consequence-continue');

    if (!consequenceModal || !entryEl || !effectsEl) return;

    // Show the entry text
    entryEl.innerHTML = `<blockquote class="entry-text entry-locked">"${entryText}"</blockquote>`;

    // Show effects
    effectsEl.innerHTML = effects.map((effect, i) => {
      let icon = '';
      let colorClass = '';

      if (effect.type === 'villager') {
        if (effect.delta > 0) {
          icon = '&#9650;'; // up arrow
          colorClass = 'effect-positive';
        } else {
          icon = '&#9660;'; // down arrow
          colorClass = 'effect-negative';
        }
        return `
          <div class="consequence-item ${colorClass}" style="animation-delay: ${i * 0.1}s">
            <span class="effect-icon">${icon}</span>
            <span class="effect-target">${effect.target}</span>
            <span class="effect-stat">${effect.stat}</span>
            <span class="effect-reason">${effect.reason}</span>
          </div>
        `;
      } else if (effect.type === 'tension') {
        if (effect.delta > 0) {
          icon = '&#9888;'; // warning
          colorClass = 'effect-warning';
        } else {
          icon = '&#9734;'; // star
          colorClass = 'effect-positive';
        }
        return `
          <div class="consequence-item ${colorClass}" style="animation-delay: ${i * 0.1}s">
            <span class="effect-icon">${icon}</span>
            <span class="effect-target">Village Tension</span>
            <span class="effect-delta">${effect.delta > 0 ? '+' : ''}${effect.delta}</span>
            <span class="effect-reason">${effect.reason}</span>
          </div>
        `;
      } else if (effect.type === 'story') {
        return `
          <div class="consequence-item effect-story" style="animation-delay: ${i * 0.1}s">
            <span class="effect-icon">&#128220;</span>
            <span class="effect-reason">${effect.reason}</span>
          </div>
        `;
      }
      return '';
    }).join('');

    // Show modal
    consequenceModal.style.display = 'flex';

    // Play entry lock sound
    if (typeof AudioEngine !== 'undefined' && AudioEngine.playEntryLock) {
      AudioEngine.playEntryLock();
    }

    // Flash the lighthouse beam
    Renderer.flashBeam();

    // Handle continue
    const handleContinue = () => {
      consequenceModal.style.display = 'none';
      continueBtn.removeEventListener('click', handleContinue);

      // Progress to next phase/week
      if (typeof Game !== 'undefined') {
        Game.progressAfterEntry();
      }
    };

    continueBtn.addEventListener('click', handleContinue);
  },

  // Show ending modal
  showEnding(ending, endingText) {
    const content = `
      <div class="ending-content">
        <h2 class="ending-title">The Record is Complete</h2>

        <div class="ending-summary">
          <div class="ending-badge village-${ending.village}">${ending.village.toUpperCase()}</div>
          <div class="ending-badge keeper-${ending.keeper}">The ${ending.keeper.charAt(0).toUpperCase() + ending.keeper.slice(1)} Keeper</div>
          <div class="ending-badge secret-${ending.secret}">The Truth ${ending.secret === 'revealed' ? 'Revealed' : 'Buried'}</div>
          <div class="ending-badge signature-${ending.signature}">${ending.signature === 'signed' ? 'Signed' : 'Anonymous'}</div>
        </div>

        <div class="ending-text">
          <p>${endingText}</p>
        </div>

        <div class="ending-footer">
          <p class="ending-quote">"The record is never the event. But when the record is all anyone has, the record becomes the truth."</p>
          <button class="modal-btn" onclick="Game.restart()">Begin Again</button>
        </div>
      </div>
    `;

    this.show('Ending', content, false); // No close button
  },

  // Show signature choice modal (Week 5)
  showSignatureChoice(callback) {
    const content = `
      <div class="signature-choice">
        <h3>The Final Entry</h3>
        <p class="signature-prompt">Your record is complete. Will you sign your name?</p>

        <div class="signature-options">
          <button class="signature-btn sign" data-choice="sign">
            <span class="signature-icon">&#9998;</span>
            <span class="signature-label">Sign Your Name</span>
            <span class="signature-desc">You take ownership. This is your record.</span>
          </button>

          <button class="signature-btn anonymous" data-choice="anonymous">
            <span class="signature-icon">&#128100;</span>
            <span class="signature-label">Leave Anonymous</span>
            <span class="signature-desc">The record exists, but you're not attached to it.</span>
          </button>
        </div>
      </div>
    `;

    this.show('The Final Choice', content, false);

    // Handle button clicks
    document.querySelectorAll('.signature-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        this.close();
        callback(choice === 'sign');
      });
    });
  },

  // Generic show modal
  show(title, content, showClose = true) {
    // Create modal if doesn't exist
    let modal = document.getElementById('generic-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'generic-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title"></h3>
            <button class="modal-close" aria-label="Close">&times;</button>
          </div>
          <div class="modal-body"></div>
        </div>
      `;
      document.body.appendChild(modal);

      // Add styles
      this.addModalStyles();
    }

    const titleEl = modal.querySelector('.modal-title');
    const bodyEl = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');

    titleEl.textContent = title;
    bodyEl.innerHTML = content;
    closeBtn.style.display = showClose ? 'block' : 'none';

    modal.style.display = 'flex';
    modal.classList.add('modal-entering');

    setTimeout(() => {
      modal.classList.remove('modal-entering');
    }, 300);

    this.activeModal = modal;

    // Close handlers
    if (showClose) {
      closeBtn.onclick = () => this.close();
      modal.onclick = (e) => {
        if (e.target === modal) this.close();
      };
    }

    // ESC to close
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showClose) {
        this.close();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  },

  // Close active modal
  close() {
    if (this.activeModal) {
      this.activeModal.classList.add('modal-exiting');
      setTimeout(() => {
        this.activeModal.style.display = 'none';
        this.activeModal.classList.remove('modal-exiting');
        this.activeModal = null;
      }, 200);
    }
  },

  // Add modal styles dynamically
  addModalStyles() {
    if (document.getElementById('modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(10, 20, 25, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }

      .modal-content {
        background: var(--sea-mid);
        border: 1px solid rgba(240, 200, 96, 0.2);
        border-radius: var(--radius-lg);
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-md) var(--space-lg);
        border-bottom: 1px solid rgba(240, 200, 96, 0.1);
      }

      .modal-title {
        margin: 0;
        font-size: 1.125rem;
        color: var(--land-light);
      }

      .modal-close {
        background: none;
        border: none;
        color: var(--sea-foam);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }

      .modal-close:hover {
        color: var(--land-light);
      }

      .modal-body {
        padding: var(--space-lg);
      }

      .modal-btn {
        padding: var(--space-md) var(--space-lg);
        background: var(--land-dark);
        color: var(--land-light);
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-family: var(--font-system);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-top: var(--space-md);
      }

      .modal-btn:hover {
        background: var(--land-wood);
      }

      /* Villager detail styles */
      .villager-detail-header {
        display: flex;
        gap: var(--space-md);
        margin-bottom: var(--space-lg);
      }

      .villager-detail-portrait {
        font-size: 3rem;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--sea-surface);
        border-radius: 50%;
      }

      .villager-detail-name {
        margin: 0 0 var(--space-xs) 0;
      }

      .villager-detail-meta {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;
        font-size: 0.8125rem;
        color: var(--sea-foam);
      }

      .villager-detail-stats {
        margin-bottom: var(--space-lg);
      }

      .stat-row {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        margin-bottom: var(--space-sm);
      }

      .stat-label {
        width: 100px;
        font-size: 0.8125rem;
        color: var(--sea-foam);
      }

      .stat-bar-large {
        flex: 1;
        height: 8px;
        background: var(--sea-surface);
        border-radius: 4px;
        overflow: hidden;
      }

      .stat-value {
        width: 40px;
        text-align: right;
        font-family: var(--font-system);
        font-size: 0.8125rem;
      }

      .dialogue-quote {
        font-style: italic;
        color: var(--light-dim);
        padding-left: var(--space-md);
        border-left: 2px solid var(--sea-foam);
      }

      /* Consequence styles */
      .consequence-content {
        max-width: 600px;
      }

      .consequence-entry {
        margin-bottom: var(--space-lg);
      }

      .entry-text {
        font-family: var(--font-log);
        font-size: 1.0625rem;
        line-height: 1.8;
        margin: 0;
        padding: var(--space-md);
        background: rgba(232, 220, 200, 0.1);
        border-radius: var(--radius-md);
      }

      .consequence-effects {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .consequence-item {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        background: rgba(26, 45, 58, 0.3);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        opacity: 0;
        animation: consequence-appear 0.4s ease-out forwards;
      }

      .effect-icon {
        font-size: 1rem;
      }

      .effect-positive { border-left: 3px solid var(--light-verdant); }
      .effect-negative { border-left: 3px solid var(--light-danger); }
      .effect-warning { border-left: 3px solid var(--light-warning); }
      .effect-story { border-left: 3px solid var(--light-dim); }

      .effect-target {
        font-weight: 600;
        text-transform: capitalize;
      }

      .effect-reason {
        color: var(--sea-foam);
        margin-left: auto;
      }

      /* Signature choice styles */
      .signature-choice {
        text-align: center;
      }

      .signature-prompt {
        margin-bottom: var(--space-xl);
        font-size: 1.0625rem;
      }

      .signature-options {
        display: flex;
        gap: var(--space-md);
      }

      .signature-btn {
        flex: 1;
        padding: var(--space-lg);
        background: rgba(26, 45, 58, 0.3);
        border: 2px solid rgba(240, 200, 96, 0.2);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .signature-btn:hover {
        background: rgba(26, 45, 58, 0.5);
        border-color: var(--light-glow);
      }

      .signature-icon {
        display: block;
        font-size: 2rem;
        margin-bottom: var(--space-sm);
      }

      .signature-label {
        display: block;
        font-size: 1rem;
        color: var(--land-light);
        margin-bottom: var(--space-xs);
      }

      .signature-desc {
        display: block;
        font-size: 0.8125rem;
        color: var(--sea-foam);
      }

      /* Ending styles */
      .ending-content {
        text-align: center;
        padding: var(--space-lg);
      }

      .ending-title {
        font-size: 1.5rem;
        margin-bottom: var(--space-lg);
      }

      .ending-summary {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
        justify-content: center;
        margin-bottom: var(--space-xl);
      }

      .ending-badge {
        padding: var(--space-xs) var(--space-md);
        background: var(--sea-surface);
        border-radius: var(--radius-md);
        font-family: var(--font-system);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .ending-text {
        font-size: 1.0625rem;
        line-height: 1.8;
        margin-bottom: var(--space-xl);
      }

      .ending-quote {
        font-style: italic;
        color: var(--sea-foam);
        margin-bottom: var(--space-lg);
      }

      /* Start screen styles */
      .start-content {
        text-align: center;
        max-width: 600px;
        padding: var(--space-2xl);
      }

      .start-title {
        font-size: 2.5rem;
        margin-bottom: var(--space-md);
        opacity: 0;
      }

      .start-subtitle {
        font-size: 1.125rem;
        color: var(--sea-foam);
        margin-bottom: var(--space-xl);
        opacity: 0;
      }

      .start-buttons {
        display: flex;
        gap: var(--space-md);
        justify-content: center;
        margin-bottom: var(--space-xl);
        opacity: 0;
      }

      .start-btn {
        padding: var(--space-md) var(--space-xl);
        border: 2px solid;
        border-radius: var(--radius-md);
        font-family: var(--font-system);
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .start-btn.primary {
        background: var(--light-glow);
        border-color: var(--light-glow);
        color: var(--land-dark);
      }

      .start-btn.primary:hover {
        background: var(--light-dim);
        border-color: var(--light-dim);
      }

      .start-btn.secondary {
        background: transparent;
        border-color: var(--sea-foam);
        color: var(--land-light);
      }

      .start-btn.secondary:hover {
        border-color: var(--land-light);
      }

      .start-quote {
        font-style: italic;
        color: var(--sea-foam);
        line-height: 1.8;
        opacity: 0;
      }

      .icon-btn {
        background: transparent;
        border: 1px solid rgba(240, 200, 96, 0.2);
        color: var(--land-sand);
        padding: var(--space-sm);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: 1rem;
      }

      .icon-btn:hover {
        border-color: var(--light-glow);
        color: var(--land-light);
      }
    `;
    document.head.appendChild(styles);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Modals };
}
