import { RandomListItem, Area, Region } from 'types/lists'
import { EnvironmentalCondition } from 'types/environmentalConditions'

export const creatureTags = [
  'amphibian',
  'beast',
  'bird',
  'druid',
  'fey',
  'fish',
  'humanoid',
  'insect',
  'mammal',
  'monstrosity',
  'plant',
  'reptile',
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

export const getOtherSizes = (size: Size, greater: boolean = false): Size[] => {
  const value = sizeValues[size]
  return sizes.filter((s: Size) => {
    const comparison = sizeValues[s] > value
    return greater ? comparison : !comparison
  }) as Size[]
}

export const getSmallerSizes = (size: Size): Size[] => getOtherSizes(size)
export const getLargerSizes = (size: Size): Size[] => getOtherSizes(size, true)

export type CreatureTag = (typeof creatureTags)[number]
export type MoralAlignment = 'good' | 'neutral' | 'evil'
export type LegalAlignment = 'lawful' | 'neutral' | 'chaotic'
export type Size = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'

const factions = ['bullywug', 'party', 'ratfolk'] as const
export type FactionName = (typeof factions)[number]
export const isFactionName = (value: string): value is FactionName =>
  factions.includes(value as FactionName)

export interface AttributeSet {
  tags?: CreatureTag[]
  factions?: FactionName[]
  moralAlignments?: MoralAlignment[]
  legalAlignments?: LegalAlignment[]
  sizes?: Size[]
}

export interface BaseCreatureProps extends AttributeSet {
  xp: number
  url?: string
  max?: number
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
  enemies?: RelationshipCriteria
  allies?: RelationshipCriteria
}

export interface CreatureProps extends BaseCreatureProps {
  enemies: RelationshipCriteria
  allies: RelationshipCriteria
}

export interface BaseRandomCreatureListItem extends RandomListItem {
  props: BaseCreatureProps
}

export interface RandomCreatureListItem extends RandomListItem {
  props: CreatureProps
}

export type BaseRandomCreatureList = BaseRandomCreatureListItem[]
export type RandomCreatureList = RandomCreatureListItem[]

export type RelationshipCriteria = Array<
  (creature: BaseRandomCreatureListItem) => boolean
>
