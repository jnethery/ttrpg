import { config } from 'lib/lists'
import { getEvaluatedListItem } from 'lib/lists/evaluate'
import { getRandomItem } from 'lib/lists/encounters'
import { getConditionDifficulty } from 'lib/lists/environmentalConditions'
import { getContext } from 'lib/lists/context'
import { getDistributedDC, getRandomDiceString } from 'lib/lists/dc'
import { RandomLocationListItem } from 'lib/lists/arrays/location'
import { locationValueFunction, LocationProps } from './index'

export const magicPortal: RandomLocationListItem = {
  value: locationValueFunction,
  probability: () => {
    const { areas } = getContext()
    return areas && areas.includes('swamp') ? 1 : 0
  },
  props: async () => {
    const idSkill = 'arcana'
    const color = getRandomItem(['black', 'green', 'blue', 'red'])!

    const effects = [
      {
        value: `Restores ${getRandomDiceString(1, 1, 8, 10)} hit points to all within the circle`,
        probability: color === 'green' ? 1 : 0,
      },
      {
        value: `Causes ${getRandomDiceString(1, 1, 8, 10)} fire damage to a random creature in the circle`,
        probability: color === 'red' ? 1 : 0,
      },
      {
        value: `Triggers an arcane explosion, dealing ${getRandomDiceString(1, 3, 4, 6)} force damage to everyone within 20 feet`,
        probability: color === 'black' ? 1 : 0,
      },
      {
        value: `Teleports all creatures within 10 feet to another nearby stone circle (1d20 miles away).`,
        probability: color === 'blue' ? 1 : 0,
      },
    ]
    const effect = (await getEvaluatedListItem(effects))!

    const idDescriptions = [
      {
        value: 'a healing aura',
        probability: effect.includes('restores') ? 1 : 0,
      },
      {
        value: 'a dangerous aura',
        probability: effect.includes('damage') ? 1 : 0,
      },
      {
        value: 'a teleportation aura',
        probability: effect.includes('Teleports') ? 1 : 0,
      },
    ]
    const idDescription = (await getEvaluatedListItem(idDescriptions))!

    const props: LocationProps = {
      description: `A circle of jagged stones glowing faintly with ${color} light. The glow shifts from stone to stone, creating a pulsing pattern.`,
      smell: '[stone_smells]',
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

    return props
  },
}
