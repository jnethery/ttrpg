import { useRef, useState, useEffect } from 'react'

import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { getRectRGBString } from 'utils/canvas'
import { useMapContext } from 'hooks/useMapContext'
import { usePointerTool } from 'hooks/usePointerTool'
import { useBrushTool } from 'hooks/useBrushTool'

// TODO: Make this configurable in the UI
const dimensions = {
  width: 10,
  height: 10,
  border: 1,
}

export const MapCanvas: React.FC = () => {
  const { meta, segments, selectedTool } = useMapContext()

  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [drawableSegments, setDrawableSegments] =
    useState<DrawableMapSegmentDictionary | null>(null)

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
