// Seed file for the Playwright planner/generator/healer agents.
// It opens the game with a deterministic (seeded) deal so generated tests are reproducible.
import { test, expect } from './fixtures'

test.describe('Solitaire', () => {
  test('seed', async ({ board }) => {
    await expect(board.tableauCards(0)).toHaveCount(1)
    // generate code here.
  })
})
