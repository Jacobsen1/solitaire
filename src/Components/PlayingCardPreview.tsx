import { Grid } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { Card, Deck } from '../Types'
import { PlayingCard } from './PlayingCard'
import CSS from "csstype";

import { Preview } from 'react-dnd-preview';

interface Props {
  startingDeck: Deck[]
}
interface PreviewObject {
  itemType: string;
  item: {
    type: string;
    card: Card;
  };
  style: CSS.Properties;
}

const distBetweenCards = 43

const createPreviewCards = (draggedCard: Card | null, cards: Deck[]): Deck => {
  if (draggedCard) {

    let tmpPile = [...cards[draggedCard.column]]
    return tmpPile.splice(draggedCard.pos, cards[draggedCard.column].length - draggedCard.pos)
  }
  return [];
};


export const PlayingCardPreview = React.memo((props: Props) => {

  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const memoizedPreview = useMemo(() => createPreviewCards(draggedCard, props.startingDeck), [draggedCard, props.startingDeck]);

  const generatePreview = ({ itemType, item, style }: PreviewObject) => {
    if (item && item.card) {
      setDraggedCard(item.card)
    }
    if (memoizedPreview.length > 0) {
      return (
        <>
          {memoizedPreview.map((card, idx) => {
            return (
              <Grid item key={idx} style={{ ...style, position: "absolute", top: idx * distBetweenCards + "px", zIndex: 50 }}>
                <PlayingCard
                  card={card}
                  turned={!card.discovered}
                  display={true}
                  canDrop={idx === memoizedPreview.length - 1}
                  canDrag={card.discovered}
                />
              </Grid>
            )

          })}</>

      )

    } else {
      return (<></>)
    }
  }
  return <Preview generator={generatePreview} />


})