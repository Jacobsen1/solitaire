import React from "react";
import { makeStyles } from "@material-ui/styles";
import {Grid } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "56px",
    height: "90px",
    borderRadius: "8px",
    border: "1px solid black",
    margin: "16px",
    padding: "4px",
  },
  cardbg: {
    display: "flex",
    width: "56px",
    height: "90px",
    borderRadius: "8px",
    border: "1px solid black",
    margin: "16px",
    padding: "4px",
    backgroundImage: `url(background.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  cardtl: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
  },

  cardbr: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    transform: `rotate(-180deg)`,
  },
  cardValue: {
    fontSize: "16px",
  },
  cardSuit: {
    fontSize: "12px",
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
  value: string;
  suit: string;
  turned: boolean;
}

export default function PlayingCard(props: cardProps) {
  const classes = useStyles();
  console.log(props);

  if (props.turned === false) {
    return (
      <div
        className={classes.card}
        style={
          props.suit === "♥︎" || props.suit === "♦︎"
            ? { color: "red" }
            : { color: "black" }
        }
      >
        <Grid
          container
          direction="column"
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
        <Grid
          container
          direction="column"
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
      </div>
    );
  } else {
    console.log("test");
    return (
      <div className={classes.cardbg}/>
    );
  }
}
