import { useRef, useState, useEffect } from 'react'

import { MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { Tool } from 'types/tools'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { getRectRGBString, handleClick, handleMouseMove } from 'utils/canvas'

// TODO: Make this configurable in the UI
const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

interface MapCanvasProps {
  destinationSelectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  meta: MapMeta
  interimSegmentCoordinateStrings: TwoDimensionalCoordinatesString[]
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  tool: Tool
}

// TODO: Add some of these props to a context to avoid prop drilling
export const MapCanvas: React.FC<MapCanvasProps> = ({
  destinationSelectedSegmentCoordinateString,
  meta,
  interimSegmentCoordinateStrings,
  segments,
  selectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
  setInterimCoordinateStrings,
  setSelectedSegmentCoordinateString,
  tool,
}) => {
  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [
    lastPaintedSegmentCoordinateString,
    setLastPaintedSegmentCoordinateString,
  ] = useState<TwoDimensionalCoordinatesString | null>(null)

  const [drawableSegments, setDrawableSegments] =
    useState<DrawableMapSegmentDictionary | null>(null)

  useEffect(() => {
    // TODO: Maintain selected and dirty props when making this assignment
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
            console.log(Object.keys(updatedSegments).length)
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
          canvasRef,
          dimensions,
          event,
          segments,
          selectedSegmentCoordinateString,
          setDestinationSegmentCoordinateString,
          setDrawableSegments,
          setInterimCoordinateStrings,
          setSelectedSegmentCoordinateString,
          tool,
        })
      }
      onMouseMove={(event) =>
        handleMouseMove({
          canvasRef,
          destinationSelectedSegmentCoordinateString,
          dimensions,
          event,
          interimSegmentCoordinateStrings,
          lastPaintedSegmentCoordinateString,
          segments,
          selectedSegmentCoordinateString,
          setDestinationSegmentCoordinateString,
          setDrawableSegments,
          setInterimCoordinateStrings,
          setLastPaintedSegmentCoordinateString,
          setSelectedSegmentCoordinateString,
          tool,
        })
      }
    />
  )
}
