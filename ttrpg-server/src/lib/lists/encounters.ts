import OpenAI from 'openai'

import { config } from 'lib/lists'
import {
  getListItem,
  getListItemFromKey,
  evaluateItem,
} from 'lib/lists/evaluate'
import { getContext } from 'lib/lists/context'
import { RandomCreatureListItem, RandomCreatureList } from 'types/creatures'
import { Region, EncounterDifficulty } from 'types/lists'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const regionLevels: Record<Region, number> = {
  'Dreadmire Swamp': 4,
  Grimmhold: 4,
  'Shadewood Weald': 4,
  'Khazgarad Ruins': 5,
  'Veilwood Hollow': 5,
  'Verdant Sepulcher': 5,
  'Whispering Glade': 6,
  'Drakknarbuk Mine': 6,
  'Blighted Heart': 7,
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
  const regions = getContext()?.regions ?? ['Dreadmire Swamp']
  // Get the highest level region
  const regionLevelsArray = regions
    .map((region) => regionLevels[region])
    .filter((region) => typeof region !== 'undefined') as number[]
  const maxLevel = Math.max(...regionLevelsArray)
  return maxLevel > 0 ? maxLevel : 1
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

const getEnemy = async (
  creature: RandomCreatureListItem,
): Promise<RandomCreatureListItem | null> => {
  // Get the creature's enemies
  const enemyFilters = creature.props.enemies
  if (enemyFilters.length > 0) {
    // Get a random enemy
    const enemyList = (await Promise.all(
      config.creature.map(async (item) => {
        const passesFilter = await Promise.all(
          enemyFilters.map((filter) => filter(item)),
        )
        return passesFilter.some((result) => result) ? item : null
      }),
    ).then((results) =>
      results.filter((item) => item !== null),
    )) as RandomCreatureListItem[]
    return (await getListItem(enemyList)) as RandomCreatureListItem | null
  }
  return null
}

const getAlliesList = async (
  creature: RandomCreatureListItem,
): Promise<RandomCreatureListItem[]> => {
  // Get the creature's allies
  const allyFilters = creature.props.allies
  let alliesList: RandomCreatureList = []

  // These are the creatures they consider allies
  if (allyFilters.length > 0) {
    // Get all allies
    alliesList = (await Promise.all(
      config.creature
        .filter((item) => item.value !== creature.value)
        .map(async (item) => {
          const passesFilter = await Promise.all(
            allyFilters.map((filter) => filter(item)),
          )
          return passesFilter.some((result) => result) ? item : null
        }),
    ).then((results) =>
      results.filter((item) => item !== null),
    )) as RandomCreatureListItem[]
  }

  // We want to have at least 3 creature types in a given battle.
  // If there are not already 3 types (including the original creature),
  // then try to populate with some creatures who consider THEM allies
  const maxIterations = 50
  let numIterations = maxIterations
  while (numIterations > 0 && alliesList.length < 2) {
    const prospectiveCreature = (await getListItem(
      config.creature,
    )) as RandomCreatureListItem
    if (
      prospectiveCreature &&
      !alliesList.filter((ally) => ally.value === prospectiveCreature.value) &&
      prospectiveCreature.props.allies.length > 0
    ) {
      const passesAnyFilter = await Promise.all(
        prospectiveCreature.props.allies.map(
          async (filter) => await filter(creature),
        ),
      ).then((results) => results.some((result) => result))
      if (passesAnyFilter) {
        alliesList.push(prospectiveCreature)
      }
    }
    numIterations--
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

const addCreatureToEncounter = async (
  creatureList: RandomCreatureListItem[],
  combatEncounter: CombatEncounter,
  xpLimit: number,
): Promise<boolean> => {
  const maxCreatures = 8

  if (creatureList.length > 0) {
    const creatureItem = (await getListItem(
      creatureList,
    )) as RandomCreatureListItem
    if (creatureItem && combatEncounter.xp + creatureItem.props.xp <= xpLimit) {
      const name = await evaluateItem(creatureItem)
      if (!combatEncounter.creatures[name]) {
        combatEncounter.creatures[name] = {
          creature: creatureItem,
          count: 0,
        }
      }
      if (combatEncounter.creatures[name].count < maxCreatures) {
        combatEncounter.creatures[name].count++
        combatEncounter.xp += creatureItem.props.xp
        combatEncounter.count++
        return true
      }
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
const getAllies = async (creature: RandomCreatureListItem, xpLimit: number) => {
  const alliesList = await getAlliesList(creature)
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
  await addCreatureToEncounter([creature], combatEncounter, xpLimit)

  let attemptsLeft = 100
  while (
    attemptsLeft > 0 &&
    getMultipliedXP(combatEncounter.xp, combatEncounter.count) < xpLimit &&
    Object.keys(combatEncounter.creatures).length < 4 // We don't want to have more than 4 types of creatures in a given battle
  ) {
    const listIndex = Math.floor(Math.random() * 3)
    if (listIndex === 0) {
      await addCreatureToEncounter(minions, combatEncounter, xpLimit)
    } else if (listIndex === 1) {
      await addCreatureToEncounter(standards, combatEncounter, xpLimit)
    } else {
      await addCreatureToEncounter(elites, combatEncounter, xpLimit)
    }
    attemptsLeft--
  }
  const remaining = Object.keys(combatEncounter.creatures).map((name) => {
    return combatEncounter.creatures[name].creature
  })
  while (
    attemptsLeft > 0 &&
    getMultipliedXP(combatEncounter.xp, combatEncounter.count) < xpLimit
  ) {
    const listIndex = Math.floor(Math.random() * remaining.length)
    await addCreatureToEncounter(
      [remaining[listIndex]],
      combatEncounter,
      xpLimit,
    )
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

export const getRandomItem = (array: string[]): string | null => {
  if (!array.length) {
    return null
  }
  return array[Math.floor(Math.random() * array.length)]
}

// TODO: Fill out the generateEncounter function from the old code.
// TODO: Make this return an object with the encounter details instead of a string
// TODO: Add a check to see if an enemy is in combat already to suppress the `doing` calculation a second time.
// TODO: See how close they are to the party and their disposition towards the party
export const generateEncounter = async (
  creature: RandomCreatureListItem,
  xpLimit: number,
  encounterDifficulty: EncounterDifficulty,
  suppressAction: boolean = false,
): Promise<string> => {
  const allies = await getAllies(creature, xpLimit)

  // Get the strongest creature and determine the alignment from them
  const strongestAlly = Object.values(allies.creatures).reduce(
    (prev, current) => {
      return prev.creature.props.xp > current.creature.props.xp ? prev : current
    },
  )
  let alignment = `${getRandomItem(strongestAlly.creature.props.legalAlignments ?? []) ?? 'neutral'} ${getRandomItem(strongestAlly.creature.props.moralAlignments ?? []) ?? 'neutral'}`
  if (alignment === 'neutral neutral') {
    alignment = 'neutral'
  }

  const creaturesString = Object.keys(allies.creatures)
    .map((creature) => {
      const { count } = allies.creatures[creature]
      return `${count} ${creature}(s)`
    })
    .join(', ')

  // TODO: Convert to a function?
  const { doing, evaluatedAction } = await (async () => {
    if (suppressAction) {
      return { doing: null, evaluatedAction: '' }
    }
    const doing = await getListItemFromKey('doing')
    const evaluatedAction = doing ? await evaluateItem(doing) : ''
    return { doing, evaluatedAction }
  })()

  const { wants, evaluatedWant } = await (async () => {
    const wants = await getListItemFromKey('wants')
    const evaluatedWant = wants ? await evaluateItem(wants) : ''
    return { wants, evaluatedWant }
  })()

  const doingString = doing ? `<li>they are ${evaluatedAction}</li>` : ''
  const wantsStrings = wants ? `<li>they want ${evaluatedWant}</li>` : ''
  const combatActions = ['hunting', 'fighting', 'fleeing from'] as const
  const idleActions = [
    'in their lair',
    'at their camp',
    'stuck',
    'lost',
    'patrolling',
    'exploring',
    'traveling somewhere else',
  ] as const
  const hidingActions = ['trapped', 'hurt', 'guarding'] as const
  const lairActions = ['in their lair', 'at their camp'] as const

  const isCombatAction =
    suppressAction ||
    combatActions.includes(evaluatedAction as (typeof combatActions)[number])
  const isIdleAction = idleActions.includes(
    evaluatedAction as (typeof idleActions)[number],
  )
  const isHidingAction = hidingActions.includes(
    evaluatedAction as (typeof hidingActions)[number],
  )
  const isLairAction = lairActions.includes(
    evaluatedAction as (typeof lairActions)[number],
  )

  const behaviors = Object.keys(allies.creatures)
    .map((name) => {
      const behaviorIndex = (() => {
        if (isCombatAction) {
          return 'tactics'
        } else if (isIdleAction) {
          return getRandomItem(['idle', 'eating']) as 'idle' | 'eating'
        } else if (isHidingAction) {
          return 'hiding'
        }
        return 'idle'
      })()
      return (
        name +
        ': ' +
        allies.creatures[name].creature.props.behavior[behaviorIndex]
      )
    })
    .join(', ')

  const proximity = getRandomItem(['nearby', 'distant'])

  let enemyString = ''
  if (!suppressAction && isCombatAction) {
    // Get one of the creature's enemies
    const enemy = await getEnemy(creature)
    // What a pacifist. He has no enemies. Let's generate another encounter for him.
    // TODO: Run through the possible list of creatures and find one whose enemy criteria fits.
    if (!enemy) {
      return generateEncounter(creature, xpLimit, encounterDifficulty)
    }
    enemyString =
      `the following creatures: ` +
      (await generateEncounter(enemy, xpLimit, encounterDifficulty, true))
  }

  const result = `
    <ul>
      <li>${creaturesString}</li>
      <li>Setting: ${getContext()?.areas?.join(', ')}, environmental conditions: ${getContext()?.conditions?.join(', ')}</li>
      <li>They are ${xpToEncounterDifficulty(allies.xp)} (${allies.xp} XP total, ${Math.round(allies.xp / (getContext()?.party?.numPlayers ?? 4))} XP each)</li>
      <li>They are ${proximity}</li>
      <li>Their alignment is ${alignment}</li>
      <li>Typical behavior: ${behaviors}</li>
      ${wantsStrings}
      ${doingString}
    </ul>
    ${enemyString}
  `

  if (suppressAction) {
    return result
  }

  const useAI = getContext()?.useAI ?? false
  if (useAI) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `
            Summarize this D&D 5E encounter from the perspective of a party of adventurers, narrated like "You see a...", 
            describing the scene: ${result}. 
            ${isHidingAction ? 'do not reveal the presence of the creatures or hint at their existence, but instead describe the scary and tense ambience of the scene.' : ''}
            ${
              !isHidingAction
                ? `
              Prefer to describe the creatures rather than using their names. 
              Their difficulty and alignment should be implicitly stated, but not explicit. 
              For instance, if a group is 'chaotic evil', 
              they or their actions should be described as a synonym for chaotic, 
              like "frantic", and their morality should be represented by their viciousness.
            `
                : ''
            }
            It should be 3 sentences at max.
          `,
        },
      ],
    })

    return `${result}<br/>Summary: ${completion.choices[0].message.content}`
  }
  return result
}
