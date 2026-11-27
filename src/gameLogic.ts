import type { Card, Deck } from './Types'
import type { GameState } from './Reducers/GameReducer'

const suits = ["♠︎", "♥︎", "♣︎", "♦︎"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export const isRed = (suit: string) => suit === "♥︎" || suit === "♦︎"

/** Placeholder card used for empty piles, foundations and the stock. */
export function emptySlot(overrides: Partial<Card> = {}): Card {
  return { suit: '', value: '', numValue: -1, discovered: false, column: -1, pos: -1, isTop: false, isInGlobal: false, ...overrides }
}

/** The empty slot at the bottom of each tableau pile (stable references, so memoized cards don't re-render). */
export const TABLEAU_SLOTS: readonly Card[] = Array.from({ length: 7 }, (_, column) => emptySlot({ column }))

/**
 * Splits the stock into draws of three, taken from the end of `cards`, and renumbers
 * each card's column (draw index) and pos (index within the draw). Consumes `cards`.
 */
export function dealIntoDraws(cards: Deck): Deck[] {
  const draws: Deck[] = []
  while (cards.length) {
    const draw = cards.splice(-3)
    draw.forEach((card, pos) => {
      card.pos = pos
      card.column = draws.length
    })
    draws.push(draw)
  }
  return draws
}

export function newGame(): GameState {
  const { startingDeck, globalDeck } = makeStartingBoard()
  return {
    startingDeck,
    splitDeck: dealIntoDraws(globalDeck),
    topRightDeck: [0, 1, 2, 3].map((column) => [emptySlot({ column, isTop: true })]),
    draggedCards: [],
  }
}

function makeStartingBoard(): { startingDeck: Deck[], globalDeck: Deck } {
  const startingDeck: Deck[] = []
  const deck = getGlobalDeck()
  for (let i = 0; i < 7; i++) {
    const pile: Deck = []
    for (let j = 0; j <= i; j++) {
      const [card] = deck.splice(Math.floor(Math.random() * deck.length), 1)
      card.column = i
      card.pos = j
      card.isInGlobal = false
      card.discovered = j === i
      pile.push(card)
    }
    startingDeck.push(pile)
  }
  return { startingDeck, globalDeck: deck }
}

function getGlobalDeck(): Deck {
  return suits.flatMap((suit) =>
    values.map((value, i) => ({ suit, value, numValue: i + 1, discovered: true, column: -1, pos: -1, isTop: false, isInGlobal: true }))
  )
}

// MOVE RULES – currently not enforced (the app allows any move).
export function isValidStartingDeck(fromCard: Card, toCard: Card): boolean {
  if (toCard.suit === '' && toCard.value === '' && toCard.pos === -1) {
    return true
  }
  return fromCard.numValue + 1 === toCard.numValue && isRed(fromCard.suit) !== isRed(toCard.suit)
}

export function isValidTopDeck(fromCard: Card, toCard: Card): boolean {
  if (toCard.suit === '' && toCard.value === '' && fromCard.value === "A") {
    return true
  }
  return fromCard.numValue === toCard.numValue + 1 && fromCard.suit === toCard.suit
}

export function isValidFromSplit(fromCard: Card, toCard: Card): boolean {
  return toCard.isTop ? isValidTopDeck(fromCard, toCard) : isValidStartingDeck(fromCard, toCard)
}
