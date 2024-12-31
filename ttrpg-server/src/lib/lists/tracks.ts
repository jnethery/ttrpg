import { config } from 'lib/lists'
import { getDC } from 'lib/lists/dc'
import {
  getListItem,
  getListItemFromKey,
  evaluateItem,
} from 'lib/lists/evaluate'
import { RandomCreatureListItem } from 'types/creatures'

const getEnemy = (
  creature: RandomCreatureListItem,
): RandomCreatureListItem | null => {
  // Get the creature's enemies
  const enemyFilters = creature.props.enemies
  if (enemyFilters.length > 0) {
    // Get a random enemy
    const enemyList = config.creature.filter((item) => {
      return enemyFilters.some((filter) => filter(item))
    })
    return getListItem(enemyList) as RandomCreatureListItem | null
  }
  return null
}

// TODO: Fill out the generateEncounter function from the old code.
const generateEncounter = (creature: RandomCreatureListItem): string => {
  const doing = getListItemFromKey('doing')
  const evaluatedAction = doing ? evaluateItem(doing) : ''
  const doingString = doing ? `<li>they are ${evaluatedAction}</li>` : ''
  const combatActions = ['hunting', 'fighting', 'fleeing'] as const

  let enemyString = ''
  if (
    combatActions.includes(evaluatedAction as (typeof combatActions)[number])
  ) {
    // Get one of the creature's enemies
    const enemy = getEnemy(creature)
    // What a pacifist. He has no enemies. Let's generate another encounter for him.
    if (!enemy) {
      return generateEncounter(creature)
    }
    enemyString = `<li>${evaluateItem(enemy)}</li>`
  }

  return `
    <ul>
      <li>You encounter a ${evaluateItem(creature)}</li>
      ${doingString}
      ${enemyString}
    </ul>
  `
}

export const generateTracks = (): string => {
  const defaultString = 'old, unidentifiable'

  let creatureName = defaultString
  let creatureItem = null
  const prospectiveCreature = getListItemFromKey('creature')
  if (prospectiveCreature && typeof prospectiveCreature.value === 'string') {
    creatureItem = prospectiveCreature
    creatureName = evaluateItem(creatureItem)
  }

  let trackString = `
    <ul>
      <li>
        Perception DC ${getDC()} to see ${creatureName} tracks
      </li>
      </li>
      <li> Survival DC ${getDC()} to see moving [direction]</li>
    </ul>
  `
  if (creatureItem) {
    trackString += `
      If followed: ${generateEncounter(creatureItem as RandomCreatureListItem)}
    `
  }
  return trackString
}
