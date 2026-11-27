import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Card, Deck } from "../Types"
import { dealIntoDraws } from "../gameLogic"

export type GameState = {
  startingDeck: Deck[]
  splitDeck: Deck[]
  topRightDeck: Deck[]
  /** Tableau cards lifted out of their pile while they are being dragged. */
  draggedCards: Deck
}

type MovePayload = { fromCard: Card; toCard: Card }

const initialState: GameState = {
  startingDeck: [],
  splitDeck: [],
  topRightDeck: [],
  draggedCards: [],
}

/** Only tableau cards are lifted; waste (isInGlobal) and foundation (isTop) cards use their own column/pos numbering. */
const isTableauCard = (card: Card) => !card.isInGlobal && !card.isTop

function moveWithinTableau(state: GameState, { fromCard, toCard }: MovePayload) {
  const target = state.startingDeck[toCard.column]
  for (const card of state.draggedCards) {
    card.pos = target.length
    card.column = toCard.column
    target.push(card)
  }
  if (state.startingDeck[fromCard.column].length > 0) {
    state.startingDeck[fromCard.column][fromCard.pos - 1].discovered = true
  }
  state.draggedCards = []
}

function moveFromWaste(state: GameState, { fromCard: dragged, toCard }: MovePayload) {
  const fromCard = state.splitDeck[dragged.column].splice(dragged.pos)[0]
  fromCard.column = toCard.column
  fromCard.pos = toCard.pos + 1
  fromCard.isInGlobal = false
  if (toCard.isTop) {
    fromCard.isTop = true
    state.topRightDeck[toCard.column].push(fromCard)
  } else {
    state.startingDeck[toCard.column].push(fromCard)
  }
}

function moveToFoundation(state: GameState, { fromCard, toCard }: MovePayload) {
  const pile = state.startingDeck[fromCard.column]
  if (state.draggedCards.length !== 1) {
    // only a single card can go to a foundation: put the stack back
    pile.push(...state.draggedCards)
  } else {
    const card = state.draggedCards[0]
    if (pile.length > 0) {
      pile[pile.length - 1].discovered = true
    }
    card.isTop = true
    card.column = toCard.column
    state.topRightDeck[toCard.column].push(card)
  }
  state.draggedCards = []
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGame(state, { payload }: PayloadAction<GameState>) {
      state.startingDeck = payload.startingDeck
      state.splitDeck = payload.splitDeck
      state.topRightDeck = payload.topRightDeck
    },
    /** A card (and any cards on top of it) was dropped on `toCard`. */
    dropCards(state, { payload }: PayloadAction<MovePayload>) {
      if (payload.toCard.isTop && !payload.fromCard.isInGlobal) {
        moveToFoundation(state, payload)
      } else if (payload.fromCard.isInGlobal) {
        moveFromWaste(state, payload)
      } else {
        moveWithinTableau(state, payload)
      }
    },
    /** Turn the whole waste back into the stock. */
    resetStock(state) {
      state.splitDeck = dealIntoDraws([...state.splitDeck].reverse().flat())
    },
    /** Drag started: lift the card and everything on top of it out of its tableau pile. */
    liftCards(state, { payload: card }: PayloadAction<Card>) {
      if (isTableauCard(card)) {
        state.draggedCards = state.startingDeck[card.column].splice(card.pos)
      }
    },
    /** Drag cancelled: put the lifted cards back. */
    restoreCards(state, { payload: card }: PayloadAction<Card>) {
      if (isTableauCard(card)) {
        state.startingDeck[card.column].push(...state.draggedCards)
        state.draggedCards = []
      }
    },
  },
})

export const { initializeGame, dropCards, resetStock, liftCards, restoreCards } = gameSlice.actions
export const GameReducer = gameSlice.reducer

export const selectStartingDeck = (state: GameState) => state.startingDeck
export const selectSplitDeck = (state: GameState) => state.splitDeck
export const selectTopRightDeck = (state: GameState) => state.topRightDeck
export const selectDraggedCards = (state: GameState) => state.draggedCards
