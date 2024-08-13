import { abilities } from 'types/abilities'
import {
  DBCharacter,
  HydratedAbilityScores,
  HydratedCharacter,
} from 'types/characters'
import { Race } from 'types/races'
import { getAbilityRacialModifier } from 'utils/modifiers'

export const hydrateAbilityScores = (
  character: DBCharacter,
): HydratedAbilityScores => {
  let hydratedCharacter: HydratedAbilityScores = {} as HydratedAbilityScores
  for (const ability of abilities) {
    const race = character.race as Race
    const baseValue = character[ability]
    const racialModifier = getAbilityRacialModifier<typeof race>(
      ability,
      character.race,
    )
    hydratedCharacter[`${ability}Modded`] = baseValue + racialModifier
  }
  return hydratedCharacter
}

export const hydrateDBCharacter = (
  character: DBCharacter,
): HydratedCharacter => {
  return {
    ...character,
    id: character.id.toString(),
    ...hydrateAbilityScores(character),
  }
}
