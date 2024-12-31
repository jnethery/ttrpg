import { FactionName } from 'types/creatures'

// Factions
// TODO: Add Bullywugs to factions and units to swamp
// Add Centaur faction
// Add Drow faction
// Add Fey factions
// Add plants faction

import { getContext } from 'lib/lists/context'
import { RandomListItem } from 'types/lists'

// TODO: Get these values from the database
interface FactionProps {
  strength: number
  reputation: Record<FactionName, number>
  predisposition: number
}
export interface RandomFactionListItem extends RandomListItem {
  value: FactionName
  props: FactionProps
}
export type RandomFactionList = RandomFactionListItem[]

// Reputation is from -50 to 50
export const faction: RandomFactionList = [
  {
    value: 'ratfolk',
    probability: () => (getContext()?.areas?.includes('swamp') ? 1 : 0),
    props: {
      strength: 4,
      reputation: {
        ratfolk: 0, // N/A
        party: -20,
        bullywug: -50,
      },
      predisposition: 0,
    },
  },
]
