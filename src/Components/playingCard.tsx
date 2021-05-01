/* eslint-disable */

import React, { useEffect, } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useDrag, useDrop } from 'react-dnd';
import { Deck, Card } from '../Types'
import { getEmptyImage } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from 'react-redux'
import { moveCardStartingCard, moveCardSplitDeck, moveCardTopRight, toggleDraggedCards } from "../Actions/GameActions";
import { selectStartingDeck } from "../Reducers/GameReducer";


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
    backgroundImage: `url(` + process.env.PUBLIC_URL + `/background2.png)`,
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
  canDrop: boolean
  canDrag: boolean
}


export const PlayingCard = React.memo((props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  function attachDragNDrop(el: any) {
    props.canDrop ? drop(el) : () => { }
    props.canDrag ? drag(el) : () => { }
  }
  console.log("render")

  const [{ }, drop] = useDrop({
    accept: "Card",
    drop: () => {
      return { props: props.card }
    },
  })

  const [{ isDragging, item, didDrop }, drag, dragPreview] = useDrag({
    type: "Card",
    item: () => {

      //dispatch(toggleDraggedCards({ card: props.card, display: false }))
      return { card: props.card }
    },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        let fromCard: Card = item.card
        let toCard: Card = dropResult.props
        if (fromCard !== undefined && toCard !== undefined && (fromCard.pos !== toCard.pos || fromCard.column !== toCard.column)) {
          let payload = { fromCard: item.card, toCard: dropResult.props }
          if (toCard.isTop && !fromCard.isInGlobal /*&& isValidTopDeck(fromCard, toCard)*/) {
            dispatch(moveCardTopRight(payload))
          } else if (fromCard.isInGlobal /*&& isValidFromSplit(fromCard, toCard)*/) {
            dispatch(moveCardSplitDeck(payload))
          } else if (!toCard.isTop/*&& isValidStartingDeck(fromCard, toCard)*/) {
            dispatch(moveCardStartingCard(payload))
          }
        }
        else {
          //dispatch(toggleDraggedCards({ card: props.card, display: true }))
          console.log("Something is undefined in useDrag or Cant drop a card on is self")
        }
      } else {
        console.log("end")
        dispatch(toggleDraggedCards({ card: props.card, display: true }))

      }
    },
    collect(monitor) {
      return { isDragging: monitor.isDragging(), item: monitor.getItem(), didDrop: monitor.didDrop() }
    }
  })

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: false });
  }, [])

  useEffect(() => {
    if (item && item.card && isDragging) {
      dispatch(toggleDraggedCards({ card: item.card, display: !isDragging }));
    }
  }, [isDragging]);




  if (props.turned === false || props.card.suit === '') {
    return (
      <>
        <Grid
          ref={attachDragNDrop}
          id={props.card.suit + props.card.numValue}
          container
          direction="row"
          className={classes.card}
          style={{
            color: props.card.suit === "♥︎" || props.card.suit === "♦︎" ? "red" : "black",
            border: props.card.suit === '' ? "2px solid rgba(0, 0, 0, 0.3)" : "3px solid rgba(0, 0, 0)",
            //display: !props.card.display ? "none" : undefined,
            cursor: props.canDrag ? "pointer" : undefined,
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
      </>
    )
  } else {
    return (
      <Grid container>
        <div className={classes.cardbg} />
      </Grid>
    );
  }
})
