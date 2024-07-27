import { z } from 'zod'

export const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const
export const AbilitySchema = z.enum(abilities)
export type Ability = z.infer<typeof AbilitySchema>

export const AbilityScoreSchema = z.number().min(1).max(20)
const AbilityScoresObjectSchema = z.object(
  abilities.reduce(
    (acc, ability) => {
      acc[ability] = AbilityScoreSchema
      return acc
    },
    {} as Record<Ability, z.ZodNumber>,
  ),
)
export const AbilityScoresSchema = AbilityScoresObjectSchema
