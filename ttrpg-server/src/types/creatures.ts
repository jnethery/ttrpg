import { RandomListItem, Area, Region } from 'types/lists'
import { EnvironmentalCondition } from 'types/environmentalConditions'

export const creatureTags = [
  'aberration',
  'amphibian',
  'aquatic',
  'arachnid',
  'beast',
  'beholder',
  'bird',
  'celestial',
  'construct',
  'criminal',
  'draconic',
  'druid',
  'dwarf',
  'elemental',
  'elf',
  'fey',
  'fiend',
  'fish',
  'gnome',
  'goblinoid',
  'humanoid',
  'insect',
  'lawEnforcement',
  'mammal',
  'mercenary',
  'monstrosity',
  'ooze',
  'orc',
  'plant',
  'ranger',
  'reptile',
  'shapeshifter',
  'swarm',
  'undead',
] as const

export const sizes = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
] as const

export const sizeValues: Record<Size, number> = {
  tiny: 1,
  small: 2,
  medium: 3,
  large: 4,
  huge: 5,
  gargantuan: 6,
} as const

export const getOtherSizes = (
  size: Size,
  comparator: 'lt' | 'lte' | 'gt' | 'gte',
): Size[] => {
  const value = sizeValues[size]
  return sizes.filter((s: Size) => {
    if (comparator === 'lt') {
      return sizeValues[s] < value
    } else if (comparator === 'lte') {
      return sizeValues[s] <= value
    } else if (comparator === 'gt') {
      return sizeValues[s] > value
    } else if (comparator === 'gte') {
      return sizeValues[s] >= value
    }
    return false
  }) as Size[]
}

export const getSizesLt = (size: Size): Size[] => getOtherSizes(size, 'lt')
export const getSizesLte = (size: Size): Size[] => getOtherSizes(size, 'lte')
export const getSizesGt = (size: Size): Size[] => getOtherSizes(size, 'gt')
export const getSizesGte = (size: Size): Size[] => getOtherSizes(size, 'gte')

export type CreatureTag = (typeof creatureTags)[number]
export type MoralAlignment = 'good' | 'neutral' | 'evil'
export type LegalAlignment = 'lawful' | 'neutral' | 'chaotic'
export type Size = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'

export interface AttributeSet {
  tags?: CreatureTag[]
  moralAlignments?: MoralAlignment[]
  legalAlignments?: LegalAlignment[]
  sizes?: Size[]
}

export interface BaseCreatureProps extends AttributeSet {
  xp: number
  url?: string
  areas?: Array<{
    area: Area
    probability: number
  }>
  regions?: Array<{
    region: Region
    probability: number
  }>
  conditions?: Array<{
    condition: EnvironmentalCondition
    probability: number
  }>
  predisposition?: {
    distant: number // -50 to 50, 0 is neutral, 50 is friendly, -50 is hostile
    nearby: number
  }
  enemies: RelationshipCriteria
  allies: RelationshipCriteria
  behavior: {
    idle: string
    eating: string
    hiding: string
    tactics: string
  }
}

export interface BaseRandomCreatureListItem extends RandomListItem {
  props: BaseCreatureProps
}

export interface RandomCreatureListItem extends RandomListItem {
  props: BaseCreatureProps
}

export type BaseRandomCreatureList = BaseRandomCreatureListItem[]
export type RandomCreatureList = RandomCreatureListItem[]

export type RelationshipCriteria = Array<
  (creature: BaseRandomCreatureListItem) => Promise<boolean>
>
