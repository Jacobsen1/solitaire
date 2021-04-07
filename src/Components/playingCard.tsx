/* eslint-disable */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { Card } from '../App'


const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "70px",
    borderRadius: "8px",
    padding: "0px 4px 0px 4px",
    border: "3px solid black",
    //position: "absolute",
    backgroundColor: "white",
    left: 0

  },
  cardbg: {
    display: "flex",
    width: "64px",
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
    fontSize: "20px",
  },
  cardSuit: {
    fontSize: "20px",
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

interface cardProps {
  children?: any;
  value: string;
  suit: string;
  turned: boolean;
  hidden: boolean;
  column?: number;

}

export const PlayingCard = (props: cardProps) => {
  const classes = useStyles();

  function attachDrop(el: any) {
    drop(el)
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "Card",
    drop: () => {
      return { props: props }
    },

  }))



  if (props.turned === false) {
    return (
      <>
        <Grid
          ref={!props.hidden ? attachDrop : () => { }}
          container
          direction="row"
          className={classes.card}
          style={{
            color: props.suit === "♥︎" || props.suit === "♦︎" ? "red" : "black",
            height: props.hidden ? "40px" : "100px"
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
              {props.value}
            </Grid>
            <Grid item className={classes.cardSuit}>
              {props.suit}
            </Grid>
          </Grid>

          {props.hidden === false ?
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.cardbr}
            >
              <Grid item className={classes.cardValue}>
                {props.value}
              </Grid>
              <Grid item className={classes.cardSuit}>
                {props.suit}
              </Grid>
            </Grid>
            : ''}


        </Grid>
        {props.children}
      </>
    );
  } else {
    return (
      <>
        <Grid container style={{
          height: props.hidden ? "40px" : "100px"
        }}>
          <div className={classes.cardbg} />
        </Grid>
        {props.children}
      </>
    );
  }
}
