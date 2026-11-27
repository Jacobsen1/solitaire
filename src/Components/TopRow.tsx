import { Grid } from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { updateSplitDeck } from "../Actions/GameActions"
import { selectSplitDeck } from "../Reducers/GameReducer"

import { Deck } from "../Types"
import { PlayingCard } from "./PlayingCard"

interface Props {
  topRightDeck: Deck[]
  splitDeck: Deck[]
}

export function TopRow(props: Props) {
  const [count, setCount] = useState<number>(-1)
  const splitDeck = useAppSelector(selectSplitDeck);
  const dispatch = useAppDispatch()

  return (
    <Grid container direction="row" sx={{ justifyContent: "space-between" }}>
      <Grid
        data-testid="stock"
        onClick={() => {
          if (count >= props.splitDeck.length - 1) {
            dispatch(updateSplitDeck())
            setCount(-1)
          } else {
            setCount(count + 1)
          }
        }}
      >
        <PlayingCard
          card={{ suit: "bg", value: "", numValue: -1, discovered: false, column: -1, pos: -1, isTop: false, isInGlobal: false, display: true }}
          turned={true}
          canDrop={false}
          canDrag={false}
        />
      </Grid>
      <Grid style={{ width: "100px" }}>
        <Grid container direction="row" data-testid="waste" style={{ position: "relative" }}>
          {count > -1 ? splitDeck[count].map((card, idx) => {
            return (
              <Grid
                key={idx}
                style={{
                  position: "absolute",
                  left: idx * 50 + "px",
                }}
              >
                <PlayingCard
                  card={card}
                  turned={false}
                  canDrop={false}
                  canDrag={idx === splitDeck[count].length - 1}
                />
              </Grid>
            )
          }) : ''}
        </Grid>
      </Grid>
      <Grid style={{ width: "100px" }}></Grid>
      {props.topRightDeck.map((card, idx) => {
        return (
          <Grid key={idx} data-testid={`foundation-${idx}`}>
            <PlayingCard
              card={card[card.length - 1]}
              turned={false}
              canDrop={true}
              canDrag={false}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default TopRow
