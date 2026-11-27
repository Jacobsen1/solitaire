import React from "react"
import { Grid } from "@mui/material"
import type { Deck } from "../Types"
import { CardPile } from "./CardPile"

interface Props {
  startingDeck: Deck[]
}

export const StartingBoard = React.memo(({ startingDeck }: Props) => (
  <Grid container direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
    {startingDeck.map((cards, idx) => (
      <Grid key={idx} data-testid={`tableau-${idx}`} style={{ position: "relative" }}>
        <CardPile cards={cards} column={idx} />
      </Grid>
    ))}
  </Grid>
))
