/* eslint-disable */

import { Grid } from "@material-ui/core";
import React, { } from "react";
import { Deck, Card } from '../Types'
import { CardPile } from "./CardPile";


interface Props {
  startingDeck: Deck[]
}

export const StartingBoard = (props: Props) => {

  return (
    <Grid container direction="row" alignItems="flex-start" justify="space-between"  >
      {props.startingDeck.map((cards, idx) => {
        return (
          <Grid item key={idx} style={{ position: "relative" }}>
            <CardPile cards={cards} column={idx} />
          </Grid>
        )
      })}
    </Grid>

  )
}

