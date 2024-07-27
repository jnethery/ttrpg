import {
  MapSegment,
  MapSegmentsResult,
  MapMeta,
  GeneratingMapSegment,
} from 'types/mapSegments'
import {
  calculateBaseMapSegments,
  calculateWaterSegments,
  calculateForestSegments,
} from 'lib/mapSegments'

// TODO: Return type should be `Promise<HydratedMapSegment[]>`
export const getMapSegments = async (): Promise<MapSegmentsResult> => {
  // TODO: Move all this to a config file
  const length = 20
  const width = 20
  const globalMaxHeight = 5000 // Going off of average mountain height
  const globalMinHeight = -500 // Going off of 32 feet for average lake depth
  const biomeMinHeight = -200
  const biomeMaxHeight = 3000
  const gridIncrements = 4 // Each square is represented by a quarter mile
  const meta: MapMeta = {
    globalMaxHeight,
    globalMinHeight,
    width,
    length,
    gridIncrements,
    lateralUnits: 'miles',
    verticalUnits: 'feet',
  }

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
  calculateBaseMapSegments({
    width,
    length,
    gridIncrements,
    biomeMaxHeight,
    biomeMinHeight,
    segments,
  })

  calculateWaterSegments({
    width,
    length,
    gridIncrements,
    segments: segments as MapSegment[][],
  })

  // calculateForestSegments({
  //   width,
  //   length,
  //   gridIncrements,
  //   segments: segments as MapSegment[][],
  // })

  return {
    meta,
    segments: (segments as MapSegment[][]).flat(),
  }
}
