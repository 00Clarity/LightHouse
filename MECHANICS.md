# THE LIGHTHOUSE KEEPER: MECHANICAL REVISION
## The Beam as Core Verb, The Record as Negotiation

---

# OVERVIEW

This document revises the core mechanics to embody the theme more fully.

**Previous design:** Drag fragments, compose entries, watch stats change.

**Revised design:** Aim the light, witness what it reveals, negotiate with those you've seen, compose records from contested truth.

The lighthouse is no longer set dressing. It's the primary tool.
The record is no longer a solitary act. It's a negotiation.
Time is no longer linear. The past bleeds through.

---

# PART I: THE BEAM MECHANIC

## The Lighthouse as Tool

Each night, you have **control of the lighthouse beam**.

The beam:
- Rotates automatically by default (one full sweep every 12 seconds)
- Can be **held** in position (costs attention, raises suspicion)
- Can be **directed** to specific locations (limited repositions per night)
- **Reveals** what it touches
- **Hides** what it doesn't

## What the Light Reveals

When the beam illuminates a location or character:

**Level 1 — Passing Light (Normal Sweep)**
- You see who is present
- You see basic activity (working, talking, fighting)
- You get surface-level fragments

**Level 2 — Held Light (3+ seconds)**
- You see details (expressions, objects, evidence)
- You hear snippets (partial dialogue)
- You get deeper fragments
- **The subject becomes aware they're being watched**

**Level 3 — Focused Light (10+ seconds)**
- You see everything visible
- You hear full conversations
- You get complete fragments
- **The subject knows you're watching**
- **Their behavior changes (performance or concealment)**

## What Darkness Hides

When something is NOT illuminated:
- You cannot see it directly
- You only have **testimony** about it (what others claim)
- Any fragments from darkness are **uncertain** (visually marked)
- The truth of what happened there is unknowable to you

**This is the core tension:** You cannot illuminate everything. What stays dark, you must accept on faith — or fabricate.

## Suspicion from the Beam

The villagers track where you point your light:

