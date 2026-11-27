import type { Ref } from "react"
import "../CSS/PlayingCard.css"
import { isRed } from "../gameLogic"
import type { Card } from "../Types"

interface Props {
  card: Card
  turned: boolean
  canDrag?: boolean
  ref?: Ref<HTMLDivElement>
}

/** Presentational card (no drag and drop). Face-down cards never get the ref, so they are not drag/drop targets. */
export function CardFace({ card, turned, canDrag = false, ref }: Props) {
  if (turned && card.suit !== "") {
    return (
      <div data-testid="card" data-face-up="false">
        <div className="card-bg" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background2.png)` }} />
      </div>
    )
  }

  const isSlot = card.suit === ""
  const corner = (className: string) => (
    <div className={className}>
      <div className="card-value">{card.value}</div>
      <div className="card-suit">{card.suit}</div>
    </div>
  )

  return (
    <div
      ref={ref}
      data-testid={isSlot ? "slot" : "card"}
      data-suit={card.suit}
      data-value={card.value}
      data-face-up="true"
      className={["card", isSlot && "card--slot", isRed(card.suit) && "card--red"].filter(Boolean).join(" ")}
      style={canDrag ? { cursor: "pointer" } : undefined}
    >
      {corner("card-tl")}
      {corner("card-br")}
    </div>
  )
}
