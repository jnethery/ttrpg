import { config } from 'lib/lists'
import { getContext } from 'lib/lists/context'
import { RandomLocationList } from 'lib/lists/arrays/location'
import { locationValueFunction } from './index'

const getDefaultProps = () => {
  return {
    smell: '[swamp_smells] and [swamp_smells]',
    sound: '[swamp_sounds] and [swamp_sounds]',
    shelterLists: {
      probability: 0.05,
      sizeList: [
        ...config.small_shelter,
        ...config.medium_shelter,
        ...config.large_shelter,
      ],
      exposureList: [
        ...config.shelter_exposure_high,
        ...config.shelter_exposure_medium,
        ...config.shelter_exposure_none,
      ],
      visibilityList: [
        ...config.shelter_visibility_high,
        ...config.shelter_visibility_medium,
        ...config.shelter_visibility_low,
      ],
      occupancyList: config.shelter_occupancy,
    },
  }
}

const getNaturalSwampLocation = () => {
  return {
    value: locationValueFunction,
    probability: () => {
      const { areas } = getContext()
      return areas && areas.includes('swamp') ? 1 : 0
    },
  }
}

const landmarkDescriptions = [
  'A tall, gnarled tree with twisted branches, wide enough to hide 50 men in its shadow.',
  'A moss-covered rock shaped like a crouching wolf, half-sunken into the bog.',
  'A massive cypress tree with roots that form a natural bridge over murky water.',
  'A bubbling hot spring surrounded by blackened reeds and steam rising into the air.',
  'A wide, hollow log large enough to walk through, its interior glowing faintly with fungus.',
  'A dense patch of reeds that sway constantly, even when the air is still.',
  'A cluster of jagged stones sticking out of the swamp like the spine of a great beast.',
  'A glimmering pool of water reflecting the sky perfectly, even when the clouds shift.',
  'A mound of tangled roots and vines forming an eerie, natural throne.',
  'A fallen tree so large it forms a natural causeway across a wide stretch of water.',
  'A patch of white lilies blooming in a perfect circle amidst the muddy swamp.',
  'A lone willow tree with its branches dipping into a crystal-clear stream.',
  'A small hill covered in vibrant purple moss that seems to shimmer in the sunlight.',
  'A cluster of thin, spindly trees that creak loudly with every gust of wind.',
  'A large, perfectly round boulder, its surface smooth and covered in bright green algae.',
  'A patch of glowing mushrooms clustered around the base of a rotting tree stump.',
  'A shallow pool with hundreds of tiny fish darting back and forth beneath the surface.',
  'A narrow sandbar winding through the swamp like a natural path, surrounded by water.',
  'A grove of tall reeds with sharp tips, standing in eerie symmetry.',
  'A massive dead tree with its branches reaching out like skeletal fingers toward the sky.',
  'A thick patch of cattails buzzing with the sound of dragonflies darting between them.',
  'A natural arch formed by two leaning trees whose roots and branches have intertwined.',
  'A circle of stones partially submerged in the water, covered in strange, spiraling moss.',
  'A shallow sinkhole filled with murky water and littered with broken branches.',
  'A dense patch of ferns taller than a man, their fronds swaying in a phantom breeze.',
]

export const naturalSwampLocations: RandomLocationList =
  landmarkDescriptions.map((description) => {
    return {
      ...getNaturalSwampLocation(),
      props: async () => {
        return {
          description,
          ...getDefaultProps(),
        }
      },
    }
  })
