import { useRef, useState, useEffect } from 'react'

import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { getRectRGBString, resetSelectedSegments } from 'utils/canvas'
import { useMapContext } from 'hooks/useMapContext'
import { usePointerTool } from 'hooks/usePointerTool'
import { useBrushTool } from 'hooks/useBrushTool'
import { useToolContext } from 'hooks/useToolContext'

// TODO: Make this configurable in the UI
const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

export const MapCanvas: React.FC = () => {
  const {
    meta,
    segments,
    originCoordinateString,
    interimCoordinateStrings,
    destinationCoordinateString,
    setOriginCoordinateString,
    setDestinationCoordinateString,
    setInterimCoordinateStrings,
  } = useMapContext()
  const { selectedTool } = useToolContext()

  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [drawableSegments, setDrawableSegments] =
    useState<DrawableMapSegmentDictionary | null>(null)

  useEffect(() => {
    // When the selected tool changes, reset the selected segments
    resetSelectedSegments({
      segments,
      interimCoordinateStrings,
      originCoordinateString,
      destinationCoordinateString,
      setDestinationCoordinateString,
      setDrawableSegments,
      setInterimCoordinateStrings,
      setOriginCoordinateString,
    })
  }, [selectedTool])

  const { handlePointerTool } = usePointerTool({
    dimensions,
    canvasRef,
    setDrawableSegments,
  })
  const { handleBrushTool } = useBrushTool({
    dimensions,
    canvasRef,
    setDrawableSegments,
  })

  useEffect(() => {
    const newDrawableSegments = Object.entries(segments).reduce(
      (acc, [key, segment]) => {
        const coordinateString = key as TwoDimensionalCoordinatesString
        acc[coordinateString] = {
          ...segment,
          dirty: true,
          selected: drawableSegments?.[coordinateString]?.selected ?? false,
        }
        return acc
      },
      {} as DrawableMapSegmentDictionary,
    )
    setDrawableSegments(newDrawableSegments)
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
      onClick={(event) => {
        if (selectedTool === 'pointer') {
          handlePointerTool(event)
        }
      }}
      onMouseMove={(event) => {
        if (selectedTool === 'brush') {
          handleBrushTool(event)
        }
      }}
    />
  )
}
