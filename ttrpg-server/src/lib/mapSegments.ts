import {
  Coordinates,
  GeneratingMapSegment,
  MapSegment,
  isMapSegment,
} from 'types/mapSegments'

export function calculateBaseMapSegments({
  width,
  length,
  gridIncrements,
  biomeMaxHeight,
  biomeMinHeight,
  segments,
}: {
  width: number
  length: number
  gridIncrements: number
  biomeMaxHeight: number
  biomeMinHeight: number
  segments: GeneratingMapSegment[][]
}): void {
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
        biomeMaxHeight,
        biomeMinHeight,
        averageNeighborHeight,
      )
      segments[j][i] = {
        coordinates: {
          x: i,
          y: j,
          z,
        },
        waterDepth: 0,
        terrain: 'rock',
      }
    }
  }
}

export function calculateWaterSegments({
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
  // Place random water tiles and let them run downhill until they stop
  const numBlocks = 10000
  const blockDepth = 10
  const numSpawnPoints = 2
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
  // Place random forest tiles and let them run downhill until they find water
  const numBlocks = 20000
  const numSpawnPoints = 10
  const spawnPoints = Array.from({ length: numSpawnPoints }, () => ({
    i: Math.floor(Math.random() * width * gridIncrements),
    j: Math.floor(Math.random() * length * gridIncrements),
  }))
  // Pick a random starting point
  for (let blockNumber = 0; blockNumber < numBlocks; blockNumber++) {
    const { i, j } = spawnPoints[blockNumber % numSpawnPoints]
    const endLocation = cascadeForest(i, j, segments)
    segments[endLocation.y][endLocation.x].terrain = 'forest'
  }
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
): Coordinates {
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

export function cascadeForest(
  i: number,
  j: number,
  segments: MapSegment[][],
): Coordinates {
  const neighborSortFunction = (a: MapSegment, b: MapSegment) => {
    const aZ = a.coordinates.z
    const bZ = b.coordinates.z
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
  ) => destinationSegment.coordinates.z <= currentSegment.coordinates.z
  return cascade(i, j, segments, 0, 100, neighborSortFunction, seekCriteria)
}

// Dummy implementation of calculateZ for completeness
export function calculateZ(
  i: number,
  j: number,
  maxHeight: number,
  minHeight: number,
  averageNeighborHeight: number,
): number {
  if (i == 0 && j == 0) {
    return Math.random() * maxHeight
  }
  const heightRange = maxHeight - minHeight
  // Most likely keep the height within 10 feet of the neighbor
  const random = Math.random() * 100
  let newHeight = 0
  if (random >= 30) {
    // 70% chance of a small change
    newHeight = averageNeighborHeight + (Math.random() * 20 - 10)
  } else if (random < 30) {
    // 10% chance of a rise, 10% chance of a fall
    const direction = -1 + Math.round(Math.random()) * 2
    newHeight =
      averageNeighborHeight + (direction * (Math.random() * heightRange)) / 10
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
