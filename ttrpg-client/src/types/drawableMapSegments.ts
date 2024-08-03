import { MapSegment } from 'types/mapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

export interface DrawableMapSegment extends MapSegment {
  dirty?: boolean
  selected?: boolean
}

export type DrawableMapSegmentDictionary = Record<
  TwoDimensionalCoordinatesString,
  DrawableMapSegment
>
