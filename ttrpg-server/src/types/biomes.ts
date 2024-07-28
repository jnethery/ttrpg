import { Terrain, TerrainOptions } from 'types/terrains'

export interface Biome {
  maxElevation: number
  minElevation: number
  averageChangeInElevation: number
  rainfallCoverage: number
  waterOptions: {
    minBlocks: number
    maxBlocks: number
    blockDepth: number
    minSpawnPoints: number
    maxSpawnPoints: number
  }
  terrainOptions: Partial<Record<Terrain, TerrainOptions>>
}
