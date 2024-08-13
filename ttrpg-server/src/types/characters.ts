import { z } from 'zod'

import { Ability, abilities, AbilityScoreSchema } from 'types/abilities'
import { races, Race } from 'types/races'

export const CreateCharacterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  level: z.number().int().min(1).max(20),
  race: z.enum(races),
  strength: AbilityScoreSchema,
  dexterity: AbilityScoreSchema,
  constitution: AbilityScoreSchema,
  intelligence: AbilityScoreSchema,
  wisdom: AbilityScoreSchema,
  charisma: AbilityScoreSchema,
})

export const UpdateCharacterSchema = CreateCharacterSchema.partial()

export type Character = {
  name: string
  level: number
  race: Race
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}
export interface DBCharacter extends Character {
  id: string
}

export interface HydratedAbilityScores {
  strengthModded: number
  dexterityModded: number
  constitutionModded: number
  intelligenceModded: number
  wisdomModded: number
  charismaModded: number
}

export type HydratedCharacter = DBCharacter & HydratedAbilityScores

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
  ...baseAbilityScores,
}
