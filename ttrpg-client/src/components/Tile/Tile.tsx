import { CSSProperties } from 'react'

import { SelectionOptions } from 'types/selection'
import { Dimensions } from 'types/dimensions'

interface TileProps {
  dimensions: Dimensions
  style: CSSProperties
  selectionOptions: SelectionOptions
  onClick: (event: React.MouseEvent) => void
}

const getTileStyle = ({ ...args }: CSSProperties): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  ...args,
})

export const Tile: React.FC<TileProps> = ({
  dimensions,
  style,
  selectionOptions,
  onClick,
}) => {
  const selectionStyle = selectionOptions.selected
    ? selectionOptions.selectionStyle
    : {}
  const tileStyle = getTileStyle({
    width: dimensions.width,
    height: dimensions.height,
    boxSizing: 'border-box',
    border: `${dimensions.border}px solid black`,
    ...style,
    ...selectionStyle,
  })
  return <div onClick={onClick} style={tileStyle}></div>
}
