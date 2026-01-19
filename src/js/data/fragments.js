// Fragment System for The Lighthouse Keeper

// Fragment types
const FragmentTypes = {
  TONE: 'tone',
  SUBJECT: 'subject',
  ACTION: 'action',
  OBJECT: 'object',
  CONTEXT: 'context'
};

// Base fragments available from the start
const BaseFragments = {
  // TONE fragments - how the entry begins
  tone_official: {
    id: 'tone_official',
    type: FragmentTypes.TONE,
    text: 'It is recorded that',
    description: 'Official, authoritative framing'
  },
  tone_hedged: {
    id: 'tone_hedged',
    type: FragmentTypes.TONE,
    text: 'Reportedly,',
    description: 'Hedged, cautious framing'
  },
  tone_certain: {
    id: 'tone_certain',
    type: FragmentTypes.TONE,
    text: 'Without question,',
    description: 'Certain, definitive framing'
  },
  tone_indicates: {
    id: 'tone_indicates',
    type: FragmentTypes.TONE,
    text: 'The evidence indicates',
    description: 'Evidence-based framing'
  },
  tone_reveals: {
    id: 'tone_reveals',
    type: FragmentTypes.TONE,
    text: 'Testimony reveals',
    description: 'Revealing, exposing framing'
  },
  tone_according: {
    id: 'tone_according',
    type: FragmentTypes.TONE,
    text: 'According to witnesses,',
    description: 'Attributed to others'
  },

  // SUBJECT fragments - who the entry is about
  subject_peter: {
    id: 'subject_peter',
    type: FragmentTypes.SUBJECT,
    text: 'Peter',
    description: 'The fisherman',
    villager: 'peter'
  },
  subject_tomas: {
    id: 'subject_tomas',
    type: FragmentTypes.SUBJECT,
    text: 'Tomas',
    description: 'The boat builder',
    villager: 'tomas'
  },
  subject_shore: {
    id: 'subject_shore',
    type: FragmentTypes.SUBJECT,
    text: 'the shore families',
    description: 'The original settlers'
  },
  subject_newcomers: {
    id: 'subject_newcomers',
    type: FragmentTypes.SUBJECT,
    text: 'the newcomers',
    description: 'Those who came recently'
  },
  subject_dispute: {
    id: 'subject_dispute',
    type: FragmentTypes.SUBJECT,
    text: 'a dispute',
    description: 'The matter in question'
  },
  subject_matter: {
    id: 'subject_matter',
    type: FragmentTypes.SUBJECT,
    text: 'the matter',
    description: 'Vague reference to events'
  },

  // ACTION fragments - what happened
  action_established: {
    id: 'action_established',
    type: FragmentTypes.ACTION,
    text: 'established prior claim',
    description: 'Asserts rightful ownership',
    favor: 'peter',
    against: 'tomas'
  },
  action_contested: {
    id: 'action_contested',
    type: FragmentTypes.ACTION,
    text: 'contested the claim',
    description: 'Challenged ownership',
    favor: 'tomas',
    against: 'peter'
  },
  action_involved: {
    id: 'action_involved',
    type: FragmentTypes.ACTION,
    text: 'was involved in',
    description: 'Neutral participation'
  },
  action_initiated: {
    id: 'action_initiated',
    type: FragmentTypes.ACTION,
    text: 'initiated',
    description: 'Started the conflict',
    damaging: true
  },
  action_caused: {
    id: 'action_caused',
    type: FragmentTypes.ACTION,
    text: 'caused',
    description: 'Bears responsibility',
    damaging: true
  },
  action_responded: {
    id: 'action_responded',
    type: FragmentTypes.ACTION,
    text: 'responded to',
    description: 'Defensive action'
  },
  action_allegedly: {
    id: 'action_allegedly',
    type: FragmentTypes.ACTION,
    text: 'allegedly',
    description: 'Unproven claim'
  },

  // OBJECT fragments - what it concerned
  object_catch: {
    id: 'object_catch',
    type: FragmentTypes.OBJECT,
    text: 'regarding the catch',
    description: 'The fishing dispute'
  },
  object_boat: {
    id: 'object_boat',
    type: FragmentTypes.OBJECT,
    text: 'regarding the boat',
    description: 'The vessel in question'
  },
  object_tradition: {
    id: 'object_tradition',
    type: FragmentTypes.OBJECT,
    text: 'to traditional rights',
    description: 'Customary claims'
  },
  object_harmony: {
    id: 'object_harmony',
    type: FragmentTypes.OBJECT,
    text: 'affecting village harmony',
    description: 'Community impact'
  },
  object_standing: {
    id: 'object_standing',
    type: FragmentTypes.OBJECT,
    text: "to his family's standing",
    description: 'Reputation at stake'
  },

  // CONTEXT fragments - interpretation/framing
  context_accordance: {
    id: 'context_accordance',
    type: FragmentTypes.CONTEXT,
    text: 'in accordance with tradition',
    description: 'Justified by custom',
    favor: 'peter'
  },
  context_despite: {
    id: 'context_despite',
    type: FragmentTypes.CONTEXT,
    text: 'despite warnings',
    description: 'Against advice',
    damaging: true
  },
  context_unclear: {
    id: 'context_unclear',
    type: FragmentTypes.CONTEXT,
    text: '- the causes remain unclear',
    description: 'Ambiguous outcome'
  },
  context_warrant: {
    id: 'context_warrant',
    type: FragmentTypes.CONTEXT,
    text: '- this matter may warrant further attention',
    description: 'Ominous implication'
  },
  context_circumstances: {
    id: 'context_circumstances',
    type: FragmentTypes.CONTEXT,
    text: 'due to circumstances beyond control',
    description: 'Exculpatory framing'
  },
  context_intent: {
    id: 'context_intent',
    type: FragmentTypes.CONTEXT,
    text: 'with apparent intent',
    description: 'Deliberate action implied'
  }
};

