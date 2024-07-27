type Coordinates = {
  x: number
  y: number
  z: number
}

type MapSegment = {
  coordinates: Coordinates
}

const isMapSegment = (value: any): value is MapSegment =>
  value && value.coordinates.z !== null

type UninitializedMapSegment = {
  coordinates: { x: null; y: null; z: null }
}

type GeneratingMapSegment = MapSegment | UninitializedMapSegment

type MapMeta = {
  globalMaxHeight: number
  globalMinHeight: number
  width: number
  length: number
  gridIncrements: number
  lateralUnits: string
  verticalUnits: string
}

type MapSegmentsResult = {
  meta: MapMeta
  segments: MapSegment[]
}

// TODO: Return type should be `Promise<HydratedMapSegment[]>`
export const getMapSegments = async (): Promise<MapSegmentsResult> => {
  // For now, send a simple 10x10 mile grid
  const length = 20
  const width = 20
  const globalMaxHeight = 5000 // Going off of 2000 feet average mountain height
  const globalMinHeight = -100 // Going off of 32 feet for average lake depth
  const biomeMinHeight = -64
  const biomeMaxHeight = 3000
  const gridIncrements = 4 // Each square is represented by a quarter mile
  const segments: GeneratingMapSegment[][] = Array.from(
    { length: width * gridIncrements },
    () =>
      Array.from({ length: length * gridIncrements }, () => ({
        coordinates: { x: null, y: null, z: null },
      })),
  )
  const meta: MapMeta = {
    globalMaxHeight,
    globalMinHeight,
    width,
    length,
    gridIncrements,
    lateralUnits: 'miles',
    verticalUnits: 'feet',
  }

  for (let j = 0; j < length * gridIncrements; j++) {
    for (let i = 0; i < width * gridIncrements; i++) {
      const z = calculateZ(i, j, biomeMaxHeight, biomeMinHeight, segments)
      segments[j][i] = {
        coordinates: {
          x: i,
          y: j,
          z,
        },
      }
    }
  }

  return {
    meta,
    segments: (segments as MapSegment[][]).flat(),
  }
}

// Dummy implementation of calculateZ for completeness
function calculateZ(
  i: number,
  j: number,
  maxHeight: number,
  minHeight: number,
  segments: GeneratingMapSegment[][],
): number {
  if (i == 0 && j == 0) {
    return Math.random() * maxHeight
  }
  const heightRange = maxHeight - minHeight
  const neighbors = getNeighboringSegments(i, j, segments)
  const averageNeighborHeight = neighbors.length
    ? neighbors.reduce((acc, neighbor) => acc + neighbor.coordinates.z, 0) /
      neighbors.length
    : 0
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

const getNeighboringSegments = (
  i: number,
  j: number,
  segments: GeneratingMapSegment[][],
): MapSegment[] => {
  let neighbors: GeneratingMapSegment[] = []
  if (i === 0) {
    neighbors.push(segments[j - 1][i])
  } else if (j === 0) {
    neighbors.push(segments[j][i - 1])
  } else {
    neighbors = [
      segments[j][i - 1],
      segments[j - 1][i - 1],
      segments[j - 1][i],
      segments[j - 1][i + 1],
      segments[j][i + 1],
    ]
  }
  return neighbors.filter((segment) => isMapSegment(segment))
}
