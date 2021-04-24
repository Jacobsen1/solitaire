export interface Card {
  suit: string;
  value: string;
  numValue: number
  discovered: boolean;
  column: number;
  pos: number
  isTop: boolean
  isInGlobal: boolean
  display: boolean

}

export interface Deck extends Array<Card> { }