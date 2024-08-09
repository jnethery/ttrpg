import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  replaceSelectedDrawableSegment,
  removeSelectedDrawableSegments,
  addDrawableSegments,
  getInterimSegmentsForLine,
  removeDestinationSegmentFromUpdatedSegments,
  removeInterimSegmentsFromUpdatedSegments,
} from 'utils/canvas'
import { useMapContext } from 'hooks/useMapContext'

export const usePointerTool = ({
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
  const {
    segments,
    originCoordinateString,
    destinationCoordinateString,
    interimCoordinateStrings,
    setDestinationCoordinateString,
    setInterimCoordinateStrings,
    setOriginCoordinateString,
  } = useMapContext()

  const handlePointerTool = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const coordinate = getCanvasCoordinate(event, canvasRef, dimensions)
    if (coordinate) {
      const segment = segments[`${coordinate.x},${coordinate.y}`]
      if (segment) {
        if (event.shiftKey) {
          setDestinationCoordinateString((prev) => {
            // Replace the destination segment
            let updatedSegments = replaceSelectedDrawableSegment(
              segment,
              prev ? segments[prev] : null,
            )

            if (originCoordinateString) {
              // Calculate the line between the two points and select all segments that lie on that line
              const interimSegments = getInterimSegmentsForLine(
                originCoordinateString,
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
                  ...addDrawableSegments(
                    interimSegments.map((segment) => {
                      return {
                        ...segment,
                        selected: true,
                      }
                    }),
                  ),
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
          // Replace the selected segment
          setOriginCoordinateString((prev) => {
            updatedSegments = {
              ...replaceSelectedDrawableSegment(
                segment,
                prev ? segments[prev] : null,
              ),
              ...removeDestinationSegmentFromUpdatedSegments({
                segments,
                destinationCoordinateString,
                setDestinationCoordinateString,
              }),
              ...removeInterimSegmentsFromUpdatedSegments({
                segments,
                interimCoordinateStrings,
                setInterimCoordinateStrings,
              }),
            }

            // This always needs to happen after segments are updated
            setDrawableSegments((prev) => {
              return {
                ...prev,
                ...updatedSegments,
              }
            })
            return `${segment.coordinates.x},${segment.coordinates.y}`
          })
        }
      }
    }
  }
  return { handlePointerTool }
}
