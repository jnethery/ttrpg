import { Ability } from 'types/abilities'
import { DBCharacter, HydratedCharacter } from 'types/characters'
import { Race } from 'types/races'
import { getAbilityRacialModifier } from 'utils/modifiers'

export const hydrateAbilityScores = (
  character: DBCharacter,
): Record<Ability, number> => {
  return Object.entries(character.baseAbilityScores).reduce(
    (acc, [key, value]) => {
      const race = character.race as Race
      const ability = key as Ability
      const baseValue = value
      const racialModifier = getAbilityRacialModifier<typeof race>(
        ability,
        character.race,
      )
      acc[key as Ability] = baseValue + racialModifier
      return acc
    },
    {} as Record<Ability, number>,
  )
}

export const hydrateDBCharacter = (
  character: DBCharacter,
): HydratedCharacter => {
  return {
    ...character,
    abilityScores: hydrateAbilityScores(character),
  }
}
