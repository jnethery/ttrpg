import { MapMeta, MapSegment, MapSegmentDictionary } from 'types/mapSegments'
import {
  DrawableMapSegment,
  DrawableMapSegmentDictionary,
} from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import { Terrain } from 'types/terrains'
import { Tool } from 'types/tools'
import { colorConfig } from 'types/colors'
import {
  calculateGrayscaleColor,
  calculateTerrainColor,
  colorToRGBString,
} from 'utils/colors'
import { normalizeValue, getLineCoordinates } from 'utils/math'
import React from 'react'

export const getCanvasCoordinate = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  dimensions: { width: number; height: number },
): { x: number; y: number } | null => {
  if (canvasRef.current) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {
      x: Math.floor(x / dimensions.width),
      y: Math.floor(y / dimensions.height),
    }
  }
  return null
}

export const getRectRGBString = ({
  meta,
  segment,
}: {
  meta: MapMeta
  segment: DrawableMapSegment
}): string => {
  const z = segment.coordinates.z
  return getTerrainRGBString({
    selected: segment.selected ?? false,
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

const getUpdatedDrawableSegment = ({
  segment,
  selected,
}: {
  segment: MapSegment
  selected: boolean
}): DrawableMapSegmentDictionary => {
  return {
    [`${segment.coordinates.x},${segment.coordinates.y}`]: {
      ...segment,
      dirty: true,
      selected: selected,
    },
  }
}

function getInterimSegmentsForLine(
  origin: TwoDimensionalCoordinatesString,
  destination: TwoDimensionalCoordinatesString,
  segments: MapSegmentDictionary,
): MapSegment[] {
  const coordinates = getLineCoordinates({
    origin,
    destination,
  })
  return coordinates
    .filter(({ x, y }) => {
      // Filter out the origin and destination
      return `${x},${y}` !== origin && `${x},${y}` !== destination
    })
    .map(({ x, y }) => segments[`${x},${y}`])
    .filter((segment) => segment !== undefined)
}

function addSelectedDrawableSegments(segments: MapSegment[]) {
  const updatedDrawableSegments = segments.reduce((acc, segment) => {
    acc[`${segment.coordinates.x},${segment.coordinates.y}`] = {
      ...segment,
      dirty: true,
      selected: true,
    }
    return acc
  }, {} as DrawableMapSegmentDictionary)
  return updatedDrawableSegments
}

function removeSelectedDrawableSegments(segments: MapSegment[]) {
  const updatedDrawableSegments = segments.reduce((acc, segment) => {
    acc[`${segment.coordinates.x},${segment.coordinates.y}`] = {
      ...segment,
      dirty: true,
      selected: false,
    }
    return acc
  }, {} as DrawableMapSegmentDictionary)
  return updatedDrawableSegments
}

function replaceSelectedDrawableSegment(
  segment: MapSegment,
  prevSegment: MapSegment | null,
) {
  let updatedDrawableSegments: DrawableMapSegmentDictionary = {
    ...getUpdatedDrawableSegment({ segment, selected: true }),
  }
  if (prevSegment) {
    updatedDrawableSegments = {
      ...updatedDrawableSegments,
      ...getUpdatedDrawableSegment({ segment: prevSegment, selected: false }),
    }
  }
  return updatedDrawableSegments
}

const handlePointerTool = ({
  event,
  canvasRef,
  dimensions,
  segments,
  selectedSegmentCoordinateString,
  setSelectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
  setInterimCoordinateStrings,
  setDrawableSegments,
}: {
  event: React.MouseEvent<HTMLCanvasElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  segments: MapSegmentDictionary
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
}) => {
  const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
  if (coordinate) {
    const segment = segments[`${coordinate.x},${coordinate.y}`]
    if (segment) {
      if (event.shiftKey) {
        setDestinationSegmentCoordinateString((prev) => {
          // Replace the destination segment
          let updatedSegments = replaceSelectedDrawableSegment(
            segment,
            prev ? segments[prev] : null,
          )

          if (selectedSegmentCoordinateString) {
            // Calculate the line between the two points and select all segments that lie on that line
            const interimSegments = getInterimSegmentsForLine(
              selectedSegmentCoordinateString,
              `${segment.coordinates.x},${segment.coordinates.y}`,
              segments,
            )
            setInterimCoordinateStrings((prev) => {
              // Remove the previous interim segments, and add the new ones
              // Order needs to be remove, and then add, to avoid removing selected segments that were in the previous set
              // TODO: An optimization could be to only add/remove the segments that are in the new line
              updatedSegments = {
                ...updatedSegments,
                ...removeSelectedDrawableSegments(
                  prev.map((coord) => segments[coord]),
                ),
                ...addSelectedDrawableSegments(interimSegments),
              }
              return interimSegments.map(
                (segment) =>
                  `${segment.coordinates.x},${segment.coordinates.y}` as TwoDimensionalCoordinatesString,
              )
            })
          }

          setDrawableSegments((prev) => {
            return {
              ...prev,
              ...updatedSegments,
            }
          })
          return `${segment.coordinates.x},${segment.coordinates.y}`
        })
      } else {
        let updatedSegments: DrawableMapSegmentDictionary = {}
        // Remove the interim segments
        setInterimCoordinateStrings((prev) => {
          updatedSegments = {
            ...updatedSegments,
            ...removeSelectedDrawableSegments(
              prev.map((coord) => segments[coord]),
            ),
          }
          return []
        })
        // Remove the destination segment
        setDestinationSegmentCoordinateString((prev) => {
          if (prev) {
            updatedSegments = {
              ...updatedSegments,
              ...removeSelectedDrawableSegments([segments[prev]]),
            }
          }
          return null
        })
        // Replace the selected segment
        setSelectedSegmentCoordinateString((prev) => {
          updatedSegments = {
            ...updatedSegments,
            ...replaceSelectedDrawableSegment(
              segment,
              prev ? segments[prev] : null,
            ),
          }
          return `${segment.coordinates.x},${segment.coordinates.y}`
        })
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

export const handleClick = ({
  event,
  canvasRef,
  dimensions,
  segments,
  selectedSegmentCoordinateString,
  setSelectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
  setInterimCoordinateStrings,
  setDrawableSegments,
  tool,
}: {
  event: React.MouseEvent<HTMLCanvasElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  segments: MapSegmentDictionary
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  tool: Tool
}) => {
  if (tool === 'pointer') {
    handlePointerTool({
      event,
      canvasRef,
      dimensions,
      segments,
      setDestinationSegmentCoordinateString,
      selectedSegmentCoordinateString,
      setSelectedSegmentCoordinateString,
      setInterimCoordinateStrings,
      setDrawableSegments,
    })
  }
}
