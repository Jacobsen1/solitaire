/* eslint-disable */

import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Deck, Card } from '../Types'
import { PlayingCard } from "./PlayingCard";


interface Props {
  cards: Card[];
  column: number
}
const distBetweenCards = 43


export const CardPile = (props: Props): any => {
  //console.log("Re render pile")
  return (
    <>
      <Grid item style={{ position: "static", top: "0px" }}>
        <PlayingCard
          card={{ suit: '', value: '', numValue: -1, discovered: false, column: props.column, pos: -1, isTop: false, isInGlobal: false, display: true }}
          canDrag={false}
          canDrop={true}
          display={true}
          turned={false}
        />
      </Grid>
      {props.cards.length > 0 ? props.cards.map((card, idx) => {
        return (
          <Grid item className={card.discovered ? "pile" + card.column : ''} key={idx} style={{ position: "absolute", top: card.pos === 0 ? "0px" : card.pos * distBetweenCards + "px", overflow: "hidden", zIndex: 40 }}>
            <PlayingCard
              card={card}
              turned={!card.discovered}
              display={true}
              canDrop={idx === props.cards.length - 1}
              canDrag={card.discovered}
            />
          </Grid>
        )
      }) : <> </>}
    </>
  )
}


