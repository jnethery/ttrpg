import { config } from 'lib/lists'
import { getContext } from 'lib/lists/context'
import { RandomLocationList } from 'lib/lists/arrays/location'
import { locationValueFunction } from './index'

const getDefaultProps = () => {
  return {
    smell: '[swamp_smells] and [swamp_smells]',
    sound: '[swamp_sounds] and [swamp_sounds]',
    shelterLists: {
      probability: 0.1,
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

const getSwampLocation = () => {
  return {
    value: locationValueFunction,
    probability: () => {
      const { areas } = getContext()
      return areas && areas.includes('swamp') ? 1 : 0
    },
  }
}

const landmarkDescriptions = [
  `A massive, broken stone pillar rising from the swamp, carved with giant-sized runes. It is partially submerged and covered in moss.
  History (DC 14): This was erected to honor a giant who stood against a powerful evil.
  Arcana (DC 15): The runes have faint traces of sealing magic tied to the Shadowfell.`,

  `The remains of a dwarven forge, its chimney now crumbled and overtaken by vines. A faint warmth still radiates from the central hearthstone.
  History (DC 13): This forge produced weapons of great significance during a devastating war.
  Arcana (DC 14): Residual energy suggests the weapons were enchanted to fight extraplanar creatures.`,

  `A jagged, dark stone obelisk with glowing purple veins, half-buried in the swamp’s muck. Its surface is slick and cold to the touch.
  Arcana (DC 15): The obelisk is tied to the Shadowfell and likely marked a portal site.
  Religion (DC 14): The obelisk carries symbols of an ancient dragon cult.`,

  `The remains of a tall, dwarven-built watchtower. Only its lower levels remain intact, with the upper sections crumbled into rubble.
  History (DC 12): This was a lookout post from the days of a great war, abandoned after its destruction.
  Nature (DC 14): The swamp has overtaken this tower, but faint traces of battle scars remain on the stone.`,

  `A small, circular shrine with six stone pedestals, each carved with a unique symbol. A faint whisper can be heard when standing in its center.
  Religion (DC 14): This shrine was built to honor those who sealed away a great evil.
  Arcana (DC 15): The symbols represent a magical convergence, likely tied to planar sealing.`,

  `A moss-covered stone archway standing in a clearing. The space beneath the arch shimmers faintly in the moonlight.
  Arcana (DC 13): The arch was once used as a gateway, but it has long since been deactivated.
  History (DC 15): Its design suggests dwarven origin, likely tied to planar travel experiments.`,

  `A cracked stone altar overgrown with vines, its surface carved with faded dwarven inscriptions.
  Religion (DC 14): The altar was used to pray for protection during a time of great peril.
  History (DC 15): The inscriptions tell of dwarves fighting a terrible foe from another plane.`,

  `A massive stone gate, half-submerged in the swamp’s water. Its surface is covered in jagged claw marks.
  History (DC 14): This gate once led to a stronghold, but it was abandoned after a catastrophic battle.
  Nature (DC 13): The claw marks suggest a creature of immense power attacked this location.`,

  `A set of wide, crumbling stone steps that lead nowhere, disappearing into the swamp.
  History (DC 12): These steps once led to an important site, likely destroyed in the war.
  Religion (DC 14): Faint carvings suggest the steps were part of a ritual path used by dwarves.`,

  `The torso and legs of a massive stone statue, the head and arms shattered and scattered nearby.
  History (DC 13): This statue depicts a dwarven warrior, likely a key figure in the fight against an ancient enemy.
  Religion (DC 14): Its posture suggests it was meant to ward off evil.`,

  `A weathered stone bridge spanning a sluggish, murky stream, its surface carved with dwarven runes now eroded by time. The bridge sags in the middle, as if bowed under the weight of history.
   History (DC 14): The bridge looks like it was part of a once-thriving dwarven trade route.
   Nature (DC 13): The stream below is unnaturally still, with strange, dark fish swimming silently in its depths.`,

  `A smooth, black pedestal standing alone in the swamp, reflecting light like glass.
  Arcana (DC 14): The pedestal contains traces of magic used to anchor planar rifts.
  Religion (DC 15): It was part of a dwarven ritual to bind an otherworldly creature.`,

  `A moss-covered stone pillar that drips water constantly, even in dry weather.
  Religion (DC 13): The pillar was a site of prayer during a war, said to represent grief for the fallen.
  Arcana (DC 14): The water carries faint magical properties tied to planar energy.`,

  `A crumbled gateway shaped like an open dragon’s mouth, its teeth jagged and broken.
  Arcana (DC 15): The gateway’s design once focused planar energy, but it is now inert.`,

  `A massive stone slab split in two, with glowing runes still visible along its broken edges.
  Religion (DC 14): This seal was broken during a battle with a great evil.
  Arcana (DC 15): The magic here is ancient, tied to binding spells used against extraplanar creatures.`,
]

export const manmadeSwampLocations: RandomLocationList =
  landmarkDescriptions.map((description) => {
    return {
      ...getSwampLocation(),
      props: async () => {
        return {
          description,
          ...getDefaultProps(),
        }
      },
    }
  })
