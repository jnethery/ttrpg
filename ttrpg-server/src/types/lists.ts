import { EnvironmentalCondition } from 'types/environmentalConditions'

export const DEFAULT_KEY = 'main'
export type ValueFunction = () => string
export type ProbabilityFunction = () => number
export interface RandomListItem {
  value: string | ValueFunction
  probability: number | ProbabilityFunction
  // TODO: Can we tighten down the types here?
  props?: any
  debug?: boolean
}
export type RandomList = RandomListItem[]

const difficulties = ['easy', 'medium', 'hard', 'deadly']
export type EncounterDifficulty = (typeof difficulties)[number]

const areas = [
  'arctic',
  'coastal',
  'cursed',
  'desert',
  'dungeon',
  'forest',
  'grassland',
  'hill',
  'mountain',
  'swamp',
  'underdark',
  'underwater',
  'urban',
] as const
export type Area = (typeof areas)[number]
export type Region = 'Dragonsbeard Glen'
export interface ListContext {
  areas?: Area[]
  regions?: Region[]
  conditions?: EnvironmentalCondition[]
  party?: {
    avgLevel: number
    numPlayers: number
    // This is the multiplier for the party's CR.
    // If encounters are too easy, the multiplier can be increased,
    // and if they are too hard, it can be decreased.
    crMultiplier: number
  }
}