- Occasional illumination: Normal, expected (you're the keeper)
- Frequent illumination of one location: Noticed, questioned
- Held illumination: Suspicion rises, behavior changes
- Focused illumination: Confrontation possible

**Suspicion Effects:**
- Low: They act naturally
- Medium: They perform for you (show what they want you to see)
- High: They hide from the light, confront you, or leave the village

## The Beam in the Interface

```
NIGHT PHASE:
┌─────────────────────────────────────────────────────┐
│                                                     │
│     [THE VILLAGE - mostly dark]                     │
│                                                     │
│           ░░░░░BEAM░░░░░                           │
│         ░░░░░░░░░░░░░░░░░                          │
│       ░░░░░░░HOUSE░░░░░░░░░                        │
│     ░░░░░░░[REVEALED]░░░░░░░                       │
│                                                     │
│                              ◯ LIGHTHOUSE           │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [AUTO] [HOLD] [DIRECT]          Attention: ███░░   │
└─────────────────────────────────────────────────────┘

CONTROLS:
- AUTO: Beam sweeps automatically
- HOLD: Click and hold on a location to fix beam there
- DIRECT: Click to reposition beam (limited uses)
- ATTENTION: Resource that depletes with active control
```

---

# PART II: THE TESTIMONY SYSTEM

## Before You Write, They Speak

You cannot write a record without first **hearing testimony**.

For any event significant enough to record:
1. The involved parties come to the lighthouse
2. Each gives their testimony (what they claim happened)
3. You may question, press, or accept
4. They may offer, threaten, or plead
5. Only then do you compose the record

## Testimony Structure

Each testimony has:

**The Claim** — What they say happened
**The Evidence** — What they offer to support it (if anything)
**The Subtext** — What you perceive beneath (based on what you witnessed with the beam)
**The Offer** — What they'll give you if you write it their way
**The Threat** — What happens if you don't

## What You Witnessed vs. What They Say

If you illuminated the event:
- You have **direct fragments** (marked as witnessed)
- You can challenge testimony that contradicts what you saw
- Your challenge has weight

If you didn't illuminate the event:
- You only have **their fragments** (marked as claimed)
- You cannot directly contradict
- You must choose whose claim to believe

**This is why the beam matters.** Your authority depends on what you've seen. See nothing, and you're at their mercy.

## Negotiation Mechanics

During testimony, you can:

**Accept** — Take their fragment as offered
**Press** — Push for more detail (may reveal more, may anger them)
**Challenge** — If you have contradicting evidence (risks relationship)
**Offer** — Trade something you know for something they know
**Threaten** — Use your power as keeper (severe relationship cost)

They can:

**Offer Payment** — Information, favors, goods
**Offer Secrets** — Knowledge about others
**Threaten Exposure** — They know something about you
**Threaten Departure** — They'll leave if you write against them
**Threaten Violence** — In extreme cases

## Example Testimony Flow

```
THE CATCH DISPUTE (Week 1)

[PÉTER'S TESTIMONY]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLAIM: "I was at the eastern rocks before dawn. 
        My family has fished those waters for four generations.
        Tomás arrived after and dropped his net into mine."

EVIDENCE: "My father's records show we've held those waters 
           since before Tomás was born."

SUBTEXT: [If you watched with the beam]
         You saw Péter arrive second. He's lying about the timing.
         [If you didn't watch]
         You have no way to know.

OFFER: "Write it true, and I'll tell you what my father 
        knew about the old keeper."

THREAT: "My family has been here longer than you. 
         We'll be here after you're gone. Remember that."

[OPTIONS]
→ Accept his version
→ Press: "You're certain about the timing?"
→ Challenge: "I saw you arrive after Tomás." [only if witnessed]
→ Defer: "I'll hear Tomás before I decide."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# PART III: THE REVISION SYSTEM

## Records Can Be Changed

After writing an entry, you can **revise** it. But:

- The original is still visible (crossed out)
- The mainland sees the revision (your authority erodes)
- The subject of the revision knows (trust destroyed or gained)
- Each revision costs standing

## Standing System

You have a **Standing** meter with the mainland:

```
STANDING: ████████░░ (80/100)

- Starts at 80 (new keeper, provisional trust)
- Clear, consistent records: slowly increases
- Revisions: decreases (-5 to -15 depending on severity)
- Challenged records: decreases if challenge succeeds
- Standing below 50: warnings from mainland
- Standing below 20: replacement sent
```

## When to Revise

You might revise because:
- New evidence emerges that contradicts your record
- A villager threatens you if you don't
- You realize you were lied to
- You decide mercy matters more than truth
- The consequence of the record was worse than expected

## Revision Interface

```
ORIGINAL ENTRY (Week 1):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Péter established prior claim to the catch 
 in accordance with ancestral tradition."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[REVISE]

REVISED ENTRY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"P̶é̶t̶e̶r̶ ̶e̶s̶t̶a̶b̶l̶i̶s̶h̶e̶d̶ ̶p̶r̶i̶o̶r̶ ̶c̶l̶a̶i̶m̶ ̶t̶o̶ ̶t̶h̶e̶ ̶c̶a̶t̶c̶h̶
 ̶i̶n̶ ̶a̶c̶c̶o̶r̶d̶a̶n̶c̶e̶ ̶w̶i̶t̶h̶ ̶a̶n̶c̶e̶s̶t̶r̶a̶l̶ ̶t̶r̶a̶d̶i̶t̶i̶o̶n̶.̶

The evidence regarding the disputed catch 
proved inconclusive upon further examination."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COST: -8 Standing
PÉTER: Trust -20, will demand explanation
TOMÁS: Trust +5, vindication is partial

[CONFIRM REVISION] [CANCEL]
```

---

# PART IV: THE TIME LAYERS

## Three Records, Three Times

You are not only recording the present. You are also:

1. **Reconstructing the past** — What happened twenty years ago
2. **Recording the present** — What happens this season
3. **Witnessing the future** — Glimpses of what your records cause

## The Past Layer

As you investigate, you piece together the twenty-year-old murder:

- Documents in the chapel
- Father Simão's guarded confessions
- Marta's reluctant testimony
- Physical evidence (the hidden cargo)
- The previous keeper's notes

**You compose a record of the past**, just as you compose records of the present. What you write about twenty years ago affects how the village understands itself NOW.

**Past Entry Interface:**
```
THE RECONSTRUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Year: Twenty years ago
Event: The death of István (Marta's husband)

OFFICIAL RECORD: "Drowned in the storm surge while 
                  salvaging the wreck."

YOUR RECONSTRUCTION: [COMPOSE]

Available fragments:
- "died by violence" [from chapel documents]
- "three men present" [from Father Simão]
- "Henrik's confession" [from priest, if earned]
- "Marta's knowledge" [from Marta, if earned]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## The Future Layer

At certain moments, you **see forward** — brief visions of what your records cause.

These are not choices. They are consequences. You witness them, then return to the present.

**Future Vision Example:**
```
[YOUR ENTRY]: "Tomás deliberately initiated the dispute 
               despite traditional claims."

[VISION - 5 YEARS HENCE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Tomás house is empty. Boarded windows.
Lucia lives on the mainland. She doesn't visit.
Péter's son fishes the eastern rocks alone.
No one remembers why Tomás left.
The record says he was a troublemaker. 
The record is all anyone has.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[RETURN TO PRESENT]
```

These visions cannot be changed directly. You change them by changing your records.

## Time Bleed Moments

Sometimes the layers **intrude on each other**:

- In the present, you see a ghost of the past (István walking to the shore)
- In testimony, a villager says something that echoes a future vision
- The previous keeper's notes predict something that's happening now
- Your memory of Aldric bleeds into your perception of Tomás

**Time Bleed Trigger:**
```
PRESENT: Examining the rope from Péter's boat
PAST: [BLEEDS THROUGH] You see different rope, twenty years ago.
       Same rocks. Same question. Who cut it?
YOUR MEMORY: [BLEEDS THROUGH] The evidence on your old desk.
              You had to decide then, too. You decided wrong.
              Or right. You still don't know.
PRESENT: The rope is still in your hands. What do you write?
```

---

# PART V: FRAGMENT SYSTEM (REVISED)

## Fragment Sources

Fragments now have **clear provenance**:

**WITNESSED** — You saw it directly (beam illuminated it)
- Visually marked with an eye symbol
- High credibility
- Can be used to challenge testimony

**TESTIFIED** — Someone claimed it
- Marked with the speaker's initial
- Medium credibility (depends on speaker's trust score)
- Can be contradicted by witnessed fragments

**DOCUMENTED** — Found in records, notes, evidence
- Marked with a document symbol
- Credibility varies (official = high, personal = medium)
- Historical weight

**UNCERTAIN** — Occurred in darkness, no witness
- Marked with a question mark
- Low credibility
- The mainland may question entries built on these

## Fragment Combination Rules

Your entry's credibility depends on its components:

```
ENTRY CREDIBILITY CALCULATION:

All WITNESSED fragments: "Confirmed" status
Mix of WITNESSED and TESTIFIED: "Substantiated" status  
Mostly TESTIFIED: "Reported" status
Contains UNCERTAIN: "Unverified" status

Mainland response varies by credibility:
- Confirmed: Full acceptance, standing +2
- Substantiated: Acceptance, standing +0
- Reported: Noted, standing -1
- Unverified: Questioned, standing -3
```

## Visual Treatment of Fragments

```
┌─────────────────────────────────────────────────┐
│ AVAILABLE FRAGMENTS                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  ◉ "arrived before dawn"          [WITNESSED]  │
│     └─ Péter, eastern rocks, Day 1             │
│                                                 │
│  P "has fished these waters for generations"   │
│     └─ Péter's testimony           [TESTIFIED] │
│                                                 │
│  T "dropped my net first"          [TESTIFIED] │
│     └─ Tomás's testimony                       │
│                                                 │
│  ▣ "traditional fishing rights"                │
│     └─ Village charter, 1847      [DOCUMENTED] │
│                                                 │
│  ? "something exchanged hands"    [UNCERTAIN]  │
│     └─ Occurred in darkness                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

# PART VI: THE CHALLENGE SYSTEM

## Villagers Can Resist

When you write something damaging, the subject can **challenge**:

**Challenge Requirements:**
- The villager must have trust > 30 (enough social capital)
- The villager must have contradicting evidence OR witnesses
- The challenge happens before the record ships to mainland

**Challenge Process:**
1. You write the entry
2. The villager formally challenges
3. A hearing occurs (other villagers may speak)
4. You can **defend**, **revise**, or **withdraw**
5. The outcome affects standing and relationships

## Challenge Interface

```
CHALLENGE RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ENTRY: "Tomás deliberately initiated the dispute 
             despite traditional claims."

CHALLENGER: Tomás

TOMÁS: "This is false. I demand you prove it 
        or remove it from the record."

HIS EVIDENCE:
- Lucia witnessed him arrive first [TESTIFIED by Lucia]
- His net shows the damage from Péter's interference
- He has never contested tradition before (character)

YOUR EVIDENCE:
- Péter's testimony [TESTIFIED]
- Village charter [DOCUMENTED]
- [You did not witness the event directly]

OPTIONS:
→ DEFEND: "My record stands. Péter's testimony and 
           the charter support my conclusion."
→ REVISE: Change the entry to something he'll accept
→ WITHDRAW: Remove the entry entirely (major standing loss)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LIKELY OUTCOMES:
- DEFEND with weak evidence: Challenge likely succeeds
  Standing -10, Tomás vindicated, your authority damaged
- DEFEND with strong evidence: Challenge likely fails
  Tomás silenced, but resentment grows
- REVISE: Standing -5, Tomás partially satisfied
- WITHDRAW: Standing -15, seen as weak
```

---

# PART VII: WEEKLY STRUCTURE (REVISED)

## The Rhythm of a Week

```
NIGHT 1-2: THE EVENT
- Something happens in the village
- You witness what you can (beam usage)
- You gather initial fragments

NIGHT 3-4: TESTIMONY
- Involved parties come to the lighthouse
- You hear competing accounts
- You negotiate, press, gather more fragments

NIGHT 5-6: INVESTIGATION
- You can seek additional evidence
- Visit locations, examine objects
- Talk to witnesses
- Use the beam to revisit

NIGHT 7: THE RECORD
- You compose your entry
- You see the immediate consequences
- Challenges may occur
- The week ends

[TRANSITION]
- Time passes
- The village responds to your record
- Setup for next week's event
```

## Beam Usage Across the Week

You have **limited attention** each week:

```
WEEKLY ATTENTION: ████████████████████ (20 units)

COSTS:
- Auto sweep (passive): 0 per night
- Directed beam: 2 per reposition
- Held beam: 1 per 3 seconds
- Focused beam: 3 per 10 seconds

If attention runs out:
- The beam returns to auto sweep
- You cannot direct or hold
- You must accept what you happen to see
```

This creates resource tension: Do you spend attention early (witnessing the event) or save it for investigation (finding evidence later)?

---

# PART VIII: THE KEEPER'S WOUND (MECHANICAL)

## Your Past as Mechanic

Your history with Aldric — the man you may have wrongly condemned — isn't just backstory. It mechanically affects play:

**Memory Intrusion:**
Certain situations trigger your memories. When triggered:
- The screen shifts (time bleed aesthetic)
- You see a parallel moment from your past
- Your **Certainty** meter is affected

**The Certainty Meter:**
```
CERTAINTY: ██████░░░░ (60/100)

High certainty: You trust your judgments, act decisively
Low certainty: You second-guess, see parallels everywhere,
               may freeze at crucial moments

TRIGGERS THAT LOWER CERTAINTY:
- Ambiguous evidence (reminds you of Aldric)
- Someone begging you not to write (like his wife)
- Discovering you were wrong about something
- Time bleeds showing parallel situations

TRIGGERS THAT RAISE CERTAINTY:
- Clear evidence that confirms your record
- Villagers thanking you for truth
- Successfully defending a challenge
- Moments of genuine clarity
```

**Low Certainty Effects:**
- Some dialogue options become unavailable (you can't project confidence)
- Memory bleeds become more frequent
- The beam becomes harder to hold steady (slight drift)
- Villagers sense your hesitation (some exploit it, some comfort you)

## The Aldric Question

The game tracks what you believe about Aldric:

```
WHAT HAPPENED TO ALDRIC?

Your current belief: [UNCERTAIN]

Evidence for guilt:
- The testimony you recorded
- The pattern of his behavior
- The official verdict

Evidence for innocence:
- The counter-evidence that emerged after
- The gaps in the case
- The look in his wife's eyes

This will never be resolved. You will never know.
But your belief affects how you see everything here.
```

At the end of the game, you must write a record about Aldric, too. One final entry in your private log. What do you write about the man whose fate you decided?

---

# PART IX: INTEGRATION NOTES

## How These Systems Connect

```
THE BEAM → reveals events → creates WITNESSED fragments
                        → raises SUSPICION if overused

SUSPICION → changes villager behavior → affects TESTIMONY
         → may block access to information

TESTIMONY → provides TESTIFIED fragments → enters negotiation
         → offers/threats affect other systems

FRAGMENTS → compose ENTRIES → affect STANDING with mainland
                           → trigger CONSEQUENCES
                           → may face CHALLENGES

CHALLENGES → test your EVIDENCE → may force REVISIONS
          → affect STANDING and relationships

REVISIONS → show editorial marks → erode STANDING
         → change CONSEQUENCES

TIME LAYERS → past informs present → present shapes future
           → all three records matter

CERTAINTY → affects available actions → influenced by parallels
         → the wound that doesn't heal
```

## The Core Loop (Revised)

```
1. NIGHT FALLS — The event is occurring
2. AIM THE BEAM — Choose what to witness (or not)
3. GATHER FRAGMENTS — From light and darkness
4. HEAR TESTIMONY — Negotiate with those involved
5. COMPOSE THE RECORD — From what you have
6. FACE CONSEQUENCES — Challenges, reactions, time visions
7. THE WEEK TURNS — The village changes, you remain
8. REPEAT — Until the season ends

Then: THE RECKONING
- Write about the past (István's death)
- Write about yourself (what kind of keeper)
- Sign or don't sign
- See what your records have made
```

---

# IMPLEMENTATION PRIORITIES

## Phase 1: The Beam
- Implement beam rotation
- Implement hold/direct controls
- Implement light reveal (locations appear/disappear)
- Implement attention resource
- Implement basic suspicion from beam usage

## Phase 2: Testimony
- Implement testimony scenes
- Implement negotiation options (press/challenge/accept)
- Implement offers and threats
- Connect witnessed fragments to challenge ability

## Phase 3: Fragment Provenance
- Mark fragments by source
- Implement credibility calculation
- Visual treatment for different types
- Mainland response to credibility

## Phase 4: Challenge System
- Implement challenge trigger
- Implement hearing scene
- Implement defend/revise/withdraw
- Connect to standing system

## Phase 5: Time Layers
- Implement past record (the reconstruction)
- Implement future visions
- Implement time bleed moments
- Connect layers to each other

## Phase 6: Certainty System
- Implement certainty meter
- Implement memory triggers
- Implement low-certainty effects
- Implement the Aldric throughline

---

# SUMMARY

The mechanical revisions transform the game from:

**BEFORE:** "Drag fragments, make entries, watch numbers change"

**AFTER:** 
- The lighthouse beam is your eye — limited, consequential, watched
- Testimony is negotiation — truth is contested, not given
- Records can be challenged — your authority is not absolute
- Time bleeds — past/present/future inform each other
- Your wound matters — certainty is a resource, doubt is a companion

The mechanics now **embody** the theme:
- You cannot see everything → You must choose what to illuminate
- Truth is negotiated → Records emerge from conflict, not observation
- Authority is fragile → The mainland and villagers both hold power over you
- History is constructed → The past is as contestable as the present
- Your hands are not clean → What you did before shapes what you do now

**The record is never the event. But the record is all anyone will have.**
