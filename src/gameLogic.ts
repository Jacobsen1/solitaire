/* eslint-disable */

import {Card, Deck} from './Types'


const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",];
const numValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];




export function initGameBoard(): {splitDeck: Deck[], startingDeck: Deck[]} {
  let obj = makeStartingBoard()
  let newGlobalDeck: Deck[] = []
  while (obj.globalDeck.length) {
    if ((obj.globalDeck.length - 3) > 0) {
      newGlobalDeck.push(obj.globalDeck.splice(obj.globalDeck.length - 3, 3))
    } else {
      newGlobalDeck.push(obj.globalDeck.splice(0, obj.globalDeck.length))
    }
  }
  return {splitDeck: newGlobalDeck, startingDeck: obj.startingDeck}
}

export function getTopRightDeck() : Deck[] {
  return [
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 0, pos: -1, isTop: true, isInGlobal: false }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 1, pos: -1, isTop: true, isInGlobal: false }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 2, pos: -1, isTop: true, isInGlobal: false }],
    [{ suit: '', value: '', numValue: -1, discovered: false, column: 3, pos: -1, isTop: true, isInGlobal: false }]
  ]
}

function makeStartingBoard(): {startingDeck: Deck[],globalDeck: Deck} {
  let returnDeck = []
  let deck = getGlobalDeck()
  for (let i = 0; i < 7; i++) {
    let tempDeck = []
    tempDeck.push({ suit: '', value: '', numValue: -1, discovered: false, column: i, pos: -1, isTop: false, isInGlobal: false })
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
      returnDeck.push({ suit: suit, value: values[i], numValue: numValues[i], discovered: true, column: -1, pos: -1, isTop: false, isInGlobal: true });
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


export function moveCard(fromCard: Card, toCard: Card, startingDeck: Deck[]): Deck[]{
  if (fromCard !== undefined && toCard !== undefined/* && isValidStartingDeck(fromCard, toCard)*/) {
    let tempSDeck = [...startingDeck]
    let cardsToPush = tempSDeck[fromCard.column].splice(fromCard.pos + 1, (tempSDeck[fromCard.column].length - 1))
      if (tempSDeck[fromCard.column].length > 1) {
        tempSDeck[fromCard.column][tempSDeck[fromCard.column].length - 1].discovered = true
      }
      for (let i = 0; i < cardsToPush.length; i++) {
        cardsToPush[i].column = toCard.column
        cardsToPush[i].pos = toCard.pos + 1
        tempSDeck[toCard.column].push(cardsToPush[i])
      }
    return tempSDeck
  } else {
    console.log("Something undefined or illegeal move in moveCard")
    return startingDeck
  }
}

export const moveCardToTopLeft = (fromCard: Card, toIdx: number, startingDeck: Deck[], topLeftDeck: Deck[]): {newStartingDeck: Deck[], newTopRightDeck: Deck[]} => {
  if (fromCard !== undefined /*&& isValidTopDeck(fromCard, topDeck[toIdx][topDeck[toIdx].length - 1])*/ && startingDeck[fromCard.column].length - 2 === fromCard.pos) {
    let tempSDeck = [...startingDeck]
    let tempTDeck = [...topLeftDeck]


    fromCard.isTop = true
    tempSDeck[fromCard.column].splice(fromCard.pos + 1, 1)
    tempTDeck[toIdx].push(fromCard)
    if (tempSDeck[fromCard.column].length > 1) {
      tempSDeck[fromCard.column][tempSDeck[fromCard.column].length - 1].discovered = true
    }
    return {newStartingDeck: tempSDeck, newTopRightDeck: tempTDeck}
  } else {
    console.log("Something undefined or illegeal movein moveCardTopRow")
    return {newStartingDeck: startingDeck, newTopRightDeck: topLeftDeck}

  }
  
}


export const moveCardFromSplit = (fromCard: Card, toCard: Card, topRightDeck: Deck[], startingDeck: Deck[], splitDeck: Deck[]): {newTopRightDeck: Deck[], newStartingDeck: Deck[], newSplitDeck: Deck[]} => {
  if (fromCard !== undefined && toCard !== undefined /*&& isValidStartingDeck(fromCard, toCard)*/) {
    let tempTDeck = [...topRightDeck]
    let tempSDeck = [...startingDeck]
    let tempSplitDeck = [...splitDeck]
    for(let i = 0; i < tempSplitDeck.length; i++){
      if(fromCard === tempSplitDeck[i][tempSplitDeck[i].length - 1]){
        tempSplitDeck[i].splice(-1, 1)
      }
    }
    

    fromCard.column = toCard.column
    fromCard.pos = toCard.pos + 1
    
    if (toCard.isTop) {
      tempTDeck[toCard.column].push(fromCard)
    } else {
      console.log(toCard.column)
      console.log(tempSDeck)
      fromCard.isTop = false
      tempSDeck[toCard.column].push(fromCard)
    }
    return {newTopRightDeck: tempTDeck, newStartingDeck: tempSDeck, newSplitDeck: tempSplitDeck}
  } else {
    console.log("Something undefined or illegeal move in moveCardFromTop")
    return {newTopRightDeck: topRightDeck, newStartingDeck: startingDeck, newSplitDeck: splitDeck}
  }
}
