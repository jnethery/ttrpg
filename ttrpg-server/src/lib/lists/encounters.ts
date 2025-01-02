import { config } from 'lib/lists'
import {
  getListItem,
  getListItemFromKey,
  evaluateItem,
} from 'lib/lists/evaluate'
import { getContext } from 'lib/lists/context'
import { RandomCreatureListItem, RandomCreatureList } from 'types/creatures'
import { Region, EncounterDifficulty } from 'types/lists'

const regionLevels: Record<Region, number> = {
  'Dragonsbeard Glen': 4,
}
const xpThresholds: Record<number, Record<EncounterDifficulty, number>> = {
  1: {
    easy: 25,
    medium: 50,
    hard: 75,
    deadly: 100,
  },
  2: {
    easy: 50,
    medium: 100,
    hard: 150,
    deadly: 200,
  },
  3: {
    easy: 75,
    medium: 150,
    hard: 225,
    deadly: 400,
  },
  4: {
    easy: 125,
    medium: 250,
    hard: 375,
    deadly: 500,
  },
  5: {
    easy: 250,
    medium: 500,
    hard: 750,
    deadly: 1100,
  },
  6: {
    easy: 300,
    medium: 600,
    hard: 900,
    deadly: 1400,
  },
  7: {
    easy: 350,
    medium: 750,
    hard: 1100,
    deadly: 1700,
  },
  8: {
    easy: 450,
    medium: 900,
    hard: 1400,
    deadly: 2100,
  },
  9: {
    easy: 550,
    medium: 1100,
    hard: 1600,
    deadly: 2400,
  },
  10: {
    easy: 600,
    medium: 1200,
    hard: 1900,
    deadly: 2800,
  },
  11: {
    easy: 800,
    medium: 1600,
    hard: 2400,
    deadly: 3600,
  },
  12: {
    easy: 1000,
    medium: 2000,
    hard: 3000,
    deadly: 4500,
  },
  13: {
    easy: 1100,
    medium: 2200,
    hard: 3400,
    deadly: 5100,
  },
  14: {
    easy: 1250,
    medium: 2500,
    hard: 3800,
    deadly: 5700,
  },
  15: {
    easy: 1400,
    medium: 2800,
    hard: 4300,
    deadly: 6400,
  },
  16: {
    easy: 1600,
    medium: 3200,
    hard: 4800,
    deadly: 7200,
  },
  17: {
    easy: 2000,
    medium: 3900,
    hard: 5900,
    deadly: 8800,
  },
  18: {
    easy: 2100,
    medium: 4200,
    hard: 6300,
    deadly: 9500,
  },
  19: {
    easy: 2400,
    medium: 4900,
    hard: 7300,
    deadly: 10900,
  },
  20: {
    easy: 2800,
    medium: 5700,
    hard: 8500,
    deadly: 12700,
  },
}

const crToXP = {
  0: 10,
  0.125: 25,
  0.25: 50,
  0.5: 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
}

const creatureCategoryToXP: Record<
  number,
  Record<'minion' | 'standard' | 'elite', { min: number; max: number }>
