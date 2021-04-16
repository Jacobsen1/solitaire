
/* eslint-disable */
import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";


import { Deck, Card } from '../Types'
import { PlayingCard } from "./PlayingCard";

interface Props {
  topRightDeck: Deck[]
  splitDeck: Deck[]
  moveCardFromSplit: (fromCard: Card, toCard: Card) => void
  updateSplitDeck: () => void

}

export function TopRow(props: Props) {
  const [count, setCount] = useState<number>(-1)

  const moveCardFromSplitCb = useCallback((fromCard: Card, toCard: Card) => {
    props.moveCardFromSplit(fromCard, toCard)
  }, [props.topRightDeck, props.splitDeck])

  return (
    <Grid container direction="row" justify="space-between" >
      <Grid item onClick={() => {
        console.log(count)
        if (count >= props.splitDeck.length - 1) {
          props.updateSplitDeck()
          setCount(-1)
        } else {
          setCount(count + 1)
        }
      }}>
        <PlayingCard card={{ suit: 'bg', value: '', numValue: -1, discovered: false, column: -1, pos: -1, isTop: false, isInGlobal: false }} turned={true} display={true} canDrop={false} canDrag={false} />
      </Grid>
      <Grid item style={{ width: "100px" }}>

        <Grid container direction="row" style={{ position: "relative" }}>

          {props.splitDeck.map((deck, idx) => {
            return (
              deck.map((card, i) => {
                return (
                  <Grid item key={i} style={{
                    position: "absolute",
                    left: i * 50 + "px",
                  }}>
                    <PlayingCard card={card} turned={false} display={idx === count ? true : false} canDrop={false} canDrag={i === deck.length - 1 ? true : false} moveCardFromSplit={moveCardFromSplitCb} />
                  </Grid>
                )
              }))
          })}
        </Grid>


      </Grid>
      <Grid item style={{ width: "100px" }}>
      </Grid>
      {props.topRightDeck.map((card, idx) => {
        return (
          <Grid item key={idx}>
            <PlayingCard card={card[card.length - 1]} turned={false} display={true} canDrop={true} canDrag={false} />
          </Grid>
        )
      })}


    </Grid >
  )
}

export default TopRow