import { z } from 'zod'

const terrains = ['rock', 'sand', 'grass', 'forest'] as const
export const TerrainSchema = z.enum(terrains)
export type Terrain = z.infer<typeof TerrainSchema>
