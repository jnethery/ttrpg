import { RandomFactionListItem, faction } from 'lib/lists/arrays/faction'
import { evaluateItem } from 'lib/lists/evaluate'
import {
  BaseRandomCreatureListItem,
  CreatureTag,
  FactionName,
  LegalAlignment,
  MoralAlignment,
  RelationshipCriteria,
  Size,
} from 'types/creatures'

const getRelatedFactions = (factionName: FactionName) => {
  const relatedFactions: { enemies: string[]; allies: string[] } = {
    enemies: [],
    allies: [],
  }
  const factionItem = faction.find(
    (item: RandomFactionListItem) => item.value === factionName,
  )
  if (factionItem) {
    for (const factionKey of Object.keys(factionItem.props.reputation)) {
      if (factionKey === factionName) {
        continue
      }
      const reputation = factionItem.props.reputation[factionKey as FactionName]
      if (reputation < 0) {
        relatedFactions.enemies.push(factionKey)
      } else if (reputation > 0) {
        relatedFactions.allies.push(factionKey)
      }
    }
  }
  return relatedFactions
}

export const getRelationshipFilters = (
  creature: BaseRandomCreatureListItem,
) => {
  const enemies: RelationshipCriteria = []
  const allies: RelationshipCriteria = []
  const { factions = [], tags = [] } = creature.props

  const addRelationships = (relationships: {
    enemies: RelationshipCriteria
    allies: RelationshipCriteria
  }) => {
    for (const enemy of relationships.enemies) {
      enemies.push(enemy)
    }
    for (const ally of relationships.allies) {
      allies.push(ally)
    }
  }

  for (const faction of factions) {
    const relationships = factionRelationshipFilters[faction]
    if (relationships) {
      addRelationships(relationships)
    }
  }
  for (const tag of tags) {
    const relationships = tagRelationshipFilters[tag]
    if (relationships) {
      addRelationships(relationships)
    }
  }
  return { enemies, allies }
}

const factionRelationshipFilters: Record<
  string,
  { enemies: RelationshipCriteria; allies: RelationshipCriteria }
> = {
  ratfolk: {
    enemies: [
      (creature: BaseRandomCreatureListItem) => {
        return getEnemiesFilter({
          creature,
          factionName: 'ratfolk',
          diet: {
            dietTags: ['insect', 'fish', 'plant'],
            dietSizes: ['small', 'medium'],
          },
          moralAlignments: ['evil'],
        })
      },
    ],
    allies: [
      (creature: BaseRandomCreatureListItem) => {
        return getAlliesFilter({ creature, factionName: 'ratfolk' })
      },
    ],
  },
}

const tagRelationshipFilters: Record<
  string,
  { enemies: RelationshipCriteria; allies: RelationshipCriteria }
> = {}

interface RelationshipsFilterProps {
  diet?: {
    dietTags: CreatureTag[]
    dietSizes: Size[]
  }
  creature: BaseRandomCreatureListItem
  creatureNames?: string[]
  factionName?: FactionName
  legalAlignments?: LegalAlignment[]
  moralAlignments?: MoralAlignment[]
  tags?: CreatureTag[]
}

export const getEnemiesFilter = ({
  creature,
  diet,
  factionName,
  moralAlignments,
  tags,
}: RelationshipsFilterProps): boolean => {
  const conditions = []

  const { factions } = creature.props
  if (factionName) {
    const { enemies } = getRelatedFactions(factionName)
    const factionCondition = factions?.some((faction) =>
      enemies.includes(faction),
    )
    conditions.push(factionCondition)
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
  return conditions.length ? conditions.some((condition) => condition) : false
}

export const getAlliesFilter = ({
  creature,
  creatureNames,
  factionName,
  moralAlignments,
}: RelationshipsFilterProps): boolean => {
  const conditions = []

  const { factions } = creature.props
  if (factionName) {
    const { allies } = getRelatedFactions(factionName)
    const factionCondition = factions?.some((faction) =>
      allies.includes(faction),
    )
    conditions.push(factionCondition)
  }
  if (creatureNames) {
    const creatureName = evaluateItem(creature)
    const creatureCondition = creatureNames.some((name) =>
      creatureName.includes(name),
    )
    conditions.push(creatureCondition)
  }
  if (moralAlignments) {
    const { moralAlignments: creatureMoralAlignments } = creature.props
    const alignmentCondition = moralAlignments.some((alignment) =>
      creatureMoralAlignments?.includes(alignment),
    )
    conditions.push(alignmentCondition)
  }
  return conditions.length ? conditions.some((condition) => condition) : false
}
