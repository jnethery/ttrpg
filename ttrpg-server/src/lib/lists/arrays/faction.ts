// Factions
// TODO: Add Bullywugs to factions and units to swamp
// Add Centaur faction
// Add Drow faction
// Add Fey factions
// Add plants faction

import { RandomListItem } from 'types/lists'

type FactionName = 'ratfolk' | 'predator' | 'prey'
interface RandomFactionListItem extends RandomListItem {
  value: FactionName
}
type RandomFactionList = RandomFactionListItem[]

export const faction: RandomFactionList = [
  {
    value: 'ratfolk',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
  },
  {
    value: 'predator',
    probability: 1,
  },
  {
    value: 'prey',
    probability: 1,
  },
]

// TODO: Re-implement faction reputation and predisposition
/*faction
  ratfolk ^[area == "swamp"]
    str = 4 // Strength, how robust their forces are. range {0, 10}
    rep // Reputation, the relationship they have with the target. range {-50, 50}
      party = -20
      predator = -40
      prey = 0
    pred = 0 // Predisposition, how predisposed they are towards a sentiment. range {-50, 50}
  predator
    str = 9
    rep
      party = -30
      ratfolk = -40
      prey = -40
    pred = -10
  prey
    str = 9
    rep
      party = -20
      ratfolk = -10
      predator = -40
    pred = -10
*/
