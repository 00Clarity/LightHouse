// Villager Data for The Lighthouse Keeper

const Villagers = {
  marta: {
    id: 'marta',
    name: 'Old Marta',
    age: 68,
    family: 'shore',
    role: 'Elder, Widow',
    color: '#2d5a3d',

    description: {
      visible: 'The matriarch. Remembers everything. Knows where every body is buried. Commands respect through sheer presence.',
      hidden: 'Her husband was murdered twenty years ago. She knows who did it. She has chosen silence over justice.',
      secret: "Peter's father was one of the killers. Peter doesn't know. Marta has protected him from this knowledge his entire life."
    },

    wants: 'Peace. Not truth. Peace. To die knowing the village will continue.',
    fears: 'That you will write the truth. That the truth will consume everything.',

    speechPattern: 'Formal. Measured. Every sentence weighted.',

    dialogueBase: {
      greeting: "Keeper. I wondered when you'd come.",
      neutral: "The village has its ways. They've served us for generations.",
      trusting: "There are things I could tell you. Things I've never told anyone.",
      suspicious: "Be careful what you write. Words have weight here."
    }
  },

  peter: {
    id: 'peter',
    name: 'Peter',
    age: 34,
    family: 'shore',
    role: 'Fisherman',
    color: '#3a6b4a',

    description: {
      visible: "Hard worker. Quick temper. Drinks too much when things go wrong. Loves his wife Anna with a clumsy devotion. Owns his grandfather's boat.",
      hidden: "He found something in his father's effects after he died. A letter. He's starting to understand it now.",
      secret: "The letter was from Marta. It was a threat. Or a warning. Something happened between his father and Marta's husband."
    },

    wants: 'To be seen as a good man. To deserve the legacy he inherited.',
    fears: "That his father was not a good man. That he's inherited more than the boat.",

    speechPattern: 'Blunt. Emotional. Says things he regrets. Apologizes badly.',

    dialogueBase: {
      greeting: "What do you want?",
      neutral: "I work hard. I provide. That should count for something.",
      trusting: "You're alright, Keeper. Not like most outsiders.",
      suspicious: "Everyone's got opinions about my family. What's yours?"
    }
  },

  anna: {
    id: 'anna',
    name: 'Anna',
    age: 29,
    family: 'shore',
    role: 'Midwife',
    color: '#4a7a5a',

    description: {
      visible: "The one everyone trusts with their bodies, their births, their deaths. Quiet strength. Sees everything, says little.",
      hidden: "She cannot have children. It's destroying her slowly. She delivers other women's babies and goes home to cry.",
      secret: "She knows something about you. From before you came here. She met someone who knew you at a midwife's conference."
    },

    wants: "A child. Failing that, purpose. Failing that, to understand why she stays.",
    fears: "That Peter will leave her for someone who can give him sons. That she's not enough.",

    speechPattern: 'Soft but precise. Medical when uncomfortable. Warm when she trusts.',

    dialogueBase: {
      greeting: "Keeper. How can I help?",
      neutral: "I see the village at its most vulnerable. Birth and death look similar, sometimes.",
      trusting: "We're not so different, you and I. Both watching. Both carrying things.",
      suspicious: "You're careful with your words. I understand why."
    }
  },

  tomas: {
    id: 'tomas',
    name: 'Tomas',
    age: 41,
    family: 'newcomer',
    role: 'Boat Builder',
    color: '#5a6a7a',

    description: {
      visible: "Arrived five years ago, same season as you. Skilled craftsman. Keeps to himself. His boats are better than the local ones.",
      hidden: "He left the mainland because he killed someone. Accident or self-defense or murder. The law ruled it justified. His conscience didn't.",
      secret: "He recognized you when you arrived. Not your face. Your look. The look of someone running."
    },

    wants: "Absolution. For his daughter to have a life he couldn't have. To stop running.",
    fears: "That the mainland will reach him here. That his daughter will learn who he was.",

    speechPattern: 'Sparse. Careful. Listens more than speaks. When he does speak, it matters.',

    dialogueBase: {
      greeting: "Keeper.",
      neutral: "I build boats. They're good boats. That should be enough.",
      trusting: "You understand, don't you? What it's like to start over.",
      suspicious: "We both came here for reasons. I don't ask about yours."
    }
  },

  lucia: {
    id: 'lucia',
    name: 'Lucia',
    age: 22,
    family: 'newcomer',
    role: "Tomas's Daughter",
    color: '#6a7a8a',

    description: {
      visible: "Caught between worlds. Too mainland for the village, too village for the mainland. Works hard to be invisible.",
      hidden: "She's in love with Jakub. They've been meeting in secret for six months.",
      secret: "She knows her father killed someone. She found out three years ago. She's never told him she knows."
    },

    wants: "A life here. A real one. Not as an outsider's daughter, but as herself.",
    fears: "That she'll always be defined by where she came from. That love isn't enough to make a home.",

    speechPattern: 'Shifts. Mainland polish when nervous. Village rhythm when comfortable.',

    dialogueBase: {
      greeting: "Oh! Keeper. I didn't see you there.",
      neutral: "I try to be helpful. To fit in. It's harder than it looks.",
      trusting: "You see me, don't you? Not just my father's daughter.",
      suspicious: "People talk about my family. I know they do."
    }
  },

  simao: {
    id: 'simao',
    name: 'Father Simao',
    age: 55,
    family: 'church',
    role: 'Priest',
    color: '#8a7a50',

    description: {
      visible: "Sent here as quiet punishment for something never discussed. Has grown to love the village. Drinks with the fishermen.",
      hidden: "He heard the confession of the man who killed Marta's husband. He knows everything. He can never tell.",
      secret: "He's in love with Anna. Has been for years. Has never said a word. Never will."
    },

    wants: "To believe again. Or to stop pretending he believes. Either would be relief.",
    fears: "Dying with all these secrets. Being forgotten as the drunk priest of a dying village.",

    speechPattern: 'Liturgical rhythms even in casual speech. Quotes scripture without meaning to.',

    dialogueBase: {
      greeting: "Ah, the Keeper. Come, sit. The wine is poor but the company is honest.",
      neutral: "Faith is a strange thing. It grows stronger in thin soil, sometimes.",
      trusting: "I've heard confessions for thirty years. Yours would not be the heaviest.",
      suspicious: "The record and the confession. Both sacred. Both dangerous."
    }
  },

  bela: {
    id: 'bela',
    name: 'Bela',
    age: 16,
    family: 'shore',
    role: "Marta's Grandson, Goatherd",
    color: '#4a5a3a',

    description: {
      visible: "Strange boy. Watches everything. Says little. The goats follow him like he's one of them.",
      hidden: "He knows everything. He's been watching the adults lie to each other his entire life.",
      secret: "He saw what happened the night of the storm. He knows who cut the rope."
    },

    wants: "For someone to ask him what he knows. To matter. To be seen.",
    fears: "That he'll become like them. Keeping secrets. Telling lies. Forgetting how to be honest.",

    speechPattern: 'Almost monosyllabic. But when he speaks, listen. He never speaks without purpose.',

    dialogueBase: {
      greeting: "...",
      neutral: "I watch.",
      trusting: "You write things down. I remember things. We're similar.",
      suspicious: "I see what you write. I see what you don't."
    }
  },

  jakub: {
    id: 'jakub',
    name: 'Jakub',
    age: 24,
    family: 'shore',
    role: "Peter's Younger Brother",
    color: '#3a5a4a',

    description: {
      visible: "Quieter than Peter. In his shadow. In love with Lucia.",
      hidden: "Will fight for her if he has to.",
      secret: "Doesn't know yet what that might cost."
    },

    wants: "To be his own man. To love who he loves without permission.",
    fears: "That he'll always be Peter's little brother. That the village won't let him choose.",

    speechPattern: 'Thoughtful. Careful. Speaks only when he has something worth saying.',

    dialogueBase: {
      greeting: "Keeper. Good day.",
      neutral: "My brother speaks for the family. I just work.",
      trusting: "Some things are worth more than tradition.",
      suspicious: "I know people talk. Let them."
    }
  },

  helena: {
    id: 'helena',
    name: 'Helena',
    age: 45,
    family: 'hill',
    role: 'Tavern Keeper',
    color: '#7a6a50',

    description: {
      visible: "Hears everything said over drink. Knows which marriages are failing, which debts are unpaid.",
      hidden: "A potential source. Or a threat.",
      secret: "She trades in information. Everyone's business is her currency."
    },

    wants: "Security. Influence. To never be powerless again.",
    fears: "Being irrelevant. Being forgotten.",

    speechPattern: 'Warm on the surface. Calculating underneath.',

    dialogueBase: {
      greeting: "Keeper! What'll it be tonight?",
      neutral: "People talk when they drink. It's natural. Healthy, even.",
      trusting: "I hear things, you know. Things that might be useful to a man in your position.",
      suspicious: "Careful what you ask. Some questions have prices."
    }
  },

  oldSimao: {
    id: 'oldSimao',
    name: 'Old Simao',
    age: 77,
    family: 'shore',
    role: 'Retired Fisherman, Storyteller',
    color: '#5a5a4a',

    description: {
      visible: "Knew Marta's husband. Knew Peter's father. Remembers the wreck.",
      hidden: "Starting to lose his memory. Or pretending to.",
      secret: "Tells stories that might be truth or might be myth. Perhaps he no longer knows the difference."
    },

    wants: "To be heard. To matter before he's gone.",
    fears: "Being forgotten. His stories dying with him.",

    speechPattern: 'Wandering. Repetitive. Occasionally startlingly clear.',

    dialogueBase: {
      greeting: "Ah! Sit, sit. Let me tell you about the old days.",
      neutral: "The sea takes and gives. That's always been true. Always will be.",
      trusting: "There are things I remember. Things others have forgotten. Or want to forget.",
      suspicious: "Memory's a strange thing. Some things stay clear. Others... drift."
    }
  }
};

