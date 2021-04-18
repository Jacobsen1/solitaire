/* eslint-disable */
import { Grid } from "@material-ui/core"
import React, { useCallback, useContext, useEffect, useState } from "react"

import { Deck, Card } from "../Types"
import { PlayingCard } from "./playingCard"

interface Props {
  topRightDeck: Deck[]
  splitDeck: Deck[]
  moveCardFromSplit: (fromCard: Card, toCard: Card) => void
  updateSplitDeck: () => void
}

export function TopRow(props: Props) {
  const [count, setCount] = useState<number>(-1)
  const [threeCards, setThreeCards] = useState(() =>
    count > -1 ? props.splitDeck[count] : []
  )

  const moveCardFromSplitCb = useCallback(
    (fromCard: Card, toCard: Card) => {
      props.moveCardFromSplit(fromCard, toCard)
    },
    [props.topRightDeck, props.splitDeck]
  )

  return (
    <Grid container direction="row" justify="space-between">
      <Grid
        item
        onClick={() => {
          console.log(count)
          if (count >= props.splitDeck.length - 1) {
            props.updateSplitDeck()
            setCount(-1)
            setThreeCards([])
          } else {
            console.log(props.splitDeck[count + 1])
            setThreeCards(props.splitDeck[count + 1])
            setCount(count + 1)
          }
        }}
      >
        <PlayingCard
          card={{
            suit: "bg",
            value: "",
            numValue: -1,
            discovered: false,
            column: -1,
            pos: -1,
            isTop: false,
            isInGlobal: false,
          }}
          turned={true}
          display={true}
          canDrop={false}
          canDrag={false}
        />
      </Grid>
      <Grid item style={{ width: "100px" }}>
        <Grid container direction="row" style={{ position: "relative" }}>
          {threeCards.map((card, idx) => {
            return (
              <Grid
                item
                key={idx}
                style={{
                  position: "absolute",
                  left: idx * 50 + "px",
                }}
              >
                <PlayingCard
                  card={card}
                  turned={false}
                  display={true}
                  canDrop={false}
                  canDrag={idx === threeCards.length - 1 ? true : false}
                  moveCardFromSplit={moveCardFromSplitCb}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Grid item style={{ width: "100px" }}></Grid>
      {props.topRightDeck.map((card, idx) => {
        return (
          <Grid item key={idx}>
            <PlayingCard
              card={card[card.length - 1]}
              turned={false}
              display={true}
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
