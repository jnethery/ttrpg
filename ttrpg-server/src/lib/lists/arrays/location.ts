//
// sinking islet - submerges slowly, reveals buried ruins, traps unwary travelers
// ancient stone circle - activates magical effects, channels spirits, marks a leyline
// mud-choked shrine - reveals divine power, curses explorers, holds an ancient artifact
// sunken shipwreck - hides treasure, unleashes ghostly spirits, harbors dangerous creatures
// glowing moss - illuminates surroundings, repels insects, marks a hidden path
// abandoned fisher’s shack - contains useful tools, home to a lurking monster, holds local lore
// tar pit - traps creatures, ignites when exposed to fire, preserves ancient fossils
// skull-covered altar - triggers a curse, grants temporary power, tied to a forgotten deity
// strangling vines - restrict movement, emit a soothing fragrance, house tiny creatures
// floating corpse - a warning of danger, source of disease, holds valuable loot
// misty glade - conceals paths, warps perception, opens into another plane at night
// petrified tree - emits a strange hum, marks an ancient burial site, immovable but unyielding
// blackened clearing - site of a lightning strike, home to unique flora, radiates ominous energy
// weeping willow - emits spectral cries, offers sanctuary, feeds on negative emotions
// abandoned burial mound - conceals treasure, releases spirits, acts as a safe resting place
// collapsed aqueduct - leads to ancient ruins, obstructs paths, stores freshwater
// glimmering fen - creates illusions, attracts adventurers, reveals truth under moonlight
// rotting canoe - floats precariously, holds old maps, collapses under weight
// murky cave - hides a predator, stores relics, echoes unsettling sounds
// drifting lantern - beckons travelers, vanishes abruptly, leads to peril or treasure
// giant snail shell - source of alchemical material, home to aggressive insects, curiously warm
// sunken totem pole - emits energy, reveals ancient secrets, repels supernatural beings
// bloated animal carcass - spreads disease, conceals trinkets, attracts scavengers
// whispering reeds - convey faint voices, hide lurking dangers, point toward ancient sites
// luminous fungi - emit hypnotic glow, induce hallucinations, serve as alchemical ingredients
// eroded stone staircase - leads to ruins, collapses easily, marks a sacred site
//

// location
//   tree ^[area == "swamp"]
//     desc=a rotting {oak|cypress|willow|mangrove|maple|gum|ash} {tree|stump|log}
//     smell=[smells.rotting]
//     sound=none
//     find_skill=perception,investigation (10 min)
//     find_dc=[distributed_dc]
//     find_desc={hole near roots|rotted out portion}
//     id_skill=nature
//     id_dc=[distributed_dc]
//     effects
//       You find [r = roll('1d100'), individual_treasure_5_10]
//       You discover a family of {1-6} [unit.prey](s). It/they want [wants]
//       Releases spores. DC [distributed_dc] CON or acquire rot lung for {1-7} days
//       Releases a [unit.swarm]
//     effect=[this.effects.selectOne]
//     id_desc
//       a hole where someone has hidden something ^[this.getParent.effect.includes("find")]
//       a den ^[this.getParent.effect.includes("family") || this.getParent.effect.includes("Releases a")]
//       a sign of disease ^[this.getParent.effect.includes("spores")]
//   crystal clear pool ^[area == "swamp"]
//     desc=a pool of clear, shimmering water
//     smell=like [smells.sweet]
//     sound=[sounds.crystal]
//     find_dc=none
//     id_skill={arcana|nature,survival}
//     id_dc=[distributed_dc]
//     effects
//       A pure, refreshing drink. Relieves thirst and heals you for 1d{4|6} hp
//       A portal. This transports you {5-10} miles to the [direction] ^[this.getParent.id_skill == "arcana"]
//       A mirage. It's hiding [trinket]. ^[this.getParent.id_skill == "arcana"]
//     effect=[this.effects.selectOne]
//     id_desc
//       drinking water ^[this.getParent.effect.includes("pure")]
//       a magical portal ^[this.getParent.effect.includes("portal")]
//       an illusion. it contains something. ^[this.getParent.effect.includes("mirage")]
//   twisting mangroves ^[area == "swamp"]
//     desc=a twisted, thick plot of mangroves
//     smell=[smells.swampy]
//     sound=[sounds['still water']]
//     find_dc=none
//     id_dc=[distributed_dc]
//     id_skill=survival
//     effects
//       lost in the mangroves. pass a DC [distributed_dc] Survival check or lose 2 hours.
//       turn around. pass a DC [distributed_dc] Survival check or go back one mile in the direction you came from.
//       diseased water. pass a DC[distributed_dc] Constitution check or contract {marsh rot|cold sleep} for {1-7} days.
//       you pass through with no trouble
//     effect=[this.effects.selectOne]
//     id_desc
//       it looks like it will take a while to navigate ^[this.getParent.effect.includes("lost")]
//       it looks like a maze. we will get turned around ^[this.getParent.effect.includes("turn")]
//       this water looks stagnant and sickly. ^[this.getParent.effect.includes("diseased")]
//       looks harmless ^[this.getParent.effect.includes("pass")]

