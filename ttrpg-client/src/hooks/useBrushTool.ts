import { MapSegment } from 'types/mapSegments'
import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  removeSelectedDrawableSegments,
  addSelectedDrawableSegments,
} from 'utils/canvas'
import {
  calculateLinearDistance,
  getLineCoordinates,
  coordinatesToCoordinateString,
} from 'utils/math'
import { useMapContext } from 'hooks/useMapContext'

export const useBrushTool = ({
  canvasRef,
  dimensions,
  lastPaintedSegmentCoordinateString,
  setLastPaintedSegmentCoordinateString,
  setDrawableSegments,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  lastPaintedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setLastPaintedSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<DrawableMapSegmentDictionary | null>
  >
}) => {
  const {
    destinationSegmentCoordinateString,
    interimCoordinateStrings,
    segments,
    selectedSegmentCoordinateString,
    setDestinationSegmentCoordinateString,
    setInterimCoordinateStrings,
    setSelectedSegmentCoordinateString,
  } = useMapContext()

  const handleBrushTool = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
    if (coordinate) {
      // const segment = segments[`${coordinate.x},${coordinate.y}`]
      if (event.buttons === 0) {
        setLastPaintedSegmentCoordinateString(null)
      } else if (event.buttons === 1) {
        if (
          selectedSegmentCoordinateString ||
          destinationSegmentCoordinateString
        ) {
          setSelectedSegmentCoordinateString(null)
          setDestinationSegmentCoordinateString(null)
          setInterimCoordinateStrings([])
          setDrawableSegments((prev) => {
            const removableCoordinates = [
              ...interimCoordinateStrings,
              selectedSegmentCoordinateString,
              destinationSegmentCoordinateString,
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
          const updatedCoordinateStrings = [
            ...prev,
            ...interpolatedCoordinateStrings,
            coordinatesToCoordinateString(coordinate),
          ]
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