// Week-specific fragments that get unlocked through investigation
const WeekFragments = {
  // WEEK 1: The Disputed Catch
  week1: {
    // From talking to Peter
    w1_peter_claim: {
      id: 'w1_peter_claim',
      type: FragmentTypes.SUBJECT,
      text: 'Peter',
      description: 'The fisherman with the traditional claim',
      villager: 'peter',
      unlockedBy: 'talkedToPeter1'
    },
    w1_peter_tradition: {
      id: 'w1_peter_tradition',
      type: FragmentTypes.CONTEXT,
      text: 'and ancestral right',
      description: "Four generations of Peter's family",
      favor: 'peter',
      unlockedBy: 'talkedToPeter1'
    },

    // From talking to Tomas
    w1_tomas_claim: {
      id: 'w1_tomas_claim',
      type: FragmentTypes.SUBJECT,
      text: 'Tomas',
      description: 'The boat builder who contests',
      villager: 'tomas',
      unlockedBy: 'talkedToTomas1'
    },
    w1_tomas_first: {
      id: 'w1_tomas_first',
      type: FragmentTypes.ACTION,
      text: 'secured the catch through seamanship',
      description: 'First net in the water',
      favor: 'tomas',
      unlockedBy: 'talkedToTomas1'
    },
    w1_tomas_net: {
      id: 'w1_tomas_net',
      type: FragmentTypes.CONTEXT,
      text: ', his net being in the water first',
      description: 'Factual claim to the catch',
      favor: 'tomas',
      unlockedBy: 'talkedToTomas1'
    },

    // From consulting Marta
    w1_marta_tradition: {
      id: 'w1_marta_tradition',
      type: FragmentTypes.TONE,
      text: 'By traditional right,',
      description: 'Invoking custom and precedent',
      unlockedBy: 'consultedMarta1'
    },
    w1_shore_waters: {
      id: 'w1_shore_waters',
      type: FragmentTypes.OBJECT,
      text: 'in waters traditionally held by the shore families',
      description: 'Territorial claim',
      favor: 'peter',
      unlockedBy: 'consultedMarta1'
    },

    // From examining evidence
    w1_evidence_both: {
      id: 'w1_evidence_both',
      type: FragmentTypes.ACTION,
      text: 'both parties have legitimate grounds',
      description: 'Ambiguous finding',
      unlockedBy: 'examinedEvidence1',
      memoryTrigger: 'firstRecord'
    },
    w1_evidence_inconclusive: {
      id: 'w1_evidence_inconclusive',
      type: FragmentTypes.CONTEXT,
      text: '- leaving the matter unresolved',
      description: 'No clear resolution',
      unlockedBy: 'examinedEvidence1'
    },

    // Damaging options
    w1_tomas_initiated: {
      id: 'w1_tomas_initiated',
      type: FragmentTypes.ACTION,
      text: 'initiated the dispute',
      description: 'Frames Tomas as aggressor',
      against: 'tomas',
      damaging: true,
      unlockedBy: 'consultedMarta1'
    },
    w1_shore_allegedly: {
      id: 'w1_shore_allegedly',
      type: FragmentTypes.ACTION,
      text: 'allegedly claimed rights to waters not formally assigned',
      description: 'Questions Shore family claims',
      against: 'peter',
      damaging: true,
      unlockedBy: 'talkedToTomas1'
    }
  },

  // WEEK 2: The Priest's Fever
  week2: {
    // From talking to Anna
    w2_anna_report: {
      id: 'w2_anna_report',
      type: FragmentTypes.TONE,
      text: 'The midwife reports that',
      description: 'Medical authority',
      unlockedBy: 'talkedToAnna2'
    },
    w2_simao_ill: {
      id: 'w2_simao_ill',
      type: FragmentTypes.SUBJECT,
      text: 'Father Simao',
      description: 'The village priest',
      villager: 'simao',
      unlockedBy: 'talkedToAnna2'
    },
    w2_fever_serious: {
      id: 'w2_fever_serious',
      type: FragmentTypes.ACTION,
      text: 'fell ill with fever',
      description: 'Simple medical fact',
      unlockedBy: 'talkedToAnna2'
    },
    w2_spoke_delirium: {
      id: 'w2_spoke_delirium',
      type: FragmentTypes.CONTEXT,
      text: 'and spoke of past events during delirium',
      description: 'Hints at revelations',
      sensitive: true,
      unlockedBy: 'talkedToAnna2'
    },

    // From visiting Father Simao
    w2_confession_sealed: {
      id: 'w2_confession_sealed',
      type: FragmentTypes.CONTEXT,
      text: '- certain matters remain sealed by confession',
      description: 'The sacred seal',
      unlockedBy: 'visitedPriest2',
      memoryTrigger: 'theAccused'
    },
    w2_twenty_years: {
      id: 'w2_twenty_years',
      type: FragmentTypes.OBJECT,
      text: 'regarding events of twenty years past',
      description: 'The old secret',
      sensitive: true,
      unlockedBy: 'visitedPriest2'
    },

    // From confronting Marta
    w2_marta_requested: {
      id: 'w2_marta_requested',
      type: FragmentTypes.CONTEXT,
      text: '- certain matters have been requested to remain unrecorded',
      description: "Marta's plea",
      unlockedBy: 'confrontedMarta2'
    },
    w2_peace_over_truth: {
      id: 'w2_peace_over_truth',
      type: FragmentTypes.CONTEXT,
      text: 'in service of village peace',
      description: 'Justification for silence',
      unlockedBy: 'confrontedMarta2'
    },

    // From searching the chapel
    w2_documents_suggest: {
      id: 'w2_documents_suggest',
      type: FragmentTypes.TONE,
      text: 'Documents suggest',
      description: 'Evidence-based revelation',
      unlockedBy: 'searchedChapel2',
      memoryTrigger: 'theEvidence'
    },
    w2_death_reexamine: {
      id: 'w2_death_reexamine',
      type: FragmentTypes.ACTION,
      text: 'the death of Istvan, recorded as accidental, may warrant reexamination',
      description: 'Explosive revelation',
      sensitive: true,
      against: 'marta',
      unlockedBy: 'searchedChapel2'
    },
    w2_historical_inaccuracies: {
      id: 'w2_historical_inaccuracies',
      type: FragmentTypes.OBJECT,
      text: 'that historical records contain significant inaccuracies',
      description: 'Questions the past',
      sensitive: true,
      unlockedBy: 'searchedChapel2'
    },

    // Recovery note
    w2_recovered: {
      id: 'w2_recovered',
      type: FragmentTypes.ACTION,
      text: 'has recovered under care',
      description: 'Simple resolution',
      unlockedBy: 'talkedToAnna2'
    },
    w2_no_substance: {
      id: 'w2_no_substance',
      type: FragmentTypes.CONTEXT,
      text: '- no matters of substance were revealed',
      description: 'Buries the secret',
      unlockedBy: 'visitedPriest2'
    }
  },

  // WEEK 3: The Secret Meetings
  week3: {
    // From talking to Lucia
    w3_lucia: {
      id: 'w3_lucia',
      type: FragmentTypes.SUBJECT,
      text: 'Lucia',
      description: "Tomas's daughter",
      villager: 'lucia',
      unlockedBy: 'talkedToLucia3',
      memoryTrigger: 'theWife'
    },
    w3_attachment: {
      id: 'w3_attachment',
      type: FragmentTypes.ACTION,
      text: 'has formed an attachment',
      description: 'The romance',
      unlockedBy: 'talkedToLucia3'
    },
    w3_potential_unity: {
      id: 'w3_potential_unity',
      type: FragmentTypes.CONTEXT,
      text: 'representing potential unity between families',
      description: 'Positive framing',
      favor: 'lucia',
      unlockedBy: 'talkedToLucia3'
    },

    // From talking to Tomas
    w3_tomas_defended: {
      id: 'w3_tomas_defended',
      type: FragmentTypes.ACTION,
      text: "defended his daughter's character",
      description: "Father's protection",
      favor: 'tomas',
      unlockedBy: 'talkedToTomas3'
    },
    w3_rumors_unfounded: {
      id: 'w3_rumors_unfounded',
      type: FragmentTypes.CONTEXT,
      text: '- rumors appear unfounded',
      description: 'Dismisses concerns',
      favor: 'lucia',
      unlockedBy: 'talkedToTomas3'
    },

    // From hearing Marta's concerns
    w3_concerning_behavior: {
      id: 'w3_concerning_behavior',
      type: FragmentTypes.ACTION,
      text: 'was observed engaging in concerning behavior',
      description: 'Damaging observation',
      against: 'lucia',
      damaging: true,
      unlockedBy: 'heardMarta3'
    },
    w3_warrant_notation: {
      id: 'w3_warrant_notation',
      type: FragmentTypes.CONTEXT,
      text: ', warranting official notation',
      description: 'Makes it permanent',
      against: 'lucia',
      damaging: true,
      unlockedBy: 'heardMarta3'
    },
    w3_unbecoming: {
      id: 'w3_unbecoming',
      type: FragmentTypes.OBJECT,
      text: 'in nocturnal activities unbecoming of her station',
      description: 'Moral judgment',
      against: 'lucia',
      damaging: true,
      unlockedBy: 'heardMarta3'
    },

    // From observing them
    w3_no_concern: {
      id: 'w3_no_concern',
      type: FragmentTypes.ACTION,
      text: 'were observed without matters of concern',
      description: 'Clean observation',
      favor: 'lucia',
      unlockedBy: 'observedThem3'
    },
    w3_personal_conduct: {
      id: 'w3_personal_conduct',
      type: FragmentTypes.OBJECT,
      text: 'regarding personal conduct',
      description: 'Neutral framing',
      unlockedBy: 'observedThem3'
    },
    w3_connection_formed: {
      id: 'w3_connection_formed',
      type: FragmentTypes.TONE,
      text: 'A connection has formed between',
      description: 'Romantic framing',
      unlockedBy: 'observedThem3'
    },
    w3_newcomer_shore: {
      id: 'w3_newcomer_shore',
      type: FragmentTypes.SUBJECT,
      text: 'the newcomer and shore families',
      description: 'The union',
      unlockedBy: 'observedThem3'
    }
  },

  // WEEK 4: The Storm's Toll
  week4: {
    // From hearing Peter's accusation
    w4_peter_vessel: {
      id: 'w4_peter_vessel',
      type: FragmentTypes.SUBJECT,
      text: "Peter's vessel",
      description: 'The destroyed boat',
      villager: 'peter',
      unlockedBy: 'heardPeter4',
      memoryTrigger: 'theEvidence'
    },
    w4_destroyed_failure: {
      id: 'w4_destroyed_failure',
      type: FragmentTypes.ACTION,
      text: "was destroyed due to failure of Tomas's equipment",
      description: 'Blames Tomas',
      against: 'tomas',
      unlockedBy: 'heardPeter4'
    },
    w4_negligence: {
      id: 'w4_negligence',
      type: FragmentTypes.CONTEXT,
      text: 'through negligence in securing the mooring line',
      description: 'Negligence claim',
      against: 'tomas',
      unlockedBy: 'heardPeter4'
    },

    // From hearing Tomas's defense
    w4_tomas_alleged: {
      id: 'w4_tomas_alleged',
      type: FragmentTypes.ACTION,
      text: 'alleged deliberate sabotage',
      description: "Tomas's counter-claim",
      favor: 'tomas',
      unlockedBy: 'heardTomas4'
    },
    w4_rope_cut: {
      id: 'w4_rope_cut',
      type: FragmentTypes.CONTEXT,
      text: '- the rope appears to have been cut',
      description: 'Sabotage evidence',
      favor: 'tomas',
      unlockedBy: 'heardTomas4'
    },
    w4_line_tampered: {
      id: 'w4_line_tampered',
      type: FragmentTypes.ACTION,
      text: "Tomas's mooring line was tampered with",
      description: 'Blames Shore family',
      against: 'peter',
      unlockedBy: 'heardTomas4'
    },

    // From asking Anna
    w4_witness_reported: {
      id: 'w4_witness_reported',
      type: FragmentTypes.TONE,
      text: 'A witness reported',
      description: "Anna's testimony",
      unlockedBy: 'askedAnna4'
    },
    w4_possible_interference: {
      id: 'w4_possible_interference',
      type: FragmentTypes.ACTION,
      text: 'possible interference with the mooring',
      description: 'Uncertain testimony',
      unlockedBy: 'askedAnna4'
    },
    w4_shape_on_dock: {
      id: 'w4_shape_on_dock',
      type: FragmentTypes.CONTEXT,
      text: '- a figure was seen on the dock that night',
      description: 'Mysterious sighting',
      unlockedBy: 'askedAnna4'
    },

    // From examining rope
    w4_evidence_inconclusive: {
      id: 'w4_evidence_inconclusive',
      type: FragmentTypes.ACTION,
      text: 'proved inconclusive regarding specific causes',
      description: 'No clear answer',
      unlockedBy: 'examinedRope4'
    },
    w4_storm_damage: {
      id: 'w4_storm_damage',
      type: FragmentTypes.TONE,
      text: 'Storm damage affected multiple vessels.',
      description: 'Natural explanation',
      unlockedBy: 'examinedRope4'
    },
    w4_physical_evidence: {
      id: 'w4_physical_evidence',
      type: FragmentTypes.SUBJECT,
      text: 'Physical evidence',
      description: 'The rope itself',
      unlockedBy: 'examinedRope4'
    },

    // Sabotage allegation
    w4_deliberate_sabotage: {
      id: 'w4_deliberate_sabotage',
      type: FragmentTypes.TONE,
      text: 'Evidence suggests deliberate sabotage',
      description: 'Serious accusation',
      against: 'tomas',
      damaging: true,
      unlockedBy: 'heardPeter4'
    },
    w4_resulting_destruction: {
      id: 'w4_resulting_destruction',
      type: FragmentTypes.CONTEXT,
      text: ", resulting in destruction of Peter's vessel",
      description: 'The consequence',
      unlockedBy: 'heardPeter4'
    }
  },

  // WEEK 5: The Reckoning
  week5: {
    // Final fragments for village summary
    w5_village_elder: {
      id: 'w5_village_elder',
      type: FragmentTypes.SUBJECT,
      text: 'The village elder',
      description: 'Marta',
      villager: 'marta',
      unlockedBy: 'finalMarta'
    },
    w5_expressed_gratitude: {
      id: 'w5_expressed_gratitude',
      type: FragmentTypes.ACTION,
      text: "expressed gratitude for the Keeper's discretion",
      description: "Marta's thanks",
      favor: 'marta',
      unlockedBy: 'finalMarta'
    },
    w5_tomas_requested: {
      id: 'w5_tomas_requested',
      type: FragmentTypes.ACTION,
      text: "requested fair consideration for his family's future",
      description: "Tomas's appeal",
      favor: 'tomas',
      unlockedBy: 'finalTomas'
    },
    w5_lucia_integrated: {
      id: 'w5_lucia_integrated',
      type: FragmentTypes.ACTION,
      text: 'has integrated well into village life',
      description: "Lucia's success",
      favor: 'lucia',
      unlockedBy: 'finalLucia'
    },
    w5_simao_recovered: {
      id: 'w5_simao_recovered',
      type: FragmentTypes.ACTION,
      text: 'recovered and resumed his duties',
      description: "Father Simao's health",
      unlockedBy: 'finalSimao'
    },

    // Self-documentation
    w5_this_keeper: {
      id: 'w5_this_keeper',
      type: FragmentTypes.SUBJECT,
      text: 'This Keeper',
      description: 'Yourself',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_served_faithfully: {
      id: 'w5_served_faithfully',
      type: FragmentTypes.ACTION,
      text: 'served faithfully',
      description: 'Positive self-assessment',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_served_adequately: {
      id: 'w5_served_adequately',
      type: FragmentTypes.ACTION,
      text: 'served adequately',
      description: 'Neutral self-assessment',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_served_poorly: {
      id: 'w5_served_poorly',
      type: FragmentTypes.ACTION,
      text: 'served with difficulty',
      description: 'Humble self-assessment',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_documented_truth: {
      id: 'w5_documented_truth',
      type: FragmentTypes.CONTEXT,
      text: ', documenting truth as witnessed',
      description: 'Truth-teller',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_documented_mercy: {
      id: 'w5_documented_mercy',
      type: FragmentTypes.CONTEXT,
      text: ', showing mercy where possible',
      description: 'Merciful keeper',
      unlockedBy: 'wroteAboutSelf5'
    },
    w5_documented_carefully: {
      id: 'w5_documented_carefully',
      type: FragmentTypes.CONTEXT,
      text: ', recording with care',
      description: 'Careful keeper',
      unlockedBy: 'wroteAboutSelf5'
    }
  }
};

// Get all available fragments for current week based on story flags
function getAvailableFragments(week, storyFlags) {
  const available = [];

  // Add base fragments
  Object.values(BaseFragments).forEach(frag => {
    available.push({ ...frag });
  });

  // Add week-specific fragments that have been unlocked
  const weekKey = `week${week}`;
  if (WeekFragments[weekKey]) {
    Object.values(WeekFragments[weekKey]).forEach(frag => {
      if (!frag.unlockedBy || storyFlags[frag.unlockedBy]) {
        available.push({ ...frag });
      }
    });
  }

  return available;
}

// Get fragments by type
function getFragmentsByType(fragments, type) {
  return fragments.filter(f => f.type === type);
}

// Check if fragment has memory trigger
function checkMemoryTrigger(fragmentId) {
  // Check all week fragments for memory triggers
  for (const weekKey in WeekFragments) {
    for (const fragKey in WeekFragments[weekKey]) {
      const frag = WeekFragments[weekKey][fragKey];
      if (frag.id === fragmentId && frag.memoryTrigger) {
        return frag.memoryTrigger;
      }
    }
  }
  return null;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FragmentTypes,
    BaseFragments,
    WeekFragments,
    getAvailableFragments,
    getFragmentsByType,
    checkMemoryTrigger
  };
}
