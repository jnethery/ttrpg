import { getContext } from 'lib/lists/context'
import { getAlliesFilter, getEnemiesFilter } from 'lib/lists/relationships'
import {
  BaseRandomCreatureListItem,
  BaseCreatureProps,
  BaseRandomCreatureList,
  getSmallerSizes,
} from 'types/creatures'

const defaultRatfolkProps: Partial<BaseCreatureProps> = {
  url: '', // TODO: Link to Notion or D&D Beyond
  factions: ['ratfolk'],
  tags: ['humanoid', 'mammal'],
  areas: [{ area: 'swamp', probability: 1 }],
  regions: [{ region: 'Dragonsbeard Glen', probability: 1 }],
  predisposition: {
    distant: 0,
    nearby: -20,
  },
}

// TODO: I will be using Eladrin for the Fey forest, but not for the first area

export const preprocessedCreatures: BaseRandomCreatureList = [
  // HOMEBREW
  // Ratfolk
  {
    value: 'freak',
    probability: function () {
      return getProbabilityMod(this.props, 0.25 / 5)
    },
    props: {
      xp: 1100,
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'inventor',
    probability: function () {
      return getProbabilityMod(this.props, 0.25)
    },
    props: {
      xp: 100,
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'scavenger',
    probability: function () {
      return getProbabilityMod(this.props, (0.25 * 2) / 5)
    },
    props: {
      xp: 50,
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'captain',
    probability: function () {
      return getProbabilityMod(this.props, 0.25 / 5)
    },
    props: {
      max: 1,
      xp: 200,
      legalAlignments: ['lawful'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  // D&D 5E
  {
    value: 'allip',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560718-allip',
      predisposition: {
        distant: -50,
        nearby: -50,
      },
      max: 1,
      xp: 1800,
      areas: [
        { area: 'cursed', probability: 0.25 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
        { area: 'forest', probability: 0.03 },
        { area: 'mountain', probability: 0.02 },
      ],
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      enemies: [
        () => {
          return true
        },
      ],
      allies: [],
    },
  },
  {
    value: 'ankheg',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16787-ankheg',
      xp: 450,
      max: 1,
      tags: ['monstrosity', 'insect'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.25 },
        { area: 'forest', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'desert', probability: 0.05 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -10,
        nearby: -50,
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSmallerSizes('huge'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'ape',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16788-ape',
      xp: 100,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'mountain', probability: 0.25 },
        { area: 'swamp', probability: 0.1 },
        { area: 'hill', probability: 0.05 },
      ],
      predisposition: {
        distant: -10,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            creatureNames: ['ape'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSmallerSizes('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'awakened shrub',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16791-awakened-shrub',
      xp: 10,
      tags: ['plant'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: 0,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            tags: ['plant', 'fey', 'druid'],
            creatureNames: ['dryad', 'treant'],
          })
        },
      ],
      enemies: [],
    },
  },
  {
    value: 'bodak',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560744-bodak',
      predisposition: {
        distant: -50,
        nearby: -50,
      },
      max: 1,
      xp: 2300,
      areas: [
        { area: 'cursed', probability: 0.15 },
        { area: 'dungeon', probability: 0.1 },
        { area: 'underdark', probability: 0.05 },
        { area: 'swamp', probability: 0.03 },
      ],
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      enemies: [
        () => {
          return true
        },
      ],
      allies: [],
    },
  },
  {
    value: 'bullywug',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/bullywug-mm.html',
      predisposition: {
        distant: -20,
        nearby: -50,
      },
      xp: 50,
      areas: [
        { area: 'swamp', probability: 0.6 },
        { area: 'coastal', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'underwater', probability: 0.05 },
        { area: 'cursed', probability: 0.03 },
        { area: 'grassland', probability: 0.02 },
        { area: 'hill', probability: 0.02 },
      ],
      factions: ['bullywug'],
      tags: ['humanoid', 'amphibian'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: [
                'insect',
                'fish',
                'bird',
                'amphibian',
                'reptile',
                'plant',
              ],
              dietSizes: getSmallerSizes('medium'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            creatureNames: ['frog', 'toad'],
            factionName: 'bullywug',
          })
        },
      ],
    },
  },
  {
    value: 'catoblepas',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560750-catoblepas',
      predisposition: {
        distant: -10,
        nearby: -50,
      },
      xp: 1800,
      max: 1,
      areas: [
        { area: 'swamp', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
        { area: 'grassland', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      tags: ['monstrosity', 'reptile', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: ['plant'],
              dietSizes: getSmallerSizes('large'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            moralAlignments: ['evil'],
          })
        },
      ],
    },
  },
  {
    value: 'constrictor snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16830-constrictor-snake',
      xp: 50,
      tags: ['beast', 'reptile'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'coastal', probability: 0.15 },
        { area: 'grassland', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'dungeon', probability: 0.03 },
      ],
      predisposition: {
        distant: 0,
        nearby: -50,
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSmallerSizes('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'corpse flower',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560762-corpse-flower',
      xp: 3900,
      tags: ['plant'],
      sizes: ['large'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.25 },
        { area: 'forest', probability: 0.2 },
        { area: 'dungeon', probability: 0.15 },
        { area: 'underdark', probability: 0.05 },
      ],
      predisposition: {
        distant: -20,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            creatureNames: ['zombie'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            tags: ['undead', 'humanoid'],
          })
        },
      ],
    },
  },
  {
    value: 'crocodile',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16834-crocodile',
      xp: 100,
      max: 1,
      tags: ['beast', 'reptile'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'coastal', probability: 0.3 },
        { area: 'forest', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
        { area: 'grassland', probability: 0.05 },
        { area: 'dungeon', probability: 0.02 },
      ],
      predisposition: {
        distant: 0,
        nearby: -50,
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSmallerSizes('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'darkling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17231-darkling',
      xp: 100,
      tags: ['fey'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.25 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            tags: ['fey'],
            creatureNames: ['darkling', 'shadow', 'wraith'],
            moralAlignments: ['evil', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            tags: ['fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['fey', 'beast'],
              dietSizes: getSmallerSizes('medium'),
            },
          })
        },
      ],
    },
  },
]

const getProbabilityMod = (
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
