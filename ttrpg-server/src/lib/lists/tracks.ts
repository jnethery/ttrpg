import { getDC } from 'lib/lists/dc'

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
  const creature = 'old, unidentifiable'
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
