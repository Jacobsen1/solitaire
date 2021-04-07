/* eslint-disable */

import { Grid } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from '../App'
import { PlayingCard } from "./playingCard";
import { RecursiveStackedCards } from "./RecursiveStackedCards";

interface stackedCardsProps {
  cards: Card[];
  column: number;
  moveCard: (card1: Card, card2: Card) => void;
}


export const StackedCards = (props: stackedCardsProps) => {

  const [cards, setCards] = useState<Card[]>(props.cards)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "Card",
    drop: () => ({ props: props }),
  }))

  const move = useCallback((fromCard: Card, toCard: Card): void => {
    props.moveCard(fromCard, toCard)
  }, [cards[props.column], setCards, drop])


  return (
    <Grid container direction="column">
      {/*}
      <Grid item>
        <PlayingCard suit='' value='' hidden={false} turned={false} column={props.column} />
      </Grid>
  */}
      {cards.length > 0 ?
        <RecursiveStackedCards cards={cards} column={props.column} moveCard={move} totalCards={props.cards.length} currentCard={0} />
        :
        ''}

    </Grid>
  )
}

