// Memory System for The Lighthouse Keeper

const MemoryContent = {
  firstRecord: {
    trigger: "As you examine the ambiguous evidence, something stirs in you.",
    text: `You remember another desk. Another set of facts that could have meant anything.

A man's name on a document. Evidence that pointed both ways. You had to decide. Someone had to decide.

You wrote him as guilty. The words came easily — too easily, perhaps. You told yourself the evidence was clear. You told yourself you were just doing your job.

Three months later, he was dead. Executed on your record.

You wonder, sometimes, if you were right. You'll never know. That's the weight you carry.`
  },

  theAccused: {
    trigger: "The priest speaks of confession. Of secrets carried too long.",
    text: `You wanted to confess, once. After.

You went to the chapel in the city — not your usual one, somewhere no one knew you. You sat in the booth and tried to find the words.

"I may have killed an innocent man."

But the words wouldn't come. What would absolution mean, if you couldn't undo what you'd done? What would forgiveness change?

You left without speaking. You've never been back.

That's when you started looking for somewhere far away. Somewhere records didn't matter. You found this lighthouse. You thought you could escape.

You were wrong.`
  },

  theWife: {
    trigger: "Lucia begs you, her eyes full of desperate hope.",
    text: `There was a woman. The accused man's wife.

She came to your office the day before the execution. She begged. She brought their children — a boy and a girl, younger than Lucia.

"Please," she said. "There must be something. Some doubt. Some mercy."

You told her the record was final. You told her the evidence was clear. You told yourself these things too, because if you didn't believe them, how could you live with what you'd done?

She looked at you the way Lucia is looking at you now.

You wonder, sometimes, what happened to her. To the children. You've never tried to find out.`
  },

  theEvidence: {
    trigger: "You examine the physical evidence, and it tells you nothing certain.",
    text: `The evidence in his case was like this. Ambiguous. Interpretable.

A witness who might have been mistaken. Documents that could have been forged. Testimony that contradicted itself in small ways — the ways real memory contradicts itself, or the ways lies do.

You could have written it either way. You chose guilt.

Why? You've asked yourself a thousand times. Because it was easier? Because someone above you wanted it? Because you genuinely believed?

You don't remember anymore. That's the worst part. You've told yourself so many stories about that day that the truth is lost somewhere underneath.

All that's left is the weight.`
  },

  theName: {
    trigger: "You prepare to write about yourself, and everything comes back.",
    text: `His name was Alejandro Veras.

You hadn't thought his name in years. You'd buried it under lighthouse duties and village records and careful distance.

But here, now, writing about yourself — about the Keeper, about who you've been — his name comes back.

Alejandro Veras. A clerk accused of embezzlement. A man with a family. A man whose fate crossed your desk on an ordinary Tuesday.

You made him guilty with your pen.

You made yourself a murderer. Or an instrument of justice. You still don't know which.

The record is never the event. But when the record is all anyone has...

What will you write about yourself, Keeper? What truth? What mercy? What silence?`
  }
};

const MemorySystem = {
  // Show memory overlay
  showMemory(memoryId, callback) {
    const memory = MemoryContent[memoryId];
    if (!memory) {
      if (callback) callback();
      return;
    }

    const overlay = document.getElementById('memory-overlay');
    const triggerEl = document.getElementById('memory-trigger');
    const textEl = document.getElementById('memory-text');
    const dismissBtn = document.getElementById('memory-dismiss');

    if (!overlay || !triggerEl || !textEl) {
      if (callback) callback();
      return;
    }

    // Set content
    triggerEl.textContent = memory.trigger;
    textEl.innerHTML = memory.text.split('\n\n').map(p => `<p>${p}</p>`).join('');

    // Show overlay
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');

    // Play memory sound if audio engine exists
    if (typeof AudioEngine !== 'undefined' && AudioEngine.playMemoryTrigger) {
      AudioEngine.playMemoryTrigger();
    }

    // Handle dismiss
    const handleDismiss = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      dismissBtn.removeEventListener('click', handleDismiss);
      if (callback) callback();
    };

    dismissBtn.addEventListener('click', handleDismiss);

    // Also allow ESC to dismiss
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  },

  // Check if an action should trigger a memory
  checkTrigger(actionId, week, storyFlags) {
    const triggers = {
      'examine_evidence_1': 'firstRecord',
      'visit_priest_2': 'theAccused',
      'talk_lucia_3': 'theWife',
      'hear_peter_4': 'theEvidence',
      'examine_rope_4': 'theEvidence',
      'write_about_self': 'theName'
    };

    return triggers[actionId] || null;
  },

  // Get memory content for display elsewhere
  getMemoryContent(memoryId) {
    return MemoryContent[memoryId] || null;
  },

  // Check if all memories have been unlocked
  allMemoriesUnlocked(memories) {
    return Object.values(memories).every(v => v === true);
  },

  // Get unlocked memory count
  getUnlockedCount(memories) {
    return Object.values(memories).filter(v => v === true).length;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MemoryContent, MemorySystem };
}
