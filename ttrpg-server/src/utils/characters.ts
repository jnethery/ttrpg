import { abilities } from 'types/abilities'
import {
  DBCharacter,
  HydratedAbilityScores,
  HydratedCharacter,
} from 'types/characters'
import { Language } from 'types/languages'
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

export const getProficiencyBonus = (level: number): number => {
  return Math.ceil(level / 4) + 1
}

export const getBaseLanguages = (race: Race): Language[] => {
  switch (race) {
    case 'dwarf':
      return ['common', 'dwarvish']
    case 'elf':
    case 'halfElf':
      return ['common', 'elvish']
    case 'halfOrc':
      return ['common', 'orc']
    case 'tiefling':
      return ['common', 'infernal']
    case 'halfling':
      return ['common', 'halfling']
    case 'gnome':
      return ['common', 'gnomish']
    case 'dragonborn':
      return ['common', 'draconic']
    default:
      return ['common']
  }
}

export const getBaseSpeed = (race: Race) => {
  switch (race) {
    case 'dwarf':
      return 25
    case 'halfling':
      return 25
    case 'gnome':
      return 25
    default:
      return 30
  }
}

export const hydrateDBCharacter = (
  character: DBCharacter,
): HydratedCharacter => {
  return {
    ...character,
    id: character.id.toString(),
    proficiencyBonus: getProficiencyBonus(character.level),
    experience: 0, // TODO: Remove this once migration is run
    languages: [...[], ...getBaseLanguages(character.race)], // TODO: Remove this once migration is run. Need to create an enum or something.
    baseSpeed: getBaseSpeed(character.race),
    ...hydrateAbilityScores(character),
  }
}
