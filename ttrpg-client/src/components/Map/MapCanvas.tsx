import { useRef, useState, useEffect } from 'react'

import { MapMeta, MapSegment, MapSegmentDictionary } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { Tool } from 'types/tools'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  getRectRGBString,
  handleClick,
} from 'utils/canvas'

// TODO: Make this configurable in the UI
const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

// TODO: Do the logic here instead of in the parent component, to prevent sending unnecessary events
const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  segments: MapSegmentDictionary,
  tool: Tool,
  onMouseOver?: (event: React.MouseEvent, segment: MapSegment) => void,
) => {
  if (onMouseOver) {
    if (canvasRef.current) {
      const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
      if (coordinate) {
        const segment = segments[`${coordinate.x},${coordinate.y}`]
        if (segment) {
          onMouseOver(event, segment)
        }
      }
    }
  }
}

interface MapCanvasProps {
  tool: Tool
  meta: MapMeta
  segments: MapSegmentDictionary
  setSelectedSegment: React.Dispatch<React.SetStateAction<MapSegment | null>>
  setDestinationSegment: React.Dispatch<React.SetStateAction<MapSegment | null>>
  onMouseOver?: (event: React.MouseEvent, segment: MapSegment) => void
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  tool,
  meta,
  segments,
  setSelectedSegment,
  setDestinationSegment,
  onMouseOver,
}) => {
  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [drawableSegments, setDrawableSegments] =
    useState<DrawableMapSegmentDictionary | null>(null)

  useEffect(() => {
    const drawableSegments = Object.entries(segments).reduce(
      (acc, [key, segment]) => {
        acc[key as TwoDimensionalCoordinatesString] = {
          ...segment,
          dirty: true,
          selected: false,
        }
        return acc
      },
      {} as DrawableMapSegmentDictionary,
    )
    setDrawableSegments(drawableSegments)
  }, [segments])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        if (drawableSegments) {
          const updatedSegments = Object.values(drawableSegments)
            .filter((segment) => segment.dirty)
            .map((segment) => {
              ctx.fillStyle = getRectRGBString({
                meta,
                segment,
              })
              // Draw terrain color
              ctx.fillRect(
                segment.coordinates.x * dimensions.width,
                segment.coordinates.y * dimensions.height,
                dimensions.width,
                dimensions.height,
              )
              // Draw segment border

              return segment
            })
            .reduce((acc, segment) => {
              acc[`${segment.coordinates.x},${segment.coordinates.y}`] = {
                ...segment,
                dirty: false,
              }
              return acc
            }, {} as DrawableMapSegmentDictionary)
          if (Object.keys(updatedSegments).length > 0) {
            setDrawableSegments((prev) => {
              return {
                ...prev,
                ...updatedSegments,
              }
            })
          }
        }
      }
    }
  }, [meta, drawableSegments])

  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      ref={canvasRef}
      onClick={(event) =>
        handleClick({
          event,
          canvasRef,
          segments,
          setDrawableSegments,
          setDestinationSegment,
          setSelectedSegment,
          tool,
          dimensions,
        })
      }
      onMouseMove={(event) =>
        handleMouseMove(event, canvasRef, segments, tool, onMouseOver)
      }
    />
  )
}
