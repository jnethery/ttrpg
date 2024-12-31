import { getRelationshipFilters } from 'lib/lists/relationships'
import { preprocessedCreatures } from 'lib/lists/preprocessedCreatures'
import { BaseRandomCreatureList, RandomCreatureList } from 'types/creatures'

// In this function, we fill in the details of the creatures
const hydrateCreatures = (
  creatures: BaseRandomCreatureList,
): RandomCreatureList => {
  return creatures.map((creature) => {
    // Get the enemies and allies from the creature's factions and tags
    const { props, ...rest } = creature
    return {
      props: {
        ...getRelationshipFilters(creature),
        ...props,
      },
      ...rest,
    }
  })
}

export const creature = hydrateCreatures(preprocessedCreatures)
