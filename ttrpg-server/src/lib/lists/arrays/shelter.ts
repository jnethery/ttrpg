import { RandomList, RandomListItem, ValueFunction } from 'types/lists'
import { getDistributedDC } from 'lib/lists/dc'

const small_shelter: RandomList = [
  { value: 'It is meager, accommodating two people snugly.', probability: 1 },
  {
    value:
      'It is a simple lean-to made of sticks and leaves, barely enough for one person to crouch.',
    probability: 0.9,
  },
  {
    value:
      'A small, thatched hut, it offers room for two with little space to spare.',
    probability: 0.8,
  },
  {
    value:
      'It is a hollowed-out log that provides cramped shelter for one person.',
    probability: 0.7,
  },
  {
    value:
      'A tiny cave, it has room for one person to lie down, protected from the elements.',
    probability: 0.6,
  },
  {
    value: 'A tent made of stitched animal hides, it fits two people tightly.',
    probability: 0.8,
  },
  {
    value:
      'A rock overhang serves as shelter, enough for one person to sit or lie under.',
    probability: 0.7,
  },
  {
    value:
      'A woven grass mat forms a roof, providing minimal shelter for two sitting individuals.',
    probability: 0.6,
  },
  {
    value:
      'A small wooden shack, it barely holds two people standing shoulder-to-shoulder.',
    probability: 0.7,
  },
  {
    value:
      'A hastily dug earth shelter, it can fit one person curled up inside.',
    probability: 0.5,
  },
]

const medium_shelter: RandomList = [
  {
    value:
      'A modest cabin with wooden walls, comfortably fitting four people with room for basic supplies.',
    probability: 1,
  },
  {
    value:
      'A well-constructed yurt with a sturdy fabric cover, spacious enough for a family of five to sleep.',
    probability: 0.9,
  },
  {
    value:
      'A medium-sized cave, offering protection for three to four people with a small area for a fire.',
    probability: 0.8,
  },
  {
    value:
      'A stone and mud hut with a sloped roof, large enough for a group of four to sit or sleep inside.',
    probability: 0.7,
  },
  {
    value:
      'A wooden treehouse built among sturdy branches, accommodating four people with ease.',
    probability: 0.6,
  },
  {
    value:
      'A two-room tent with reinforced fabric, spacious enough for a group of six to share comfortably.',
    probability: 0.8,
  },
  {
    value:
      'A partially collapsed ruin, offering adequate shelter for three people in its intact sections.',
    probability: 0.7,
  },
  {
    value:
      'A woven bamboo structure with a thatched roof, providing space for a small family to sleep and store belongings.',
    probability: 0.7,
  },
  {
    value:
      'A caravan wagon converted into living quarters, fitting four to five individuals with a modest level of comfort.',
    probability: 0.6,
  },
  {
    value:
      'A large lean-to built against a cliff, offering shelter for up to five people and some gear.',
    probability: 0.8,
  },
]

const large_shelter: RandomList = [
  {
    value:
      'A sprawling longhouse made of timber, accommodating up to twenty people with space for communal activities.',
    probability: 1,
  },
  {
    value:
      'A sturdy stone fortress with multiple rooms, offering shelter for a group of thirty or more.',
    probability: 0.9,
  },
  {
    value:
      'A grand tent pavilion with reinforced poles and fabric, providing comfortable shelter for a dozen people.',
    probability: 0.8,
  },
  {
    value:
      'An abandoned ruin, its main hall large enough to house forty individuals with ease.',
    probability: 0.7,
  },
  {
    value:
      'A network of interconnected caves, spacious enough to shelter fifty people and their supplies.',
    probability: 0.8,
  },
  {
    value:
      'A fortified barn converted into living quarters, capable of hosting a community of twenty-five.',
    probability: 0.7,
  },
  {
    value:
      'A massive treehouse village with multiple platforms and cabins, providing room for thirty inhabitants.',
    probability: 0.6,
  },
  {
    value:
      'A stone monastery with dormitories, capable of housing up to fifty monks and visitors.',
    probability: 0.8,
  },
  {
    value:
      'A large, abandoned ship torn apart and repurposed into a shelter, offering living space for a crew of thirty-five.',
    probability: 0.7,
  },
  {
    value:
      'A walled encampment with several large tents and cabins, comfortably holding a group of forty people.',
    probability: 0.8,
  },
]

