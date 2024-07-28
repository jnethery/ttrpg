import { Terrain } from 'types/terrains'
import { Coordinates } from 'types/coordinates'

export type UninitializedMapSegment = {
  coordinates: { x: null; y: null; z: null }
  waterDepth: 0
  terrain: 'rock'
}

export type MapSegment = {
  coordinates: Coordinates
  waterDepth: number
  terrain: Terrain
}

export const isMapSegment = (
  value: GeneratingMapSegment,
): value is MapSegment => value && value.coordinates.z !== null

export type GeneratingMapSegment = MapSegment | UninitializedMapSegment

export type MapMeta = {
  localMinHeight: number
  localMaxHeight: number
  globalMaxHeight: number
  globalMinHeight: number
  width: number
  length: number
  gridIncrements: number
  lateralUnits: string
  verticalUnits: string
}

export type MapSegmentsResult = {
  meta: MapMeta
  segments: MapSegment[]
}
