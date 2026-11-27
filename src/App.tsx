import { useEffect } from "react"
import { Stack } from "@mui/material"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "./CSS/App.css"
import { PlayingCardPreview } from "./Components/PlayingCardPreview"
import { StartingBoard } from "./Components/StartingBoard"
import TopRow from "./Components/TopRow"
import { newGame } from "./gameLogic"
import { initializeGame, selectStartingDeck, selectTopRightDeck } from "./Reducers/GameReducer"
import { useAppDispatch, useAppSelector } from "./store"

function App() {
  const dispatch = useAppDispatch()
  const startingDeck = useAppSelector(selectStartingDeck)
  const topRightDeck = useAppSelector(selectTopRightDeck)

  useEffect(() => {
    dispatch(initializeGame(newGame()))
  }, [dispatch])

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <PlayingCardPreview />
        <Stack spacing={8} sx={{ flex: 1, margin: "20px 18vw", padding: 4 }}>
          <TopRow topRightDeck={topRightDeck} />
          <StartingBoard startingDeck={startingDeck} />
        </Stack>
      </DndProvider>
    </div>
  )
}

export default App
