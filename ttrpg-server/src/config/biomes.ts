import { Biome } from 'types/biomes'

const PLAINS_MAX_ELEVATION = 5
const PLAINS_MIN_ELEVATION = -1

const MARSH_MAX_ELEVATION = 1
const MARSH_MIN_ELEVATION = -5

export const biomeSettings: Record<string, Biome> = {
  plains: {
    minElevation: PLAINS_MIN_ELEVATION,
    maxElevation: PLAINS_MAX_ELEVATION,
    averageChangeInElevation: 0.1,
    rainfallCoverage: 90,
    waterOptions: {
      minBlocks: 0,
      maxBlocks: 500,
      blockDepth: 0.1,
      minSpawnPoints: 0,
      maxSpawnPoints: 3,
    },
    terrainOptions: {
      forest: {
        minElevation: 0.3 * PLAINS_MIN_ELEVATION,
        maxElevation: 0.9 * PLAINS_MAX_ELEVATION,
        prevalence: 2,
      },
      rock: {
        minElevation: 0.75 * PLAINS_MIN_ELEVATION,
        maxElevation: PLAINS_MAX_ELEVATION,
        prevalence: 3,
      },
      grass: {
        minElevation: PLAINS_MIN_ELEVATION,
        maxElevation: PLAINS_MAX_ELEVATION,
        prevalence: 95,
      },
    },
  },
  marsh: {
    minElevation: MARSH_MIN_ELEVATION,
    maxElevation: MARSH_MAX_ELEVATION,
    averageChangeInElevation: 0.1,
    rainfallCoverage: 90,
    waterOptions: {
      minBlocks: 500,
      maxBlocks: 2000,
      blockDepth: 0.1,
      minSpawnPoints: 5,
      maxSpawnPoints: 15,
    },
    terrainOptions: {
      grass: {
        minElevation: MARSH_MIN_ELEVATION,
        maxElevation: MARSH_MAX_ELEVATION,
        prevalence: 100,
      },
    },
  },
}
