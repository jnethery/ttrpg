import { z } from 'zod'

import { Ability, abilities, AbilityScoreSchema } from 'types/abilities'
import { races, Race } from 'types/races'
import { Language, languages } from 'types/languages'

export const CreateCharacterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  level: z.number().int().min(1).max(20),
  experience: z.number().int().min(0),
  race: z.enum(races),
  languages: z.array(z.enum(languages)),
  hitPoints: z.number().int().min(0),
  tempHitPoints: z.number().int().min(0),
  maxHitPoints: z.number().int().min(0),
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
  experience: number
  race: Race
  languages: Language[]
  hitPoints: number
  tempHitPoints: number
  maxHitPoints: number
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

export const HydratedCharacterSchema = CreateCharacterSchema.extend({
  id: z.string(),
  strengthModded: z.number(),
  dexterityModded: z.number(),
  constitutionModded: z.number(),
  intelligenceModded: z.number(),
  wisdomModded: z.number(),
  charismaModded: z.number(),
  proficiencyBonus: z.number(),
  baseSpeed: z.number(),
})

export type HydratedCharacter = DBCharacter &
  HydratedAbilityScores & {
    proficiencyBonus: number
    baseSpeed: number
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
  languages: ['common'],
  experience: 0,
  hitPoints: 10,
  maxHitPoints: 10,
  tempHitPoints: 0,
  ...baseAbilityScores,
}
