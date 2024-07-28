import { z } from 'zod'

import { Terrain, TerrainSchema } from 'types/terrains'
import { Coordinates } from 'types/coordinates'

export type UninitializedMapSegment = {
  coordinates: { x: null; y: null; z: null }
  waterDepth: 0
  terrain: 'rock'
}

export const MapSegmentSchema = z.object({
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  waterDepth: z.number(),
  terrain: TerrainSchema,
})

export type MapSegment = {
  coordinates: Coordinates
  waterDepth: number
  terrain: Terrain
}

export const isMapSegment = (
  value: GeneratingMapSegment,
): value is MapSegment => value && value.coordinates.z !== null

export type GeneratingMapSegment = MapSegment | UninitializedMapSegment

export const MapMetaSchema = z.object({
  localMinHeight: z.number(),
  localMaxHeight: z.number(),
  globalMaxHeight: z.number(),
  globalMinHeight: z.number(),
  width: z.number(),
  length: z.number(),
  gridIncrements: z.number(),
  lateralUnits: z.string(),
  verticalUnits: z.string(),
})

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

export const MapDataSchema = z.object({
  meta: MapMetaSchema,
  segments: z.array(MapSegmentSchema),
})

export type MapData = {
  meta: MapMeta
  segments: MapSegment[]
}
