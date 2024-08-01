import { CSSProperties } from 'react'

import { SelectionOptions } from 'types/selection'
import { Dimensions } from 'types/dimensions'
import { colorConfig } from 'types/colors'

interface TileProps {
  dimensions: Dimensions
  style?: CSSProperties
  selectionOptions?: SelectionOptions
  onClick?: (event: React.MouseEvent) => void
  onMouseOver?: (event: React.MouseEvent) => void
  children?: React.ReactNode
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
  onMouseOver,
  children,
}) => {
  const selectionStyle =
    selectionOptions && selectionOptions.selected
      ? selectionOptions.selectionStyle
      : {}
  const tileStyle = getTileStyle({
    width: dimensions.width,
    height: dimensions.height,
    boxSizing: 'border-box',
    border: `${dimensions.border}px solid`,
    borderColor: colorConfig.dark.rgbString,
    ...style,
    ...selectionStyle,
  })
  return (
    <div onClick={onClick} onMouseOver={onMouseOver} style={tileStyle}>
      {children}
    </div>
  )
}
