import { z } from 'zod'
import { creature } from 'lib/lists/arrays/creature'
import {
  EnvironmentalCondition,
  conditions,
} from 'types/environmentalConditions'

export const DEFAULT_KEY = 'main'
export type Value = string | ValueFunction
export type ValueFunction = (props?: any) => Promise<string>
export type ProbabilityFunction = () => number
export interface RandomListItem {
  value: Value
  probability: number | ProbabilityFunction
  // TODO: Can we tighten down the types here?
  props?: any
  debug?: boolean
}
export type RandomList = RandomListItem[]

const difficulties = ['easy', 'medium', 'hard', 'deadly']
export type EncounterDifficulty = (typeof difficulties)[number]

export const areas = [
  'arctic',
  'coastal',
  'cursed',
  'desert',
  'dungeon',
  'fire',
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

export const regions = [
  'Dreadmire Swamp', // The home of the ratfolk and bullywugs
  'Veilwood Hollow', // The home of the druids and the verdant sepulcher
  'Verdant Sepulcher', // The sacred burial ground of the druids
  'Whispering Glade', // The home of the fey's court of illusions
  'Shadewood Weald', // The dark forest surrounding the ruins of Khazgarad, one of the 6 temples
  'Khazgarad Ruins', // The ruins of the temple of the prophecy of the shadow dragon
  'Drakknarbuk Mine', // The dwarven mine, overrun by goblins
  'Blighted Heart', // The heart of the forest
  'Grimmhold', // The ratfolk city
] as const
export type Region = (typeof regions)[number]

export interface Party {
  avgLevel: number
  numPlayers: number
  // This is the multiplier for the party's CR.
  // If encounters are too easy, the multiplier can be increased,
  // and if they are too hard, it can be decreased.
  crMultiplier: number
}
export interface ListContext {
  useAI?: boolean
  creatureName?: string
  areas?: Area[]
  regions?: Region[]
  conditions?: EnvironmentalCondition[]
  party?: Party
}

export const ListContextRequestSchema = z.object({
  useAI: z.string().optional(),
  creatureName: z.string().optional(),
  areas: z.string().optional(),
  regions: z.string().optional(),
  conditions: z.string().optional(),
  heat: z.string().optional(),
  precipitationAmount: z.string().optional(),
  precipitationSize: z.string().optional(),
  party: z.string().optional(),
})

export const ListContextSchema = z.object({
  useAI: z.boolean().optional(),
  creatureName: z.string().optional(),
  areas: z.array(z.enum(areas)).optional(),
  regions: z.array(z.enum(regions)).optional(),
  conditions: z.array(z.enum(conditions)).optional(),
  party: z
    .object({
      avgLevel: z.number(),
      numPlayers: z.number(),
      crMultiplier: z.number(),
    })
    .optional(),
})
