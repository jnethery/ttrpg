import { CSSProperties } from 'react'

import { Tile } from 'components/Tile'
import { MapSegment, MapMeta } from 'types/mapSegments'
import { calculateGrayscaleColor, calculateTerrainColor } from 'utils/colors'
import { normalizeValue } from 'utils/math'

// TODO: Make this parameterized, and merge with the one in MapTilesContainer
const dimensions = {
  width: 5,
  height: 5,
  border: 1,
}

interface MapTileProps {
  selected: boolean
  segment: MapSegment
  meta: MapMeta
  onClick: (event: React.MouseEvent, segment: MapSegment) => void
}

const getMapTileStyle = ({
  backgroundColor,
}: CSSProperties): CSSProperties => ({
  backgroundColor,
})

export const MapTile: React.FC<MapTileProps> = ({
  selected,
  segment,
  meta,
  onClick,
}) => {
  const z = segment.coordinates.z
  // Optimization: Don't need to calculate the color if the tile is selected, since it will be overridden
  const terrainColor = selected
    ? 'black'
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
      backgroundColor: 'rgba(255, 242, 0, 1)',
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
      onClick={(event) => onClick(event, segment)}
    />
  )
}
