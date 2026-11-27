/* eslint-disable */

import React, { useEffect } from "react";
import "../CSS/PlayingCard.css";
import { useDrag, useDrop } from 'react-dnd';
import { Card } from '../Types'
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppDispatch } from '../store'
import { moveCardStartingCard, moveCardSplitDeck, moveCardTopRight, toggleDraggedCards } from "../Actions/GameActions";


interface Props {
  card: Card
  turned: boolean
  canDrop: boolean
  canDrag: boolean
}


export const PlayingCard = React.memo((props: Props) => {
  const dispatch = useAppDispatch()

  function attachDragNDrop(el: HTMLDivElement | null) {
    if (props.canDrop) drop(el)
    if (props.canDrag) drag(el)
  }

  const [, drop] = useDrop({
    accept: "Card",
    drop: () => {
      return { props: props.card }
    },
  })

  const [{ isDragging, item }, drag, dragPreview] = useDrag<{ card: Card }, unknown, { isDragging: boolean; item: { card: Card } | null }>({
    type: "Card",
    item: () => {

      //dispatch(toggleDraggedCards({ card: props.card, display: false }))
      return { card: props.card }
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ props: Card }>();
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
      return { isDragging: monitor.isDragging(), item: monitor.getItem() }
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
        <div
          ref={attachDragNDrop}
          id={props.card.suit + props.card.numValue}
          data-testid={props.card.suit === "" ? "slot" : "card"}
          data-suit={props.card.suit}
          data-value={props.card.value}
          data-face-up="true"
          className="card"
          style={{
            color: props.card.suit === "♥︎" || props.card.suit === "♦︎" ? "red" : "black",
            border: props.card.suit === '' ? "2px solid rgba(0, 0, 0, 0.3)" : "3px solid rgba(0, 0, 0)",
            //display: !props.card.display ? "none" : undefined,
            cursor: props.canDrag ? "pointer" : undefined,
          }}
        >
          <div className="card-tl">
            <div className="card-value">
              {props.card.value}
            </div>
            <div className="card-suit">
              {props.card.suit}
            </div>
          </div>
          <div className="card-br">
            <div className="card-value">
              {props.card.value}
            </div>
            <div className="card-suit">
              {props.card.suit}
            </div>
          </div>
        </div>
    )
  } else {
    return (
      <div data-testid="card" data-face-up="false">
        <div
          className="card-bg"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background2.png)` }}
        />
      </div>
    );
  }
})
