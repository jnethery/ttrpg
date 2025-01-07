import { getContext } from 'lib/lists/context'
import { BaseCreatureProps, CreatureTag } from 'types/creatures'

// TODO: This is not performant when verifying that a creature is valid for EVERY given area, region, etc.
export const getProbabilityMod = (
  props: BaseCreatureProps,
  baseProbability: number = 1,
) => {
  const { areas, regions, conditions } = getContext()

  const areaProbability =
    'areas' in props && areas && areas.length
      ? props.areas
          ?.filter((area) => areas.includes(area.area))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const regionProbability =
    'regions' in props && regions && regions.length
      ? props.regions
          ?.filter((region) => regions.includes(region.region))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const environmentalConditionProbability =
    'conditions' in props && conditions && conditions.length
      ? props.conditions
          ?.filter((condition) => conditions.includes(condition.condition))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  return (
    baseProbability *
    (areaProbability ?? 0) *
    (regionProbability ?? 0) *
    (environmentalConditionProbability ?? 1)
  )
}
