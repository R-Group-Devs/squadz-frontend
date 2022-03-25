import { MouseEventHandler } from "react"

import pinkEllipse from "../public/images/pink-ellipse.svg"
import greenEllipse from "../public/images/green-ellipse.svg"

export type ButtonSize = 1 | 2 | 3

interface ButtonProps {
  text: string;
  scale: ButtonSize;
  widthPx: number;
  green?: boolean;
  centered?: boolean;
  callback?: MouseEventHandler<HTMLImageElement>;
}

const heights = {
  1: 50,
  2: 62,
  3: 75
}

const sizes = {
  1: 6,
  2: 5,
  3: 4
}

export default ({ text, scale, widthPx, green, centered, callback }: ButtonProps) => {
  if (callback === undefined) callback = () => { }
  let ellipse = pinkEllipse
  if (green) ellipse = greenEllipse
  let width: number | string = widthPx
  let margin: number | string = 0
  if (centered) {
    width = "100%"
    margin = "none"
  }

  return (
    <div
      className="container button-container has-text-centered"
      style={{ height: heights[scale], width, margin }}
    >
      <img
        className="button-image"
        style={{ height: heights[scale], width: widthPx }}
        src={ellipse}
        alt="Pink ellipse"
        onClick={callback}
      />
      <div
        className={`button-text in-ellipse has-text-white is-size-${sizes[scale]}`}
        style={{ width: widthPx }}
        onClick={callback}
      >
        {text}
      </div>
    </div>
  )
}