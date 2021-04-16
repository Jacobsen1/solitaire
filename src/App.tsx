/* eslint-disable */
import React, { useCallback, useEffect, useState, useContext } from "react";
import "./CSS/App.css";
import { Grid } from "@material-ui/core";
import { StackedCards } from './Components/StackedCards'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import TopRow from "./Components/TopRow";
import { initGameBoard, getTopRightDeck, isValidStartingDeck, isValidTopDeck, isValidFromSplit } from './gameLogic'
import { Card, Deck } from './Types'



function App() {

  function moveCard(fromCard: Card, toCard: Card): void {
    if (fromCard !== undefined && toCard !== undefined && isValidStartingDeck(fromCard, toCard)) {
      let tempSDeck = [...startingDeck]
      let cardsToPush = tempSDeck[fromCard.column].splice(fromCard.pos + 1, (tempSDeck[fromCard.column].length - 1))
      if (tempSDeck[fromCard.column].length > 1) {
        tempSDeck[fromCard.column][tempSDeck[fromCard.column].length - 1].discovered = true
      }
      for (let i = 0; i < cardsToPush.length; i++) {
        cardsToPush[i].column = toCard.column
        cardsToPush[i].pos = tempSDeck[toCard.column].length - 1
        tempSDeck[toCard.column].push(cardsToPush[i])
      }
      setStartingDeck(tempSDeck)
    } else {
      console.log("Something undefined or illegeal move in moveCard")
    }
  }
  const moveCardToTopRight = (fromCard: Card, toIdx: number): void => {
    let tempTDeck = [...topRightDeck]
    let tempSDeck = [...startingDeck]

    console.log(fromCard, toIdx)
    console.log(tempTDeck[toIdx][tempTDeck[toIdx].length - 1])
    if (fromCard !== undefined && isValidTopDeck(fromCard, tempTDeck[toIdx][tempTDeck[toIdx].length - 1]) && tempSDeck[fromCard.column].length - 2 === fromCard.pos) {

      tempSDeck[fromCard.column].splice(fromCard.pos + 1, 1)
      if (tempSDeck[fromCard.column].length > 1) {
        tempSDeck[fromCard.column][tempSDeck[fromCard.column].length - 1].discovered = true
      }
      fromCard.isTop = true
      fromCard.column = toIdx
      tempTDeck[toIdx].push(fromCard)
      setStartingDeck(tempSDeck)
      setTopRightDeck(tempTDeck)
    } else {
      console.log("Something undefined or illegeal movein moveCardToTopRow")
    }
  }

  const moveCardFromSplit = (fromCard: Card, toCard: Card): void => {
    if (fromCard !== undefined && toCard !== undefined && isValidFromSplit(fromCard, toCard)) {
      let tempSplitDeck = [...splitDeck]

      for (let i = 0; i < tempSplitDeck.length; i++) {
        if (fromCard === tempSplitDeck[i][tempSplitDeck[i].length - 1]) {
          tempSplitDeck[i].splice(-1, 1)
        }
      }

      fromCard.column = toCard.column
      fromCard.pos = toCard.pos + 1

      if (toCard.isTop) {
        let tempTDeck = [...topRightDeck]
        tempTDeck[toCard.column].push(fromCard)
        setTopRightDeck(tempTDeck)
      } else {
        let tempSDeck = [...startingDeck]
        fromCard.isTop = false
        tempSDeck[toCard.column].push(fromCard)
        setStartingDeck(tempSDeck)
      }
      setSplitDeck(tempSplitDeck)
    } else {
      console.log("Something undefined or illegeal move in moveCardFromTop")
    }
  }

  function updateSplitDeck() {
    console.log("Resetting")
    let tempSplitDeck = [...splitDeck]
    let arr1d: Deck = []
    for (let i = 0; i < tempSplitDeck.length; i++) {
      arr1d = tempSplitDeck[i].concat(arr1d)
    }
    tempSplitDeck = []
    while (arr1d.length) {
      if ((arr1d.length - 3) > 0) {
        tempSplitDeck.push(arr1d.splice(arr1d.length - 3, 3))
      } else {
        tempSplitDeck.push(arr1d.splice(0, arr1d.length))
      }
    }
    console.log(tempSplitDeck)
    setSplitDeck(tempSplitDeck)
  }



  const [startingDeck, setStartingDeck] = useState<Deck[]>([])
  const [splitDeck, setSplitDeck] = useState<Deck[]>([])
  const [topRightDeck, setTopRightDeck] = useState<Deck[]>([])



  useEffect(() => {
    let gameBoard = initGameBoard()
    setStartingDeck(gameBoard.startingDeck)
    setSplitDeck(gameBoard.splitDeck)
    setTopRightDeck(getTopRightDeck())
    console.log("Board initialized")
  }, [])


  console.log(startingDeck)
  console.log(splitDeck)

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={8} direction="column" style={{ margin: "20px 18vw 20px 18vw" }}>

          <Grid item>
            <TopRow topRightDeck={topRightDeck} splitDeck={splitDeck} moveCardFromSplit={moveCardFromSplit} updateSplitDeck={updateSplitDeck} />
          </Grid>

          <Grid item >
            <StackedCards startingDeck={startingDeck} moveCard={moveCard} moveCardToTopRight={moveCardToTopRight} />
          </Grid>
        </Grid >
      </DndProvider >
    </div >
  )
}

export default App;
