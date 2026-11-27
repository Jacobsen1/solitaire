import React, { useCallback, useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import { dropCards, liftCards, restoreCards } from "../Reducers/GameReducer"
import { useAppDispatch } from "../store"
import type { Card } from "../Types"
import { CardFace } from "./CardFace"

const DND_TYPE = "Card"

type DragItem = { card: Card }
type DropResult = { props: Card }

interface Props {
  card: Card
  turned: boolean
  canDrop: boolean
  canDrag: boolean
}

export const PlayingCard = React.memo(({ card, turned, canDrop, canDrag }: Props) => {
  const dispatch = useAppDispatch()

  const [, drop] = useDrop<DragItem, DropResult>({
    accept: DND_TYPE,
    drop: () => ({ props: card }),
  })

  const [{ isDragging }, drag, dragPreview] = useDrag<DragItem, DropResult, { isDragging: boolean }>({
    type: DND_TYPE,
    item: () => ({ card }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (!dropResult) {
        dispatch(restoreCards(card))
        return
      }
      const toCard = dropResult.props
      // dropping a card on itself does nothing
      if (item.card.pos !== toCard.pos || item.card.column !== toCard.column) {
        dispatch(dropCards({ fromCard: item.card, toCard }))
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  const attachDragAndDrop = useCallback((el: HTMLDivElement | null) => {
    if (canDrop) drop(el)
    if (canDrag) drag(el)
  }, [canDrop, canDrag, drop, drag])

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: false })
  }, [])

  // Lift the card (and the cards on top of it) out of its pile once the drag has started.
  useEffect(() => {
    if (isDragging) {
      dispatch(liftCards(card))
    }
  }, [isDragging])

  return <CardFace ref={attachDragAndDrop} card={card} turned={turned} canDrag={canDrag} />
})
