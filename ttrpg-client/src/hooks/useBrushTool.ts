import { useState } from 'react'

import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  addDrawableSegments,
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
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
}) => {
  const { segments, inspectedSegment, setSegments } = useMapContext()
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
        if (event.type === 'click') {
          // TODO: Add brush size to this
          // Draw the segment at the current coordinate
          if (inspectedSegment) {
            setSegments((prev) => {
              return {
                ...prev,
                ...addDrawableSegments([
                  {
                    ...segments[coordinatesToCoordinateString(coordinate)],
                    ...inspectedSegment,
                    coordinates: {
                      ...inspectedSegment.coordinates,
                      ...coordinate,
                    },
                  },
                ]),
              }
            })
          }
        }
      } else if (event.buttons === 1) {
        // TODO: Make this more sophisticated by drawing a theoretical curve between the last 2 points and the current one,
        // and then finding the segments that lie closest to the intersection with that curve between the last point and the current one
        if (inspectedSegment) {
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
          // TODO: When setting drawable segments, only set the segments that are actually new
          setSegments((prev) => {
            return {
              ...prev,
              ...addDrawableSegments(
                newCoordinateStrings.map((coord) => {
                  return {
                    ...segments[coord],
                    ...inspectedSegment,
                    coordinates: {
                      ...inspectedSegment.coordinates,
                      ...coordinateStringToCoordinates(coord),
                    },
                  }
                }),
              ),
            }
          })
        }
      }
    }
  }
  return { handleBrushTool }
}
