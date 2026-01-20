# THE LIGHTHOUSE KEEPER: AESTHETIC REVISION
## Visual Identity Overhaul

---

# THE VISION: Palimpsest Lit by Fire

The game looks like **a manuscript that has been written, erased, and rewritten for generations** — illuminated only by **firelight**.

Every surface carries the ghost of what was written before. Every truth is layered over an older truth. The only light comes from flame — the lighthouse lamp, candles, lanterns. What the fire doesn't touch is true black. Unknown. Void.

**This is not a game with nice graphics. This is a game that looks like its theme feels.**

---

# CORE AESTHETIC PRINCIPLES

## 1. Nothing is Clean

Every surface shows **revision**:
- Text has strikethroughs, corrections, marginal notes
- Images have multiple outlines, like they've been redrawn
- UI elements look hand-corrected
- The village itself appears sketched, erased, sketched again

**Implementation:** Layer textures with transparency. Show "older" versions bleeding through. Use hand-drawn line weights that vary. Nothing is perfect or mechanical.

## 2. Light is Earned

The only illumination is **fire**:
- The lighthouse lamp (main source)
- Candles in windows
- Lanterns carried by villagers
- The hearth in the tavern

Everything else is **black**. Not dark blue, not gray. BLACK.

**Implementation:** Use actual black (#000000) for unlit areas. Light sources use additive blending. The color palette is: black, deep amber (#1a0f00), amber (#d4a03c), warm white (#fff4e0). That's it.

## 3. The Frame is Visible

This is a **constructed record**, and the player should feel it:
- The game area is a page, a document, a manuscript
- Edges are torn, burned, water-stained
- Marginalia appears (your notes? previous keepers'?)
- The "camera" doesn't move smoothly — it's examining a physical object

**Implementation:** Render the game inside a document frame. Add paper texture overlay. Include visible edges, binding, damage.

## 4. Time Bleeds Through

The past is **visible beneath the present**:
- Ghostly images of previous events in locations
- Text fragments from old records appearing briefly
- Characters sometimes flicker with younger/older versions of themselves
- The twenty-year-old murder leaves visual scars on the village

**Implementation:** Use transparency layers that fade in/out. Trigger "memory bleeds" based on story state. Locations have embedded history.

---

# COLOR SYSTEM

## The Palette

```
TRUE BLACK     #000000    Void, unknown, darkness, the sea at night
DEEP CHAR      #0a0604    Barely visible, edge of light
BURNT UMBER    #1a0f05    Deep shadow within light
DRIED BLOOD    #2a1510    Shadows, old stains
AGED PAPER     #c4a882    Background, documents, skin in shadow
WARM PARCHMENT #e8d4b8    Lit surfaces, highlighted text
LAMP AMBER     #d4a030    Primary light color
FLAME CORE     #f0c860    Brightest points
HOT WHITE      #fff4e0    Extreme highlights, the lamp itself
FADED INK      #3a3028    Text, lines, drawings
FRESH INK      #1a1410    New writing, emphasis
OLD BLOOD      #4a2020    The murder, violence, the wound
```

## Usage Rules

- **Background is ALWAYS paper texture or black**
- **No blues, no greens, no cool colors** — everything is warm or black
- **Light falls off sharply** — no soft ambient fill
- **Blood/violence uses the old blood color** — dried, historical, not bright red

---

# TYPOGRAPHY

## The Manuscript Hierarchy

### Primary Text: The Record
- **Font:** A humanist serif with slight irregularity (IM Fell, Sorts Mill Goudy, or custom)
- **Style:** Varies in weight like hand-written with a pen
- **Treatment:** Slight texture, ink spread on paper

### Secondary Text: Marginalia  
- **Font:** A more hurried italic script
- **Style:** Cramped, angled, squeezed into margins
- **Treatment:** Fainter ink, sometimes crossed out

### System Text: The Frame
- **Font:** A clean serif, more modern — the "outer" layer
- **Style:** This is the game talking, not the manuscript
- **Treatment:** Subtle, doesn't compete with the record

### Revision Marks
- Strikethroughs that are **visible** (the original readable beneath)
- Carets and insertions
- Marginal corrections
- Different ink colors suggesting different times (faded vs fresh)

---

# THE LIGHTHOUSE BEAM

The beam is no longer just atmosphere. It's the **core visual verb**.

## Behavior

1. **The beam sweeps** — one full rotation every 12 seconds
2. **What it touches is illuminated** — revealed in full detail
3. **What it doesn't touch is BLACK** — truly invisible, not just dark
4. **You can HOLD the beam** — stop the rotation, focus on one area
5. **The village notices** — if you hold on a location too long, they know

## Visual Treatment

```
The beam:
- Conic gradient from the lighthouse
- Core: #fff4e0 (hot white)
- Falloff: #f0c860 → #d4a030 → #1a0f05 → #000000
- Sharp edge, not soft
- Visible dust motes in the beam
- When it passes over a location, that location "reveals" for a moment
```

## The Held Beam

When you focus:
- The beam stops
- The focused area illuminates FULLY
- Everything else goes to BLACK
- A subtle vignette pulses
- The focused villagers become AWARE (suspicion increases)

---

# CHARACTER RENDERING

## The Palimpsest Effect

Characters aren't cleanly drawn. They're **layered revisions**:

- Visible outlines that don't quite align (like traced multiple times)
- Subtle transparency showing "earlier" versions
- When they move, a brief ghost trail
- Their faces are somewhat obscured — you see them through the record

## Portrait Treatment

Full character portraits (for testimony/dialogue):
- Rendered in amber/sepia tones
- Strong chiaroscuro (harsh light, deep shadow)
- One side of face lit, one side in near-black
- Eyes are the brightest point (catch the light)
- Edges are soft, like a memory

## In-Scene Rendering

Characters in the village view:
- More symbolic, less detailed
- Silhouettes when in darkness
- Only fully visible when the beam touches them
- Movement is slightly stilted (like a zoetrope)

---

# ENVIRONMENT RENDERING

## The Village

**Style:** Hand-drawn, sketch-like, with visible construction lines

- Buildings have multiple outlines (redrawn, corrected)
- Textures are hand-drawn hatching and cross-hatching
- The sea is BLACK with subtle movement (not blue)
- The sky is BLACK (no stars, no moon — just the void)
- The only light comes from windows (orange rectangles) and the lighthouse

## The Lighthouse

**The visual anchor of the game:**

- Always visible, always the brightest point
- The lamp at the top is HOT WHITE
- The beam emanates from it visibly
- The tower itself is rendered more solidly than the village (it's permanent, they're not)
- Subtle glow around the lamp (the only soft light in the game)

## Interior Scenes

When you enter a building or view a close-up:
- Lit by candle or lantern
- Deep shadows
- Objects emerge from darkness as relevant
- Strong texture on surfaces (wood grain, stone, cloth)
- Always a sense of things just outside the light

---

# UI AS MANUSCRIPT

## The Frame

The entire game is presented as a **document being examined**:

```
┌────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░┌──────────────────────────────────────────────────────────┐░ │
│ ░│                                                          │░ │
│ ░│                    [THE GAME AREA]                       │░ │
│ ░│                                                          │░ │
│ ░│              Rendered as a page/manuscript               │░ │
│ ░│                                                          │░ │
│ ░│    ~~~~~~~~~~~~torn edge~~~~~~~~~~~~                     │░ │
│ ░│                                                          │░ │
│ ░└──────────────────────────────────────────────────────────┘░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────────────────┘
         ↑ This is the "desk" — deep wood grain, dark
```

## Page Damage

The document has survived time:
- **Water stains** in corners (the sea got to it)
- **Burn marks** at edges (someone tried to destroy it?)
- **Foxing** (age spots)
- **Tears** (repaired with other paper)
- **Binding visible** on left edge

## The Log Panel

Where you compose entries:
- Looks like a page in a ledger
- Ruled lines, slightly uneven (hand-drawn)
- Your text appears as if hand-written
- Ink blots occasionally
- Previous entries visible above (can scroll back)
- Margins have notes (yours? someone else's?)

## Villager Panel

- Portraits in small circles (like miniatures in a manuscript)
- Stats represented as hand-drawn bars or notches
- Text labels in the marginal script
- Subtle indicators for status (a small mark, not a glowing icon)

## Fragment Tray

- Fragments are torn pieces of paper
- Different colors suggest different sources (testimony vs observation)
- When you drag them, they cast a small shadow
- When placed, ink "bleeds" into the slot

---

# ANIMATION PHILOSOPHY

## Staccato, Not Fluid

Movement should feel like **examining a series of drawings**, not watching a film:

- Limited frames (8-12 fps visual style, even if running at 60)
- Holds on key poses
- Transitions are cuts, not tweens
- When something moves, it MOVES — then stops

## Fire is Alive

The only fluid movement is **fire**:

- The lamp flickers constantly
- Candles gutter
- Shadows dance
- This makes fire feel alive, everything else feels like record

## The Beam is Sacred

The beam moves smoothly — it's mechanical, eternal:

- 12-second rotation, always
- Never stutters
- The contrast between the beam (smooth) and the village (staccato) emphasizes the lighthouse's otherworldly nature

## Memory Bleeds

When the past intrudes:

- Flicker effect (2-3 frames of the memory)
- Slight double-exposure
- Sound cuts out briefly
- Then snaps back

---

# EFFECTS IMPLEMENTATION

## Paper Texture Overlay

Always present, subtle:

```css
.game-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('paper-texture.png');
  opacity: 0.15;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

## Fire Flicker

The lamp constantly varies:

```javascript
// Subtle brightness fluctuation
function flickerLight() {
  const base = 1.0;
  const variance = 0.05;
  const flicker = base + (Math.random() - 0.5) * variance;
  lamp.intensity = flicker;
  
  // Occasional larger flicker
  if (Math.random() < 0.02) {
    lamp.intensity *= 0.9;
  }
  
  requestAnimationFrame(flickerLight);
}
```

## Ink Bleed Effect

When text is placed:

```css
@keyframes ink-bleed {
  0% {
    filter: blur(2px);
    opacity: 0.7;
  }
  50% {
    filter: blur(0.5px);
    opacity: 0.9;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.text-placed {
  animation: ink-bleed 0.4s ease-out;
}
```

## Palimpsest Layer

For showing previous versions:

```css
.palimpsest-layer {
  position: absolute;
  opacity: 0.15;
  filter: blur(1px) sepia(100%);
  mix-blend-mode: multiply;
  animation: palimpsest-drift 20s ease-in-out infinite;
}

@keyframes palimpsest-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(2px, 1px); }
}
```

## The Void

Areas outside the light:

```css
.void {
  background: #000000;
  /* No gradients, no softness, just black */
}

.light-falloff {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0,0,0,0.5) 80%,
    #000000 100%
  );
}
```

---

# AUDIO-VISUAL INTEGRATION

## Light = Sound

- When the beam illuminates, a subtle **tone** sounds
- Different locations have different tones (implied by what you might hear there)
- Holding the beam creates sustained tone
- Darkness is silence (except the sea)

## Fire = Life

- Fire crackle is always present when near flame
- The lighthouse lamp has a low **hum** (mechanical, eternal)
- Candles have no sound (small, intimate)
- Absence of fire = absence of human warmth

## Paper = Touch

- Every UI interaction has a **paper** sound
- Placing fragments: paper on paper
- Writing: pen scratch
- Page turn: for moving between sections
- Stamp/seal: for locking entries

---

# CUTSCENE TREATMENT

## The Lantern Slide Approach

Cutscenes are **not** animated cinematics. They are:

- A series of **illustrated frames** (like magic lantern slides)
- Each held for 3-5 seconds
- Transitions are **cuts** or **dissolves** (not wipes)
- Narration appears as text on the frame (or below it)
- Limited animation within frames (flickering fire, drifting smoke)

## Visual Style for Cutscenes

- Even more stylized than gameplay
- Stronger use of silhouette
- More extreme chiaroscuro
- Almost woodcut-like quality
- Color reduced further (nearly monochrome with amber highlights)

## The Memory Cutscenes

When showing the past:

- Same style but more **degraded**
- Visible damage (scratches, tears, stains)
- Occasional missing frames (jumps)
- Sound is muffled, distant
- The "recording" of memory is imperfect

---

# SPECIFIC SCENE TREATMENTS

## The Village View (Main Gameplay)

```
- BLACK background (the void, the sea, the sky)
- The lighthouse on the right, lamp glowing
- The beam sweeping left to right
- Village buildings in warm amber when lit, GONE when not
- Characters as silhouettes until illuminated
- Paper texture overlay on everything
- Torn edge visible at screen margins
```

## The Log Panel (Entry Composition)

```
- Full-screen manuscript page
- Ruled lines, imperfect
- Your entry being composed in the center
- Fragments along the bottom as torn paper pieces
- Marginal notes visible on edges
- Previous entries visible above (faded)
- Ink well and pen visible in corner (decorative)
```

## Testimony Scene (Character Dialogue)

```
- Character portrait dominates (60% of screen)
- Lit from one side (harsh chiaroscuro)
- Background is DEEP BLACK
- Their words appear as handwritten text below
- Your responses are fragments you select (as paper slips)
- Their expression changes between "slides" (not animated)
```

## The Lighthouse Interior

```
- The lamp at center, BLAZING
- Everything else in deep shadow
- The mechanism visible (gears, weights, mirrors)
- Previous keeper's notes scattered
- Your desk with the log
- Window showing the BLACK sea
```

---

# IMPLEMENTATION PRIORITIES

## Phase 1: Core Aesthetic (Do First)

1. Implement true black darkness
2. Implement the beam as actual light source
3. Add paper texture overlay
4. Establish the color palette
5. Create the manuscript UI frame

## Phase 2: Character Treatment

1. Portrait rendering with chiaroscuro
2. Silhouette rendering for village view
3. The "palimpsest" double-outline effect
4. Limited animation frames

## Phase 3: Polish Effects

1. Fire flicker system
2. Ink bleed on text
3. Memory bleed effects
4. Paper damage details
5. Marginalia system

## Phase 4: Cutscene Style

1. Lantern slide format
2. Transition system
3. Memory degradation effects
4. Voice/text integration

---

# REFERENCE TOUCHSTONES

Study these for specific qualities:

**Obra Dinn** — Limited palette, high contrast, how constraint creates identity

**Mundaun** — Hand-drawn textures, pencil aesthetic, folkloric wrongness

**Kentucky Route Zero** — Theatrical lighting, darkness as positive space, text presentation

**Year Walk** — Folklore aesthetic, limited animation, woodcut feeling

**The Shrouded Isle** — Limited color, silhouettes, sacrificial atmosphere

**Darkest Dungeon** — Chiaroscuro portraits, ink/sketch aesthetic, grim weight

**Pentiment** — Medieval manuscript aesthetic, text as visual design, illuminated style

---

# THE NORTH STAR

When in doubt, ask:

**"Does this look like a document that has survived fire, water, time, and lies?"**

If yes: it belongs.
If no: revise.

The aesthetic is the theme. The theme is the aesthetic.

**The record is never clean. The truth is never whole. The light only reaches so far.**