> = {
  1: {
    minion: {
      min: crToXP[0.125],
      max: crToXP[0.125],
    },
    standard: {
      min: crToXP[0.25],
      max: crToXP[0.25],
    },
    elite: {
      min: crToXP[0.5],
      max: crToXP[0.5],
    },
  },
  2: {
    minion: {
      min: crToXP[0.125],
      max: crToXP[0.25],
    },
    standard: {
      min: crToXP[0.5],
      max: crToXP[0.5],
    },
    elite: {
      min: crToXP[1],
      max: crToXP[1],
    },
  },
  3: {
    minion: {
      min: crToXP[0.125],
      max: crToXP[0.25],
    },
    standard: {
      min: crToXP[0.5],
      max: crToXP[0.5],
    },
    elite: {
      min: crToXP[1],
      max: crToXP[2],
    },
  },
  4: {
    minion: {
      min: crToXP[0.25],
      max: crToXP[0.5],
    },
    standard: {
      min: crToXP[1],
      max: crToXP[1],
    },
    elite: {
      min: crToXP[2],
      max: crToXP[3],
    },
  },
  5: {
    minion: {
      min: crToXP[0.5],
      max: crToXP[1],
    },
    standard: {
      min: crToXP[2],
      max: crToXP[2],
    },
    elite: {
      min: crToXP[3],
      max: crToXP[4],
    },
  },
  6: {
    minion: {
      min: crToXP[0.5],
      max: crToXP[1],
    },
    standard: {
      min: crToXP[2],
      max: crToXP[2],
    },
    elite: {
      min: crToXP[3],
      max: crToXP[4],
    },
  },
  7: {
    minion: {
      min: crToXP[0.5],
      max: crToXP[1],
    },
    standard: {
      min: crToXP[2],
      max: crToXP[3],
    },
    elite: {
      min: crToXP[4],
      max: crToXP[5],
    },
  },
  8: {
    minion: {
      min: crToXP[1],
      max: crToXP[2],
    },
    standard: {
      min: crToXP[3],
      max: crToXP[3],
    },
    elite: {
      min: crToXP[4],
      max: crToXP[5],
    },
  },
  9: {
    minion: {
      min: crToXP[1],
      max: crToXP[2],
    },
    standard: {
      min: crToXP[3],
      max: crToXP[4],
    },
    elite: {
      min: crToXP[5],
      max: crToXP[6],
    },
  },
  10: {
    minion: {
      min: crToXP[1],
      max: crToXP[2],
    },
    standard: {
      min: crToXP[3],
      max: crToXP[4],
    },
    elite: {
      min: crToXP[5],
      max: crToXP[7],
    },
  },
  11: {
    minion: {
      min: crToXP[2],
      max: crToXP[3],
    },
    standard: {
      min: crToXP[4],
      max: crToXP[4],
    },
    elite: {
      min: crToXP[5],
      max: crToXP[8],
    },
  },
  12: {
    minion: {
      min: crToXP[2],
      max: crToXP[3],
    },
    standard: {
      min: crToXP[4],
      max: crToXP[5],
    },
    elite: {
      min: crToXP[6],
      max: crToXP[9],
    },
  },
  13: {
    minion: {
      min: crToXP[2],
      max: crToXP[4],
    },
    standard: {
      min: crToXP[5],
      max: crToXP[6],
    },
    elite: {
      min: crToXP[7],
      max: crToXP[10],
    },
  },
  14: {
    minion: {
      min: crToXP[2],
      max: crToXP[4],
    },
    standard: {
      min: crToXP[5],
      max: crToXP[6],
    },
    elite: {
      min: crToXP[7],
      max: crToXP[10],
    },
  },
  15: {
    minion: {
      min: crToXP[3],
      max: crToXP[4],
    },
    standard: {
      min: crToXP[5],
      max: crToXP[7],
    },
    elite: {
      min: crToXP[8],
      max: crToXP[11],
    },
  },
  16: {
    minion: {
      min: crToXP[3],
      max: crToXP[4],
    },
    standard: {
      min: crToXP[5],
      max: crToXP[7],
    },
    elite: {
      min: crToXP[8],
      max: crToXP[11],
    },
  },
  17: {
    minion: {
      min: crToXP[3],
      max: crToXP[5],
    },
    standard: {
      min: crToXP[6],
      max: crToXP[8],
    },
    elite: {
      min: crToXP[9],
      max: crToXP[13],
    },
  },
  18: {
    minion: {
      min: crToXP[3],
      max: crToXP[5],
    },
    standard: {
      min: crToXP[6],
      max: crToXP[8],
    },
    elite: {
      min: crToXP[9],
      max: crToXP[13],
    },
  },
  19: {
    minion: {
      min: crToXP[4],
      max: crToXP[6],
    },
    standard: {
      min: crToXP[7],
      max: crToXP[9],
    },
    elite: {
      min: crToXP[10],
      max: crToXP[14],
    },
  },
  20: {
    minion: {
      min: crToXP[4],
      max: crToXP[6],
    },
    standard: {
      min: crToXP[7],
      max: crToXP[10],
    },
    elite: {
      min: crToXP[11],
      max: crToXP[15],
    },
  },
}

const getRegionLevel = (): number => {
  const regions = getContext()?.regions ?? ['Dragonsbeard Glen']
  // Get the highest level region
  const regionLevelsArray = regions.map((region) => regionLevels[region])
  return Math.max(...regionLevelsArray)
}

