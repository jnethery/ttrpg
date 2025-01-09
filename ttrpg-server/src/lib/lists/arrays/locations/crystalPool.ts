import { config } from 'lib/lists'
import { getEvaluatedListItem } from 'lib/lists/evaluate'
import { getRandomItem } from 'lib/lists/encounters'
import { getConditionDifficulty } from 'lib/lists/environmentalConditions'
import { getContext } from 'lib/lists/context'
import { getDistributedDC, getRandomDiceString } from 'lib/lists/dc'
import { RandomLocationListItem } from 'lib/lists/arrays/location'
import { locationValueFunction, LocationProps } from './index'

export const crystalPool: RandomLocationListItem = {
  value: locationValueFunction,
  probability: () => {
    const { areas } = getContext()
    return areas && areas.includes('swamp') ? 1 : 0
  },
  props: async () => {
    const { conditions } = getContext()
    const isFreezing = conditions?.includes('freezing')
    const idSkill = getRandomItem(['nature, survival', 'arcana'])!

    const effects = [
      {
        value: `A pure, refreshing drink. Relieves thirst and heals you for ${getRandomDiceString(1, 2, 4, 6)} hp`,
        probability: 1,
      },
      {
        value: `A portal. This transports you 1d20 miles to the [direction]`,
        probability: idSkill === 'arcana' ? 1 : 0,
      },
    ]
    const effect = (await getEvaluatedListItem(effects))!

    const idDescriptions = [
      {
        value: 'drinking water',
        probability: effect.includes('pure') ? 1 : 0,
      },
      {
        value: 'a magical portal',
        probability: effect.includes('portal') ? 1 : 0,
      },
    ]
    const idDescription = (await getEvaluatedListItem(idDescriptions))!

    const props: LocationProps = {
      description: `a ${isFreezing ? 'frozen' : ''} pool ${isFreezing ? '' : 'of clear, shimmering water'}`,
      smell: '[sweet_smells]',
      sound: '[crystal_sounds]',
      identification: {
        skill: idSkill,
        dc: getDistributedDC({ mean: 10 + getConditionDifficulty() }),
        description: idDescription,
      },
      effect,
      shelterLists: {
        probability: 0.1,
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
