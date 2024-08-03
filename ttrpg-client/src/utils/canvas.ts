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
import { normalizeValue } from 'utils/math'

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

function replaceDrawableSegment(
  segment: MapSegment,
  prevSegment: MapSegment | null,
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >,
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
  setDrawableSegments((prev) => ({
    ...prev,
    ...updatedDrawableSegments,
  }))
}

const handlePointerTool = ({
  event,
  canvasRef,
  dimensions,
  segments,
  setSelectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
  setDrawableSegments,
}: {
  event: React.MouseEvent<HTMLCanvasElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  segments: MapSegmentDictionary
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
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
          replaceDrawableSegment(
            segment,
            prev ? segments[prev] : null,
            setDrawableSegments,
          )
          return `${segment.coordinates.x},${segment.coordinates.y}`
        })
      } else {
        setSelectedSegmentCoordinateString((prev) => {
          replaceDrawableSegment(
            segment,
            prev ? segments[prev] : null,
            setDrawableSegments,
          )
          return `${segment.coordinates.x},${segment.coordinates.y}`
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
  setSelectedSegmentCoordinateString,
  setDestinationSegmentCoordinateString,
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
  setSelectedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
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
      setSelectedSegmentCoordinateString,
      setDrawableSegments,
    })
  }
}
