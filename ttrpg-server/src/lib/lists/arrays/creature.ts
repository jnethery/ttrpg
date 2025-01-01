import { preprocessedCreatures } from 'lib/lists/preprocessedCreatures'
import { BaseRandomCreatureList, RandomCreatureList } from 'types/creatures'

// In this function, we fill in the details of the creatures
const hydrateCreatures = (
  creatures: BaseRandomCreatureList,
): RandomCreatureList => {
  return creatures
}

export const creature = hydrateCreatures(preprocessedCreatures)
