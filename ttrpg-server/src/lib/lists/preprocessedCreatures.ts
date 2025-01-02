import { getContext } from 'lib/lists/context'
import { getAlliesFilter, getEnemiesFilter } from 'lib/lists/relationships'
import {
  BaseRandomCreatureListItem,
  BaseCreatureProps,
  BaseRandomCreatureList,
  getSizesLt,
  getSizesLte,
} from 'types/creatures'

const defaultRatfolkProps: Omit<BaseCreatureProps, 'xp'> = {
  url: '', // TODO: Link to Notion or D&D Beyond
  tags: ['humanoid', 'mammal'],
  areas: [{ area: 'swamp', probability: 1 }],
  regions: [{ region: 'Dragonsbeard Glen', probability: 1 }],
  predisposition: {
    distant: 0,
    nearby: -20,
  },
  enemies: [
    (creature: BaseRandomCreatureListItem) => {
      return getEnemiesFilter({
        operation: 'or',
        creature,
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
      return getAlliesFilter({
        creature,
        operation: 'or',
        creatureNames: ['ratfolk'],
      })
    },
  ],
}

// TODO: I will be using Eladrin for the Fey forest, but not for the first area

export const preprocessedCreatures: BaseRandomCreatureList = [
  // HOMEBREW
  // Ratfolk
  {
    value: 'ratfolk freak',
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
    value: 'ratfolk inventor',
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
    value: 'ratfolk scavenger',
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
    value: 'ratfolk captain',
    probability: function () {
      return getProbabilityMod(this.props, 0.25 / 5)
    },
    props: {
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
            operation: 'or',
            creature,
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('large'),
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
            operation: 'or',
            creature,
            creatureNames: ['ape'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('medium'),
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
            operation: 'or',
            tags: ['plant', 'fey', 'druid'],
            creatureNames: ['dryad', 'treant'],
          })
        },
      ],
      enemies: [],
    },
  },
  {
    value: 'awakened tree',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16792-awakened-tree',
      xp: 450,
      tags: ['plant'],
      sizes: ['huge'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
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
            operation: 'or',
            tags: ['plant', 'fey', 'druid'],
            creatureNames: ['dryad', 'treant'],
          })
        },
      ],
      enemies: [],
    },
  },
  {
    value: 'baboon',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16795-baboon',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'hill', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
        { area: 'swamp', probability: 0.1 },
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
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'badger',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16796-badger',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 0,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('tiny'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'bandit',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16798-bandit',
      xp: 25,
      tags: ['humanoid', 'criminal', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['good', 'neutral', 'evil'],
      areas: [
        { area: 'urban', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -20,
        nearby: -40,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'and',
            legalAlignments: ['lawful', 'neutral'],
            tags: ['humanoid', 'criminal', 'mercenary', 'lawEnforcement'],
          })
        },
      ],
    },
  },
  {
    value: 'bandit captain',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16799-bandit-captain',
      xp: 450,
      tags: ['humanoid', 'criminal', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['neutral', 'evil'],
      areas: [
        { area: 'urban', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -20,
        nearby: -40,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'and',
            legalAlignments: ['lawful', 'neutral'],
            tags: ['humanoid', 'criminal', 'mercenary', 'lawEnforcement'],
          })
        },
      ],
    },
  },
  {
    value: 'black bear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16806-black-bear',
      xp: 100,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'hill', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: 0,
        nearby: -50,
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['fish', 'insect', 'mammal', 'reptile', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
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
      tags: ['humanoid', 'amphibian'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: [
                'insect',
                'fish',
                'bird',
                'amphibian',
                'reptile',
                'plant',
              ],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
            creatureNames: ['frog', 'toad', 'bullywug'],
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
            operation: 'or',
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getAlliesFilter({
            creature,
            operation: 'or',
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
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSizesLt('large'),
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
            operation: 'or',
            creatureNames: ['zombie'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'or',
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
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSizesLte('large'),
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
          const evilFeyFilter = getAlliesFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil', 'neutral'],
          })
          const darklingFilter = getAlliesFilter({
            creature,
            operation: 'or',
            creatureNames: ['darkling', 'shadow', 'wraith'],
          })
          return evilFeyFilter || darklingFilter
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getEnemiesFilter({
            creature,
            operation: 'or',
            tags: ['fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['fey', 'beast'],
              dietSizes: getSizesLt('medium'),
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
