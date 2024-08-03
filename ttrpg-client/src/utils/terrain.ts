import { MapSegment } from 'types/mapSegments'
import { Terrain } from 'types/terrains'
import { Color } from 'types/colors'
import { shiftColorLightness } from 'utils/colors'

export const calculateTerrainColor = (
  grayScaleColor: number,
  terrain: Terrain,
  segmentOptions: {
    waterDepth: number
  },
): Color => {
  if (segmentOptions.waterDepth > 0) {
    const baseColor: Color = [28, 54, 133]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'rock') {
    const baseColor: Color = [143, 141, 123]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'grass') {
    const baseColor: Color = [78, 143, 61]
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'forest') {
    const baseColor: Color = [51, 84, 35]
    return shiftColorLightness(baseColor, grayScaleColor)
  }
  return [grayScaleColor, grayScaleColor, grayScaleColor]
}

export const calculateTerrainChange = (
  origin: MapSegment,
  destination: MapSegment,
  interim: MapSegment[],
) => {
  let minElevation = origin.coordinates.z
  let maxElevation = origin.coordinates.z
  let previousElevation = null
  let minElevationChange = 0
  let maxElevationChange = 0

  for (const segment of [origin, ...interim, destination]) {
    if (segment.coordinates.z < minElevation) {
      minElevation = segment.coordinates.z
    }
    if (segment.coordinates.z > maxElevation) {
      maxElevation = segment.coordinates.z
    }
    if (previousElevation) {
      const elevationChange = segment.coordinates.z - previousElevation
      if (elevationChange < minElevationChange) {
        minElevationChange = elevationChange
      }
      if (elevationChange > maxElevationChange) {
        maxElevationChange = elevationChange
      }
    }
    previousElevation = segment.coordinates.z
  }
  return {
    minElevation,
    maxElevation,
    minElevationChange,
    maxElevationChange,
  }
}
