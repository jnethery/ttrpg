import { CSSProperties } from 'react'

import { MapSegment, MapMeta } from 'types/mapSegments'
import { Dimensions } from 'types/dimensions'
import { colorConfig } from 'types/colors'
import { calculateGrayscaleColor, calculateTerrainColor } from 'utils/colors'
import { normalizeValue } from 'utils/math'

import { Tile } from 'components/Layout'

interface MapTileProps {
  dimensions: Dimensions
  selected: boolean
  segment: MapSegment
  meta: MapMeta
  onClick?: (event: React.MouseEvent, segment: MapSegment) => void
  onMouseOver?: (event: React.MouseEvent, segment: MapSegment) => void
}

const getMapTileStyle = ({
  backgroundColor,
}: CSSProperties): CSSProperties => ({
  backgroundColor,
})

export const MapTile: React.FC<MapTileProps> = ({
  dimensions,
  selected,
  segment,
  meta,
  onClick,
  onMouseOver,
}) => {
  const z = segment.coordinates.z
  // Optimization: Don't need to calculate the color if the tile is selected, since it will be overridden
  const terrainColor = selected
    ? colorConfig.dark.rgbString
    : calculateTerrainColor(
        calculateGrayscaleColor(
          normalizeValue(z, meta.localMinHeight, meta.localMaxHeight),
        )[0],
        segment.terrain,
        segment,
      )

  const selectionOptions = {
    selected,
    selectionStyle: {
      backgroundColor: colorConfig.primary.rgbString,
    },
  }
  const style = getMapTileStyle({
    backgroundColor: `rgba(${terrainColor[0]}, ${terrainColor[1]}, ${terrainColor[2]}, 1)`,
  })

  return (
    <Tile
      dimensions={dimensions}
      selectionOptions={selectionOptions}
      style={style}
      onClick={(event) => onClick?.(event, segment)}
      onMouseOver={(event) => onMouseOver?.(event, segment)}
    />
  )
}