interface RandomExposureListItem extends RandomListItem {
  value: ValueFunction
  probability: number
  props: {
    description: string
  }
}
const highExposureValueFunction = async (props: { description: string }) => {
  return `
    <li>${props.description}</li>
    <li>CON DC ${getDistributedDC({ mean: 15 })} to avoid losing sleep</li>
  `
}
const mediumExposureValueFunction = async (props: { description: string }) => {
  return `
    <li>${props.description}</li>
    <li>CON DC ${getDistributedDC({ mean: 8 })} to avoid losing sleep</li>
  `
}
const noneExposureValueFunction = async (props: { description: string }) => {
  return `
    <li>${props.description}</li>
  `
}

const shelter_exposure_high: RandomExposureListItem[] = [
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter is exposed to the elements, offering minimal protection from wind and rain.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The area is unshielded, leaving occupants vulnerable to harsh weather and temperature fluctuations.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The site is fully open to the sky, providing no cover from sun, rain, or snow.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'There is little to break the relentless glare of the sun or the chill of the night air.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description: 'The ground is damp, and there is a lack of overhead cover.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'Harsh winds tend to whip through the area, scattering loose items and chilling anyone present.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The surroundings offer no natural barriers, leaving occupants exposed to predators and weather alike.',
    },
  },
  {
    value: highExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The constant exposure to the elements makes it difficult to stay dry or warm for long.',
    },
  },
]

const shelter_exposure_medium: RandomExposureListItem[] = [
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter provides partial cover, shielding from some rain but still allowing wind to pass through.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'There is adequate overhead cover, but gaps in the walls leave occupants susceptible to drafts and light rain.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The area offers decent protection from the sun and most precipitation, though stronger storms can still intrude.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'Natural barriers break the wind somewhat, but the shelter remains open to the elements on one side.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter’s structure holds up against moderate weather but struggles during heavy rains or winds.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'It shields well against the sun and light rain, though the cold night air seeps in.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The area is partially enclosed, reducing exposure to elements but still allowing drafts to pass through.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        "While it blocks direct wind and rain, the shelter's openings allow moisture and chill to linger.",
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter provides good cover overhead but lacks insulation against colder weather.',
    },
  },
  {
    value: mediumExposureValueFunction,
    probability: 1,
    props: {
      description:
        'It offers moderate protection, enough to keep occupants mostly dry during a mild storm.',
    },
  },
]

const shelter_exposure_none: RandomExposureListItem[] = [
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter is completely enclosed, providing total protection from wind, rain, and snow.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'Thick walls and a secure roof ensure full insulation from the elements.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'Occupants are fully shielded from all weather conditions, with no exposure to drafts or moisture.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The structure offers complete safety from harsh weather, maintaining a stable interior environment.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The enclosed design ensures that rain, wind, and cold air cannot penetrate the shelter.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter is well-fortified, providing excellent defense against both weather and external dangers.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'Thick materials and a tightly sealed design keep all weather effects entirely outside.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'It maintains a comfortable interior, fully protected from temperature extremes and environmental hazards.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The solid construction guarantees a completely weatherproof space for its occupants.',
    },
  },
  {
    value: noneExposureValueFunction,
    probability: 1,
    props: {
      description:
        'The shelter is impervious to weather, creating a safe and dry haven for all inside.',
    },
  },
]

export interface RandomOccupantListItem extends RandomListItem {
  value: string
  probability: number
  props: () => {
    numOccupants: number
  }
}
const shelter_occupancy: RandomOccupantListItem[] = [
  {
    value: 'It is currently unoccupied, awaiting new inhabitants.',
    probability: 1,
    props: () => {
      return {
        numOccupants: 0,
      }
    },
  },
  {
    value: 'The shelter is already occupied by a group of travelers.',
    probability: 1,
    props: () => {
      return {
        numOccupants: Math.round(1 + Math.random() * 5),
      }
    },
  },
  {
    value: 'A lone figure is huddled inside, seeking refuge from the elements.',
    probability: 1,
    props: () => {
      return {
        numOccupants: 1,
      }
    },
  },
  {
    value:
      'The shelter is home to a family of settlers, who have made it their temporary residence.',
    probability: 1,
    props: () => {
      return {
        numOccupants: Math.round(2 + Math.random() * 10),
      }
    },
  },
]

