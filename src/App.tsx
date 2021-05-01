/* eslint-disable */
import React, { useCallback, useEffect, useState, useContext } from "react"
import "./CSS/App.css"
import { Grid } from "@material-ui/core"
import { StartingBoard } from "./Components/StartingBoard"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import TopRow from "./Components/TopRow"
import {
  initGameBoard,
  getTopRightDeck,
  isValidStartingDeck,
  isValidTopDeck,
  isValidFromSplit,
} from "./gameLogic"
import { Card, Deck } from "./Types"
import { PlayingCardPreview } from './Components/PlayingCardPreview'
import { useDispatch, useSelector } from "react-redux"
import { initializeGame } from './Actions/GameActions'
import { RootState, selectStartingDeck, selectSplitDeck, selectTopRightDeck } from "./Reducers/GameReducer"


function App() {

  const dispatch = useDispatch()
  const startingDeck = useSelector<RootState, Deck[]>(selectStartingDeck);
  const splitDeck = useSelector<RootState, Deck[]>(selectSplitDeck);
  const topRightDeck = useSelector<RootState, Deck[]>(selectTopRightDeck);


  useEffect(() => {
    let gameBoard = initGameBoard()
    dispatch(initializeGame({ startingDeck: gameBoard.startingDeck, splitDeck: gameBoard.splitDeck, topRightDeck: getTopRightDeck(), draggedCards: [] }))
    console.log("Board initialized")
  }, [])

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <PlayingCardPreview />

        <Grid container spacing={8} direction="column" style={{ margin: "20px 18vw 20px 18vw" }}>

          <Grid item>
            <TopRow topRightDeck={topRightDeck} splitDeck={splitDeck} />
          </Grid>

          <Grid item>
            <StartingBoard startingDeck={startingDeck} />
          </Grid>

        </Grid>
      </DndProvider>
    </div>
  )
}

export default App
