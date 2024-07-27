import { Subrace, Race } from 'types/races'
import { Ability } from 'types/abilities'

type RaceSubraceCombinations = {
  [R in Race]: Partial<Record<Subrace<R>, number>> | number
}

const racialModifiers: Record<Ability, Partial<RaceSubraceCombinations>> = {
  strength: {
    dwarf: {
      mountain: 2,
    },
    dragonborn: 2,
    halfOrc: 2,
    human: 1,
  },
  dexterity: {
    elf: 2,
    halfling: 2,
    gnome: {
      forest: 1,
    },
    human: 1,
  },
  constitution: {
    dwarf: 2,
    halfling: {
      stout: 1,
    },
    gnome: {
      rock: 1,
    },
    halfOrc: 1,
    human: 1,
  },
  intelligence: {
    elf: {
      high: 1,
    },
    gnome: 2,
    tiefling: 1,
    human: 1,
  },
  wisdom: {
    dwarf: {
      hill: 1,
    },
    elf: {
      wood: 1,
    },
    human: 1,
  },
  charisma: {
    elf: {
      dark: 1,
    },
    halfElf: 2,
    halfling: {
      lightfoot: 1,
    },
    dragonborn: 1,
    tiefling: 2,
    human: 1,
  },
}

export const getAbilityRacialModifier = <R extends Race>(
  ability: Ability,
  race: R,
  subrace?: Subrace<R>,
): number => {
  const racialModifier = racialModifiers[ability][race]
  if (typeof racialModifier === 'undefined') {
    return 0
  } else if (typeof racialModifier === 'number') {
    return racialModifier
  } else if (
    typeof racialModifiers[ability][race] === 'object' &&
    typeof subrace !== 'undefined'
  ) {
    const subracialModifier = racialModifiers[ability][race][subrace]
    if (typeof subracialModifier === 'number') {
      return subracialModifier
    }
  }
  return 0
}

export const getAbilityScoreModifier = (abilityScore: number): number => {
  return Math.floor((abilityScore - 10) / 2)
}
