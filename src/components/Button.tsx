import { MouseEventHandler } from "react"

import buttonBG from "../public/images/pink-ellipse.svg"

export type ButtonSize = 1 | 2 | 3

interface ButtonProps {
  text: string;
  scale: ButtonSize;
  widthPx: number;
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

export default ({ text, scale, widthPx, callback }: ButtonProps) => {
  if (callback === undefined) callback = () => { }

  return (
    <div className={`container button-container`} style={{ height: heights[scale] }}>
      <img
        className="button-image"
        style={{ height: heights[scale], width: widthPx }}
        src={buttonBG}
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