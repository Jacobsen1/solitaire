# Solitaire – UI test plan

Seed: `tests/seed.spec.ts` (opens the game with a deterministic, seeded deal – see `tests/fixtures.ts`).
Implemented in `tests/solitaire.spec.ts`.

## 1. Initial deal
- Page loads without console errors; title is "Solitaire"; stock is face down.
- Seven tableau piles with 1..7 cards; only the top card of each pile is face up.
- Four empty foundations, empty waste.
- All 52 distinct cards are dealt (28 tableau + 24 stock).

## 2. Stock and waste
- Clicking the stock turns over three cards to the waste.
- After eight draws the stock is exhausted; the next click recycles the waste and dealing starts over.
- Only the top waste card is draggable.

## 3. Moving cards (drag and drop)
- Top tableau card onto another pile; onto an empty pile.
- Moving the top card reveals the face-down card beneath it.
- Dragging a card from the middle of a face-up run moves the whole run.
- Waste card onto the tableau; ace from the waste onto a foundation.
- Top tableau card onto a foundation, revealing the next card.

## Notes
- Move validation is currently disabled in the app (the `isValid*` rules in `src/gameLogic.ts` are not called),
  so tests assert that moves are carried out, not that illegal moves are rejected.
- Use `board.drag()` instead of `locator.dragTo()`: the stepped mouse drag lets the app's drag-start
  effect run, like a real user drag.
- Headless Chromium does not fire `dragend` when a card is dropped outside every drop zone, so
  "drop outside returns the card" cannot be covered by Playwright.
