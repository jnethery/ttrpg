import { MapSegment } from 'types/mapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

export const twoDimensionalSegmentArrayToDictionary = (
  segments: MapSegment[][],
) => {
  const dictionary: Record<TwoDimensionalCoordinatesString, MapSegment> = {}
  segments.forEach((row, y) => {
    row.forEach((segment, x) => {
      dictionary[`${x},${y}`] = segment
    })
  })
  return dictionary
}
