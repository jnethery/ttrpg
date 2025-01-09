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
import { getContext } from 'lib/lists/context'
import { RandomListItem } from 'types/lists'
import {
  bubblingPool,
  crystalPool,
  magicPortal,
  naturalSwampLocations,
  manmadeSwampLocations,
  locationValueFunction,
  LocationProps,
} from './locations'

export interface RandomLocationListItem extends RandomListItem {
  props: () => Promise<LocationProps>
}

export type RandomLocationList = RandomLocationListItem[]

const swampLocations: RandomLocationList = [
  bubblingPool,
  crystalPool,
  magicPortal,
  ...naturalSwampLocations,
  ...manmadeSwampLocations,
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
