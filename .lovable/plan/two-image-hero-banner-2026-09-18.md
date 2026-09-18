# Two-image hero banner

## Goal
Turn the existing homepage banner into a refined two-image showcase while preserving its current wording, buttons, statistics, dark treatment, and full-height composition.

## Recommended transition
Use a **soft veil dissolve** rather than a conventional horizontal slide:
- Hold each photograph for about 7 seconds.
- Crossfade over roughly 1.4 seconds while the incoming image makes an almost imperceptible slow push-in.
- Let the outgoing image soften slightly as it fades, creating a polished editorial handoff without flashes or abrupt movement.
- Keep the dark overlay stable so the text never flickers or loses contrast.
- Disable motion for visitors who prefer reduced motion, using a simple fade instead.

## Implementation
1. Add the newly supplied platter photograph as the second banner image through the project’s managed asset storage.
2. Preserve the current photograph as slide one and apply the same dark, softly blurred background treatment to both images.
3. Add automatic cycling, discreet previous/next controls, and a minimal two-position progress indicator that matches the champagne-gold visual language.
4. Keep the existing banner copy and calls to action fixed while only the photography transitions, avoiding distracting content movement.
5. Ensure portrait-aware image positioning keeps the breakfast platter’s key food details visible on desktop and mobile.
6. Pause automatic cycling while the pointer is over the banner or keyboard focus is inside it, and provide accessible labels for manual controls.

## Verification
- Check both slides and controls on desktop and mobile.
- Confirm text contrast, image crops, pause behavior, reduced-motion behavior, and automatic cycling.
- Confirm the homepage still builds and runs without errors.
