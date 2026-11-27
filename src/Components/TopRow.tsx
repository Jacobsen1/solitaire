import { Grid } from "@mui/material"
import { useState } from "react"
import { emptySlot } from "../gameLogic"
import { resetStock, selectSplitDeck } from "../Reducers/GameReducer"
import { useAppDispatch, useAppSelector } from "../store"
import type { Deck } from "../Types"
import { CARD_WIDTH } from "./layout"
import { PlayingCard } from "./PlayingCard"

const STOCK_CARD = emptySlot({ suit: "bg" })

interface Props {
  topRightDeck: Deck[]
}

export default function TopRow({ topRightDeck }: Props) {
  const [count, setCount] = useState(-1)
  const splitDeck = useAppSelector(selectSplitDeck)
  const dispatch = useAppDispatch()
  const waste = count > -1 ? splitDeck[count] : []

  const drawFromStock = () => {
    if (count >= splitDeck.length - 1) {
      dispatch(resetStock())
      setCount(-1)
    } else {
      setCount(count + 1)
    }
  }

  return (
    <Grid container direction="row" sx={{ justifyContent: "space-between" }}>
      <Grid data-testid="stock" onClick={drawFromStock}>
        <PlayingCard card={STOCK_CARD} turned={true} canDrop={false} canDrag={false} />
      </Grid>
      <Grid style={{ width: CARD_WIDTH }}>
        <Grid container direction="row" data-testid="waste" style={{ position: "relative" }}>
          {waste.map((card, idx) => (
            <Grid key={idx} style={{ position: "absolute", left: idx * 50 }}>
              <PlayingCard card={card} turned={false} canDrop={false} canDrag={idx === waste.length - 1} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid style={{ width: CARD_WIDTH }} />
      {topRightDeck.map((pile, idx) => (
        <Grid key={idx} data-testid={`foundation-${idx}`}>
          <PlayingCard card={pile[pile.length - 1]} turned={false} canDrop={true} canDrag={false} />
        </Grid>
      ))}
    </Grid>
  )
}