const shelter_visibility_high: RandomList = [
  {
    value:
      'The shelter is brightly lit, making it highly visible from a distance even at night.',
    probability: 1,
  },
  {
    value:
      'The structure’s reflective surfaces catch sunlight, drawing attention from miles away.',
    probability: 0.9,
  },
  {
    value:
      'The shelter is positioned in an open area with no natural cover, making it easy to spot.',
    probability: 0.8,
  },
  {
    value:
      'Its brightly colored materials stand out starkly against the surrounding landscape.',
    probability: 0.8,
  },
  {
    value:
      'Smoke from the shelter’s fire rises high into the air, serving as a beacon to observers.',
    probability: 0.7,
  },
  {
    value:
      'The shelter is located on elevated terrain, making it visible from multiple directions.',
    probability: 0.7,
  },
  {
    value:
      'A lack of surrounding vegetation makes the shelter’s silhouette prominent from afar.',
    probability: 0.8,
  },
  {
    value:
      'Bright lights or lanterns illuminate the shelter, making it impossible to miss after sunset.',
    probability: 0.9,
  },
  {
    value:
      'Its vibrant decorations or banners make the shelter noticeable to any passing observers.',
    probability: 0.6,
  },
  {
    value:
      'The shelter’s position at a crossroads ensures that it is seen by anyone traveling nearby.',
    probability: 0.8,
  },
]

const shelter_visibility_medium: RandomList = [
  {
    value:
      'The shelter blends moderately with its surroundings, visible only upon closer inspection.',
    probability: 0.8,
  },
  {
    value:
      'Partially obscured by vegetation, the shelter is noticeable but not immediately apparent.',
    probability: 0.7,
  },
  {
    value:
      'The structure’s neutral colors help it avoid standing out, though it’s visible in open terrain.',
    probability: 0.8,
  },
  {
    value:
      'Positioned near a slope, the shelter is partially hidden from one direction but exposed from others.',
    probability: 0.7,
  },
  {
    value:
      'Its small size makes it harder to spot, but movement around it can attract attention.',
    probability: 0.6,
  },
  {
    value:
      'The shelter is camouflaged somewhat by shadows, visible mainly during the day.',
    probability: 0.7,
  },
  {
    value:
      'A scattering of nearby rocks and trees provides some cover, though the shelter can still be seen.',
    probability: 0.8,
  },
  {
    value:
      'Its location at the edge of a clearing makes it noticeable to those actively scanning the area.',
    probability: 0.7,
  },
  {
    value:
      'The shelter is obscured from certain angles but stands out when approached from others.',
    probability: 0.6,
  },
  {
    value:
      'A single light or smoke from the shelter makes it moderately visible, especially at night.',
    probability: 0.7,
  },
]

const shelter_visibility_low: RandomList = [
  {
    value:
      'The shelter is well-hidden within dense foliage, making it difficult to spot from a distance.',
    probability: 1,
  },
  {
    value:
      'Its muted colors and natural materials help it blend seamlessly with the environment.',
    probability: 0.9,
  },
  {
    value:
      'Positioned in a hollow, the shelter is nearly invisible unless approached directly.',
    probability: 0.8,
  },
  {
    value:
      'Covered by overhanging branches, the shelter is shielded from view from most angles.',
    probability: 0.9,
  },
  {
    value:
      'The structure is camouflaged with surrounding rocks and vegetation, making it almost indistinguishable.',
    probability: 0.8,
  },
  {
    value:
      'Its small size and concealed location make it very difficult to notice, even nearby.',
    probability: 0.9,
  },
  {
    value:
      'The shelter is hidden in the shadow of a cliff, invisible to those not actively searching for it.',
    probability: 0.8,
  },
  {
    value:
      'Thick underbrush surrounds the shelter, providing excellent cover from prying eyes.',
    probability: 0.9,
  },
  {
    value:
      'The shelter is built into a natural depression, completely hidden from casual observation.',
    probability: 1,
  },
  {
    value:
      'Its location behind a natural barrier like a ridge or large boulder ensures it remains unnoticed.',
    probability: 0.9,
  },
]

export default {
  small_shelter,
  medium_shelter,
  large_shelter,
  shelter_exposure_high,
  shelter_exposure_medium,
  shelter_exposure_none,
  shelter_occupancy,
  shelter_visibility_high,
  shelter_visibility_medium,
  shelter_visibility_low,
}
