# LIGHTHOUSE KEEPER: REVISION IMPLEMENTATION GUIDE
## Instructions for Claude Code

---

# OVERVIEW

You are revising The Lighthouse Keeper with two major overhauls:

1. **AESTHETIC.md** — Complete visual redesign (palimpsest lit by fire)
2. **MECHANICS.md** — Core systems redesign (beam as verb, testimony as negotiation)

Read both documents fully before beginning work.

---

# IMPLEMENTATION ORDER

Do these in sequence, testing each before moving on:

## Stage 1: Visual Foundation

**Goal:** Establish the new aesthetic before adding mechanics

1. **Implement true black darkness**
   - Background is #000000
   - No ambient fill, no dark blue, BLACK
   - Test: The screen should be mostly black when no light source

2. **Implement the color palette**
   - Remove any colors not in AESTHETIC.md palette
   - All warmth comes from fire colors
   - Test: Screenshot should be black + amber + parchment only

3. **Implement paper texture overlay**
   - Add paper texture to game container
   - Low opacity, multiply blend mode
   - Test: Everything should have subtle paper grain

4. **Implement the manuscript frame**
   - Game area is a "page" within a "desk"
   - Visible edges, binding on left
   - Torn/burned edges on paper
   - Test: Should look like examining a document

5. **Implement fire flicker**
   - The lighthouse lamp flickers constantly
   - Subtle variation in brightness
   - Test: The light should never be completely static

## Stage 2: The Beam System

**Goal:** Make the lighthouse beam the core interaction

1. **Implement beam rotation**
   - 12-second full rotation
   - Conic gradient from lighthouse position
   - Sharp falloff to black

2. **Implement light reveal**
   - Locations/characters only visible when beam touches them
   - Silhouettes → revealed as light passes
   - Returns to BLACK when light passes

3. **Implement beam controls**
   - AUTO: Default rotation
   - HOLD: Click to fix beam position (costs attention)
   - DIRECT: Click to reposition beam (limited per night)

4. **Implement attention resource**
   - 20 units per week
   - Display in UI
   - Depletes with beam control
   - Test: Attention should run out if you hold too long

5. **Implement suspicion from beam**
   - Track how long each location is illuminated
   - Suspicion rises with prolonged focus
   - Test: Holding on one house should raise that household's suspicion

## Stage 3: Fragment Provenance

**Goal:** Fragments know where they came from

1. **Add source type to fragments**
   - WITNESSED (eye symbol)
   - TESTIFIED (speaker initial)
   - DOCUMENTED (document symbol)
   - UNCERTAIN (question mark)

2. **Visual treatment per type**
   - Different border styles or colors
   - Clear iconography
   - Test: Should be immediately obvious what type each fragment is

3. **Connect beam to fragments**
   - Events you illuminate → WITNESSED fragments
   - Events in darkness → only TESTIFIED or UNCERTAIN
   - Test: If you don't watch, you shouldn't get witnessed fragments

4. **Implement credibility calculation**
   - Entry credibility based on fragment types
   - Display credibility status on entry preview
   - Test: All-witnessed entry should show "Confirmed"

## Stage 4: Testimony System

**Goal:** Records emerge from negotiation, not isolation

1. **Create testimony scene**
   - Character portrait (chiaroscuro style)
   - Their claim as text
   - Their evidence listed
   - Your options

2. **Implement testimony options**
   - ACCEPT: Take their fragment
   - PRESS: Push for more (may help or hurt)
   - CHALLENGE: If you have contradicting evidence
   - DEFER: Hear others first

3. **Implement offers and threats**
   - NPCs can offer information/favors
   - NPCs can threaten consequences
   - Player can accept or refuse deals
   - Test: Deals should affect available fragments and relationships

4. **Connect witnessed fragments to challenges**
   - Can only CHALLENGE if you have WITNESSED contradiction
   - Challenge success depends on evidence strength
   - Test: Challenging without evidence should fail or be unavailable

## Stage 5: Standing and Challenges

**Goal:** Your authority is not absolute

1. **Implement standing meter**
   - Starts at 80/100
   - Visible in UI
   - Affected by entry credibility and revisions

2. **Implement revision system**
   - Can revise any past entry
   - Original shows through (strikethrough)
   - Costs standing
   - Affects relationships

3. **Implement challenge system**
   - Damaged party can challenge (if trust > 30)
   - Challenge scene with evidence comparison
   - DEFEND / REVISE / WITHDRAW options
   - Outcomes affect standing and relationships

4. **Implement mainland feedback**
   - Standing affects end-of-season summary
   - Low standing triggers warnings
   - Very low standing: replacement threatened
   - Test: Revise multiple times, standing should drop noticeably

## Stage 6: Time Layers

**Goal:** Past, present, and future inform each other

1. **Implement past record interface**
   - Separate "page" for the reconstruction
   - Different fragments (historical evidence)
   - Compose record of what happened 20 years ago

2. **Implement future visions**
   - Triggered after significant entries
   - Brief scene showing consequence
   - Cannot be changed directly
   - Test: Write damaging entry about Tomás, see vision of empty house

