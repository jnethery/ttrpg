import { z } from 'zod'

import { Terrain, TerrainSchema } from './terrains'

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

export interface MapMeta {
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

export const MapSegmentSchema = z.object({
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  waterDepth: z.number(),
  terrain: TerrainSchema,
})

export interface MapSegment {
  coordinates: { x: number; y: number; z: number }
  waterDepth: number
  terrain: Terrain
}

export const MapDataSchema = z.object({
  meta: MapMetaSchema,
  segments: z.array(MapSegmentSchema),
})

export interface MapData {
  meta: MapMeta
  segments: MapSegment[]
}