import { config } from 'lib/lists'
import {
  getListItem,
  getEvaluatedListItem,
  evaluateItem,
  getEvaluatedListItemFromKey,
} from 'lib/lists/evaluate'
import { RandomOccupantListItem } from 'lib/lists/arrays/shelter'
import {
  generateEncounter,
  getRandomItem,
  getXPLimit,
} from 'lib/lists/encounters'
import { getConditionDifficulty } from 'lib/lists/environmentalConditions'
import { getContext } from 'lib/lists/context'
import { RandomListItem, EncounterDifficulty } from 'types/lists'
import { RandomCreatureListItem } from 'types/creatures'
import { getDistributedDC, getRandomDiceString } from 'lib/lists/dc'
import { get } from 'http'

interface ShelterProps {
  probability: number
  sizeList?: RandomListItem[]
  exposureList?: RandomListItem[]
  visibilityList?: RandomListItem[]
  occupancyList?: RandomListItem[]
}

export interface LocationProps {
  description: string
  smell: string
  sound: string
  discovery?: {
    skill: string
    dc: number
    description: string
  }
  identification?: {
    skill: string
    dc: number
    description: string
  }
  effect?: string
  shelterLists: ShelterProps
}

export interface RandomLocationListItem extends RandomListItem {
  props: () => Promise<LocationProps>
}

export type RandomLocationList = RandomLocationListItem[]

const generateDiscovery = async (props: LocationProps) => {
  if (!props.discovery) return ''
  const { skill, description, dc } = props.discovery
  return `
    <li id="location_discovery">Discovery: ${description} (${skill} DC ${dc})</li>
  `
}

const generateIdentification = async (props: LocationProps) => {
  if (!props.identification) return ''
  const { skill, description, dc } = props.identification
  return `
    <li id="location_id">Identification: ${description} (${skill} DC ${dc})</li>
  `
}

const generateEffect = async (props: LocationProps) => {
  if (!props.effect) return ''
  const { effect } = props
  return `
    <li id="location_effect">Effect: ${effect}</li>
  `
}

export const locationValueFunction = async (
  props: LocationProps,
): Promise<string> => {
  return `
    <>
      <li>${props.description}</li>
      <li>Setting: ${getContext()?.areas?.join(', ')}, environmental conditions: ${getContext()?.conditions?.join(', ')}</li>
      <li>Smells like ${props.smell}</li>
      <li>Sounds like ${props.sound}</li>
      ${await generateDiscovery(props)}
      ${await generateIdentification(props)}
      ${await generateEffect(props)}
      ${await generateShelter(props)}
    </ul>
  `
}

const generateShelter = async (props: LocationProps) => {
  const random = Math.random()
  const { probability, sizeList, exposureList, visibilityList, occupancyList } =
    props.shelterLists
  if (
    random > probability ||
    !sizeList ||
    !exposureList ||
    !visibilityList ||
    !occupancyList
  )
    return `<li>There is no shelter</li>`

  const occupants = (await getListItem(
    occupancyList,
  )) as RandomOccupantListItem | null
  let occupantsString = `<li>There are no occupants</li>`
  if (occupants) {
    const occupantsValue = await evaluateItem(occupants)
    const numCreatures = occupants.props().numOccupants
    occupantsString = `<li>${occupantsValue}</li>`
    if (numCreatures > 0) {
      // Get a random creature
      const creature = (await getListItem(
        config.creature,
      )) as RandomCreatureListItem | null
      if (creature) {
        const encounterDifficulty = ((await getEvaluatedListItemFromKey(
          'encounterDifficulty',
        )) ?? 'hard') as EncounterDifficulty

        const xpLimit = getXPLimit(encounterDifficulty)

        occupantsString += generateEncounter({
          creature,
          xpLimit,
          encounterDifficulty,
          overrides: {
            doing: 'at their camp',
            numCreatures,
          },
        })
      } else if (numCreatures === 1) {
        occupantsString += `<li>It is a commoner.</li>`
      } else {
        occupantsString += `<li>They are commoners.</li>`
      }
    }
  }
  return `
  <li>There is a shelter:</li>
  <li>
    <ul>
      <li>${await getEvaluatedListItem(sizeList)}</li>
      <li>${await getEvaluatedListItem(exposureList)}</li>
      <li>${await getEvaluatedListItem(visibilityList)}</li>
      ${occupantsString}
    </ul>
  </li>
  `
}

const swampLocations: RandomLocationList = [
  {
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
  },
]

export const location: RandomLocationList = [
  ...swampLocations,
  {
    value: locationValueFunction,
    probability: 1,
    props: async () => {
      const { areas } = getContext()
      const primaryArea = areas && areas.length ? areas[0] : 'grassland'
      const smellsList =
        `${primaryArea}_smells` in config
          ? `${primaryArea}_smells`
          : 'grassland_smells'
      const soundsList =
        `${primaryArea}_sounds` in config
          ? `${primaryArea}_sounds`
          : 'grassland_sounds'
      return {
        description: 'an empty clearing',
        smell: `[${smellsList}] and [${smellsList}]`,
        sound: `[${soundsList}] and [${soundsList}]`,
        shelterLists: {
          probability: 0.05,
          sizeList: [...config.small_shelter, ...config.medium_shelter],
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
    },
  },
]
