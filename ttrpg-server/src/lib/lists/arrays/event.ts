import { config } from 'lib/lists'
import { generateTracks } from 'lib/lists/tracks'
import {
  generateEncounter,
  getXPLimit,
  getEncounterValue,
} from 'lib/lists/encounters'
import { RandomCreatureListItem } from 'types/creatures'
import { getEvaluatedListItemFromKey, getListItem } from 'lib/lists/evaluate'
import { RandomList, EncounterDifficulty } from 'types/lists'

export const event: RandomList = [
  { value: '[mundane]', props: { type: 'mundane' }, probability: 4 / 12 },
  { value: '[hardship]', props: { type: 'hardship' }, probability: 2 / 12 },
  { value: generateTracks, props: { type: 'tracks' }, probability: 3 / 12 },
  {
    value: async () => {
      const creature = (await getListItem(
        config.creature,
      )) as RandomCreatureListItem | null
      if (!creature) {
        return '<li>Nothing happens</li>'
      }
      const encounterDifficulty = ((await getEvaluatedListItemFromKey(
        'encounterDifficulty',
      )) ?? 'hard') as EncounterDifficulty
      const xpLimit = getXPLimit(encounterDifficulty)

      return getEncounterValue(
        await generateEncounter({
          creature,
          xpLimit,
          encounterDifficulty,
        }),
      )
    },
    props: {
      type: 'encounter',
    },
    probability: 1 / 12,
  },
]
