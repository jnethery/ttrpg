import {
  faGear,
  faArrowPointer,
  faPaintBrush,
  faMountain,
  faEyeDropper,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

const tools = ['gear', 'pointer', 'brush', 'terraform', 'eyedropper'] as const
export type Tool = (typeof tools)[number]

export const toolConfig: Array<{ tool: Tool; icon: IconDefinition }> = [
  {
    tool: 'pointer',
    icon: faArrowPointer,
  },
  {
    tool: 'brush',
    icon: faPaintBrush,
  },
  {
    tool: 'terraform',
    icon: faMountain,
  },
  {
    tool: 'eyedropper',
    icon: faEyeDropper,
  },
  {
    tool: 'gear',
    icon: faGear,
  },
]

export type BrushSettings = {
  size: number
}
