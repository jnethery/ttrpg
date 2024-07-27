// TODO: Put this in its own file
export type Coordinates = {
  x: number
  y: number
  z: number
}

// TODO: Put this in its own file
export type Terrain = 'rock' | 'forest'

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

export const isMapSegment = (value: any): value is MapSegment =>
  value && value.coordinates.z !== null

export type GeneratingMapSegment = MapSegment | UninitializedMapSegment

export type MapMeta = {
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
