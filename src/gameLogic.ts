/* eslint-disable */

import {Card, Deck} from './Types'


const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",];
const numValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];




export function initGameBoard(): {splitDeck: Deck[], startingDeck: Deck[]} {
  let obj = makeStartingBoard()
  let newGlobalDeck: Deck[] = []
  let counter = 0
  while (obj.globalDeck.length) {
    let tmpCards: Deck = []
    if ((obj.globalDeck.length - 3) > 0) {
      tmpCards = obj.globalDeck.splice(obj.globalDeck.length - 3, 3)
    } else {
      tmpCards = obj.globalDeck.splice(0, obj.globalDeck.length)
    }
    for(let i = 0; i < tmpCards.length; i++){
      tmpCards[i].pos = i
      tmpCards[i].column = counter
    }
    newGlobalDeck.push(tmpCards)
    counter++
  }
  return {splitDeck: newGlobalDeck, startingDeck: obj.startingDeck}
}

export function getTopRightDeck() : Deck[] {
  return [
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 0, pos: -1, isTop: true, isInGlobal: false, display: true }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 1, pos: -1, isTop: true, isInGlobal: false, display: true }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 2, pos: -1, isTop: true, isInGlobal: false, display: true }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 3, pos: -1, isTop: true, isInGlobal: false, display: true }]
  ]
}

function makeStartingBoard(): {startingDeck: Deck[],globalDeck: Deck} {
  let returnDeck = []
  let deck = getGlobalDeck()
  for (let i = 0; i < 7; i++) {
    let tempDeck = []
    //tempDeck.push({ suit: '', value: '', numValue: -1, discovered: false, column: i, pos: -1, isTop: false, isInGlobal: false })
    for (let j = 0; j <= i; j++) {
      const rnd =Math.floor(Math.random() * deck.length)
      let tmpCard = deck[rnd]
      deck.splice(rnd, 1)
      tmpCard.column = i
      tmpCard.pos = j
      tmpCard.isInGlobal = false
      tmpCard.discovered = false
      if (j === i) {
        tmpCard.discovered = true
      }
      tempDeck.push(tmpCard)
    }
    returnDeck.push(tempDeck)
  }
  return {startingDeck: returnDeck, globalDeck: deck}
}
function getGlobalDeck(): Deck {
  let returnDeck: Card[] = [];
  for (let suit of suits) {
    for (let i = 0; i < values.length; i++) {
      returnDeck.push({ suit: suit, value: values[i], numValue: numValues[i], discovered: true, column: -1, pos: -1, isTop: false, isInGlobal: true, display: true });
    }
  }
  return returnDeck
}
//CHECK MOVES
export function isValidStartingDeck(fromCard: Card, toCard: Card): boolean {
  //props.card.suit === "♥︎" || props.card.suit === "♦︎" ? "red" : "black",
  if(toCard.suit === '' && toCard.value === "" && toCard.pos === -1){
    return true
  }
  else if(toCard.suit === "♥︎" || toCard.suit === "♦︎") {

    if (fromCard.numValue + 1 === toCard.numValue && (fromCard.suit === "♣︎" || fromCard.suit === "♠︎")) {
      return true
    }
  } else {

    if (fromCard.numValue + 1 === toCard.numValue && (fromCard.suit === "♥︎" || fromCard.suit === "♦︎")) {
      return true
    }
  }
  console.log("INVALID MOVE")
  return false
}

export function isValidTopDeck(fromCard: Card, toCard: Card):boolean {

  if(toCard.suit === '' && toCard.value === '' && fromCard.value === "A"){
    return true
  } else {
    console.log("First card must be A")
  }
  if (fromCard.numValue === toCard.numValue + 1 && fromCard.suit === toCard.suit) {
    return true
  } else {
    console.log("Selected card must be same suit and one value higher")
  }
  console.log("INVALID MOVE")
  return false
}

export function isValidFromSplit(fromCard: Card, toCard: Card):boolean{
  if(toCard.isTop){
    return isValidTopDeck(fromCard, toCard)
  } else {
    return isValidStartingDeck(fromCard, toCard)
  }
}



