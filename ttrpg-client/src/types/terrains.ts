const terrains = ['rock', 'sand', 'grass', 'forest'] as const
export type Terrain = (typeof terrains)[number]

export interface TerrainOptions {
  minElevation: number // The minimum elevation this terrain can be found at
  maxElevation: number // The maximum elevation this terrain can be found at
  prevalence: number // The likelihood of this terrain being chosen at a given elevation
}
