/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
//import PlayingCard from "./playingCard";
import { Grid } from "@material-ui/core";
import { StackedCards } from './Components/StackedCards'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

export const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
export const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
export interface Card {
  suit: string;
  value: string;
  column?: number;
  discovered: boolean;
}

export interface Deck extends Array<Card> { }

const deck = makeDeck()
const sDeck = makeStartingBoard()
const tDeck = makeTestDeck(5)



function makeStartingBoard(): Deck[] {
  let returnDeck = []

  for (let i = 0; i < 7; i++) {
    let tempDeck = []
    tempDeck.push({ suit: '', value: '', column: i, discovered: false })
    for (let j = 0; j <= i; j++) {
      let tmpCard = selectRandomCard()
      tmpCard.column = i
      if (j === i) {
        tmpCard.discovered = true
      }
      tempDeck.push(tmpCard)
    }
    returnDeck.push(tempDeck)
  }
  return returnDeck
}

function makeDeck(): Card[] {
  let returnDeck: Card[] = [];
  for (let suit of suits) {
    for (let value of values) {
      returnDeck.push({ suit: suit, value: value, discovered: false });
    }
  }
  return returnDeck;
}

function makeTestDeck(num: number): Deck {
  let deck: Deck = []
  for (let i = 0; i < num; i++) {
    let tmpCard = selectRandomCard()

    deck.push(tmpCard);

  }

  return deck
}

function findCard(card: Card, deck: Deck): number {
  for (let i = 0; i < deck.length; i++) {
    if (deck[i].suit === card.suit && deck[i].value === card.value) {
      return i
    }
  }
  return -1
}

function selectRandomCard(): Card {
  let tempDeck = [...deck]
  let rnd = Math.floor(Math.random() * tempDeck.length)
  let card = tempDeck[rnd];

  tempDeck.splice(rnd, 1)
  return card;
}




function App() {

  const [globalDeck, setGlobalDeck] = useState<Deck>(deck)
  const [startingDeck, setStartingDeck] = useState<Deck[]>(sDeck)
  const [testDeck, setTestDeck] = useState<Deck>(() => makeTestDeck(4))



  const moveCard = (fromCard: Card, toCard: Card): void => {

    let tempDeck = [...startingDeck]
    if (fromCard !== undefined && fromCard.column !== undefined && toCard.column !== undefined) {

      let idx = findCard(fromCard, tempDeck[fromCard.column])
      //let idx = tempDeck[fromCard.column].indexOf(fromCard)
      if (idx >= 0) {
        tempDeck[fromCard.column].splice(idx, 1)
        if (tempDeck[fromCard.column].length > 0) {
          tempDeck[fromCard.column][tempDeck[fromCard.column].length - 1].discovered = true
        }
        fromCard.column = toCard.column
        tempDeck[toCard.column].push(fromCard)
      }
    }
    setStartingDeck(tempDeck)
  }

  const move = useCallback((fromCard: Card, toCard: Card): void => {
    moveCard(fromCard, toCard)
  }, [startingDeck, setStartingDeck])



  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Grid container direction="row" alignItems="flex-start" justify="space-evenly">
          {startingDeck.map((x, i) =>
            <Grid item key={i}>
              <StackedCards cards={x} moveCard={move} column={i} />
            </Grid>
          )}
        </Grid>
      </DndProvider>
    </div>
  )
}

export default App;
