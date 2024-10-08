import { useRef, useEffect } from 'react'

import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { getRectRGBString, resetSelectedSegments } from 'utils/canvas'
import { useMapContext } from 'hooks/useMapContext'
import { usePointerTool } from 'hooks/usePointerTool'
import { useBrushTool } from 'hooks/useBrushTool'
import { useEyeDropperTool } from 'hooks/useEyeDropperTool'
import { useToolContext } from 'hooks/useToolContext'

// TODO: Move this to a ViewpointProvider
const dimensions = {
  width: 20,
  height: 20,
  border: 1,
}

export const MapCanvas: React.FC = () => {
  const {
    destinationCoordinateString,
    interimCoordinateStrings,
    meta,
    originCoordinateString,
    segments,
    setDestinationCoordinateString,
    drawableSegments,
    setDrawableSegments,
    setInterimCoordinateStrings,
    setOriginCoordinateString,
  } = useMapContext()
  const { selectedTool } = useToolContext()

  const { width, length, gridIncrements } = meta
  const canvasWidth = dimensions.width * width * gridIncrements
  const canvasHeight = dimensions.height * length * gridIncrements
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
  })
  const { handleEyeDropperTool } = useEyeDropperTool({
    dimensions,
    canvasRef,
  })

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
                alpha: 1,
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
        } else if (selectedTool === 'brush') {
          handleBrushTool(event)
        } else if (selectedTool === 'eyedropper') {
          handleEyeDropperTool(event)
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
