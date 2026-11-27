import React from "react"
import { Grid } from "@mui/material"
import { TABLEAU_SLOTS } from "../gameLogic"
import type { Card } from "../Types"
import { CARD_OFFSET } from "./layout"
import { PlayingCard } from "./PlayingCard"

interface Props {
  cards: Card[]
  column: number
}

export const CardPile = React.memo(({ cards, column }: Props) => (
  <>
    <Grid>
      <PlayingCard card={TABLEAU_SLOTS[column]} canDrag={false} canDrop={true} turned={false} />
    </Grid>
    {cards.map((card, idx) => (
      <Grid
        key={idx}
        className={card.discovered ? "pile" + card.column : ""}
        style={{ position: "absolute", top: card.pos * CARD_OFFSET, overflow: "hidden", zIndex: 40 }}
      >
        <PlayingCard
          card={card}
          turned={!card.discovered}
          canDrop={idx === cards.length - 1}
          canDrag={card.discovered}
        />
      </Grid>
    ))}
  </>
))
