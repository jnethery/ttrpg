import { MapMeta, MapSegment, MapSegmentDictionary } from 'types/mapSegments'
import {
  DrawableMapSegment,
  DrawableMapSegmentDictionary,
} from 'types/drawableMapSegments'
import {
  TwoDimensionalCoordinatesString,
  TwoDimensionalCoordinates,
} from 'types/coordinates'
import { Terrain } from 'types/terrains'
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
    console.log({ x, y })
    return {
      x: Math.floor(x / dimensions.width),
      y: Math.floor(y / dimensions.height),
    }
  }
  return null
}

export const getNeighboringSegmentsInRadius = (
  segments: MapSegmentDictionary,
  origin: TwoDimensionalCoordinates,
  radius: number,
): MapSegment[] => {
  if (radius <= 1) {
    return []
  }
  const r = Math.floor((2 * radius - 1) / 2)
  const rSquared = r ** 2

  // TODO: For now, only do this in a circle. Add the ability to use custom shapes.
  const neighboringSegments: MapSegment[] = []
  const u = origin.y
  const v = origin.x
  for (let x = v - r; x <= v + r; x++) {
    const xDistSquared = (x - v) ** 2
    if (xDistSquared > rSquared) continue

    const yRange = Math.floor(Math.sqrt(rSquared - xDistSquared))
    for (let y = u - yRange; y <= u + yRange; y++) {
      const segment = segments[`${x},${y}`]
      if (segment) {
        neighboringSegments.push(segment)
      }
    }
  }
  return neighboringSegments
}

export const getRectRGBString = ({
  meta,
  segment,
  alpha,
}: {
  meta: MapMeta
  segment: DrawableMapSegment
  alpha: number
}): string => {
  const z = segment.coordinates.z
  return getTerrainRGBString({
    selected: segment.selected ?? false,
    height: z,
    minHeight: meta.localMinHeight,
    maxHeight: meta.localMaxHeight,
    terrain: segment.terrain,
    waterDepth: segment.waterDepth,
    alpha,
  })
}

const getTerrainRGBString = ({
  height,
  maxHeight,
  minHeight,
  selected,
  terrain,
  waterDepth,
  alpha,
}: {
  height: number
  maxHeight: number
  minHeight: number
  selected: boolean
  terrain: Terrain
  waterDepth: number
  alpha: number
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
        alpha,
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

export function getInterimSegmentsForLine(
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

export function addDrawableSegments(segments: DrawableMapSegment[]) {
  const updatedDrawableSegments = segments.reduce((acc, segment) => {
    acc[`${segment.coordinates.x},${segment.coordinates.y}`] = {
      ...segment,
      dirty: true,
    }
    return acc
  }, {} as DrawableMapSegmentDictionary)
  return updatedDrawableSegments
}

export function removeSelectedDrawableSegments(segments: MapSegment[]) {
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

export function replaceSelectedDrawableSegment(
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

export function removeInterimSegmentsFromUpdatedSegments({
  segments,
  interimCoordinateStrings,
  setInterimCoordinateStrings,
}: {
  segments: MapSegmentDictionary
  interimCoordinateStrings: TwoDimensionalCoordinatesString[]
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
}) {
  if (interimCoordinateStrings.length > 0) {
    const updatedSegments: DrawableMapSegmentDictionary =
      removeSelectedDrawableSegments(
        interimCoordinateStrings.map((coord) => segments[coord]),
      )
    setInterimCoordinateStrings([])
    return updatedSegments
  }
  return {}
}

export function removeOriginSegmentFromUpdatedSegments({
  segments,
  originCoordinateString,
  setOriginCoordinateString,
}: {
  segments: MapSegmentDictionary
  originCoordinateString: TwoDimensionalCoordinatesString | null
  setOriginCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
}) {
  if (originCoordinateString) {
    const updatedSegments: DrawableMapSegmentDictionary =
      removeSelectedDrawableSegments([segments[originCoordinateString]])
    setOriginCoordinateString(null)
    return updatedSegments
  }
  return {}
}

export function removeDestinationSegmentFromUpdatedSegments({
  segments,
  destinationCoordinateString,
  setDestinationCoordinateString,
}: {
  segments: MapSegmentDictionary
  destinationCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
}) {
  if (destinationCoordinateString) {
    const updatedSegments: DrawableMapSegmentDictionary =
      removeSelectedDrawableSegments([segments[destinationCoordinateString]])
    setDestinationCoordinateString(null)
    return updatedSegments
  }
  return {}
}

export function resetSelectedSegments({
  segments,
  interimCoordinateStrings,
  originCoordinateString,
  destinationCoordinateString,
  setInterimCoordinateStrings,
  setOriginCoordinateString,
  setDestinationCoordinateString,
  setDrawableSegments,
  excludedUpdates,
}: {
  segments: MapSegmentDictionary
  originCoordinateString: TwoDimensionalCoordinatesString | null
  interimCoordinateStrings: TwoDimensionalCoordinatesString[]
  destinationCoordinateString: TwoDimensionalCoordinatesString | null
  setOriginCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setDestinationCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
  excludedUpdates?: ('origin' | 'interim' | 'destination')[]
}) {
  let updatedSegments: DrawableMapSegmentDictionary = {}

  // Remove the interim segments
  if (!excludedUpdates?.includes('interim')) {
    updatedSegments = removeInterimSegmentsFromUpdatedSegments({
      segments,
      interimCoordinateStrings,
      setInterimCoordinateStrings,
    })
  }
  // Remove the destination segment
  if (!excludedUpdates?.includes('destination')) {
    updatedSegments = {
      ...updatedSegments,
      ...removeDestinationSegmentFromUpdatedSegments({
        segments,
        destinationCoordinateString,
        setDestinationCoordinateString,
      }),
    }
  }

  // Remove the selected segment
  if (!excludedUpdates?.includes('origin')) {
    updatedSegments = {
      ...updatedSegments,
      ...removeOriginSegmentFromUpdatedSegments({
        segments,
        originCoordinateString,
        setOriginCoordinateString,
      }),
    }
  }

  if (Object.keys(updatedSegments).length > 0) {
    setDrawableSegments((prev) => {
      return {
        ...prev,
        ...updatedSegments,
      }
    })
  }
}
