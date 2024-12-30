// Factions
// TODO: Add Bullywugs to factions and units to swamp
// Add Centaur faction
// Add Drow faction
// Add Fey factions
// Add plants faction

import { RandomListItem } from 'types/lists'

type FactionName = 'ratfolk' | 'predator' | 'prey' | 'party'
// TODO: Get these values from the database
interface FactionProps {
  strength: number
  reputation: Record<FactionName, number>
  predisposition: number
}
interface RandomFactionListItem extends RandomListItem {
  value: FactionName
  props: FactionProps
}
type RandomFactionList = RandomFactionListItem[]

export const faction: RandomFactionList = [
  {
    value: 'ratfolk',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      strength: 4,
      reputation: {
        ratfolk: 0, // N/A
        party: -20,
        predator: -40,
        prey: 0,
      },
      predisposition: 0,
    },
  },
  {
    value: 'predator',
    probability: 1,
    props: {
      strength: 9,
      reputation: {
        predator: 0, // N/A
        ratfolk: -40,
        party: -30,
        prey: -40,
      },
      predisposition: -10,
    },
  },
  {
    value: 'prey',
    probability: 1,
    props: {
      strength: 9,
      reputation: {
        prey: 0, // N/A
        ratfolk: -10,
        party: -20,
        predator: -40,
      },
      predisposition: -10,
    },
  },
]
