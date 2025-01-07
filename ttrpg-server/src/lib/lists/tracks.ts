import { config } from 'lib/lists'
import { getDC } from 'lib/lists/dc'
import {
  getListItem,
  getEvaluatedListItemFromKey,
  evaluateItem,
} from 'lib/lists/evaluate'
import { generateEncounter, getXPThresholdForParty } from 'lib/lists/encounters'
import { getContext } from 'lib/lists/context'
import { RandomCreatureListItem } from 'types/creatures'
import { EncounterDifficulty } from 'types/lists'

export const generateTracks = async (): Promise<string> => {
  const defaultString = 'old, unidentifiable'

  const encounterDifficulty = ((await getEvaluatedListItemFromKey(
    'encounterDifficulty',
  )) ?? 'hard') as EncounterDifficulty
  const partyContext = getContext()?.party
  const { numPlayers, crMultiplier } = partyContext ?? {
    numPlayers: 4,
    crMultiplier: 1,
  }
  const xpLimit =
    getXPThresholdForParty()[encounterDifficulty] * numPlayers * crMultiplier
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
        Perception DC ${getDC()} to see ${creatureName} tracks
      </li>
      </li>
      <li> Survival DC ${getDC()} to see moving [direction]</li>
    </ul>
  `
  if (creatureItem) {
    trackString += `
      If followed: ${await generateEncounter(creatureItem as RandomCreatureListItem, xpLimit, encounterDifficulty)}
    `
  }
  return trackString
}
