import { config } from 'lib/lists'
import { getDistributedDC } from 'lib/lists/dc'
import {
  getListItem,
  getEvaluatedListItemFromKey,
  evaluateItem,
} from 'lib/lists/evaluate'
import {
  generateEncounter,
  getEncounterValue,
  getXPLimit,
} from 'lib/lists/encounters'
import { getConditionDifficulty } from 'lib/lists/environmentalConditions'
import { getContext } from 'lib/lists/context'
import { RandomCreatureListItem } from 'types/creatures'
import { EncounterDifficulty } from 'types/lists'

export const generateTracks = async (): Promise<string> => {
  const defaultString = 'old, unidentifiable'

  const encounterDifficulty = ((await getEvaluatedListItemFromKey(
    'encounterDifficulty',
  )) ?? 'hard') as EncounterDifficulty

  const xpLimit = getXPLimit(encounterDifficulty)
  const contextCreatureName = getContext()?.creatureName
  const eligibleCreatures = contextCreatureName
    ? config.creature
        .filter((creature) => creature.value === contextCreatureName)
        .map((creature) => {
          return { ...creature, probability: 1 }
        })
    : config.creature.filter((creature) => creature.props.xp <= xpLimit)

  let creatureName = defaultString
  let creatureItem = null
  const prospectiveCreature = await getListItem(eligibleCreatures)
  if (prospectiveCreature && typeof prospectiveCreature.value === 'string') {
    creatureItem = prospectiveCreature
    creatureName = await evaluateItem(creatureItem)
  }

  let trackString = `
    <ul>
      <li>
        Perception DC ${getDistributedDC({ mean: 10 + getConditionDifficulty() })} to see ${creatureName} tracks
      </li>
      </li>
      <li> Survival DC ${getDistributedDC({ mean: 10 + getConditionDifficulty() })} to see moving [direction]</li>
    </ul>
  `
  if (creatureItem) {
    const encounter = await generateEncounter({
      creature: creatureItem as RandomCreatureListItem,
      xpLimit,
      encounterDifficulty,
    })
    trackString += `
      If followed: ${getEncounterValue(encounter)}
    `
  }
  return trackString
}