3. **Implement time bleeds**
   - Triggered by specific situations
   - Visual effect: sepia overlay, blur
   - Audio effect: sound ducks, single tone
   - Shows parallel moment, then snaps back

4. **Connect layers**
   - What you write about past affects present dialogue
   - What you write in present appears in visions
   - Test: Exposing István's murder should change Marta's dialogue

## Stage 7: The Certainty System

**Goal:** Your wound affects your capability

1. **Implement certainty meter**
   - Starts at 60/100
   - Hidden or subtle display

2. **Implement memory triggers**
   - Specific situations lower certainty
   - Show Aldric memory (the man you may have wronged)
   - Test: Examining ambiguous evidence should trigger memory

3. **Implement certainty effects**
   - Low certainty: some options unavailable
   - Low certainty: beam drifts slightly
   - Low certainty: more frequent time bleeds
   - Test: At low certainty, confident dialogue options should grey out

4. **Implement Aldric throughline**
   - Track player's belief (guilty/innocent/uncertain)
   - Final entry about Aldric in week 5
   - Test: The game should remember choices about Aldric

## Stage 8: Polish

1. **Character rendering**
   - Palimpsest effect (double outlines)
   - Silhouettes in darkness
   - Chiaroscuro portraits in testimony

2. **Animation style**
   - Staccato movement (8-12 fps visual feel)
   - Fire is the only fluid animation
   - Memory bleeds use flicker/double-exposure

3. **Audio integration**
   - Tone when beam illuminates
   - Paper sounds for UI
   - Fire crackle near flame
   - Silence in darkness

4. **Cutscene treatment**
   - Lantern slide style (static frames)
   - Dissolve transitions
   - Limited animation within frames

---

# TESTING CHECKPOINTS

After each stage, verify:

## After Stage 1 (Visual Foundation):
- [ ] The screen is mostly black
- [ ] Light sources are the only color
- [ ] Paper texture is visible
- [ ] Manuscript frame is visible
- [ ] Fire flickers

## After Stage 2 (Beam System):
- [ ] Beam rotates smoothly
- [ ] Locations appear/disappear as beam passes
- [ ] HOLD and DIRECT work
- [ ] Attention depletes
- [ ] Suspicion rises with focus

## After Stage 3 (Fragment Provenance):
- [ ] Fragments have type markers
- [ ] Witnessed vs testified are visually distinct
- [ ] Beam viewing creates witnessed fragments
- [ ] Entry credibility calculates correctly

## After Stage 4 (Testimony System):
- [ ] Testimony scenes display
- [ ] All options work (accept/press/challenge/defer)
- [ ] Offers and threats affect outcomes
- [ ] Challenge requires evidence

## After Stage 5 (Standing):
- [ ] Standing displays and changes
- [ ] Revisions show strikethrough
- [ ] Challenges can occur
- [ ] Mainland feedback varies with standing

## After Stage 6 (Time Layers):
- [ ] Past record is composable
- [ ] Future visions trigger
- [ ] Time bleeds occur
- [ ] Layers affect each other

## After Stage 7 (Certainty):
- [ ] Certainty meter exists
- [ ] Memories trigger
- [ ] Low certainty has effects
- [ ] Aldric throughline works

---

# KEY FILES TO MODIFY/CREATE

Based on existing structure, you'll likely need:

```
MODIFY:
- Main game styles (implement new palette, darkness, paper texture)
- Beam/lighthouse rendering (make it the core mechanic)
- Fragment system (add provenance tracking)
- Entry composition (add credibility display)
- Villager interactions (add testimony system)
- Consequence system (add challenge system)
- State management (add standing, certainty, time layer flags)

CREATE:
- Testimony scene component
- Challenge scene component  
- Time bleed effect system
- Future vision display
- Past record interface
- Memory/Aldric system
- Certainty effects
```

---

# IMPORTANT NOTES

1. **Test visuals first.** If the aesthetic isn't working, the mechanics won't feel right. Get the darkness + fire + paper established before complex systems.

2. **The beam is everything.** Don't skip to testimony until the beam FEELS like your primary tool. You should feel the weight of choosing where to look.

3. **Credibility matters.** The witnessed/testified distinction is the link between beam and record. If this isn't clear, the whole system collapses.

4. **Time bleeds should be earned.** Don't trigger them constantly. They should feel like cracks in reality, not constant interruptions.

5. **Certainty is subtle.** Players shouldn't always know their certainty. The effects should feel like their own hesitation.

6. **Commit often.** Update DEVLOG.md after each stage. Push to git so progress is tracked.

---

# REFERENCE

- AESTHETIC.md — Full visual specification
- MECHANICS.md — Full systems specification
- DESIGN.md (original) — Narrative content, character details, dialogue

The narrative content from DESIGN.md is still valid. You're changing HOW the story is told and interacted with, not WHAT the story is.

Good luck. Make it feel like examining a document that has survived fire, water, time, and lies.
