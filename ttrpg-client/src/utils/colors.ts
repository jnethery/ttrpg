import { Terrain } from 'types/terrains'
import { Color } from 'types/colors'

export const calculateGrayscaleColor = (normalizedValue: number): Color => {
  const grayValue = Math.round(normalizedValue * 255)

  return [grayValue, grayValue, grayValue]
}

export const shiftColorLightness = (
  color: Color,
  lightness: number,
): [number, number, number] => {
  // Blend the grayValue with the base color
  const red = Math.round(color[0] * (lightness / 255))
  const green = Math.round(color[1] * (lightness / 255))
  const blue = Math.round(color[2] * (lightness / 255))
  return [red, green, blue]
}

export const calculateTerrainColor = (
  grayScaleColor: number,
  terrain: Terrain,
  segmentOptions?: {
    waterDepth?: number
  },
): Color => {
  if (
    segmentOptions &&
    'waterDepth' in segmentOptions &&
    typeof segmentOptions.waterDepth === 'number' &&
    segmentOptions.waterDepth > 0
  ) {
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
