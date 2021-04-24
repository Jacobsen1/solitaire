import { GameActions, GameActionTypes, GameState } from "../Actions/GameActions"
import {  Card, Deck } from "../Types"
import produce from "immer";



export const initialState: GameState = {
  startingDeck: [],
  splitDeck: [],
  topRightDeck: []
}



export const GameReducer = (state = initialState, action: GameActions): GameState => {
  switch(action.type){
    case GameActionTypes.MoveCardStartingCard:
      return produce(state, draft => {
        let fromCard = action.payload.fromCard
        let toCard = action.payload.toCard
        let cardsToPush = draft.startingDeck[fromCard.column].splice(fromCard.pos, draft.startingDeck[fromCard.column].length - fromCard.pos)
        for(let card of cardsToPush){
          if(draft.startingDeck[toCard.column].length === 0){
            card.pos = 0
          } else {
            card.pos = draft.startingDeck[toCard.column].length
          }
          card.column = toCard.column
          draft.startingDeck[toCard.column].push(card)
        }
        if(draft.startingDeck[fromCard.column].length > 0){
          draft.startingDeck[fromCard.column][fromCard.pos - 1].discovered = true
        }

      })
    case GameActionTypes.MoveCardSplitDeck:
      return produce(state, draft => {
        let toCard = action.payload.toCard
        let fromCard: Card = draft.splitDeck[action.payload.fromCard.column].splice(action.payload.fromCard.pos)[0]

        fromCard.column = toCard.column
        fromCard.pos = toCard.pos + 1

        if(toCard.isTop){
          fromCard.isTop = true
          fromCard.isInGlobal = false
          draft.topRightDeck[toCard.column].push(fromCard)
        } else {
          fromCard.isInGlobal = false
          draft.startingDeck[toCard.column].push(fromCard)
        }
      })
   
    case GameActionTypes.MoveCardTopRight:
      let fromCard = action.payload.fromCard
      if(state.startingDeck[fromCard.column].length - 1 === fromCard.pos){
        return produce(state, draft => {
          let newFromCard: Card = draft.startingDeck[fromCard.column].splice(fromCard.pos)[0]
          if(draft.startingDeck[fromCard.column].length > 0){
            draft.startingDeck[fromCard.column][fromCard.pos - 1].discovered = true
          }
          newFromCard.isTop = true
          newFromCard.column = action.payload.toCard.column
          draft.topRightDeck[action.payload.toCard.column].push(newFromCard)
        })
      }else {
        return state
      }
    case GameActionTypes.UpdateSplitDeck:
      console.log("Resetting splitdeck")
      return produce(state, draft => {
        //CAN MAYBE REFINE THIS CODE???
        let tempSplitDeck = [...draft.splitDeck]
        let arr1d: Deck = []
        for (let i = 0; i < tempSplitDeck.length; i++) {
          arr1d = tempSplitDeck[i].concat(arr1d)
        }
        tempSplitDeck = []
        let counter = 0
        while (arr1d.length) {
          let tmpCards: Deck = []
          if ((arr1d.length - 3) > 0) {
            tmpCards = arr1d.splice(arr1d.length - 3, 3)
          } else {
            tmpCards = arr1d.splice(0, arr1d.length)
          }
          for (let i = 0; i < tmpCards.length; i++) {
            tmpCards[i].pos = i
            tmpCards[i].column = counter
          }
          tempSplitDeck.push(tmpCards)
          counter++
        }
        draft.splitDeck = tempSplitDeck
      })
    case GameActionTypes.InitializeGame:
      console.log("Initializing Game")
      return produce(state, draft => {
        draft.startingDeck = action.payload.startingDeck
        draft.splitDeck = action.payload.splitDeck
        draft.topRightDeck = action.payload.topRightDeck
      })
    case GameActionTypes.ToggleDraggedCards:
      return produce(state, draft => {
        for(let i = action.payload.pos; i < draft.startingDeck[action.payload.column].length; i++){
          draft.startingDeck[action.payload.column][i].display = !draft.startingDeck[action.payload.column][i].display
        }
      })
    
    default:
      return state

  }
}


export type RootState = GameState
export const selectStartingDeck = (state: RootState): Deck[] => state.startingDeck
export const selectSplitDeck = (state: RootState): Deck[] => state.splitDeck
export const selectTopRightDeck = (state: RootState): Deck[] => state.topRightDeck



