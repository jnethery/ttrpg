import {
  MapSegment,
  MapData,
  MapMeta,
  GeneratingMapSegment,
} from 'types/mapSegments'
import { Biome } from 'types/biomes'
import {
  calculateBaseMapSegments,
  calculateWaterSegments,
} from 'lib/mapSegments'
import { twoDimensionalSegmentArrayToDictionary } from 'utils/mapSegments'

export const getMapSegments = async (biome: Biome): Promise<MapData> => {
  // TODO: Move all this to a config file, and allow as REST params in the API
  const length = 20
  const width = 20
  const globalMaxHeight = 2000 // Going off of average mountain height
  const globalMinHeight = -2000 // Going off of 32 feet for average lake depth
  const gridIncrements = 4 // Each square is represented by a quarter mile

  const segments: GeneratingMapSegment[][] = Array.from(
    { length: width * gridIncrements },
    () =>
      Array.from({ length: length * gridIncrements }, () => ({
        coordinates: { x: null, y: null, z: null },
        waterDepth: 0,
        terrain: 'rock',
      })),
  )

  // Generate the height map
  const { minHeight: localMinHeight, maxHeight: localMaxHeight } =
    calculateBaseMapSegments({
      width,
      length,
      gridIncrements,
      biome,
      segments,
    })

  calculateWaterSegments({
    width,
    length,
    gridIncrements,
    biome,
    segments: segments as MapSegment[][],
  })

  const meta: MapMeta = {
    localMinHeight,
    localMaxHeight,
    globalMaxHeight,
    globalMinHeight,
    width,
    length,
    gridIncrements,
    lateralUnits: 'miles',
    verticalUnits: 'feet',
  }

  return {
    meta,
    segments: twoDimensionalSegmentArrayToDictionary(
      segments as MapSegment[][],
    ),
  }
}
