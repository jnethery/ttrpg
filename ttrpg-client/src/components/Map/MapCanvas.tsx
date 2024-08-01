import { useRef, useEffect } from 'react'

import { MapMeta, MapSegment } from 'types/mapSegments'
import { Terrain } from 'types/terrains'
import { colorConfig } from 'types/colors'
import {
  calculateGrayscaleColor,
  calculateTerrainColor,
  colorToRGBString,
} from 'utils/colors'
import { normalizeValue } from 'utils/math'
import { getCanvasCoordinate } from 'utils/canvas'

interface MapCanvasProps {
  meta: MapMeta
  segments: MapSegment[]
  selectedSegments: MapSegment[]
  onClick?: (event: React.MouseEvent, segment: MapSegment) => void
  onMouseOver?: (event: React.MouseEvent, segment: MapSegment) => void
}

const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

const getRectRGBString = ({
  meta,
  segment,
  selectedSegments,
}: {
  meta: MapMeta
  segment: MapSegment
  selectedSegments: MapSegment[]
}): string => {
  const selected = !!selectedSegments.find(
    (selectedSegment) =>
      selectedSegment.coordinates.x === segment.coordinates.x &&
      selectedSegment.coordinates.y === segment.coordinates.y,
  )
  const z = segment.coordinates.z
  return getTerrainRGBString({
    selected,
    height: z,
    minHeight: meta.localMinHeight,
    maxHeight: meta.localMaxHeight,
    terrain: segment.terrain,
    waterDepth: segment.waterDepth,
  })
}

const getTerrainRGBString = ({
  selected,
  height,
  minHeight,
  maxHeight,
  terrain,
  waterDepth,
}: {
  selected: boolean
  height: number
  minHeight: number
  maxHeight: number
  terrain: Terrain
  waterDepth: number
}): string => {
  return selected
    ? colorConfig.primary.rgbString
    : colorToRGBString(
        calculateTerrainColor(
          calculateGrayscaleColor(
            normalizeValue(height, minHeight, maxHeight),
          )[0],
          terrain,
          { waterDepth },
        ),
      )
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  meta,
  segments,
  selectedSegments,
  onClick,
  onMouseOver,
}) => {
  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (onClick) {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const coordinate = getCanvasCoordinate(event, canvas, dimensions)
        const segment = segments.find(
          (segment) =>
            segment.coordinates.x === coordinate.x &&
            segment.coordinates.y === coordinate.y,
        )
        if (segment) {
          onClick(event, segment)
        }
      }
    }
  }

  // TODO: Do the logic here instead of in the parent component, to prevent sending unnecessary events
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (onMouseOver) {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const coordinate = getCanvasCoordinate(event, canvas, dimensions)
        const segment = segments.find(
          (segment) =>
            segment.coordinates.x === coordinate.x &&
            segment.coordinates.y === coordinate.y,
        )
        console.log({ segment, coordinate })
        if (segment) {
          onMouseOver(event, segment)
        }
      }
    }
  }

  // TODO: Use state to track segments that need to be updated rather than redrawing the entire canvas

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        segments.map((segment) => {
          ctx.fillStyle = getRectRGBString({
            meta,
            segment,
            selectedSegments,
          })
          // Draw terrain color
          ctx.fillRect(
            segment.coordinates.x * dimensions.width,
            segment.coordinates.y * dimensions.height,
            dimensions.width,
            dimensions.height,
          )
          // Draw segment border
        })
      }
    }
  }, [segments, selectedSegments])

  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    />
  )
}
