import classes from "*.module.css";
import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import { Deck } from "./App";

interface stackedCardsProps {
  cards: Deck;
}

const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "56px",
    height: "25px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    border: "1px solid black",
    padding: "0px 8px 0px 8px",
    position:"absolute",
    backgroundColo: "white"
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
    backgroundSize: "cover",
  },
  cardtl: {
    display: "flex",
    alignItems: "flex-start",
  },

  cardValue: {
    fontSize: "16px",
  },
  cardSuit: {
    fontSize: "16px",
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

export default function StackedCards(props: stackedCardsProps) {
  const classes = useStyles();
  return(
  <Grid container direction="column" >
    {props.cards.map((card, idx) => {
      return (
        <div
          className={classes.card}
          style={
            card.suit === "♥︎" || card.suit === "♦︎"
              ? { color: "red" }
              : { color: "black" }
          }
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.cardtl}
          >
            <Grid item className={classes.cardValue}>
              {card.value}
            </Grid>
            <Grid item className={classes.cardSuit}>
              {card.suit}
            </Grid>
          </Grid>
         
        </div>
      );
    })}
    
  </Grid>
  )
}
