import { z } from 'zod'

import { Ability, abilities, AbilityScoresSchema } from 'types/abilities'
import { races, Race } from 'types/races'

export const CreateCharacterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  level: z.number().int().min(1).max(20),
  race: z.enum(races),
  baseAbilityScores: AbilityScoresSchema,
})
export const UpdateCharacterSchema = CreateCharacterSchema.extend({
  baseAbilityScores: AbilityScoresSchema.partial(),
}).partial()

export type Character = {
  name: string
  level: number
  race: Race
  baseAbilityScores: Record<Ability, number>
}
export interface DBCharacter extends Character {
  id: string
}
export interface HydratedCharacter extends DBCharacter {
  abilityScores: Record<Ability, number>
}

const baseAbilityScores = abilities.reduce(
  (acc, index) => {
    acc[index] = 10
    return acc
  },
  {} as Record<Ability, number>,
)
export const CHARACTER_TEMPLATE: Character = {
  name: '',
  race: 'human',
  level: 1,
  baseAbilityScores,
}
