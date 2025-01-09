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
  getEncounterValue,
  getXPLimit,
} from 'lib/lists/encounters'
import { getContext } from 'lib/lists/context'
import { EncounterDifficulty } from 'types/lists'
import { RandomCreatureListItem } from 'types/creatures'
import { LocationProps } from './index'

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

const generateShelter = async (props: LocationProps) => {
  const random = Math.random()
  const { probability, sizeList, exposureList, visibilityList, occupancyList } =
    props.shelterLists
  if (
    random < probability ||
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

        occupantsString += getEncounterValue(
          await generateEncounter({
            creature,
            xpLimit,
            encounterDifficulty,
            overrides: {
              doing: 'at their camp',
              numCreatures,
            },
          }),
        )
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

export const locationValueFunction = async (
  props: LocationProps,
): Promise<string> => {
  const smellString = props.smell ? `<li>Smells like ${props.smell}</li>` : ''
  const soundString = props.sound ? `<li>Sounds like ${props.sound}</li>` : ''
  return `
    <ul>
      <li>${props.description}</li>
      <li>Setting: ${getContext()?.areas?.join(', ')}, environmental conditions: ${getContext()?.conditions?.join(', ')}</li>
      ${smellString}
      ${soundString}
      ${await generateDiscovery(props)}
      ${await generateIdentification(props)}
      ${await generateEffect(props)}
      ${await generateShelter(props)}
    </ul>
  `
}
