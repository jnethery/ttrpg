import { MapMeta, MapSegment, MapSegmentDictionary } from 'types/mapSegments'
import {
  DrawableMapSegment,
  DrawableMapSegmentDictionary,
} from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
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

export function addSelectedDrawableSegments(segments: MapSegment[]) {
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
