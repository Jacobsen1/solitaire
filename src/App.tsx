import React from "react";
import "./App.css";
import PlayingCard from "./playingCard";
import { Grid } from "@material-ui/core";
import StackedCards from './StackedCards'

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
}
export interface Deck extends Array<Card> {}

function makeDeck(): Deck {
  let deck: Deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit: suit, value: value });
    }
  }
  return deck;
}

function selectRandomCard(deck: Deck): Card {
  var card = deck[Math.floor(Math.random() * deck.length)];
  return card;
}

function App() {
  let deck: Deck = makeDeck();
  //console.log(deck)
  let currentDeck: Deck = [];
  currentDeck.push(selectRandomCard(deck));

  currentDeck.push(selectRandomCard(deck));
  /*
  return (
    <div className="App">
      <Grid container>
        {currentDeck.map((card) => {
          return (
            <Grid item>
              <PlayingCard value={card.value} suit={card.suit} turned={true}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
  */
  
  return (
    <div className="App">
      <Grid container>
        <StackedCards cards={currentDeck}/>
      </Grid>
    </div>
    
  );
  
}

export default App;
