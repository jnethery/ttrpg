import { config } from 'lib/lists'
import { getDC } from 'lib/lists/dc'
import {
  getListItem,
  getEvaluatedListItemFromKey,
  evaluateItem,
  normalizeProbabilities,
} from 'lib/lists/evaluate'
import { generateEncounter, getXPThresholdForParty } from 'lib/lists/encounters'
import { getContext } from 'lib/lists/context'
import { RandomCreatureListItem } from 'types/creatures'
import { EncounterDifficulty } from 'types/lists'

export const generateTracks = (): string => {
  const defaultString = 'old, unidentifiable'

  let creatureName = defaultString
  let creatureItem = null
  const encounterDifficulty = (getEvaluatedListItemFromKey(
    'encounterDifficulty',
  ) ?? 'hard') as EncounterDifficulty
  const partyContext = getContext()?.party
  const { numPlayers, crMultiplier } = partyContext ?? {
    numPlayers: 4,
    crMultiplier: 1,
  }
  const xpLimit =
    getXPThresholdForParty()[encounterDifficulty] * numPlayers * crMultiplier
  const eligibleCreatures = config.creature.filter(
    (creature) => creature.props.xp <= xpLimit,
  )
  const prospectiveCreature = getListItem(eligibleCreatures)
  if (prospectiveCreature && typeof prospectiveCreature.value === 'string') {
    creatureItem = prospectiveCreature
    creatureName = evaluateItem(creatureItem)
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
      If followed: ${generateEncounter(creatureItem as RandomCreatureListItem, xpLimit, encounterDifficulty)}
    `
  }
  return trackString
}
