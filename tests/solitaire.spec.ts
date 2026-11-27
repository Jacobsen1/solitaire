import { test, expect } from './fixtures'

// With DEFAULT_SEED the deal is fixed:
//   tableau tops: 2♣︎ 4♣︎ 9♠︎ 5♦︎ J♠︎ 2♦︎ 8♦︎
//   stock draws:  [10♦︎ Q♦︎ K♦︎] [4♦︎ 7♦︎ 9♦︎] [J♣︎ Q♣︎ A♦︎] [5♣︎ 7♣︎ 8♣︎]
//                 [8♥︎ Q♥︎ K♥︎] [4♥︎ 5♥︎ 7♥︎] [6♠︎ 8♠︎ 2♥︎] [A♠︎ 2♠︎ 3♠︎]

test.describe('Initial deal', () => {
  test('renders the page without errors', async ({ board, page, consoleErrors }) => {
    await expect(page).toHaveTitle('Solitaire')
    await expect(board.stock.getByTestId('card')).toHaveAttribute('data-face-up', 'false')
    expect(consoleErrors).toEqual([])
  })

  test('deals seven tableau piles with only the top card face up', async ({ board }) => {
    for (let i = 0; i < 7; i++) {
      await expect(board.tableauCards(i)).toHaveCount(i + 1)
      await expect(board.faceUp(i)).toHaveCount(1)
      // the face-up card is the last (top) card in the pile
      await expect(board.tableauCards(i).last()).toHaveAttribute('data-face-up', 'true')
    }
  })

  test('starts with four empty foundations and an empty waste', async ({ board }) => {
    for (let i = 0; i < 4; i++) {
      await expect(board.foundation(i).getByTestId('slot')).toBeVisible()
      await expect(board.foundation(i).getByTestId('card')).toHaveCount(0)
    }
    await expect(board.waste).toHaveCount(0)
  })

  test('deals all 52 distinct cards (28 on the tableau, 24 in the stock)', async ({ board }) => {
    const seen = new Set<string>()
    let tableauCount = 0
    for (let i = 0; i < 7; i++) tableauCount += await board.tableauCards(i).count()
    expect(tableauCount).toBe(28)

    for (let draw = 0; draw < 8; draw++) {
      await board.stock.click()
      const cards = await board.waste.all()
      for (const card of cards) seen.add(await board.label(card))
    }
    expect(seen.size).toBe(24)
  })
})

test.describe('Stock and waste', () => {
  test('clicking the stock turns over three cards', async ({ board }) => {
    await board.stock.click()
    await expect(board.waste).toHaveCount(3)
    await expect(board.waste.last()).toHaveAttribute('data-value', 'K')
    await expect(board.waste.last()).toHaveAttribute('data-suit', '♦︎')
  })

  test('cycles through the stock and starts over when it is exhausted', async ({ board }) => {
    for (let draw = 0; draw < 8; draw++) {
      await board.stock.click()
      await expect(board.waste).toHaveCount(3)
    }
    // ninth click: stock exhausted, waste is turned back into the stock
    await board.stock.click()
    await expect(board.waste).toHaveCount(0)
    // and dealing starts again from the first draw
    await board.stock.click()
    await expect(board.waste.last()).toHaveAttribute('data-value', 'K')
  })

  test('only the top waste card is draggable', async ({ board }) => {
    await board.stock.click()
    await expect(board.waste.last()).toHaveCSS('cursor', 'pointer')
    await expect(board.waste.first()).not.toHaveCSS('cursor', 'pointer')
  })
})