const getCreatureCategoryToXPForLevel = (): Record<
  'minion' | 'standard' | 'elite',
  { min: number; max: number }
> => {
  let regionLevel = getRegionLevel()
  let xpRanges: Record<
    'minion' | 'standard' | 'elite',
    { min: number; max: number }
  > = {
    minion: { min: 0, max: 0 },
    standard: { min: 0, max: 0 },
    elite: { min: 0, max: 0 },
  }

  // Descend the region levels until we find a threshhold
  while (regionLevel > 0) {
    if (creatureCategoryToXP[regionLevel]) {
      xpRanges = creatureCategoryToXP[regionLevel]
      break
    }
    regionLevel--
  }
  return xpRanges
}

export const getXPThresholdForParty = (): Record<
  EncounterDifficulty,
  number
> => {
  let regionLevel = getRegionLevel()
  let threshold: Record<EncounterDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
    deadly: 0,
  }

  // Descend the region levels until we find a threshhold
  while (regionLevel > 0) {
    if (xpThresholds[regionLevel]) {
      threshold = xpThresholds[regionLevel]
      break
    }
    regionLevel--
  }
  return threshold
}

/*
const xpMultipliers = {
  0: 1,
  1: 1,
  2: 1.5,
  3: 2,
  4: 2,
  7: 2.5,
  11: 3,
  15: 4,
}
  */

const getXPMultiplier = (numEnemies: number): number => {
  if (numEnemies >= 15) {
    return 4
  } else if (numEnemies >= 11) {
    return 3
  } else if (numEnemies >= 7) {
    return 2.5
  } else if (numEnemies >= 3) {
    return 2
  } else if (numEnemies >= 2) {
    return 1.5
  }
  return 1
}

const getMultipliedXP = (xp: number, numEnemies: number): number => {
  return xp * getXPMultiplier(numEnemies)
}

const getEnemy = (
  creature: RandomCreatureListItem,
): RandomCreatureListItem | null => {
  // Get the creature's enemies
  const enemyFilters = creature.props.enemies
  if (enemyFilters.length > 0) {
    // Get a random enemy
    const enemyList = config.creature.filter((item) => {
      return enemyFilters.some((filter) => filter(item))
    })
    return getListItem(enemyList) as RandomCreatureListItem | null
  }
  return null
}

const getAlliesList = (
  creature: RandomCreatureListItem,
): RandomCreatureListItem[] => {
  // Get the creature's allies
  const allyFilters = creature.props.allies
  let alliesList: RandomCreatureList = []
  if (allyFilters.length > 0) {
    // Get all allies
    alliesList = config.creature
      .filter((item) => {
        return item.value !== creature.value
      })
      .filter((item) => {
        return allyFilters.some((filter) => filter(item))
      }) as RandomCreatureListItem[]
  }

  // Add self to the list
  alliesList.push(creature)

  return alliesList
}

const filterAlliesByXpRange = (
  allies: RandomCreatureListItem[],
  xpRange: { min: number; max: number },
): RandomCreatureListItem[] => {
  return allies.filter((ally) => {
    const xp = ally.props.xp
    return xp >= xpRange.min && xp <= xpRange.max
  })
}

const addCreatureToEncounter = (
  creatureList: RandomCreatureListItem[],
  xpRange: { min: number; max: number },
  combatEncounter: CombatEncounter,
  xpLimit: number,
): boolean => {
  if (creatureList.length > 0 && combatEncounter.xp + xpRange.min <= xpLimit) {
    const creatureItem = getListItem(creatureList) as RandomCreatureListItem
    if (creatureItem) {
      const name = evaluateItem(creatureItem)
      if (!combatEncounter.creatures[name]) {
        combatEncounter.creatures[name] = {
          creature: creatureItem,
          count: 0,
        }
      }
      combatEncounter.creatures[name].count++
      combatEncounter.xp += creatureItem.props.xp
      combatEncounter.count++
      return true
    }
  }
  return false
}

