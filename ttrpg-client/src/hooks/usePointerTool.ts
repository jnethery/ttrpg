import { DrawableMapSegmentDictionary } from 'types/drawableMapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'
import {
  getCanvasCoordinate,
  replaceSelectedDrawableSegment,
  removeSelectedDrawableSegments,
  addSelectedDrawableSegments,
  getInterimSegmentsForLine,
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
    selectedSegmentCoordinateString,
    setDestinationSegmentCoordinateString,
    setInterimCoordinateStrings,
    setSelectedSegmentCoordinateString,
  } = useMapContext()

  const handlePointerTool = (event: React.MouseEvent<HTMLCanvasElement>) => {
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
            // This always needs to happen after segments are updated
            setDrawableSegments((prev) => {
              console.log({ prev })
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
