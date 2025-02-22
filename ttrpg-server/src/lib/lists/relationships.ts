import { evaluateItem } from 'lib/lists/evaluate'
import {
  BaseRandomCreatureListItem,
  CreatureTag,
  LegalAlignment,
  MoralAlignment,
  Size,
} from 'types/creatures'

interface RelationshipsFilterProps {
  operation: 'and' | 'or'
  diet?: {
    dietTags: CreatureTag[]
    dietSizes: Size[]
  }
  creature: BaseRandomCreatureListItem
  creatureNames?: string[]
  legalAlignments?: LegalAlignment[]
  moralAlignments?: MoralAlignment[]
  tags?: CreatureTag[]
}

export const getRelationshipFilter = async ({
  operation,
  creature,
  creatureNames,
  diet,
  moralAlignments,
  legalAlignments,
  tags,
}: RelationshipsFilterProps): Promise<boolean> => {
  const conditions = []

  if (creatureNames) {
    const creatureName = await evaluateItem(creature)
    const creatureCondition = creatureNames.some((name) =>
      creatureName.includes(name),
    )
    conditions.push(creatureCondition)
  }
  if (tags) {
    const { tags: creatureTags } = creature.props
    const tagCondition = tags.some((tag) => creatureTags?.includes(tag))
    conditions.push(tagCondition)
  }
  if (diet) {
    const { dietTags, dietSizes } = diet
    const { tags, sizes } = creature.props
    const dietCondition = tags?.some((tag) => dietTags.includes(tag))
    const dietSizeCondition = dietSizes.some((size) => sizes?.includes(size))
    conditions.push(dietCondition && dietSizeCondition)
  }
  if (moralAlignments) {
    const { moralAlignments: creatureMoralAlignments } = creature.props
    const alignmentCondition = moralAlignments.some((alignment) =>
      creatureMoralAlignments?.includes(alignment),
    )
    conditions.push(alignmentCondition)
  }
  if (legalAlignments) {
    const { legalAlignments: creatureLegalAlignments } = creature.props
    const alignmentCondition = legalAlignments.some((alignment) =>
      creatureLegalAlignments?.includes(alignment),
    )
    conditions.push(alignmentCondition)
  }
  return conditions.length
    ? operation === 'or'
      ? conditions.some((condition) => condition)
      : conditions.every((condition) => condition)
    : false
}
