import { Terrain } from 'types/terrains'
import { Color, colorConfig } from 'types/colors'

export const rgbStringToColor = (rgb: string): Color => {
  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((value) => parseInt(value))

  return [r, g, b]
}

export const colorToRGBString = (color: Color, alpha: number): string => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
}

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
    const baseColor: Color = rgbStringToColor(colorConfig.water.rgbString)
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'rock') {
    const baseColor: Color = rgbStringToColor(colorConfig.rock.rgbString)
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'grass') {
    const baseColor: Color = rgbStringToColor(colorConfig.grass.rgbString)
    return shiftColorLightness(baseColor, grayScaleColor)
  } else if (terrain === 'forest') {
    const baseColor: Color = rgbStringToColor(colorConfig.forest.rgbString)
    return shiftColorLightness(baseColor, grayScaleColor)
  }
  return [grayScaleColor, grayScaleColor, grayScaleColor]
}
