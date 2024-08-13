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

export const AbilityScoreSchema = z.number().int().min(1).max(30)