// Family groupings
const Families = {
  shore: {
    name: 'The Shore Family',
    description: 'Original settlers. Four generations deep. Control the best fishing waters by tradition.',
    color: '#2d5a3d',
    members: ['marta', 'peter', 'anna', 'bela', 'jakub', 'oldSimao']
  },
  church: {
    name: 'The Church',
    description: 'Positioned as neutral arbiters. The priest holds many secrets.',
    color: '#8a7a50',
    members: ['simao']
  },
  newcomer: {
    name: 'The Newcomers',
    description: 'Arrived within the last decade. Skilled but unintegrated. Carry secrets from the mainland.',
    color: '#5a6a7a',
    members: ['tomas', 'lucia']
  },
  hill: {
    name: 'The Hill Family',
    description: 'Came two generations ago. Trades, crafts, the tavern.',
    color: '#7a6a50',
    members: ['helena']
  }
};

// Get villager by ID
function getVillager(id) {
  return Villagers[id] || null;
}

// Get all villagers in a family
function getFamily(familyId) {
  return Families[familyId]?.members.map(id => Villagers[id]) || [];
}

// Get villager's current dialogue based on trust level
function getDialogue(villagerId, trustLevel) {
  const villager = Villagers[villagerId];
  if (!villager) return null;

  if (trustLevel >= 70) return villager.dialogueBase.trusting;
  if (trustLevel <= 30) return villager.dialogueBase.suspicious;
  return villager.dialogueBase.neutral;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Villagers, Families, getVillager, getFamily, getDialogue };
}
