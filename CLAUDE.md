# THE LIGHTHOUSE KEEPER

## Project Overview

A narrative browser game about a lighthouse keeper who documents village life. What you write becomes the official truth. You are not a neutral observer — you have a past you're running from, and the village is beginning to document you back.

## Core Design Document

See `DESIGN.md` for the complete creative vision, including:
- Full character profiles and secrets
- All 5 weeks of events with branching dialogue
- The fragment system for composing log entries
- The consequence engine
- Audio and visual specifications
- The Keeper's hidden past and memory system
- Multiple ending types

## Technical Approach

This should be built as a **single HTML file** for distribution, but developed in a modular structure:

```
src/
├── css/
├── js/
│   ├── data/       # Villagers, events, fragments
│   ├── systems/    # State, story, consequences
│   ├── ui/         # Rendering, drag-drop, modals
│   └── audio/      # Web Audio implementation
└── assets/
```

Build step combines everything into `dist/lighthouse.html`.

## Key Systems

1. **State Management** - Track villager wellbeing/trust, story flags, current week
2. **Story Engine** - Generate events/dialogue based on prior choices
3. **Fragment System** - Drag-and-drop composition of log entries
4. **Consequence Engine** - Calculate effects of entries on villagers and story
5. **Memory System** - Trigger Keeper's memories based on specific actions
6. **Audio Engine** - Web Audio API ambient soundscape with reactive tension

## Development Log

Track progress in `DEVLOG.md`.

## Quality Bar

- **Emotionally impactful** - The writing must land
- **Mechanically coherent** - Choices must have visible consequences
- **Atmospherically immersive** - Audio and visuals create presence
- **Technically solid** - No bugs, smooth performance

## Kojima Principles

1. System visible but incomprehensible
2. Personal wound is political theme
3. Sincerity inside absurdity
4. Player is complicit
5. Technology as spirituality

The lighthouse isn't decoration. The log isn't a mechanic. They're the thesis.
