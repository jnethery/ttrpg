export type Color = [r: number, g: number, b: number]

const colorNames = [
  'primary',
  'water',
  'rock',
  'grass',
  'forest',
  'dark',
  'light',
  'gray',
  'panel',
] as const
export type ColorName = (typeof colorNames)[number]

// TODO: See about adding as much of this as possible to the theme
export const colorConfig: Record<
  ColorName,
  {
    rgbString: string
  }
> = {
  primary: {
    rgbString: 'rgb(255, 242, 0)',
  },
  water: {
    rgbString: 'rgb(28, 54, 133)',
  },
  rock: {
    rgbString: 'rgb(143, 141, 123)',
  },
  grass: {
    rgbString: 'rgb(78, 143, 61)',
  },
  forest: {
    rgbString: 'rgb(51, 84, 35)',
  },
  dark: {
    rgbString: 'rgb(0, 0, 0)',
  },
  light: {
    rgbString: 'rgb(255, 255, 255)',
  },
  panel: {
    rgbString: 'rgb(84, 84, 84)',
  },
  gray: {
    rgbString: 'rgb(128, 128, 128)',
  },
}
