// Story System for The Lighthouse Keeper

const StorySystem = {
  // Get current event with dynamic modifications based on story state
  getCurrentEvent(week, storyFlags, villagerStats) {
    const baseEvent = getEvent(week);
    if (!baseEvent) return null;

    // Clone to avoid mutating original
    const event = JSON.parse(JSON.stringify(baseEvent));

    // Modify description based on prior choices
    event.description = this.modifyDescription(event.description, week, storyFlags);

    // Modify actions based on state
    event.actions = event.actions.map(action => {
      return this.modifyAction(action, week, storyFlags, villagerStats);
    });

    return event;
  },

  // Modify event description based on prior choices
  modifyDescription(baseDescription, week, storyFlags) {
    let description = baseDescription;

    if (week === 2) {
      if (storyFlags.catchVerdict === 'peter') {
        description += '\n\nYou remember last week — how you ruled in favor of Peter. Tomas watches you now with guarded eyes.';
      } else if (storyFlags.catchVerdict === 'tomas') {
        description += '\n\nPeter has been drinking more since your ruling last week. He avoids looking at you.';
      }
    }

    if (week === 3) {
      if (storyFlags.secretRevealed) {
        description += '\n\nThe village is still reeling from what the priest revealed in his fever. Old wounds have reopened.';
      }
    }

    if (week === 4) {
      if (storyFlags.luciaExposed) {
        description += '\n\nLucia and Jakub have been forced apart. You see her sometimes, walking alone along the cliffs. She doesn\'t wave.';
      } else if (storyFlags.luciaProtected) {
        description += '\n\nYou\'ve seen Lucia and Jakub together more openly now. There\'s talk of an announcement.';
      }

      if (storyFlags.catchVerdict === 'damaging') {
        description += '\n\nThe tension between Shore and Newcomer has only grown since the catch dispute. Tonight\'s storm feels like a breaking point.';
      }
    }

    if (week === 5) {
      // Add summary of village state
      const tensionLevel = storyFlags.tension;
      if (tensionLevel >= 80) {
        description += '\n\nThe village is fractured. You see it in how people walk — giving wide berths, avoiding eyes. What you write tonight will define this place for years.';
      } else if (tensionLevel >= 50) {
        description += '\n\nTensions run high, but the village holds. People still greet each other, still trade, still pray together. There\'s hope, if fragile.';
      } else {
        description += '\n\nDespite everything, the village endures. There\'s warmth in the tavern, laughter by the boats. You\'ve helped keep something alive here.';
      }
    }

    return description;
  },

  // Modify action based on prior state
  modifyAction(action, week, storyFlags, villagerStats) {
    const modified = { ...action };

    // Check if action requires specific state
    if (modified.requiresState && week === 5) {
      modified.testimony = this.generateWeek5Testimony(modified.villager, storyFlags, villagerStats);
    }

    // Modify dialogue based on relationship
    if (modified.villager && modified.testimony) {
      const stats = villagerStats[modified.villager];
      if (stats) {
        if (stats.trust < 30) {
          modified.testimony = this.addSuspicion(modified.testimony, modified.villager);
        } else if (stats.trust > 70) {
          modified.testimony = this.addWarmth(modified.testimony, modified.villager);
        }
      }
    }

    // Week-specific modifications
    if (week === 4 && modified.villager === 'tomas') {
      if (storyFlags.catchVerdict === 'peter') {
        modified.testimony = this.modifyTomasWeek4Bitter(modified.testimony);
      } else if (storyFlags.catchVerdict === 'tomas') {
        modified.testimony = this.modifyTomasWeek4Hopeful(modified.testimony);
      }
    }

    return modified;
  },

  // Generate Week 5 testimony based on state
  generateWeek5Testimony(villagerId, storyFlags, villagerStats) {
    const dialogue = generateWeek5Dialogue(villagerId, storyFlags, villagerStats);
    if (!dialogue) return null;

    return {
      text: dialogue.text,
      observation: dialogue.observation,
      fragments: this.getWeek5Fragments(villagerId)
    };
  },

  // Get fragments available from Week 5 conversations
  getWeek5Fragments(villagerId) {
    const fragmentMap = {
      marta: ['w5_village_elder', 'w5_expressed_gratitude'],
      tomas: ['w5_tomas_requested'],
      lucia: ['w5_lucia_integrated'],
      simao: ['w5_simao_recovered']
    };
    return fragmentMap[villagerId] || [];
  },

  // Add suspicion overlay to testimony
  addSuspicion(testimony, villagerId) {
    if (!testimony) return testimony;

    const suspiciousAdditions = {
      peter: '\n\nHe watches you with hard eyes. Whatever goodwill might have existed is gone.',
      tomas: '\n\nHe keeps his distance, speaking formally. Trust, once broken, doesn\'t easily mend.',
      marta: '\n\nShe weighs every word carefully, giving nothing away. You\'ve proven yourself untrustworthy.',
      lucia: '\n\nShe flinches when you approach. The girl who trusted you is gone.',
      anna: '\n\nHer warmth has cooled. She knows what you are now.',
      simao: '\n\nHe offers wine, but his eyes are guarded. Even priests can lose faith in people.'
    };

    return {
      ...testimony,
      observation: testimony.observation + (suspiciousAdditions[villagerId] || '')
    };
  },

  // Add warmth overlay to testimony
  addWarmth(testimony, villagerId) {
    if (!testimony) return testimony;

    const warmAdditions = {
      peter: '\n\nThere\'s genuine respect in his voice now. You\'ve earned your place here.',
      tomas: '\n\nHe speaks to you like a friend. In his eyes, you see recognition — one outcast to another.',
      marta: '\n\nShe almost smiles. You\'ve proven yourself. The tests are over.',
      lucia: '\n\nShe takes your hand without thinking. You\'ve become someone she trusts.',
      anna: '\n\nShe looks at you differently now — like an equal, a confidant.',
      simao: '\n\nHe pours you the good wine. Some things don\'t need to be said.'
    };

    return {
      ...testimony,
      observation: testimony.observation + (warmAdditions[villagerId] || '')
    };
  },

  // Modify Tomas's Week 4 dialogue if he was betrayed in Week 1
  modifyTomasWeek4Bitter(testimony) {
    if (!testimony) return testimony;

    const bitterPreamble = `His voice is flat when he sees you.

"Back again. To write another record, I suppose. To decide another fate."

He doesn\'t look at you as he speaks.

`;

    return {
      ...testimony,
      text: bitterPreamble + testimony.text
    };
  },

  // Modify Tomas's Week 4 dialogue if he was supported in Week 1
  modifyTomasWeek4Hopeful(testimony) {
    if (!testimony) return testimony;

    const hopefulPreamble = `He greets you with a nod — almost warm.

"You were fair with me once. I hope you\'ll be fair now."

`;

    return {
      ...testimony,
      text: hopefulPreamble + testimony.text
    };
  },

  // Check available actions based on time
  getAvailableActions(event, timeRemaining, completedActions) {
    return event.actions.filter(action => {
      // Already completed
      if (completedActions.has(action.id)) return false;

      // Not enough time
      if (action.cost > timeRemaining) return false;

      return true;
    });
  },

  // Check if the week can be completed
  canCompleteWeek(entry) {
    // Need at least subject and action to submit
    return entry.subject !== null && entry.action !== null;
  },

  // Get ending type based on final state
  calculateEnding(storyFlags, villagerStats) {
    // Village state
    let villageEnding;
    if (storyFlags.tension >= 80) {
      villageEnding = 'collapse';
    } else if (storyFlags.tension >= 50) {
      villageEnding = 'fracture';
    } else if (storyFlags.tension >= 30) {
      villageEnding = 'endurance';
    } else {
      villageEnding = 'peace';
    }

    // Keeper archetype
    let keeperEnding;
    const { truthCount, mercyCount, selfServingCount } = storyFlags;
    if (truthCount > mercyCount && truthCount > selfServingCount) {
      keeperEnding = 'honest';
    } else if (mercyCount > truthCount && mercyCount > selfServingCount) {
      keeperEnding = 'merciful';
    } else if (selfServingCount >= truthCount && selfServingCount >= mercyCount && selfServingCount > 0) {
      keeperEnding = 'corrupt';
    } else {
      keeperEnding = 'inconsistent';
    }

    // Secret state
    const secretEnding = storyFlags.secretRevealed ? 'revealed' : 'buried';

    // Signature state
    const signatureEnding = storyFlags.signedLog ? 'signed' : 'unsigned';

    return {
      village: villageEnding,
      keeper: keeperEnding,
      secret: secretEnding,
      signature: signatureEnding
    };
  },

  // Generate ending text
  generateEndingText(ending) {
    const texts = {
      'peace-merciful-buried-signed': `You kept the light burning and the village whole. You protected them from truths that would have destroyed them. Your name is on a record full of kind omissions. You can live with that. Most nights.`,

      'peace-merciful-buried-unsigned': `The village thrives in its gentle ignorance. You let them keep their peace, their secrets, their illusions. No one will know who wrote these records — perhaps that's its own kind of mercy.`,

      'fracture-honest-revealed-signed': `You wrote what was true. The village cracked under the weight of it. They'll rebuild, or they won't. Your name is on every word. You own this truth.`,

      'fracture-honest-revealed-unsigned': `The truth is out now, burning through old wounds. You didn't sign your name — perhaps you couldn't bear to. The village knows what happened, but not who told them.`,

      'collapse-corrupt-buried-signed': `The village is empty now. They left, or turned on each other, or simply gave up. You survived — you made sure of that. Your name is on a record that tells a story no one will read, about a place that no longer exists.`,

      'endurance-inconsistent-buried-unsigned': `The village continues, neither thriving nor dying. Your records tell a confused story — mercy here, cruelty there, truth and lies braided together. Perhaps that's the most honest record of all.`
    };

    const key = `${ending.village}-${ending.keeper}-${ending.secret}-${ending.signature}`;
    return texts[key] || this.generateGenericEnding(ending);
  },

  // Generate generic ending if specific combination not found
  generateGenericEnding(ending) {
    let text = '';

    // Village state
    switch (ending.village) {
      case 'peace':
        text += 'The village endures, finding something like peace. ';
        break;
      case 'endurance':
        text += 'The village survives, neither thriving nor dying. ';
        break;
      case 'fracture':
        text += 'The village is divided, wounds fresh and unhealed. ';
        break;
      case 'collapse':
        text += 'What was once a village is now just buildings. The people have scattered or turned inward. ';
        break;
    }

    // Keeper archetype
    switch (ending.keeper) {
      case 'honest':
        text += 'You wrote the truth, whatever the cost. ';
        break;
      case 'merciful':
        text += 'You chose kindness over clarity. ';
        break;
      case 'corrupt':
        text += 'You protected yourself above all else. ';
        break;
      case 'inconsistent':
        text += 'Your records tell no consistent story — perhaps neither do you. ';
        break;
    }

    // Secret
    if (ending.secret === 'revealed') {
      text += 'The old secret is out now, burning through generations of silence. ';
    } else {
      text += 'The old secret stays buried, carried now by you as well. ';
    }

    // Signature
    if (ending.signature === 'signed') {
      text += 'Your name stands at the end of every entry. You own this record.';
    } else {
      text += 'Your name appears nowhere. The Keeper who wrote these words could be anyone.';
    }

    return text;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorySystem };
}
