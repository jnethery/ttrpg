import {
  GeneratingMapSegment,
  MapSegment,
  isMapSegment,
} from 'types/mapSegments'
import { Biome } from 'types/biomes'
import { Terrain } from 'types/terrains'
import { ThreeDimensionalCoordinates } from 'types/coordinates'

export function calculateBaseMapSegments({
  width,
  length,
  gridIncrements,
  biome,
  segments,
}: {
  width: number
  length: number
  gridIncrements: number
  biome: Biome
  segments: GeneratingMapSegment[][]
}): {
  minHeight: number
  maxHeight: number
} {
  let minHeight = 0
  let maxHeight = 0
  for (let j = 0; j < length * gridIncrements; j++) {
    for (let i = 0; i < width * gridIncrements; i++) {
      const neighbors = getNeighboringSegments(i, j, segments)
      const averageNeighborHeight = neighbors.length
        ? neighbors.reduce((acc, neighbor) => acc + neighbor.coordinates.z, 0) /
          neighbors.length
        : 0

      const z = calculateZ(
        i,
        j,
        biome.maxElevation,
        biome.minElevation,
        biome.averageChangeInElevation,
        averageNeighborHeight,
      )
      if (z < minHeight) {
        minHeight = z
      }
      if (z > maxHeight) {
        maxHeight = z
      }
      segments[j][i] = {
        coordinates: {
          x: i,
          y: j,
          z,
        },
        waterDepth: 0,
        terrain: calculateTerrain({ z, biome }),
      }
    }
  }
  return { minHeight, maxHeight }
}

export function calculateTerrain({
  z,
  biome,
}: {
  z: number
  biome: Biome
}): Terrain {
  let terrain = null
  while (!terrain) {
    const random = Math.random() * 100
    for (const [key, value] of Object.entries(biome.terrainOptions)) {
      if (z < value.minElevation || z > value.maxElevation) {
        continue
      }
      if (random < value.prevalence) {
        terrain = key as Terrain
        break
      }
    }
  }
  return terrain
}

export function calculateWaterSegments({
  width,
  length,
  gridIncrements,
  biome,
  segments,
}: {
  width: number
  length: number
  gridIncrements: number
  biome: Biome
  segments: MapSegment[][]
}): void {
  // Place random water tiles and let them run downhill until they stop
  const numBlocks =
    Math.floor(
      Math.random() *
        (biome.waterOptions.maxBlocks - biome.waterOptions.minBlocks + 1),
    ) + biome.waterOptions.minBlocks
  const blockDepth = biome.waterOptions.blockDepth
  const numSpawnPoints =
    Math.floor(
      Math.random() *
        (biome.waterOptions.maxSpawnPoints -
          biome.waterOptions.minSpawnPoints +
          1),
    ) + biome.waterOptions.minSpawnPoints

  if (numSpawnPoints > 0) {
    const spawnPoints = Array.from({ length: numSpawnPoints }, () => ({
      i: Math.floor(Math.random() * width * gridIncrements),
      j: Math.floor(Math.random() * length * gridIncrements),
    }))
    // Pick a random starting point
    for (let blockNumber = 0; blockNumber < numBlocks; blockNumber++) {
      const { i, j } = spawnPoints[blockNumber % numSpawnPoints]
      const endLocation = cascadeWater(i, j, segments)
      segments[endLocation.y][endLocation.x].waterDepth += blockDepth
    }
  }
}

export function calculateForestSegments({
  width,
  length,
  gridIncrements,
  segments,
}: {
  width: number
  length: number
  gridIncrements: number
  segments: MapSegment[][]
}): void {
  // TODO: This is not working.
  // Forest need to grow outward from where they are seeded, and need to be seeded in rational locations.
  // Work on the seeding first, then the growth.
}

export function cascade(
  i: number,
  j: number,
  segments: MapSegment[][],
  depth: number,
  maxDepth: number,
  neighborSortFunction: (a: MapSegment, b: MapSegment) => number,
  seekCriteria: (
    destinationSegment: MapSegment,
    currentSegment: MapSegment,
  ) => boolean,
) {
  if (depth > maxDepth) {
    return { x: i, y: j, z: segments[j][i].coordinates.z }
  }
  const sortedNeighboringSegments = getNeighboringSegments(i, j, segments).sort(
    neighborSortFunction,
  )
  let destinationSegment = null
  while (!destinationSegment && sortedNeighboringSegments.length) {
    const nextSegment = sortedNeighboringSegments.pop()!
    if (seekCriteria(nextSegment, segments[j][i])) {
      destinationSegment = nextSegment
    }
  }
  if (destinationSegment) {
    return cascade(
      destinationSegment.coordinates.x,
      destinationSegment.coordinates.y,
      segments,
      depth + 1,
      maxDepth,
      neighborSortFunction,
      seekCriteria,
    )
  }
  return { x: i, y: j, z: segments[j][i].coordinates.z }
}

export function cascadeWater(
  i: number,
  j: number,
  segments: MapSegment[][],
): ThreeDimensionalCoordinates {
  const neighborSortFunction = (a: MapSegment, b: MapSegment) => {
    const aZ = a.coordinates.z + a.waterDepth
    const bZ = b.coordinates.z + b.waterDepth
    if (aZ < bZ) {
      return 1
    } else if (aZ > bZ) {
      return -1
    } else {
      // Return 50% chance of either
      return Math.random() > 0.5 ? 1 : -1
    }
  }
  const seekCriteria = (
    destinationSegment: MapSegment,
    currentSegment: MapSegment,
  ) =>
    destinationSegment.coordinates.z + destinationSegment.waterDepth <=
    currentSegment.coordinates.z + currentSegment.waterDepth
  return cascade(i, j, segments, 0, 100, neighborSortFunction, seekCriteria)
}

// Dummy implementation of calculateZ for completeness
export function calculateZ(
  i: number,
  j: number,
  maxHeight: number,
  minHeight: number,
  averageChangeInElevation: number,
  averageNeighborHeight: number,
): number {
  if (i == 0 && j == 0) {
    return Math.random() * maxHeight
  }
  const heightRange = maxHeight - minHeight
  // Most likely keep the height within 10 feet of the neighbor
  const random = Math.random() * 100
  let newHeight = 0
  if (random >= 20) {
    // 80% chance of a small change
    newHeight =
      averageNeighborHeight +
      (Math.random() * averageChangeInElevation * 2 - averageChangeInElevation)
  } else if (random < 20) {
    // 10% chance of a rise, 10% chance of a fall
    const direction = -1 + Math.round(Math.random()) * 2
    newHeight =
      averageNeighborHeight +
      direction * (Math.random() * averageChangeInElevation * 3)
  }
  // Clamp the height between the min and max
  return Math.min(Math.max(newHeight, minHeight), maxHeight)
}

export const getNeighboringSegments = (
  i: number,
  j: number,
  segments: GeneratingMapSegment[][],
): MapSegment[] => {
  // TODO: There is some optimization that can be done here
  // Under the initial map generation, we know certain segments will not be initialized
  const neighbors: GeneratingMapSegment[] = [
    segments[j]?.[i - 1],
    segments[j - 1]?.[i - 1],
    segments[j - 1]?.[i],
    segments[j - 1]?.[i + 1],
    segments[j]?.[i + 1],
    segments[j + 1]?.[i + 1],
    segments[j + 1]?.[i],
    segments[j + 1]?.[i - 1],
  ]
  return neighbors.filter((segment) => segment && isMapSegment(segment))
}
