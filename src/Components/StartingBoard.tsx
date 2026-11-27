import { Grid } from "@mui/material";
import { Deck } from '../Types'
import { CardPile } from "./CardPile";


interface Props {
  startingDeck: Deck[]
}

export const StartingBoard = (props: Props) => {

  return (
    <Grid container direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
      {props.startingDeck.map((cards, idx) => {
        return (
          <Grid key={idx} data-testid={`tableau-${idx}`} style={{ position: "relative" }}>
            <CardPile cards={cards} column={idx} />
          </Grid>
        )
      })}
    </Grid>

  )
}
