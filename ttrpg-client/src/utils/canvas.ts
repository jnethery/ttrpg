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
  height,
  maxHeight,
  minHeight,
  selected,
  terrain,
  waterDepth,
}: {
  height: number
  maxHeight: number
  minHeight: number
  selected: boolean
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

const handleBrushTool = ({
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
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  destinationSelectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  dimensions: { width: number; height: number }
  event: React.MouseEvent<HTMLCanvasElement>
  interimSegmentCoordinateStrings: TwoDimensionalCoordinatesString[]
  lastPaintedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setLastPaintedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
}) => {
  /*
  if (event.buttons === 0) {
        setLastPaintedSegmentCoordinateString(null)
      } else if (event.buttons === 1) {
        if (
          selectedSegmentCoordinateString ||
          destinationSelectedSegmentCoordinateString
        ) {
          // setSelectedSegment(null)
          // setDestinationSelectedSegment(null)
        }
        // TODO: Do this interpolation logic in the Canvas element
        // Make it more sophisticated by drawing a theoretical curve between the last 2 points and the current one,
        // and then finding the segments that lie closest to the intersection with that curve between the last point and the current one
        let interpolatedSegments: TwoDimensionalCoordinatesString[] = []
        if (lastPaintedSegmentCoordinateString) {
          // Check that the last painted segment is over 1 tile away from the current segment
          if (
            calculateLinearDistance(
              lastPaintedSegmentCoordinateString,
              segment.coordinates,
            ) > 1
          ) {
            const coordinates = getLineCoordinates({
              origin: lastPaintedSegmentCoordinateString,
              destination: segment.coordinates,
            })
            interpolatedSegments = coordinates
              .map(({ x, y }) => segments[`${x},${y}`])
              .filter((segment) => segment !== undefined)
              .map(
                (segment) =>
                  `${segment.coordinates.x},${segment.coordinates.y}` as TwoDimensionalCoordinatesString,
              )
          }
        }
        setLastPaintedSegmentCoordinateString(
          `${segment.coordinates.x},${segment.coordinates.y}`,
        )
        setInterimSegmentCoordinateStrings([
          ...interimSegmentCoordinateStrings,
          ...interpolatedSegments,
          `${segment.coordinates.x},${segment.coordinates.y}`,
        ])
      }
        */

  const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
  if (coordinate) {
    // const segment = segments[`${coordinate.x},${coordinate.y}`]
    if (event.buttons === 0) {
      setLastPaintedSegmentCoordinateString(null)
    } else if (event.buttons === 1) {
      if (
        selectedSegmentCoordinateString ||
        destinationSelectedSegmentCoordinateString
      ) {
        setSelectedSegmentCoordinateString(null)
        setDestinationSegmentCoordinateString(null)
        setInterimCoordinateStrings([])
        setDrawableSegments((prev) => {
          const removableCoordinates = [
            ...interimSegmentCoordinateStrings,
            selectedSegmentCoordinateString,
            destinationSelectedSegmentCoordinateString,
          ]
          const removableSegments = removableCoordinates
            .map((coord) => (coord ? segments[coord] : null))
            .filter((segment) => segment !== null && segment !== undefined)

          return {
            ...prev,
            ...removeSelectedDrawableSegments(removableSegments),
          }
        })
      }
    }
  }
}

const handlePointerTool = ({
  canvasRef,
  dimensions,
  event,
  segments,
  selectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
  setDrawableSegments,
  setInterimCoordinateStrings,
  setSelectedSegmentCoordinateString,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  event: React.MouseEvent<HTMLCanvasElement>
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
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
          if (prev.length > 0) {
            updatedSegments = {
              ...updatedSegments,
              ...removeSelectedDrawableSegments(
                prev.map((coord) => segments[coord]),
              ),
            }
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
          console.log({
            updatedSegments,
            segment,
            prev,
            replaceResult: replaceSelectedDrawableSegment(
              segment,
              prev ? segments[prev] : null,
            ),
          })
          return `${segment.coordinates.x},${segment.coordinates.y}`
        })
        setDrawableSegments((prev) => {
          console.log({ prev })
          return {
            ...prev,
            ...updatedSegments,
          }
        })
      }
    }
  }
}

export const handleMouseMove = ({
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
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  destinationSelectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  dimensions: { width: number; height: number }
  event: React.MouseEvent<HTMLCanvasElement>
  interimSegmentCoordinateStrings: TwoDimensionalCoordinatesString[]
  lastPaintedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setLastPaintedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  tool: Tool
}) => {
  if (tool === 'brush') {
    handleBrushTool({
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
    })
  }
}

export const handleClick = ({
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
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  event: React.MouseEvent<HTMLCanvasElement>
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  tool: Tool
}) => {
  if (tool === 'pointer') {
    handlePointerTool({
      canvasRef,
      dimensions,
      event,
      segments,
      selectedSegmentCoordinateString,
      setDestinationSegmentCoordinateString,
      setDrawableSegments,
      setInterimCoordinateStrings,
      setSelectedSegmentCoordinateString,
    })
  }
}
