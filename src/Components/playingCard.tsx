/* eslint-disable */

import React, { useState, useContext, PropsWithChildren, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useDrag, useDrop, useDragDropManager } from 'react-dnd';
import { Deck, Card } from '../Types'
const cardDimDiff = 0.7191
const cardWidth = 100


const useStyles = makeStyles({
  card: {
    display: "flex",
    width: cardWidth + "px",
    height: cardWidth / cardDimDiff + "px",
    borderRadius: "8px",
    padding: "0px 4px 0px 4px",
    backgroundColor: "white",

    border: "3px solid black",
    //position: "absolute",

  },
  cardbg: {
    display: "flex",
    width: cardWidth - 6 + "px",
    height: (cardWidth - 6) / cardDimDiff + "px",
    borderRadius: "8px",
    border: "3px solid black",



    //Image styling
    backgroundImage: `url(background2.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },

  cardtl: {
    display: "flex",
    alignItems: "flex-start",
  },

  cardbr: {
    display: "flex",
    alignItems: "flex-start",
    transform: `rotate(-180deg)`,
  },
  cardValue: {
    fontSize: "30px",
  },
  cardSuit: {
    fontSize: "30px",
  },
  red: {
    color: "red",
  },
  black: {
    color: "black",
  },
  bgImg: {
    height: "100%",
  },
});

interface Props {
  card: Card
  turned: boolean
  display: boolean
  canDrop: boolean
  canDrag: boolean
  //Functions
  moveCard?: (fromCard: Card, toCard: Card) => void
  moveCardToTopRight?: (fromCard: Card, toIdx: number) => void
  moveCardFromSplit?: (fromCard: Card, toCard: Card) => void

  //Children
  children?: any
}
interface RefObject<T> {
  readonly current: T | null
}

export const PlayingCard = React.memo((props: Props) => {
  const classes = useStyles()
  if (props.card.isInGlobal && props.card.suit === "♠︎") {
    //console.log("Rendering " + props.card.suit + " " + props.card.value)
  }
  function attachDragNDrop(el: any) {
    props.canDrop ? drop(el) : () => { }
    props.canDrag ? drag(el) : () => { }
  }


  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "Card",
    drop: () => {
      return { props: props.card }
    },
  })

  const [collected, drag, dragPreview] = useDrag({
    type: "Card",
    item: () => {

      console.log(props.card.suit + " " + props.card.value)
      return { card: props.card }

    },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        let fromCard: Card = item.card
        let toCard: Card = dropResult.props
        if (fromCard !== undefined && toCard !== undefined && (fromCard.pos !== toCard.pos || fromCard.column !== toCard.column)) {
          console.log(fromCard)
          console.log(toCard)
          if (toCard.isTop && props.moveCardToTopRight !== undefined) {
            let toIdx = toCard.column
            console.log(`You dropped ${fromCard.value}, ${fromCard.suit} into topRightDeck ${toIdx}`)
            props.moveCardToTopRight(fromCard, toIdx)

          } else if (fromCard.isInGlobal && props.moveCardFromSplit !== undefined) {
            console.log(`You dropped ${fromCard.value}, ${fromCard.suit} from splitDeck into ${toCard.value}, ${toCard.suit}`);
            props.moveCardFromSplit(fromCard, toCard)
          } else if (props.moveCard !== undefined && !toCard.isTop) {
            //moveCard
            console.log(`You dropped ${fromCard.value}, ${fromCard.suit} into ${toCard.value}, ${toCard.suit}`);
            props.moveCard(fromCard, toCard)
          }

        }

        else {
          console.log("Something is undefined in useDrag or Cant drop a card on")
          console.log(fromCard)
          console.log(toCard)
        }
      }
    }
  })



  if (props.turned === false || props.card.suit === '') {
    return (
      <>

        <Grid
          ref={attachDragNDrop}
          container
          direction="row"
          className={classes.card}
          style={{
            color: props.card.suit === "♥︎" || props.card.suit === "♦︎" ? "red" : "black",
            border: props.card.suit === '' ? "2px solid rgba(0, 0, 0, 0.3)" : "3px solid rgba(0, 0, 0)",
            display: !props.display ? "none" : "",


          }}

        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.cardtl}
          >
            <Grid item className={classes.cardValue}>
              {props.card.value}
            </Grid>
            <Grid item className={classes.cardSuit}>
              {props.card.suit}
            </Grid>
          </Grid>


          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.cardbr}
          >
            <Grid item className={classes.cardValue}>
              {props.card.value}
            </Grid>
            <Grid item className={classes.cardSuit}>
              {props.card.suit}
            </Grid>
          </Grid>


        </Grid>
        {props.children}
      </>
    );
  } else {
    return (
      <>
        <Grid container style={{
        }}>
          <div className={classes.cardbg} />
        </Grid>
        {props.children}
      </>
    );
  }
})

//False = Rerender
//True = Not rerender