import { config } from 'lib/lists'
import { isFactionName } from 'lib/lists/arrays/faction'
import { getDC } from 'lib/lists/dc'
import {
  getListItemFromKey,
  getListItem,
  evaluateItem,
} from 'lib/lists/evaluate'

/*
generateTracks() =>
  const f = faction.evaluateItem
  const creatures = getCreaturesToChooseFrom(f)
  const c = Object.keys(creatures.creatures)[0] ?? 'old, unidentifiable'

  const trackString = `
    <ul>
      <li>${getCreatureName(f, c)} tracks</li>
      <li> Survival DC ${[dc]} to see moving ${[direction]}</li>
    </ul>
  `

  if (c == "old, unidentfiable") {
    return trackString
  }

  const encounterString = `
    If followed:
    ${generateEncounter(f, false, creatures)}
  `
  return `${trackString}${encounterString}`
*/

export const generateTracks = (): string => {
  // TODO: Plug in the creatures
  const defaultString = 'old, unidentifiable'

  let creature = defaultString
  const faction = getListItemFromKey('faction')
  if (faction && typeof faction.value === 'string') {
    const factionName = faction.value
    console.log({ factionName, isFactionName: isFactionName(factionName) })
    if (isFactionName(factionName)) {
      // Construct a list of creatures to choose from based on the faction
      const creatures = config.creature.filter((creature) =>
        creature.props.factions.includes(factionName),
      )
      const creatureItem = getListItem(creatures)
      if (creatureItem) {
        creature = evaluateItem(creatureItem)
      }
    }
  }

  const trackString = `
    you find:
    <ul>
      <li>
        Perception DC ${getDC()} to see ${creature} tracks
      </li>
      </li>
      <li> Survival DC ${getDC()} to see moving [direction]</li>
    </ul>
  `
  return trackString
}
