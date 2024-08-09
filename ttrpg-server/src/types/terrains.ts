import { z } from 'zod'

export const terrains = ['rock', 'sand', 'grass', 'forest'] as const
export const TerrainSchema = z.enum(terrains)
export type Terrain = z.infer<typeof TerrainSchema>

export interface TerrainOptions {
  minElevation: number // The minimum elevation this terrain can be found at
  maxElevation: number // The maximum elevation this terrain can be found at
  prevalence: number // The likelihood of this terrain being chosen at a given elevation
}
