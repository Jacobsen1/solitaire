/* eslint-disable */
import { Grid } from "@material-ui/core"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSplitDeck } from "../Actions/GameActions"
import { RootState, selectSplitDeck } from "../Reducers/GameReducer"

import { Deck, Card } from "../Types"
import { PlayingCard } from "./PlayingCard"

interface Props {
  topRightDeck: Deck[]
  splitDeck: Deck[]
}

export function TopRow(props: Props) {
  const [count, setCount] = useState<number>(-1)
  const splitDeck = useSelector<RootState, Deck[]>(selectSplitDeck);
  const dispatch = useDispatch()

  return (
    <Grid container direction="row" justify="space-between">
      <Grid
        item
        onClick={() => {
          if (count >= props.splitDeck.length - 1) {
            dispatch(updateSplitDeck())
            setCount(-1)
          } else {
            setCount(count + 1)
          }
          console.log(count)

        }}
      >
        <PlayingCard
          card={{ suit: "bg", value: "", numValue: -1, discovered: false, column: -1, pos: -1, isTop: false, isInGlobal: false, display: true }}
          turned={true}
          display={true}
          canDrop={false}
          canDrag={false}
        />
      </Grid>
      <Grid item style={{ width: "100px" }}>
        <Grid container direction="row" style={{ position: "relative" }}>
          {count > -1 ? splitDeck[count].map((card, idx) => {
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
                  canDrag={idx === splitDeck[count].length - 1 ? true : false}
                />
              </Grid>
            )
          }) : ''}
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
