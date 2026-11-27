import React from "react"
import { Preview, type PreviewState } from "react-dnd-preview"
import { selectDraggedCards } from "../Reducers/GameReducer"
import { useAppSelector } from "../store"
import { CardFace } from "./CardFace"
import { CARD_OFFSET } from "./layout"

export const PlayingCardPreview = React.memo(() => {
  const draggedCards = useAppSelector(selectDraggedCards)

  // react-dnd-preview >= 7 positions the preview through the `ref` it hands to the generator,
  // so the whole stack of dragged cards is wrapped in a single positioned element.
  const generatePreview = ({ ref, style }: PreviewState) => {
    if (draggedCards.length === 0) {
      return <></>
    }
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ ...style, zIndex: 50 }} data-testid="drag-preview">
        {draggedCards.map((card, idx) => (
          <div key={idx} style={{ position: "absolute", top: idx * CARD_OFFSET }}>
            <CardFace card={card} turned={!card.discovered} />
          </div>
        ))}
      </div>
    )
  }
  return <Preview generator={generatePreview} />
})
