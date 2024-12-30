import { FactionName } from 'lib/lists/arrays/faction'
import { RandomListItem } from 'types/lists'

type CreatureTag = 'swarm'
interface CreatureProps {
  max?: number
  xp: number
  factions: FactionName[]
  tags?: CreatureTag[]
}
interface RandomCreatureListItem extends RandomListItem {
  props: CreatureProps
}
type RandomCreatureList = RandomCreatureListItem[]

export const creature: RandomCreatureList = [
  // Ratfolk
  {
    value: 'freak',
    probability: 1,
    props: {
      xp: 1100,
      factions: ['ratfolk'],
    },
  },
  {
    value: 'inventor',
    probability: 2,
    props: {
      xp: 100,
      factions: ['ratfolk'],
    },
  },
  {
    value: 'scavenger',
    probability: 5,
    props: {
      xp: 50,
      factions: ['ratfolk'],
    },
  },
  {
    value: 'captain',
    probability: 1,
    props: {
      max: 1,
      xp: 200,
      factions: ['ratfolk'],
    },
  },
  // Predators
  {
    value: 'giant crocodile',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 1800,
      factions: ['predator'],
    },
  },
  {
    value: 'swarm of poisonous snakes',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 450,
      factions: ['predator'],
      tags: ['swarm'],
    },
  },
  {
    value: 'giant constrictor snake',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 450,
      factions: ['predator'],
    },
  },
  // TODO: Finish this list
  // Prey
  {
    value: 'bat',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'frog',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'hawk',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'lizard',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'spider',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'weasel',
    probability: 1,
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'stirge',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 25,
      factions: ['prey'],
    },
  },
  {
    value: 'diseased giant rat',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 25,
      factions: ['prey'],
    },
  },
  {
    value: 'poisonous snake',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 25,
      factions: ['prey'],
    },
  },
  {
    value: 'giant rat',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 25,
      factions: ['prey'],
    },
  },
  {
    value: 'rat',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
  {
    value: 'raven',
    probability: (context) => (context?.area === 'swamp' ? 1 : 0),
    props: {
      xp: 10,
      factions: ['prey'],
    },
  },
]

/*
// Units
// Might want to move this to its own list
unit
  predator // Beasts and monsters
    // SWAMP
    giant crocodile ^[area == "swamp"]
      xp=1800
    swarm of poisonous snakes ^[area == "swamp"]
      xp=450
    giant constrictor snake ^[area == "swamp"]
      xp=450
    shadow mastif ^[area == "swamp"]
      xp=450
    giant toad ^[area == "swamp"]
      xp=200
    giant spider ^[area == "swamp"]
      xp=200
    swarm of insects ^[area == "swamp"]
      xp=100
    swarm of wasps ^[area == "swamp"]
      xp=100
    crocodile ^[area == "swamp"]
      xp=100
    swarm of rot grubs ^[area == "swamp"]
      xp=100
    swarm of beetles ^[area == "swamp"]
      xp=100
    swarm of centipedes ^[area == "swamp"]
      xp=100
    swarm of spiders ^[area == "swamp"]
      xp=100
    constrictor snake ^[area == "swamp"]
      xp=50
    giant poisonous snake ^[area == "swamp"]
      xp=50
    giant frog ^[area == "swamp"]
      xp=50
    giant lizard ^[area == "swamp"]
      xp=50
    // CAVE
  prey // Good/small beasts
    // Mountain Goat -> SHOULD BE MOUNTAIN!
    // Sea horse -> Coastal
    // 
    // Unspecific location
*/
