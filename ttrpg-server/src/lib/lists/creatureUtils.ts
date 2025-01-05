import { getContext } from 'lib/lists/context'
import { BaseCreatureProps, CreatureTag } from 'types/creatures'

export const getProbabilityMod = (
  props: BaseCreatureProps,
  baseProbability: number = 1,
) => {
  const areaProbability =
    'areas' in props
      ? props.areas
          ?.filter((area) => getContext()?.areas?.includes(area.area))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const regionProbability =
    'regions' in props
      ? props.regions
          ?.filter((region) => getContext()?.regions?.includes(region.region))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const environmentalConditionProbability =
    'conditions' in props
      ? props.conditions
          ?.filter((condition) =>
            getContext()?.conditions?.includes(condition.condition),
          )
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
