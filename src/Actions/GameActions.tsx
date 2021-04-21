import { Card, Deck } from '../Types'

export enum GameActionTypes {
  InitializeGame = "InitializeGame",
  MoveCardStartingCard = "MoveCardStartingCard",
  MoveCardSplitDeck = "MoveCardSplitDeck",
  MoveCardTopRight = "MoveCardTopRight",
  UpdateSplitDeck = "UpdateSplitDeck"
}

/* -------- TYPES -------- */
export type GameState = {
  startingDeck: Deck[]
  splitDeck: Deck[]
  topRightDeck: Deck[]
}
type MoveCardPayload = {
  fromCard: Card
  toCard: Card
}
type InitializeGameType = {
  type: GameActionTypes.InitializeGame
  payload: GameState
}
type MoveCardStartingCard = {
  type: GameActionTypes.MoveCardStartingCard
  payload: MoveCardPayload
}

type MoveCardSplitDeck = {
  type: GameActionTypes.MoveCardSplitDeck
  payload: MoveCardPayload
}

type MoveCardTopRight = {
  type: GameActionTypes.MoveCardTopRight
  payload: MoveCardPayload
}

type UpdateSplitDeck = {
  type: GameActionTypes.UpdateSplitDeck
}


export type GameActions =
  MoveCardStartingCard |
  InitializeGameType |
  MoveCardSplitDeck |
  UpdateSplitDeck |
  MoveCardTopRight

/* -------- ACTIONS -------- */
export const initializeGame = (payload: GameState) => ({
  type: GameActionTypes.InitializeGame,
  payload
})
export const moveCardStartingCard = (payload: MoveCardPayload) => ({
  type: GameActionTypes.MoveCardStartingCard,
  payload
})

export const moveCardSplitDeck = (payload: MoveCardPayload) => ({
  type: GameActionTypes.MoveCardSplitDeck,
  payload
})

export const moveCardTopRight = (payload: MoveCardPayload) => ({
  type: GameActionTypes.MoveCardTopRight,
  payload
})

export const updateSplitDeck = () => ({
  type: GameActionTypes.UpdateSplitDeck
})





