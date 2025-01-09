import { config } from 'lib/lists'
import { getEvaluatedListItem } from 'lib/lists/evaluate'
import { getRandomItem } from 'lib/lists/encounters'
import { getConditionDifficulty } from 'lib/lists/environmentalConditions'
import { getContext } from 'lib/lists/context'
import { getDistributedDC, getRandomDiceString } from 'lib/lists/dc'
import { RandomLocationListItem } from 'lib/lists/arrays/location'

import { locationValueFunction, LocationProps } from './index'

export const bubblingPool: RandomLocationListItem = {
  value: locationValueFunction,
  probability: () => {
    const { areas } = getContext()
    return areas && areas.includes('swamp') ? 1 : 0
  },
  props: async () => {
    const { conditions } = getContext()
    const isFreezing = conditions?.includes('freezing')
    const color = getRandomItem(['black', 'green', 'yellow', 'teal'])!
    const idSkill = getRandomItem(['nature, survival', 'arcana'])!

    const effects = [
      {
        value: `${getRandomItem(['poison', 'healing'])} ${getRandomDiceString(1, 2, 4, 8)}`,
        probability: 1,
      },
      {
        value: `DC ${getDistributedDC({ mean: 15 })} CON or acquire ${getRandomItem(['bog lung', 'rot lung'])} disease for ${Math.round(1 + Math.random() * 6)} days`,
        probability: idSkill === 'nature, survival' ? 1 : 0,
      },
      {
        value: `DC ${getDistributedDC({ mean: 15 })} DEX for half ${getRandomDiceString(1, 2, 4, 8)} explosion damage`,
        probability: idSkill === 'nature, survival' ? 1 : 0,
      },
      {
        value: `restores ${Math.round(1 + Math.random() * 2)} spell slots of up to level ${Math.round(1 + Math.random() * 2)}`,
        probability: idSkill === 'arcana' ? 1 : 0,
      },
    ]
    const effect = (await getEvaluatedListItem(effects))!

    const idDescriptions = [
      {
        value: 'a source of magical power',
        probability: effect.includes('restores') ? 1 : 0,
      },
      {
        value: 'seems medicinal',
        probability: effect.includes('healing') ? 1 : 0,
      },
      {
        value: 'seems dangerous',
        probability:
          !effect.includes('restores') && !effect.includes('healing') ? 1 : 0,
      },
    ]
    const idDescription = (await getEvaluatedListItem(idDescriptions))!

    const props: LocationProps = {
      description: `${isFreezing ? 'frozen' : 'bubbling'} swamp slime, colored ${color}`,
      smell: '[rotting_smells]',
      sound: '[bubbling_sounds]',
      identification: {
        skill: idSkill,
        dc: getDistributedDC({ mean: 10 + getConditionDifficulty() }),
        description: idDescription,
      },
      effect,
      shelterLists: {
        probability: 0.01,
        sizeList: config.small_shelter,
        exposureList: [
          ...config.shelter_exposure_high,
          ...config.shelter_exposure_medium,
        ],
        visibilityList: [
          ...config.shelter_visibility_high,
          ...config.shelter_visibility_medium,
        ],
        occupancyList: config.shelter_occupancy,
      },
    }

    if (isFreezing) {
      props.smell = 'none'
      props.sound = 'none'
      delete props.identification
    }

    return props
  },
}
