import { useState } from 'react'

import { MapSegment } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  addSelectedDrawableSegments,
  getNeighboringSegmentsInRadius,
} from 'utils/canvas'
import {
  calculateLinearDistance,
  getLineCoordinates,
  coordinatesToCoordinateString,
  coordinateStringToCoordinates,
} from 'utils/math'
import { useMapContext } from 'hooks/useMapContext'
import { useToolContext } from './useToolContext'

// TODO: Abstract pieces of this function to share functionality with the terraform tool
export const useBrushTool = ({
  canvasRef,
  dimensions,
  setDrawableSegments,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
}) => {
  const { segments, setInterimCoordinateStrings } = useMapContext()
  const { brushSettings } = useToolContext()

  const [
    lastPaintedSegmentCoordinateString,
    setLastPaintedSegmentCoordinateString,
  ] = useState<TwoDimensionalCoordinatesString | null>(null)

  const handleBrushTool = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)

    if (coordinate) {
      if (event.buttons === 0) {
        setLastPaintedSegmentCoordinateString(null)
      } else if (event.buttons === 1) {
        // TODO: Make this more sophisticated by drawing a theoretical curve between the last 2 points and the current one,
        // and then finding the segments that lie closest to the intersection with that curve between the last point and the current one
        let interpolatedCoordinateStrings: TwoDimensionalCoordinatesString[] =
          []
        if (lastPaintedSegmentCoordinateString) {
          // Check that the last painted segment is over 1 tile away from the current segment
          if (
            calculateLinearDistance(
              lastPaintedSegmentCoordinateString,
              coordinate,
            ) > 1
          ) {
            const coordinates = getLineCoordinates({
              origin: lastPaintedSegmentCoordinateString,
              destination: coordinate,
            })
            interpolatedCoordinateStrings = coordinates
              .map(({ x, y }) => segments[`${x},${y}`])
              .filter((segment) => segment !== undefined)
              .map(
                (segment) =>
                  `${segment.coordinates.x},${segment.coordinates.y}` as TwoDimensionalCoordinatesString,
              )
          }
        }
        setLastPaintedSegmentCoordinateString(
          coordinatesToCoordinateString(coordinate),
        )
        setInterimCoordinateStrings((prev) => {
          const newCoordinateStrings = [
            ...[
              ...interpolatedCoordinateStrings,
              coordinatesToCoordinateString(coordinate),
            ].reduce((acc, coord) => {
              acc.add(coord)
              // TODO: There's likely a more efficient way to do this
              getNeighboringSegmentsInRadius(
                segments,
                coordinateStringToCoordinates(coord),
                brushSettings.size,
              ).forEach((segment) => {
                acc.add(`${segment.coordinates.x},${segment.coordinates.y}`)
              })
              return acc
            }, new Set<TwoDimensionalCoordinatesString>()),
          ]
          const updatedCoordinateStrings = [...prev, ...newCoordinateStrings]
          // TODO: When setting drawable segments, only set the segments that are actually new
          setDrawableSegments((prev) => {
            return {
              ...prev,
              ...addSelectedDrawableSegments(
                updatedCoordinateStrings.map(
                  (coord) => segments[coord] as MapSegment,
                ),
              ),
            }
          })
          return updatedCoordinateStrings
        })
      }
    }
  }
  return { handleBrushTool }
}
