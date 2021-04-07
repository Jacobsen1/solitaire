/* eslint-disable */

import { makeStyles, Grid } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { Card } from '../App'
import { PlayingCard } from "./playingCard";
//import { RecursiveStackedCards2 } from "./RecursiveStackedCards2";



interface RecursiveStackedCardsProps {
  cards: Card[];
  column?: number;
  totalCards: number;
  currentCard: number;
  moveCard: (card1: Card, card2: Card) => void;

}

export const RecursiveStackedCards = React.memo((props: RecursiveStackedCardsProps): any => {
  const [cards, setCards] = useState<Card[]>(() => props.cards)
  const [column, setColumn] = useState(props.column)

  const diff: number = props.currentCard
  let curr = 0 + props.currentCard


  function attachDrag(el: any) {
    if (curr !== 0) {
      drag(el)
    }
  }



  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "Card",

    item: { props: props.cards[curr] },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        let fromCard: Card = { suit: item.props.suit, value: item.props.value, column: column, discovered: true }
        let toCard: Card = { suit: dropResult.props.suit, value: dropResult.props.value, column: dropResult.props.column, discovered: true }
        setColumn(toCard.column)

        console.log(`You dropped ${fromCard.value}, ${fromCard.suit} into ${toCard.value}, ${toCard.suit}`);
        if (fromCard !== undefined && toCard !== undefined) {
          props.moveCard(fromCard, toCard)
        }

      }
    },


  }))



  if (curr === 0) {
    //console.log(cards[curr])

  }
  if (curr < (cards.length - 1)) {


    return (
      <Grid item ref={attachDrag} style={{
        position: "absolute",
        top: curr === 1 ? "0px" : "27px"

      }}>
        <PlayingCard suit={cards[curr].suit} value={cards[curr].value} hidden={true} turned={/*!cards[curr].discovered*/false} column={props.column} >
          <RecursiveStackedCards cards={cards} column={props.column} moveCard={props.moveCard} totalCards={props.totalCards} currentCard={++curr} />
        </PlayingCard>
      </Grid>
    )
  } else {
    //console.log("render else")
    //console.log(cards[curr])

    return (
      <Grid item ref={attachDrag} style={{
        position: "absolute",
        top: curr === 1 ? "0px" : "27px"
      }}>
        <PlayingCard suit={cards[curr].suit} value={cards[curr].value} hidden={false} turned={false} column={props.column} />
      </Grid>
    )
  }




})