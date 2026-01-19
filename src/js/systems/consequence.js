// Consequence Engine for The Lighthouse Keeper

const ConsequenceEngine = {
  // Calculate all consequences from an entry
  calculateConsequences(entry, week, storyFlags) {
    const effects = [];

    // Get fragment IDs from entry
    const fragments = Object.values(entry).filter(Boolean);

    // Process each fragment for effects
    fragments.forEach(frag => {
      // Direct villager effects
      if (frag.favor) {
        effects.push({
          type: 'villager',
          target: frag.favor,
          stat: 'wellbeing',
          delta: 10,
          reason: `Your record supports ${frag.favor}'s position.`
        });
        effects.push({
          type: 'villager',
          target: frag.favor,
          stat: 'trust',
          delta: 8,
          reason: `${frag.favor} trusts you more for supporting them.`
        });
      }

      if (frag.against) {
        effects.push({
          type: 'villager',
          target: frag.against,
          stat: 'wellbeing',
          delta: -15,
          reason: `Your record harms ${frag.against}'s standing.`
        });
        effects.push({
          type: 'villager',
          target: frag.against,
          stat: 'trust',
          delta: -12,
          reason: `${frag.against} feels betrayed by your record.`
        });
      }

      if (frag.damaging) {
        effects.push({
          type: 'tension',
          delta: 8,
          reason: 'Your record increases village tension.'
        });
      }

      if (frag.sensitive) {
        effects.push({
          type: 'story',
          flag: 'secretRevealed',
          value: true,
          reason: 'Sensitive matters have been recorded.'
        });
        effects.push({
          type: 'villager',
          target: 'marta',
          stat: 'trust',
          delta: -25,
          reason: 'Marta trusted you to keep the past buried.'
        });
        effects.push({
          type: 'tension',
          delta: 15,
          reason: 'Old secrets surface, destabilizing the village.'
        });
      }
    });

    // Week-specific consequences
    const weekEffects = this.getWeekSpecificEffects(entry, week, storyFlags);
    effects.push(...weekEffects);

    // Track player archetype
    const archetypeEffects = this.trackArchetype(entry, storyFlags);
    effects.push(...archetypeEffects);

    return effects;
  },

  // Get week-specific effects
  getWeekSpecificEffects(entry, week, storyFlags) {
    const effects = [];
    const fragIds = Object.values(entry).filter(Boolean).map(f => f.id);

    switch (week) {
      case 1: // Disputed Catch
        if (fragIds.includes('action_established') || fragIds.includes('w1_peter_claim')) {
          effects.push({
            type: 'story',
            flag: 'catchVerdict',
            value: 'peter',
            reason: 'You ruled in favor of Peter.'
          });
          effects.push({
            type: 'faction',
            target: 'shore',
            delta: 10,
            reason: 'Shore family influence grows.'
          });
          effects.push({
            type: 'faction',
            target: 'newcomer',
            delta: -10,
            reason: 'Newcomers feel the system is rigged.'
          });
        } else if (fragIds.includes('w1_tomas_first') || fragIds.includes('w1_tomas_claim')) {
          effects.push({
            type: 'story',
            flag: 'catchVerdict',
            value: 'tomas',
            reason: 'You ruled in favor of Tomas.'
          });
          effects.push({
            type: 'faction',
            target: 'newcomer',
            delta: 10,
            reason: 'Newcomers gain standing.'
          });
          effects.push({
            type: 'faction',
            target: 'shore',
            delta: -8,
            reason: 'Shore family resents the outsider.'
          });
        } else if (fragIds.includes('w1_evidence_both') || fragIds.includes('w1_evidence_inconclusive')) {
          effects.push({
            type: 'story',
            flag: 'catchVerdict',
            value: 'neutral',
            reason: 'You left the matter unresolved.'
          });
          effects.push({
            type: 'tension',
            delta: 10,
            reason: 'The conflict festers without resolution.'
          });
        } else if (fragIds.includes('w1_tomas_initiated') || fragIds.includes('w1_shore_allegedly')) {
          effects.push({
            type: 'story',
            flag: 'catchVerdict',
            value: 'damaging',
            reason: 'Your record damages reputations.'
          });
          effects.push({
            type: 'tension',
            delta: 15,
            reason: 'Accusations breed resentment.'
          });
        }
        break;

      case 2: // Priest's Fever
        if (fragIds.includes('w2_death_reexamine') || fragIds.includes('w2_historical_inaccuracies')) {
          effects.push({
            type: 'villager',
            target: 'peter',
            stat: 'wellbeing',
            delta: -20,
            reason: 'Peter learns the truth about his father.'
          });
          effects.push({
            type: 'villager',
            target: 'peter',
            stat: 'trust',
            delta: -15,
            reason: 'Peter blames you for revealing his shame.'
          });
        }

        if (fragIds.includes('w2_recovered') && !fragIds.includes('w2_spoke_delirium')) {
          effects.push({
            type: 'villager',
            target: 'marta',
            stat: 'trust',
            delta: 20,
            reason: 'Marta is grateful for your discretion.'
          });
        }
        break;

      case 3: // Secret Meetings
        if (fragIds.includes('w3_concerning_behavior') || fragIds.includes('w3_unbecoming')) {
          effects.push({
            type: 'story',
            flag: 'luciaExposed',
            value: true,
            reason: 'You exposed Lucia\'s relationship.'
          });
          effects.push({
            type: 'villager',
            target: 'lucia',
            stat: 'wellbeing',
            delta: -30,
            reason: 'Lucia\'s hopes are crushed.'
          });
          effects.push({
            type: 'villager',
            target: 'lucia',
            stat: 'trust',
            delta: -50,
            reason: 'Lucia will never trust you again.'
          });
          effects.push({
            type: 'villager',
            target: 'jakub',
            stat: 'wellbeing',
            delta: -20,
            reason: 'Jakub is pressured by his family.'
          });
        }

        if (fragIds.includes('w3_no_concern') || fragIds.includes('w3_potential_unity')) {
          effects.push({
            type: 'story',
            flag: 'luciaProtected',
            value: true,
            reason: 'You protected Lucia\'s secret.'
          });
          effects.push({
            type: 'villager',
            target: 'lucia',
            stat: 'trust',
            delta: 25,
            reason: 'Lucia trusts you completely.'
          });
          effects.push({
            type: 'villager',
            target: 'tomas',
            stat: 'trust',
            delta: 15,
            reason: 'Tomas is grateful you protected his daughter.'
          });
        }

        if (fragIds.includes('w3_connection_formed') || fragIds.includes('w3_newcomer_shore')) {
          effects.push({
            type: 'story',
            flag: 'luciaRomanceBlessed',
            value: true,
            reason: 'You officially blessed the relationship.'
          });
          effects.push({
            type: 'tension',
            delta: -5,
            reason: 'A bridge forms between families.'
          });
        }
        break;

      case 4: // Storm's Toll
        if (fragIds.includes('w4_destroyed_failure') || fragIds.includes('w4_negligence')) {
          effects.push({
            type: 'story',
            flag: 'blamedTomas',
            value: true,
            reason: 'You blamed Tomas for the boat\'s destruction.'
          });
          effects.push({
            type: 'villager',
            target: 'tomas',
            stat: 'wellbeing',
            delta: -30,
            reason: 'Tomas owes a debt he cannot pay.'
          });
          effects.push({
            type: 'villager',
            target: 'lucia',
            stat: 'wellbeing',
            delta: -20,
            reason: 'Lucia\'s father is ruined.'
          });
        }

        if (fragIds.includes('w4_deliberate_sabotage')) {
          effects.push({
            type: 'story',
            flag: 'sabotageAlleged',
            value: true,
            reason: 'You alleged criminal sabotage.'
          });
          effects.push({
            type: 'tension',
            delta: 25,
            reason: 'Criminal allegations tear the village apart.'
          });
        }

        if (fragIds.includes('w4_line_tampered')) {
          effects.push({
            type: 'story',
            flag: 'blamedPeter',
            value: true,
            reason: 'You implied Shore family sabotage.'
          });
          effects.push({
            type: 'villager',
            target: 'peter',
            stat: 'wellbeing',
            delta: -25,
            reason: 'Peter is devastated by the accusation.'
          });
          effects.push({
            type: 'faction',
            target: 'shore',
            delta: -15,
            reason: 'The Shore family\'s honor is questioned.'
          });
        }

        if (fragIds.includes('w4_evidence_inconclusive') || fragIds.includes('w4_storm_damage')) {
          effects.push({
            type: 'story',
            flag: 'blamedNoOne',
            value: true,
            reason: 'You blamed no one.'
          });
          effects.push({
            type: 'tension',
            delta: 5,
            reason: 'The wound remains open.'
          });
        }

        if (storyFlags.annaTestified && fragIds.includes('w4_witness_reported')) {
          effects.push({
            type: 'villager',
            target: 'anna',
            stat: 'wellbeing',
            delta: -10,
            reason: 'Anna\'s testimony puts her in a difficult position.'
          });
        }
        break;

      case 5: // Reckoning
        if (fragIds.includes('w5_served_faithfully')) {
          effects.push({
            type: 'story',
            flag: 'truthCount',
            delta: 1,
            reason: 'You judged yourself fairly.'
          });
        }
        break;
    }

    return effects;
  },

  // Track player archetype (honest, merciful, self-serving)
  trackArchetype(entry, storyFlags) {
    const effects = [];
    const fragIds = Object.values(entry).filter(Boolean).map(f => f.id);

    // Honest: hard truths, evidence-based, no hedging
    const honestFrags = ['w2_death_reexamine', 'w2_historical_inaccuracies', 'tone_certain', 'w4_deliberate_sabotage'];
    const honestCount = fragIds.filter(id => honestFrags.includes(id)).length;
    if (honestCount > 0) {
      effects.push({
        type: 'story',
        flag: 'truthCount',
        delta: honestCount,
        reason: 'You chose truth.'
      });
    }

    // Merciful: protection, hedging, omission
    const mercyFrags = ['w2_no_substance', 'w3_no_concern', 'w3_potential_unity', 'tone_hedged', 'w2_peace_over_truth'];
    const mercyCount = fragIds.filter(id => mercyFrags.includes(id)).length;
    if (mercyCount > 0) {
      effects.push({
        type: 'story',
        flag: 'mercyCount',
        delta: mercyCount,
        reason: 'You showed mercy.'
      });
    }

    // Self-serving: avoiding commitment, playing it safe
    const safeFrags = ['context_unclear', 'action_allegedly', 'w1_evidence_inconclusive'];
    const safeCount = fragIds.filter(id => safeFrags.includes(id)).length;
    if (safeCount > 1) { // Only counts as self-serving if consistent
      effects.push({
        type: 'story',
        flag: 'selfServingCount',
        delta: 1,
        reason: 'You protected yourself.'
      });
    }

    return effects;
  },

  // Apply effects to game state
  applyEffects(effects, stateManager) {
    effects.forEach(effect => {
      switch (effect.type) {
        case 'villager':
          stateManager.updateVillager(effect.target, effect.stat, effect.delta);
          break;
        case 'tension':
          stateManager.updateTension(effect.delta);
          break;
        case 'story':
          if (effect.delta !== undefined) {
            // Increment a counter
            const current = stateManager.getState().story[effect.flag] || 0;
            stateManager.setStoryFlag(effect.flag, current + effect.delta);
          } else {
            stateManager.setStoryFlag(effect.flag, effect.value);
          }
          break;
        case 'faction':
          // Track faction standings (could be expanded)
          console.log(`Faction ${effect.target}: ${effect.delta > 0 ? '+' : ''}${effect.delta}`);
          break;
      }
    });
  },

  // Get tension level description
  getTensionLevel(tension) {
    if (tension < 30) return 'low';
    if (tension < 50) return 'medium';
    if (tension < 80) return 'high';
    return 'critical';
  },

  // Check for ending triggers
  checkEndingConditions(storyFlags, villagerStats) {
    const conditions = {
      collapse: false,
      fracture: false,
      endurance: false,
      peace: false
    };

    if (storyFlags.tension >= 80) {
      conditions.collapse = true;
    } else if (storyFlags.tension >= 50) {
      conditions.fracture = true;
    } else if (storyFlags.tension >= 30) {
      conditions.endurance = true;
    } else {
      conditions.peace = true;
    }

    // Check for specific bad endings
    if (villagerStats.tomas && villagerStats.tomas.wellbeing < 20) {
      conditions.tomasLeaves = true;
    }
    if (villagerStats.lucia && villagerStats.lucia.trust < 10) {
      conditions.luciaBroken = true;
    }

    return conditions;
  },

  // Calculate final keeper archetype
  calculateKeeperArchetype(storyFlags) {
    const { truthCount, mercyCount, selfServingCount } = storyFlags;

    if (truthCount > mercyCount && truthCount > selfServingCount) {
      return 'honest';
    }
    if (mercyCount > truthCount && mercyCount > selfServingCount) {
      return 'merciful';
    }
    if (selfServingCount >= truthCount && selfServingCount >= mercyCount && selfServingCount > 0) {
      return 'corrupt';
    }
    return 'inconsistent';
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ConsequenceEngine };
}
