/* eslint-disable */

import { Grid } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { Card, Deck } from '../Types'
import { PlayingCard } from './PlayingCard'
import CSS from "csstype";

import { Preview } from 'react-dnd-preview';
import { useSelector } from 'react-redux';
import { selectDraggedCards } from '../Reducers/GameReducer';

interface PreviewObject {
  itemType: string;
  item: {
    type: string;
    card: Card;
  };
  style: CSS.Properties;
}

const distBetweenCards = 43

export const PlayingCardPreview = React.memo(() => {

  const draggedCards = useSelector(selectDraggedCards)
  const memoizedPreview = useMemo(() => draggedCards, [draggedCards]);

  const generatePreview = ({ itemType, item, style }: PreviewObject) => {
    console.log(2)
    if (memoizedPreview.length > 0) {
      return (
        <>
          {memoizedPreview.map((card, idx) => {
            return (
              <Grid item key={idx} style={{ ...style, position: "absolute", top: idx * distBetweenCards + "px", zIndex: 50 }}>
                <PlayingCard
                  card={card}
                  turned={!card.discovered}
                  canDrop={idx === memoizedPreview.length - 1}
                  canDrag={card.discovered}

                />
              </Grid>
            )
          })}
        </>
      )
    } else {
      return (<></>)
    }
  }
  return <Preview generator={generatePreview} />


})