# DEVELOPMENT LOG

## Purpose

This file tracks what has been built, what decisions were made during implementation, and what remains to be done. Update this after each major work session.

---

## Session Log

### Session 1: 2026-01-19
**Status:** Core Implementation Complete

**Completed:**
- [x] Project setup with full directory structure
- [x] State management system (state.js)
- [x] Villager data with all profiles from DESIGN.md (villagers.js)
- [x] Fragment system with all week-specific fragments (fragments.js)
- [x] Events for all 5 weeks with branching dialogue (events.js)
- [x] Story system with dynamic dialogue modification (story.js)
- [x] Consequence engine with effect calculations (consequence.js)
- [x] Memory system with all keeper flashbacks (memory.js)
- [x] UI rendering system (render.js)
- [x] Fragment drag-and-drop (ui/fragments.js)
- [x] Modal system (modals.js)
- [x] Web Audio ambient soundscape (audio/engine.js)
- [x] Main game controller (main.js)
- [x] CSS theme system with color palette from design
- [x] CSS animations (lighthouse beam, sea, vignette, rain, fog)
- [x] HTML structure with semantic layout
- [x] Build script for single-file distribution

**Decisions Made:**
- Used emoji-based villager portraits for simplicity (can be replaced with SVG later)
- Fragment types color-coded with left border for quick identification
- Memory overlay uses full-screen sepia tint for atmospheric effect
- Consequence modal shows effects one at a time with staggered animation
- Week 5 has special signature choice modal before ending

**Technical Notes:**
- All JavaScript files pass Node.js syntax validation
- Built single-file output is 196.7 KB
- Web Audio uses ScriptProcessor for brown/white noise generation
- Drag-and-drop has keyboard fallback for accessibility

**Next Steps:**
- Browser testing across Chrome, Firefox, Safari
- Mobile responsive testing
- Add SVG portraits for villagers
- Polish pass on animations
- Playtest full 5-week run
- Consider adding save/load UI buttons

---

## Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| State Management | Complete | Event-driven with save/load |
| Event System | Complete | All 5 weeks with branching |
| Fragment Drag-Drop | Complete | Keyboard accessible |
| Consequence Engine | Complete | Tracks truth/mercy/self-serving |
| Story Branching | Complete | Dialogue adapts to prior choices |
| Memory System | Complete | 5 memories tied to actions |
| Audio Engine | Complete | Sea, wind, drone, tension layers |
| Ambient Layers | Complete | Brown noise waves, wind |
| Visual Effects | Complete | Beam, sea, vignette, rain, fog |
| Lighthouse Beam | Complete | CSS conic gradient animation |
| Portraits | Partial | Using emoji, SVG planned |
| All Week 1 Content | Complete | Disputed Catch |
| All Week 2 Content | Complete | Priest's Fever |
| All Week 3 Content | Complete | Secret Meetings |
| All Week 4 Content | Complete | Storm's Toll |
| All Week 5 Content | Complete | The Reckoning + Bela |
| Endings | Complete | 4 village states x 4 keeper types |
| Polish Pass | Not Started | |

---

## Creative Decisions

Track any deviations from or clarifications of DESIGN.md here:

1. **Villager Portraits**: Using Unicode emoji initially for rapid prototyping. The design calls for SVG portraits with dynamic expression changes - this can be added in a polish pass.

2. **Fragment Colors**: Added distinct left-border colors per fragment type (tone=blue-gray, subject=brown, action=green, object=purple, context=violet) for visual identification.

3. **Memory Presentation**: Memories display in a full-screen sepia-tinted overlay with centered text, rather than inline with testimony. This creates stronger dramatic pause.

4. **Bela's Final Visit**: Added as a separate scene between the signature choice and the ending display, giving weight to his judgment.

5. **Week 5 Structure**: Simplified to focus on final conversations + self-documentation rather than a full investigation phase, since the log is about to leave.

---

## Known Issues

1. ScriptProcessor is deprecated in Web Audio API but still widely supported. May need to migrate to AudioWorklet for future-proofing.

2. Font loading may cause FOUT (flash of unstyled text) on slow connections.

3. No explicit mobile touch support for drag-and-drop yet - relies on native behavior.

---

## Questions for Design Review

If returning to Claude.ai for creative consultation, bring these questions:

1. Should there be more fragments available for Week 5's self-documentation? Currently limited options.

2. The ending text generation for all 16+ combinations needs review - some may need more specific writing.

3. Consider adding more secondary character interactions (Helena the tavern keeper, Old Simao the storyteller)?
