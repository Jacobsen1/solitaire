/* eslint-disable */

import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useState } from "react";
import { Deck, Card } from '../Types'
import { PlayingCard } from "./PlayingCard";



interface Props {
  cards: Card[];

  column: number;
  totalCards: number;
  currentCard: number;
  moveCard: (fromCard: Card, toCard: Card) => void
  moveCardToTopRight: (fromCard: Card, toIdx: number) => void


}

export const RecursiveStackedCards = React.memo((props: Props): any => {

  let newCurr = props.currentCard + 1
  const distBetweenCards = 43


  const moveCardCb = useCallback((fromCard: Card, toCard: Card) => {
    props.moveCard(fromCard, toCard)
  }, [props.cards])

  const moveCardToTopRightCb = useCallback((fromCard: Card, toIdx: number) => {
    props.moveCardToTopRight(fromCard, toIdx)
  }, [props.cards])



  if (props.currentCard < (props.cards.length - 1)) {
    return (
      <Grid item style={{
        position: props.currentCard > 0 ? "absolute" : "static",
        top: props.currentCard === 1 ? "0px" : distBetweenCards + "px",

      }}>

        <PlayingCard card={props.cards[props.currentCard]} turned={!props.cards[props.currentCard].discovered} display={true} canDrop={false} canDrag={props.cards[props.currentCard].discovered} moveCard={props.moveCard} moveCardToTopRight={props.moveCardToTopRight}>
          <RecursiveStackedCards cards={props.cards} column={props.column} totalCards={props.totalCards} currentCard={newCurr} moveCard={props.moveCard} moveCardToTopRight={props.moveCardToTopRight} />
        </PlayingCard>
      </Grid>
    )
  } else {

    return (
      <Grid item style={{
        position: props.currentCard > 0 ? "absolute" : "static",
        top: props.currentCard === 1 ? "0px" : distBetweenCards + "px"
      }}>
        <PlayingCard card={props.cards[props.currentCard]} turned={false} display={true} canDrop={true} canDrag={props.cards[props.currentCard].discovered} moveCard={props.moveCard} moveCardToTopRight={props.moveCardToTopRight} />
      </Grid>
    )
  }
  /*
} else {
  //Only render cards that are not beeing dragged
  let tmpCards = [...cards].splice(0, curr)
  //let tmpCurr = tmpCards.length - curr

  return (
    <Grid item style={{
      position: curr > 0 ? "absolute" : "static",
      top: "0px"
    }}>
      <PlayingCard card={tmpCards[0]} turned={false} display={false} canDrop={true} canDrag={false} />
    </Grid>
  )

}
*/
})