interface CombatEncounter {
  creatures: Record<
    string,
    {
      creature: RandomCreatureListItem
      count: number
    }
  >
  xp: number
  count: number
}
const getAllies = (creature: RandomCreatureListItem, xpLimit: number) => {
  const alliesList = getAlliesList(creature)
  const xpRanges = getCreatureCategoryToXPForLevel()
  // There should be 0-8 minions, 0-4 standard, and 0-2 elite.
  // Based on the xpRanges, we can split the allies up into these categories.
  const lowTierMinions = filterAlliesByXpRange(alliesList, {
    min: 0,
    max: xpRanges.minion.min,
  })
  const normalMinions = filterAlliesByXpRange(alliesList, xpRanges.minion)

  // If the normalMinions list is empty, we can use the lowTierMinions list.
  const minions = normalMinions.length > 0 ? normalMinions : lowTierMinions
  const standards = filterAlliesByXpRange(alliesList, xpRanges.standard)
  const elites = filterAlliesByXpRange(alliesList, xpRanges.elite)

  // Work from the bottom category up, trying to fill the xpLimit
  const combatEncounter: CombatEncounter = {
    creatures: {},
    xp: 0,
    count: 0,
  }

  let attemptsLeft = 100
  while (
    attemptsLeft > 0 &&
    combatEncounter.count < 12 && // We don't want to go over 12 creatures, even if the xp is under the limit.
    getMultipliedXP(combatEncounter.xp, combatEncounter.count) < xpLimit
  ) {
    let addedMinion,
      addedStandard = true
    addedMinion = addCreatureToEncounter(
      minions,
      xpRanges.minion,
      combatEncounter,
      xpLimit,
    )
    if (!addedMinion) {
      addedStandard = addCreatureToEncounter(
        standards,
        xpRanges.standard,
        combatEncounter,
        xpLimit,
      )
    }
    if (!addedStandard) {
      addCreatureToEncounter(elites, xpRanges.elite, combatEncounter, xpLimit)
    }
    attemptsLeft--
  }

  return combatEncounter
}

export const xpToEncounterDifficulty = (xp: number): EncounterDifficulty => {
  const { numPlayers, avgLevel } = getContext()?.party || {
    numPlayers: 4,
    avgLevel: 4,
  }
  // Find the closest xp threshold
  const threshold = xpThresholds[avgLevel]
  const xpPerPlayer = xp / numPlayers
  if (xpPerPlayer <= threshold.easy) {
    return 'easy'
  } else if (xpPerPlayer <= threshold.medium) {
    return 'medium'
  } else if (xpPerPlayer <= threshold.hard) {
    return 'hard'
  }
  return 'deadly'
}

// TODO: Fill out the generateEncounter function from the old code.
// TODO: Make this return an object with the encounter details instead of a string
// TODO: Add a check to see if an enemy is in combat already to suppress the `doing` calculation a second time.
export const generateEncounter = (
  creature: RandomCreatureListItem,
  xpLimit: number,
  encounterDifficulty: EncounterDifficulty,
  suppressAction: boolean = false,
): string => {
  const allies = getAllies(creature, xpLimit)

  const creaturesString = Object.keys(allies.creatures)
    .map((creature) => {
      const { count } = allies.creatures[creature]
      return `${count} ${creature}(s)`
    })
    .join(', ')

  // TODO: Convert to a function?
  const { doing, evaluatedAction } = (() => {
    if (suppressAction) {
      return { doing: null, evaluatedAction: '' }
    }
    const doing = getListItemFromKey('doing')
    const evaluatedAction = doing ? evaluateItem(doing) : ''
    return { doing, evaluatedAction }
  })()

  const doingString = doing ? `<li>they are ${evaluatedAction}</li>` : ''
  const combatActions = ['hunting', 'fighting', 'fleeing'] as const

  let enemyString = ''
  if (
    combatActions.includes(evaluatedAction as (typeof combatActions)[number])
  ) {
    // Get one of the creature's enemies
    const enemy = getEnemy(creature)
    // What a pacifist. He has no enemies. Let's generate another encounter for him.
    // TODO: Run through the possible list of creatures and find one whose enemy criteria fits.
    if (!enemy) {
      return generateEncounter(creature, xpLimit, encounterDifficulty)
    }
    enemyString = generateEncounter(enemy, xpLimit, encounterDifficulty, true)
  }

  return `
    <ul>
      <li>${creaturesString}</li>
      <li>They are ${xpToEncounterDifficulty(allies.xp)} (${allies.xp} XP total, ${Math.round(allies.xp / (getContext()?.party?.numPlayers ?? 4))} XP each)</li>
      ${doingString}
    </ul>
    ${enemyString}
  `
}
