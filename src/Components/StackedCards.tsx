/* eslint-disable */

import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Deck, Card } from '../Types'
import { RecursiveStackedCards } from "./RecursiveStackedCards";


interface Props {
  startingDeck: Deck[]
  moveCard: (fromCard: Card, toCard: Card) => void
  moveCardToTopRight: (fromCard: Card, toIdx: number) => void
}

export const StackedCards = (props: Props) => {




  return (

    <Grid container direction="row" alignItems="flex-start" justify="space-between"  >
      {props.startingDeck.map((cards, idx) => {
        return (

          <Grid item key={idx} style={{ position: "relative" }}>
            {cards.length > 0 ? <RecursiveStackedCards cards={cards} column={idx} totalCards={cards.length} currentCard={0} moveCard={props.moveCard} moveCardToTopRight={props.moveCardToTopRight} /> : ''}
          </Grid>
        )
      })}

    </Grid>

  )
}

