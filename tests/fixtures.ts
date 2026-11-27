import { test as base, expect, type Locator, type Page } from '@playwright/test'

/**
 * The game shuffles with Math.random(). Tests replace it with a seeded PRNG
 * (mulberry32) before any app code runs, so every run gets the same deal.
 */
export const DEFAULT_SEED = 1337

export async function seedRandom(page: Page, seed: number) {
  await page.addInitScript((s: number) => {
    let a = s >>> 0
    Math.random = () => {
      a = (a + 0x6d2b79f5) >>> 0
      let t = a
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }, seed)
}

export class Board {
  constructor(readonly page: Page) {}

  tableau(i: number): Locator {
    return this.page.getByTestId(`tableau-${i}`)
  }
  tableauCards(i: number): Locator {
    return this.tableau(i).getByTestId('card')
  }
  faceUp(i: number): Locator {
    return this.tableau(i).locator('[data-testid="card"][data-face-up="true"]')
  }
  /** The empty slot rendered at the bottom of every tableau pile (drop target for empty piles). */
  tableauSlot(i: number): Locator {
    return this.tableau(i).getByTestId('slot')
  }
  foundation(i: number): Locator {
    return this.page.getByTestId(`foundation-${i}`)
  }
  foundationSlot(i: number): Locator {
    return this.foundation(i).getByTestId('slot')
  }
  foundationCard(i: number): Locator {
    return this.foundation(i).getByTestId('card')
  }
  get stock(): Locator {
    return this.page.getByTestId('stock')
  }
  get waste(): Locator {
    return this.page.getByTestId('waste').getByTestId('card')
  }

  /** Click the stock `times` times. */
  async draw(times = 1) {
    for (let i = 0; i < times; i++) await this.stock.click()
  }

  /**
   * Drag like a person would: press, move in small steps, release. A plain `dragTo` is
   * instantaneous, which races the app's drag-start effect (it lifts the dragged cards
   * out of the pile while the drag is in progress).
   */
  async drag(source: Locator, target: Locator | { x: number; y: number }, opts: { sourceOffsetY?: number } = {}) {
    const [from, to] = await Promise.all([
      source.boundingBox(),
      'x' in target ? { ...target, width: 0, height: 0 } : target.boundingBox(),
    ])
    if (!from || !to) throw new Error('drag source/target is not visible')
    const page = this.page
    await page.mouse.move(from.x + from.width / 2, from.y + (opts.sourceOffsetY ?? from.height / 2))
    await page.mouse.down()
    await page.mouse.move(from.x + from.width / 2 + 10, from.y + 20, { steps: 5 })
    await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 10 })
    await page.mouse.up()
  }

  /** Labels such as "A♥︎" for the face-up cards in the waste. */
  wasteLabels(): Promise<string[]> {
    return this.waste.evaluateAll((els) => els.map((el) => `${el.dataset.value}${el.dataset.suit}`))
  }
}

type Fixtures = { board: Board; consoleErrors: string[] }

export const test = base.extend<Fixtures>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))
    await use(errors)
  },
  board: async ({ page, consoleErrors: _ }, use) => {
    await seedRandom(page, DEFAULT_SEED)
    await page.goto('./')
    const board = new Board(page)
    await expect(board.tableauCards(6)).toHaveCount(7)
    await use(board)
  },
})

export { expect }
