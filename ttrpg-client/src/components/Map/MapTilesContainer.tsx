import React, { CSSProperties } from 'react'

import { MapSegment, MapMeta } from 'types/mapSegments'
import { MapTile } from './MapTile'

interface MapTilesContainerProps {
  selectedSegments: MapSegment[]
  segments: MapSegment[]
  meta: MapMeta
  onClick: (event: React.MouseEvent, segment: MapSegment) => void
}

// TODO: Make this parameterized, and merge with the one in MapTiles
const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

export const MapTilesContainer: React.FC<MapTilesContainerProps> = ({
  selectedSegments,
  segments,
  meta,
  onClick,
}) => {
  const { width, length, gridIncrements } = meta
  const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 0 auto',
    width: dimensions.width * width * gridIncrements,
    height: dimensions.height * length * gridIncrements,
  }

  return (
    <div style={style}>
      {segments.map((segment) => {
        const key = `${segment.coordinates.x}-${segment.coordinates.y}`
        return (
          <MapTile
            dimensions={dimensions}
            selected={
              !!selectedSegments.find(
                (selectedSegment) =>
                  selectedSegment.coordinates.x === segment.coordinates.x &&
                  selectedSegment.coordinates.y === segment.coordinates.y,
              )
            }
            key={key}
            onClick={onClick}
            meta={meta}
            segment={segment}
          />
        )
      })}
    </div>
  )
}
