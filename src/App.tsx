import { useEffect } from "react"
import "./CSS/App.css"
import { Stack } from "@mui/material"
import { StartingBoard } from "./Components/StartingBoard"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import TopRow from "./Components/TopRow"
import { initGameBoard, getTopRightDeck } from "./gameLogic"
import { PlayingCardPreview } from './Components/PlayingCardPreview'
import { useAppDispatch, useAppSelector } from "./store"
import { initializeGame } from './Actions/GameActions'
import { selectStartingDeck, selectSplitDeck, selectTopRightDeck } from "./Reducers/GameReducer"


function App() {

  const dispatch = useAppDispatch()
  const startingDeck = useAppSelector(selectStartingDeck);
  const splitDeck = useAppSelector(selectSplitDeck);
  const topRightDeck = useAppSelector(selectTopRightDeck);


  useEffect(() => {
    let gameBoard = initGameBoard()
    dispatch(initializeGame({ startingDeck: gameBoard.startingDeck, splitDeck: gameBoard.splitDeck, topRightDeck: getTopRightDeck(), draggedCards: [] }))
    console.log("Board initialized")
  }, [dispatch])

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <PlayingCardPreview />

        <Stack spacing={8} sx={{ flex: 1, margin: "20px 18vw", padding: 4 }}>

          <TopRow topRightDeck={topRightDeck} splitDeck={splitDeck} />

          <StartingBoard startingDeck={startingDeck} />

        </Stack>
      </DndProvider>
    </div>
  )
}

export default App