test.describe('Moving cards', () => {
  test('moves the top tableau card onto another pile', async ({ board }) => {
    const card = board.tableauCards(0).last()
    await expect(card).toHaveAttribute('data-value', '2')

    await board.drag(card, board.tableauCards(1).last())

    await expect(board.tableauCards(0)).toHaveCount(0)
    await expect(board.tableauSlot(0)).toBeVisible()
    await expect(board.tableauCards(1)).toHaveCount(3)
    await expect(board.tableauCards(1).last()).toHaveAttribute('data-value', '2')
    await expect(board.tableauCards(1).last()).toHaveAttribute('data-suit', '♣︎')
  })

  test('reveals the hidden card underneath when the top card is moved away', async ({ board }) => {
    await expect(board.faceUp(2)).toHaveCount(1)

    await board.drag(board.tableauCards(2).last(), board.tableauCards(3).last())

    await expect(board.tableauCards(2)).toHaveCount(2)
    await expect(board.tableauCards(2).last()).toHaveAttribute('data-face-up', 'true')
    await expect(board.tableauCards(3)).toHaveCount(5)
  })

  test('moves a run of face-up cards together', async ({ board }) => {
    // build a two-card run on pile 1: 4♣︎ + 2♣︎
    await board.drag(board.tableauCards(0).last(), board.tableauCards(1).last())
    await expect(board.faceUp(1)).toHaveCount(2)

    // drag the lower card of the run (4♣︎) to pile 4 – the 2♣︎ on top must follow
    // (grab the visible strip of the card – the rest of it is covered by the card on top)
    await board.drag(board.faceUp(1).first(), board.tableauCards(4).last(), { sourceOffsetY: 15 })

    await expect(board.tableauCards(4)).toHaveCount(7)
    const tops = board.tableauCards(4)
    await expect(tops.nth(5)).toHaveAttribute('data-value', '4')
    await expect(tops.nth(6)).toHaveAttribute('data-value', '2')
    // pile 1 lost both cards and revealed its hidden card
    await expect(board.tableauCards(1)).toHaveCount(1)
    await expect(board.tableauCards(1).last()).toHaveAttribute('data-face-up', 'true')
  })

  test('moves a card onto an empty tableau pile', async ({ board }) => {
    await board.drag(board.tableauCards(0).last(), board.tableauCards(1).last())
    await expect(board.tableauCards(0)).toHaveCount(0)

    await board.drag(board.tableauCards(2).last(), board.tableauSlot(0))

    await expect(board.tableauCards(0)).toHaveCount(1)
    await expect(board.tableauCards(0).last()).toHaveAttribute('data-value', '9')
  })

  test('moves the top waste card onto the tableau', async ({ board }) => {
    await board.stock.click()
    await board.drag(board.waste.last(), board.tableauCards(3).last())

    await expect(board.waste).toHaveCount(2)
    await expect(board.tableauCards(3)).toHaveCount(5)
    await expect(board.tableauCards(3).last()).toHaveAttribute('data-value', 'K')
  })

  test('moves an ace from the waste to a foundation', async ({ board }) => {
    for (let draw = 0; draw < 3; draw++) await board.stock.click()
    await expect(board.waste.last()).toHaveAttribute('data-value', 'A')

    await board.drag(board.waste.last(), board.foundation(0).getByTestId('slot'))

    const foundationCard = board.foundation(0).getByTestId('card')
    await expect(foundationCard).toHaveAttribute('data-value', 'A')
    await expect(foundationCard).toHaveAttribute('data-suit', '♦︎')
    await expect(board.waste).toHaveCount(2)
  })

  test('moves the top tableau card to a foundation and reveals the next card', async ({ board }) => {
    await board.drag(board.tableauCards(5).last(), board.foundation(1).getByTestId('slot'))

    await expect(board.foundation(1).getByTestId('card')).toHaveAttribute('data-value', '2')
    await expect(board.tableauCards(5)).toHaveCount(5)
    await expect(board.tableauCards(5).last()).toHaveAttribute('data-face-up', 'true')
  })
})

test.describe('Regressions', () => {
  test('dragging a waste card does not disturb the tableau', async ({ board }) => {
    // 4th draw is [5♣︎ 7♣︎ 8♣︎]; its top card has the same column/pos indexes as cards in tableau pile 3
    for (let draw = 0; draw < 4; draw++) await board.stock.click()
    await expect(board.waste.last()).toHaveAttribute('data-value', '8')

    await board.drag(board.waste.last(), board.tableauCards(6).last())

    await expect(board.tableauCards(6)).toHaveCount(8)
    for (let i = 0; i < 6; i++) await expect(board.tableauCards(i)).toHaveCount(i + 1)
  })
})
